from django.db.models.signals import post_delete
from django.dispatch import receiver
import os
from django.conf import settings
from django.db import transaction
from django.db.models.signals import post_save, pre_save
from django.utils import timezone
from .models import *


@receiver(post_delete, sender='catalog.Book')
def delete_cover_image(sender, instance, **kwargs):
    if instance.cover_image:
        try:
            file_path = os.path.join(settings.MEDIA_ROOT, str(instance.cover_image))
            os.remove(file_path)
            print(f"Файл {file_path} удален.")
        except FileNotFoundError:
            print(f"Файл {file_path} не найден.")
        except OSError as e:
            print(f"Ошибка при удалении файла {file_path}: {e}")

@receiver(post_save, sender=User)
def add_user_to_role(sender, instance, created, **kwargs):
    if created:
        if instance.role:
            if instance.role.id == 1:
                Employee.objects.create(user=instance)
            elif instance.role.id == 2:
                Client.objects.create(user=instance)


_old_status_cache = {}

@receiver(pre_save, sender=OrderHistory)
def cache_old_status(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = OrderHistory.objects.get(pk=instance.pk)
            _old_status_cache[instance.pk] = old_instance.status_id
        except OrderHistory.DoesNotExist:
            _old_status_cache[instance.pk] = None
    else:
        _old_status_cache[instance.pk] = None


@receiver(post_save, sender=OrderHistory)
def create_order_note(sender, instance, created, **kwargs):
    current_status_id = instance.status_id
    order_status_name = instance.status.name_status

    if created:
        HistoryOfNotes.objects.create(
            text_note=f'Ваш заказ №{instance.id} {order_status_name}',
            client=instance.client,
            order=instance
        )
    else:
        previous_status_id = _old_status_cache.pop(instance.pk, None)

        if previous_status_id is not None and previous_status_id != current_status_id:
            HistoryOfNotes.objects.create(
                text_note=f'Ваш заказ №{instance.id} {order_status_name}',
                client=instance.client,
                order=instance
            )

@receiver(post_save, sender=OrderHistory)
def update_book_quantity(sender, instance, created, **kwargs):
    if created:
        try:
            with transaction.atomic():
                # Получаем все книги в этом заказе
                book_orders = BookInOrder.objects.filter(order=instance)

                for book_order in book_orders:
                    book = book_order.book
                    # Уменьшаем количество экземпляров
                    book.number_of_copies -= book_order.count_of_book

                    # Проверяем, чтобы количество не стало отрицательным
                    if book.number_of_copies < 0:
                        raise ValueError(
                            f"Недостаточно экземпляров книги {book.title}. "
                            f"Доступно: {book.number_of_copies + book_order.count_of_book}, "
                            f"требуется: {book_order.count_of_book}"
                        )

                    book.save()

        except Exception as e:
            # Если произошла ошибка, отменяем транзакцию
            transaction.set_rollback(True)
            # Можно добавить логирование ошибки
            raise e
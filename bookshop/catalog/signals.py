from django.db.models.signals import post_delete
from django.dispatch import receiver
import os
from django.conf import settings

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


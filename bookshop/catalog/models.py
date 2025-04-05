from django.db import models
from unicodedata import category
from django.contrib.auth.models import AbstractUser

class Role(models.Model):
    role_name = models.CharField(max_length=25, unique=True)


class User(AbstractUser):
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    email = models.EmailField(unique=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True, blank=True)

    USERNAME_FIELD = "email"  # Авторизация по email
    REQUIRED_FIELDS = ["username"]  # Поля, которые нужно заполнить при создании суперпользователя

    def __str__(self):
        return self.email

class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
class Category(models.Model):
    category_name = models.CharField(max_length=25, unique=True)

class Discount(models.Model):
    discount_name = models.CharField(max_length=100)
    discount_percentage = models.IntegerField()

class Book(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=40)
    publishing = models.CharField(max_length=30)
    publishing_year = models.IntegerField()
    price = models.FloatField()
    number_of_copies = models.IntegerField()
    discount = models.ForeignKey(Discount, on_delete=models.SET_NULL, null=True, blank=True)
    discounted_price = models.FloatField(null=True, blank=True)
    description = models.CharField(max_length=300, blank=True, null=True)
    ISBN = models.CharField(max_length=13, unique=True)
    cover_image = models.ImageField(upload_to='book_covers/', blank=True, null=True)

class Author(models.Model):
    author_last_name = models.CharField(max_length=25)
    author_first_name = models.CharField(max_length=25)
    author_patronymic = models.CharField(max_length=25, blank=True, null=True)

class AuthorsOfBook(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('book', 'author')

class OrderStatus(models.Model):
    name_status = models.CharField(max_length=30, unique=True)

class OrderHistory(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    sale_date = models.DateField()
    sale_price = models.FloatField()
    status = models.ForeignKey(OrderStatus, on_delete=models.CASCADE)

class BookInOrder(models.Model):
    order = models.ForeignKey(OrderHistory, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    count_of_book = models.IntegerField()

    class Meta:
        unique_together = ('order', 'book')

class BookInCart(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    count_of_book = models.IntegerField()

    class Meta:
        unique_together = ('client', 'book')

class HistoryOfNotes(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    text_note = models.CharField(max_length=100)

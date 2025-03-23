from django.db import models

class Category(models.Model):
    objects = models.Manager()
    category_name = models.CharField(max_length=25)

class Discount(models.Model):
    name = models.CharField(max_length=25)
    discount_percentage = models.IntegerField()

class Book(models.Model):
    objects = models.Manager()
    title = models.CharField(max_length=40)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    publishing = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    number_of_copies = models.IntegerField()
    discount_id = models.ForeignKey(Discount, on_delete=models.CASCADE)
    discounted_price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()

class User(models.Model):
    name = models.CharField(max_length=50)

class Book_in_cart(models.Model):
    objects = models.Manager()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)
    count = models.IntegerField()


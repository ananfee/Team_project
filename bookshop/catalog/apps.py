from django.apps import AppConfig
from django.db.models.signals import post_delete

class CatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'catalog'

    def ready(self):
        import catalog.signals
        from .signals import delete_cover_image
        post_delete.connect(delete_cover_image, sender='catalog.Book')

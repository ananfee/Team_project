from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 1)

    @task
    def view_products(self):
        self.client.get("/catalog/books/")

    @task
    def add_to_cart(self):
        self.client.get("/catalog/categories/")

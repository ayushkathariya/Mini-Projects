from .models import Todo
from django.contrib import admin


# Register your models here.
@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "description", "created_at"]

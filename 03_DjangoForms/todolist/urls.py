from django.urls import path
from .views import HomeView, TodoDeleteView, TodoEditView

urlpatterns = [
    path("", HomeView.as_view(), name="home_page"),
    path("todos/<int:id>/delete/", TodoDeleteView.as_view(), name="todo_delete_page"),
    path("todos/<int:id>/edit/", TodoEditView.as_view(), name="todo_edit_page"),
]

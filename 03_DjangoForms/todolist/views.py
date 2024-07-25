from .models import Todo
from .forms import TodoForm
from django.views import View
from django.shortcuts import render, redirect, get_object_or_404


# Create your views here.
class HomeView(View):
    def get(self, request):
        form = TodoForm()
        todos = Todo.objects.all().order_by("-created_at")
        context = {"form": form, "todos": todos}
        return render(request, "todolist/home.html", context=context)

    def post(self, request):
        form = TodoForm(request.POST)
        if form.is_valid():
            form.save()
        return redirect("home_page")


class TodoDeleteView(View):
    def get(self, request, id):
        todo = get_object_or_404(Todo, id=id)
        context = {
            "todo": todo,
        }
        return render(request, "todolist/todo_delete.html", context=context)

    def post(self, request, id):
        todo = get_object_or_404(Todo, id=id)

        todo.delete()

        return redirect("home_page")


class TodoEditView(View):
    def get(self, request, id):
        todo = get_object_or_404(Todo, id=id)
        form = TodoForm(instance=todo)

        context = {"form": form, "todo": todo}

        return render(request, "todolist/todo_edit.html", context=context)

    def post(self, request, id):
        todo = get_object_or_404(Todo, id=id)
        form = TodoForm(request.POST, instance=todo)
        if form.is_valid():
            form.save()

        return redirect("home_page")

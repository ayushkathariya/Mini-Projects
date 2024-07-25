from .models import Todo
from django.views import View
from django.shortcuts import render
from django.core.paginator import Paginator


# Create your views here.
class HomeView(View):
    def get(self, request):
        todos = Todo.objects.all()
        paginator = Paginator(todos, 4)
        page_number = request.GET.get("page", 1)
        paginated_todos = paginator.get_page(page_number)
        context = {"todos": paginated_todos}
        return render(request, "myapp/home.html", context=context)

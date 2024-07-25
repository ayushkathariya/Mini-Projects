from .forms import UserForm
from django.shortcuts import render
from django.contrib import messages


# Create your views here.
def home_view(request):
    if request.method == "POST":
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "User created successfully !")
        else:
            messages.error(request, "User already exists !")

    form = UserForm()
    return render(request, "myapp/home.html", context={"form": form})

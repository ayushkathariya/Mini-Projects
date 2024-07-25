from django import forms
from .models import Todo


class TodoForm(forms.ModelForm):
    class Meta:
        model = Todo
        fields = ["title", "deadline"]
        widgets = {
            "title": forms.TextInput(attrs={"class": "title-input"}),
            "deadline": forms.DateTimeInput(
                attrs={"class": "deadline-input", "type": "datetime-local"}
            ),
        }

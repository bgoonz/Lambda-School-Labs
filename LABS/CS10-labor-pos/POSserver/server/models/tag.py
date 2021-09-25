from django.db import models
from django.conf import settings


class Tag(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    job = models.ForeignKey("Job", on_delete=models.CASCADE, blank=True, null=True)
    note = models.ForeignKey("Note", on_delete=models.CASCADE, blank=True, null=True)
    part = models.ForeignKey("Part", on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=128)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.__class__.__name__}: {self.name}"

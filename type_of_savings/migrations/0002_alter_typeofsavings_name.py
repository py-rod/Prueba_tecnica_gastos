# Generated by Django 5.0.7 on 2024-08-04 01:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('type_of_savings', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='typeofsavings',
            name='name',
            field=models.CharField(max_length=200),
        ),
    ]
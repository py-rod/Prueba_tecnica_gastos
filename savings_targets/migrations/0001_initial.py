# Generated by Django 5.0.7 on 2024-08-04 03:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('type_of_savings', '0002_alter_typeofsavings_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SavingsTargets',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.DecimalField(decimal_places=2, max_digits=10)),
                ('description', models.TextField(max_length=400)),
                ('init_date', models.DateField()),
                ('last_date', models.DateField()),
                ('type_saving', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='type_of_savings.typeofsavings')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
from random import SystemRandom

from src.accounts.models import User


def generate_username(first_name, patronymic, last_name):
    if patronymic:
        username = last_name.lower() + first_name[0].lower() + patronymic[0].lower()
    else:
        username = last_name.lower() + first_name[0].lower()
    initial_username = username
    counter = 1

    while User.objects.filter(username=username):
        username = initial_username + str(counter)
        counter += 1
    return username


def generate_password(length, allowed_chars='abcdefghijklmnopqrstuvwxyz@#$%&*'
                                            'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'):
    return ''.join(SystemRandom().choice(allowed_chars) for i in range(length))

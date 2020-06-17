import pandas as pd
from datetime import datetime


def get_data_from_file(file):
    df = pd.read_excel(file, index_col=0)
    df = df[1:]
    timestamps = df.index.values.tolist()
    pressure_before = df.iloc[:, 0]
    pressure_after = df.iloc[:, 1]
    temperature_before = df.iloc[:, 2]
    consumption_before = df.iloc[:, 3]
    return timestamps, pressure_before, pressure_after, temperature_before, consumption_before


def get_datetime_obj_from_string(date_string):
    year = int(date_string.split(' ')[0].split('.')[2])
    month = int(date_string.split(' ')[0].split('.')[1])
    day = int(date_string.split(' ')[0].split('.')[0])
    hour = int(date_string.split(' ')[1].split(':')[0])
    minute = int(date_string.split(' ')[1].split(':')[1])
    datetime_obj = datetime(year, month, day, hour, minute)
    return datetime_obj

import pandas as pd
from pandas import ExcelWriter
from pandas import ExcelFile


def get_data_from_file(file_path):
    df = pd.read_excel(rf'{file_path}', index_col=0)
    df = df[1:]
    columns = df.columns.values.tolist()
    timestamps = df.index.values.tolist()
    pressure_before = df.iloc[:, 0]
    pressure_after = df.iloc[:, 1]
    temperature_before = df.iloc[:, 2]
    consumption_before = df.iloc[:, 3]
    return columns, timestamps, pressure_before, pressure_after, temperature_before, consumption_before


def filter_data(data, start=None, end=None):
    return data[start:end]

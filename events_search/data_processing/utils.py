import pandas as pd
from pandas import ExcelWriter
from pandas import ExcelFile


def get_data_from_file(file):
    df = pd.read_excel(file, index_col=0)
    print(df)
    df = df[1:]
    timestamps = df.index.values.tolist()
    pressure_before = df.iloc[:, 0]
    pressure_after = df.iloc[:, 1]
    temperature_before = df.iloc[:, 2]
    consumption_before = df.iloc[:, 3]
    return timestamps, pressure_before, pressure_after, temperature_before, consumption_before

from pathlib import Path
from openpyxl import load_workbook

BASE_DIR = Path(__file__).resolve().parent

# Find the A-01 Excel file automatically
files = list(BASE_DIR.glob("A-1*.xlsx"))

if not files:
    print("A-01 Census Excel file not found.")
    raise SystemExit

FILE_PATH = files[0]

print("Opening:", FILE_PATH.name)

try:
    workbook = load_workbook(FILE_PATH, read_only=True, data_only=True)

    print("Excel file opened successfully.")
    print("Sheets:", workbook.sheetnames)

    sheet = workbook[workbook.sheetnames[0]]

    rows = sheet.iter_rows(values_only=True)

    # Read header
    header = next(rows)

    print("\nColumns:")
    for column in header:
        print(" -", column)

    print("\nFirst 5 data rows:")

    for i, row in enumerate(rows):
        print(row)

        if i == 4:
            break

    print("\nA-01 Census data test completed successfully.")

except Exception as error:
    print("Could not read Census A-01 file.")
    print("Error:", error)
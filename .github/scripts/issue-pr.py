import csv, json, sys

with open("/tmp/issue.json", "r") as f:
    body = json.load(f)

kind = body["kind"]
description = body["abstract"]
if "," in description:
    description = f'"{description}"'

with open("data/index.json", "r") as f:
    index = json.load(f)
    entry = index[kind]
    if isinstance(entry, dict):
        qt = len(sys.argv) > 1 and sys.argv[1] == "true"
        entry = entry["qt" if qt else "iso"]

needs_newline = False
with open(f"data/{entry}.csv", "r") as f:
    reader = csv.reader(f)
    cols = len(next(reader))
    if f.read()[-1] != "\n":
        needs_newline = True

fourccs = body["fourcc"].split(",")
with open(f"data/{entry}.csv", "a") as f:
    writer = csv.writer(f)
    if needs_newline:
        f.write("\n")
    for fourcc in fourccs:
        fourcc = fourcc.lstrip().replace(" ", "$20")
        writer.writerow([fourcc, description] + [None] * max(cols - 2, 0))

import csv
import json
from html.parser import HTMLParser

csv_file_path = "./data/specifications.csv"
json_file_path = "./data/specifications.json"


# Custom HTML Parser to extract URL and text
class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.url = ""
        self.description = ""

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            for attr in attrs:
                if attr[0] == "href":
                    self.url = attr[1]

    def handle_data(self, data):
        self.description += data


with open(csv_file_path, mode="r", encoding="utf-8") as file:
    csv_reader = csv.DictReader(file)

    json_data = []
    for row in csv_reader:
        parser = MyHTMLParser()
        parser.feed(row["description"])

        # Check if 'ISO' is in the specification
        is_mpeg = "ISO" in row["specification"] and "iso.ch" in parser.url

        json_data.append(
            {
                "specification": row["specification"],
                "url": parser.url,
                "description": parser.description.strip(),
                "MPEG": is_mpeg,
            }
        )

print(f"Number of specs: {len(json_data)}")
json_output = json.dumps(json_data, indent=4)
with open(json_file_path, "w", encoding="utf-8") as json_file:
    json_file.write(json_output)

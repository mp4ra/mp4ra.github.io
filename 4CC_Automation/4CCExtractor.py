"""
This is a helper script to process 4CCs. It provides two main functionalities:
1. Dumps all 4CCs associated with a specified specification from the provided CSV files.
2. Parses a given '.docx' specification document to identify any new 4CCs that are not yet registered in the CSV files.

Inputs:
- Specification name (mandatory): Used to filter 4CCs specific to a given spec in dump mode.
- Path to a .docx file (optional): Parses the document to find unregistered 4CCs.

Outputs:
- In dump mode: Lists all 4CCs specific to the given spec with counts.
- In document mode: Lists potential 4CCs registration candidates.

Usage:
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

Example:
python 4CCExtractor.py CMAF --docx FDIS_cl_MPEG144.docx
"""

import argparse
import os
import re
import csv
from docx import Document

data_folder = "../data"
csv_files = [
    "boxes-udta.csv",
    "boxes.csv",
    "brands.csv",
    "checksum-types.csv",
    "color-types.csv",
    "data-references.csv",
    "entity-groups.csv",
    "handlers.csv",
    "item-properties.csv",
    "item-references.csv",
    "item-types.csv",
    "multiview-attributes.csv",
    "oti.csv",
    "sample-entries-boxes.csv",
    "sample-entries.csv",
    "sample-groups.csv",
    "schemes.csv",
    "specifications.json",
    "stream-types.csv",
    "textualcontent.csv",
    "track-groups.csv",
    "track-references.csv",
    "track-selection.csv",
    "unlisted.csv",
    "knownduplicates.csv",
]


def extract_4ccs_from_docx(docx_path):
    """
    Extracts potential 4CCs from a given .docx file.

    Args:
        docx_path (str): Path to the .docx file to parse.

    Returns:
        Set of 4CC strings found in the document.
    """
    doc = Document(docx_path)
    text = " ".join([p.text for p in doc.paragraphs])
    pattern = r"['`\\\"\\(\\)]([a-zA-Z0-9]{4})['`\\\"\\(\\)]"
    return set(re.findall(pattern, text))


def extract_4ccs_from_csv(file_path, spec_name=None):
    """
    Extracts 4CCs from a CSV file. Optionally filters by specification name.

    Args:
        file_path (str): Path to the CSV file.
        spec_name (str, optional): Specification name to filter 4CCs.

    Returns:
        Set of 4CC strings matching the criteria.
    """
    with open(file_path, mode="r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        if "specification" not in reader.fieldnames or "code" not in reader.fieldnames:
            return set()
        if spec_name:
            return {
                row["code"]
                for row in reader
                if row.get("specification", "").strip() == spec_name
            }
        return {row["code"] for row in reader}


def process_specification(spec_name, docx_path=None):
    """
    Processes the specified MP4RA data by:
    - Dumping 4CCs specific to the given spec from the CSV files.
    - Comparing 4CCs extracted from a .docx file against all registered 4CCs.

    Args:
        spec_name (str): Name of the specification.
        docx_path (str, optional): Path to a .docx file to parse for new 4CCs.
    """
    all_registered_4ccs = set()
    spec_registered_4ccs = set()

    for csv_file in csv_files:
        file_path = os.path.join(data_folder, csv_file)
        if os.path.exists(file_path):
            all_registered_4ccs.update(extract_4ccs_from_csv(file_path))
            spec_registered_4ccs.update(extract_4ccs_from_csv(file_path, spec_name))

    unlisted_path = os.path.join(data_folder, "unlisted.csv")
    duplicates_path = os.path.join(data_folder, "knownduplicates.csv")

    unlisted_4ccs = (
        extract_4ccs_from_csv(unlisted_path) if os.path.exists(unlisted_path) else set()
    )
    duplicates_4ccs = (
        extract_4ccs_from_csv(duplicates_path)
        if os.path.exists(duplicates_path)
        else set()
    )

    excluded_4ccs = unlisted_4ccs.union(duplicates_4ccs)

    if docx_path:
        docx_4ccs = extract_4ccs_from_docx(docx_path)
        new_4ccs = docx_4ccs - all_registered_4ccs - excluded_4ccs
        print(
            f"Potential registration candidates found in {os.path.basename(docx_path)}:"
        )
        for code in sorted(new_4ccs):
            print(code)
        print(f"Total new 4CCs: {len(new_4ccs)}")
    else:
        print(f"Dumping {spec_name} 4CCs:")
        total_count = 0
        for csv_file in csv_files:
            file_path = os.path.join(data_folder, csv_file)
            if os.path.exists(file_path):
                entries = extract_4ccs_from_csv(file_path, spec_name)
                if entries:
                    print(f"{csv_file} ({len(entries)} entries):")
                    for entry in entries:
                        print(f"  {entry}")
                    total_count += len(entries)
        print(f"Total {spec_name} 4CCs: {total_count}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="MP4RA Helper Script")
    parser.add_argument("spec_name", help="Name of the specification")
    parser.add_argument(
        "--docx", help="Path to the .docx file of the specification", required=False
    )

    args = parser.parse_args()
    process_specification(args.spec_name, args.docx)

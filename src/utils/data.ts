import fs from "fs";
import { parse } from "csv/sync";
import cleanRecords from "./misc";

type Specification = {
    specification: string;
    url: string;
    description: string;
    MPEG: boolean;
};

function getSpecifications(): Specification[] {
    const data = fs.readFileSync("../data/specifications.json", "utf8");
    return JSON.parse(data);
}

export default async function getData(filename: string): Promise<object[]> {
    try {
        let records;
        const specifications = getSpecifications();
        if (filename === "specifications") {
            // Transform each entry in the array
            records = specifications.map((record) => ({
                specification: `<a href="${record.url}">${record.specification}</a>`,
                description: record.description
            }));
        } else {
            const data = fs.readFileSync(`../data/${filename}.csv`, "utf8");
            records = parse(data, {
                columns: true,
                skip_empty_lines: true
            });
            // Transform each entry in the array
            records = records.map((record: any) => {
                const spec = specifications.find(
                    (s: any) => s.specification === record.specification
                );
                return {
                    isMPEG: spec?.MPEG ?? false,
                    ...record
                };
            });
        }
        return cleanRecords(records) as object[];
    } catch (err) {
        console.error(err);
        throw new Error(`Error loading data ${filename}`);
    }
}

import fs from "fs";
import { parse } from "csv/sync";
import cleanRecords from "./misc";

export default async function getData(filename: string): Promise<object[]> {
    try {
        let records;
        if (filename === "specifications") {
            const data = fs.readFileSync(`../data/${filename}.json`, "utf8");
            const jsonRecords = JSON.parse(data);

            // Transform each entry in the array
            records = jsonRecords.map((record) => ({
                specification: `<a href="${record.url}">${record.specification}</a>`,
                description: record.description
            }));
        } else {
            const data = fs.readFileSync(`../data/${filename}.csv`, "utf8");
            records = parse(data, {
                columns: true,
                skip_empty_lines: true
            });
        }
        return cleanRecords(records) as object[];
    } catch (err) {
        console.error(err);
        throw new Error(`Error loading data ${filename}`);
    }
}

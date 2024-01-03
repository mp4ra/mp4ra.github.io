import fs from "fs";
import { parse } from "csv/sync";
import cleanRecords from "./misc";

export default async function getData(csv: string): Promise<object[]> {
    try {
        const data = fs.readFileSync(`../data/${csv}.csv`, "utf8");
        const records = parse(data, {
            columns: true,
            skip_empty_lines: true
        });
        return cleanRecords(records) as object[];
    } catch (err) {
        console.error(err);
        throw new Error(`Error loading data ${csv}`);
    }
}

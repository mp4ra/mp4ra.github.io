import fs from "fs";
import path from "path";
import { glob } from "glob";
import { parse } from "csv/sync";
import cleanRecords from "@/utils/misc";
import { Record } from "./types";
import getRegisteredTypes from "../registered-types";

export default async function getData(): Promise<Record[]> {
    const csvMapping = await getRegisteredTypes();
    const findCategory = (csv: string) => {
        const category = Object.entries(csvMapping).find(([, { csvs }]) => csvs.includes(csv));
        return category ? category[0] : "/";
    };

    const ignore = ["unlisted", "knownduplicates"];
    const all: Record[] = [];
    const CSVs = await glob(path.join(process.cwd(), "../data/*.csv"));

    CSVs.forEach((file) => {
        if (ignore.some((i) => file.includes(i))) return;
        const data = fs.readFileSync(file, "utf8");
        const records = parse(data, {
            columns: true,
            skip_empty_lines: true
        });

        all.push(
            ...records.map((record: Record) => ({
                code: record.code,
                description: record.description,
                specification: record.specification,
                category: findCategory(path.basename(file, ".csv"))
            }))
        );
    });

    return cleanRecords(all, true) as Record[];
}

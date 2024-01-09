import fs from "fs";
import path from "path";
import { glob } from "glob";
import { parse } from "csv/sync";
import getRegisteredTypes from "@/app/(rest)/registered-types";
import cleanRecords from "./misc";

type Specification = {
    specification: string;
    url: string;
    description: string;
    MPEGFFC: boolean;
};

type ReturnType = Record<string, unknown>[];

function getSpecifications(): Specification[] {
    const data = fs.readFileSync("../data/specifications.json", "utf8");
    return JSON.parse(data);
}

export default async function getData(filename: string): Promise<ReturnType> {
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
                    isMPEGFFC: spec?.MPEGFFC ?? false,
                    ...record
                };
            });
        }
        return cleanRecords(records);
    } catch (err) {
        console.error(err);
        throw new Error(`Error loading data ${filename}`);
    }
}

export async function getAllData(): Promise<ReturnType> {
    const csvMapping = await getRegisteredTypes();
    const findCategory = (csv: string) => {
        const category = Object.entries(csvMapping).find(([, { csvs }]) => csvs.includes(csv));
        return category ? category[0] : "/";
    };

    const ignore = ["unlisted", "knownduplicates"];
    const all: ReturnType = [];
    const CSVs = await glob(path.join(process.cwd(), "../data/*.csv"));

    await Promise.all(
        CSVs.map(async (file) => {
            if (ignore.some((i) => file.includes(i))) return;
            const records = await getData(path.basename(file, ".csv"));
            all.push(
                ...records.map((record: Record<string, unknown>) => ({
                    isMPEGFFC: record.isMPEGFFC,
                    code: record.code,
                    description: record.description,
                    specification: record.specification,
                    category: findCategory(path.basename(file, ".csv"))
                }))
            );
        })
    );

    return cleanRecords(all, true);
}

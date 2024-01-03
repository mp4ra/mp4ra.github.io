import fs from "fs";
import path from "path";
import { glob } from "glob";
import { parse } from "csv/sync";
import { NextResponse } from "next/server";
import cleanRecords from "@/utils/misc";

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
    const ignore = ["specifications", "unlisted", "knownduplicates", "-qt", "textualcontent"];
    const boxes: object[] = [];
    const CSVs = await glob(path.join(process.cwd(), "../data/*.csv"));

    CSVs.forEach((file) => {
        if (ignore.some((i) => file.includes(i))) return;
        const data = fs.readFileSync(file, "utf8");
        const records = parse(data, {
            columns: true,
            skip_empty_lines: true
        });
        boxes.push(...records);
    });

    return NextResponse.json(cleanRecords(boxes, true));
}

import fs from "fs";
import path from "path";
import { glob } from "glob";
import { capitalize } from "@/utils/misc";

type RegisteredTypes = {
    [link: string]: {
        title: string;
        priority: number;
        csvs: string[];
    };
};

export default async function getRegisteredTypes(): Promise<RegisteredTypes> {
    const types: RegisteredTypes = {};

    // Get all static paths
    const paths = await glob(path.join(process.cwd(), "app/(rest)/registered-types", "**/*.mdx"));

    // Get all types
    paths.forEach((p) => {
        const type = p.split("/").slice(-2)[0];
        const link = `/registered-types/${type}`;
        if (!types[link]) {
            types[link] = {
                title: capitalize(type),
                priority: 1,
                csvs: []
            };
        }

        // Read the file for CSVs
        const file = fs.readFileSync(p, "utf-8");
        const matches = file.matchAll(/<DataDisplay csv="(.+)" \/>/g);
        types[link].csvs = Array.from(matches).map((m) => m[1]);
    });

    // Extend with [type] dyanmic routes
    await import("./[type]/page").then((m) =>
        m.MISC_TYPES.forEach(({ title, type }) => {
            const link = `/registered-types/${type}`;
            if (!types[link]) {
                types[link] = {
                    title,
                    priority: 0,
                    csvs: [type]
                };
            }
        })
    );

    return types;
}

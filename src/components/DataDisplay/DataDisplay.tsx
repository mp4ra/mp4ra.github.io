import React from "react";
import getData from "@/utils/data";
import Table from "./Table";

export default async function DataDisplay({ csv }: { csv: string }) {
    const data = await getData(csv);
    return <Table data={data} />;
}

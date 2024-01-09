"use client";

import React from "react";
import { useSessionStorageValue } from "@react-hookz/web";
import Table from "@/components/DataDisplay/Table";

export default function Search({ data }: { data: object[] }) {
    const { value, set: setQuery } = useSessionStorageValue("search", {
        defaultValue: "",
        initializeWithValue: false
    });
    const query = value ?? "";

    return (
        <div className="flex flex-col gap-6">
            <input
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                className="w-full rounded border px-3 py-2 shadow-inner"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                spellCheck="false"
                type="search"
                value={query}
            />
            <Table data={data} globalFilter={query} />
        </div>
    );
}

"use client";

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import clsx from "clsx";
import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import type { ColumnFiltersState, Header } from "@tanstack/react-table";
import { capitalize } from "@/utils/misc";

function TableHeader({ header }: { header: Header<any, unknown> }) {
    if (header.isPlaceholder) return null;
    return (
        <th key={header.id}>
            <div
                className={clsx(
                    "flex items-center justify-center gap-1",
                    header.column.getCanSort() && "cursor-pointer select-none"
                )}
                onClick={header.column.getToggleSortingHandler()}
                onKeyDown={(e) => {
                    const handler = header.column.getToggleSortingHandler();
                    if (!handler) return;
                    if (e.key === "Enter") handler(e);
                }}
                role="rowheader"
                tabIndex={0}
            >
                {flexRender(header.column.columnDef.header, header.getContext())}
                {{
                    asc: <AiOutlineSortAscending />,
                    desc: <AiOutlineSortDescending />
                }[header.column.getIsSorted() as string] ?? null}
            </div>
            {header.column.getCanFilter() && (
                <input
                    className="w-full rounded border px-2 shadow-inner"
                    list={`${header.column.id}list`}
                    onChange={(e) => header.column.setFilterValue(e.target.value)}
                    placeholder="Search..."
                    type="text"
                    value={(header.column.getFilterValue() ?? "") as string}
                />
            )}
        </th>
    );
}

export default function Table({ data, globalFilter }: { data: object[]; globalFilter?: string }) {
    // Generate columns
    const columnHelper = createColumnHelper<any>();
    const pathname = usePathname();
    const columns = useMemo(() => {
        // Get unique headers
        const keys = new Set<string>();
        data.forEach((row) => Object.keys(row).forEach((key) => keys.add(key)));

        // Generate columns
        return Array.from(keys).map((header) => {
            if (header === "code") {
                return columnHelper.accessor(header, {
                    // eslint-disable-next-line react/no-danger, react/no-unstable-nested-components
                    cell: (info) =>
                        info.getValue() && (
                            <a
                                href={`${process.env.FFC_URL}?query=="${(
                                    info.getValue() as string
                                ).replace("$20", " ")}"`}
                                target="_blank"
                            >
                                <code>{info.getValue()}</code>
                            </a>
                        )
                });
            }
            if (header === "category") {
                return columnHelper.accessor(header, {
                    // eslint-disable-next-line react/no-unstable-nested-components
                    cell: (info) => (
                        <Link href={info.getValue()}>
                            {capitalize(info.getValue().split("/").pop())}
                        </Link>
                    )
                });
            }
            if (header === "specification" && pathname !== "/references") {
                return columnHelper.accessor(header, {
                    // eslint-disable-next-line react/no-danger, react/no-unstable-nested-components
                    cell: (info) => {
                        if (!info.getValue()) return null;
                        return info.getValue().match(/\(.+\)/) ? (
                            <i>{info.getValue()}</i>
                        ) : (
                            <Link href={`/references#${info.getValue()}`}>{info.getValue()}</Link>
                        );
                    }
                });
            }
            return columnHelper.accessor(header, {
                // eslint-disable-next-line react/no-danger, react/no-unstable-nested-components
                cell: (info) => <div dangerouslySetInnerHTML={{ __html: info.getValue() }} />
            });
        });
    }, [columnHelper, data, pathname]);

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            globalFilter
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getRowId: (row, index) => (pathname === "/references" && row.specification) || index
    });

    if (globalFilter !== undefined && globalFilter.length < 2) return null;

    return (
        <div className="flex items-center overflow-y-auto">
            <table className="flex-[1]">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHeader key={header.id} header={header} />
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} id={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

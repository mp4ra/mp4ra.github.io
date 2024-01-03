import { redirect } from "next/navigation";
import { DataDisplay } from "@/components";

// type is the name of the csv file in the data folder (without the .csv extension)
export const MISC_TYPES = [
    {
        title: "Data References",
        type: "data-references"
    },
    {
        title: "Item References",
        type: "item-references"
    },
    {
        title: "Item Properties",
        type: "item-properties"
    },
    {
        title: "Multiview Attributes",
        type: "multiview-attributes"
    },
    {
        title: "Protection and Restricted Schemes",
        type: "schemes"
    },
    {
        title: "Sample Groups",
        type: "sample-groups"
    },
    {
        title: "Track Selection Types",
        type: "track-selection"
    },
    {
        title: "Track Group Types",
        type: "track-groups"
    },
    {
        title: "Entity Group Types",
        type: "entity-groups"
    },
    {
        title: "Color Types",
        type: "color-types"
    }
];

export async function generateStaticParams() {
    return MISC_TYPES.map((param) => ({ type: param.type }));
}

export async function generateMetadata({ params }: { params: { type: string } }) {
    const title = MISC_TYPES.find((param) => param.type === params.type)?.title;
    return { title };
}

export default async function page({ params }: { params: { type: string } }) {
    const match = MISC_TYPES.find((param) => param.type === params.type);
    if (!match) return redirect("/");
    const { title, type } = match;

    return (
        <>
            <h1>{title}</h1>
            <DataDisplay csv={type} />
        </>
    );
}

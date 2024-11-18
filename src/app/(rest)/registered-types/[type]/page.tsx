import { redirect } from "next/navigation";
import { DataDisplay } from "@/components";
import MISC_TYPES from "./misc";

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

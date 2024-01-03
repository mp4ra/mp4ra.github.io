import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col gap-12 pt-8">
            <div className="flex w-full flex-col items-center px-6">
                <span className="text-7xl font-semibold tracking-tight">MP4RA</span>
                <span className="text-center text-lg font-light">
                    Official Registration Authority for the ISOBMFF family of standards
                </span>
            </div>
            <div className="markdown-body">{children}</div>
        </section>
    );
}

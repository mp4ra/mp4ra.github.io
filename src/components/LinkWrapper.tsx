import Link from "next/link";
import React from "react";

export default function LinkWrapper({
    children,
    to,
    className
}: {
    children: React.ReactNode;
    to: string | undefined;
    className?: string;
}) {
    if (!to) return children;
    if (to.includes("//"))
        return (
            <a
                aria-label={`Link to ${children}`}
                className={className}
                href={to}
                rel="noopener noreferrer"
                target="_blank"
            >
                {children}
            </a>
        );
    return (
        <Link aria-label={`Link to ${children}`} className={className} href={to}>
            {children}
        </Link>
    );
}

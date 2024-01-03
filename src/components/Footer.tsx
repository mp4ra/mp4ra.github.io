import React from "react";

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center border-t-1 bg-primary py-8">
            <span className="text-lg">MP4 Registiration Authority</span>
            <span className="text-sm">
                Last updated on: <b>{process.env.BUILD_TIMESTAMP}</b>
            </span>
        </footer>
    );
}

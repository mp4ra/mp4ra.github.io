import clsx from "clsx";
import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { Footer, Nav } from "@/components";
import "./markdown.scss";
import "highlight.js/styles/github.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={clsx("flex min-h-screen flex-col", inter.className)}>
                <Nav />
                <main className="container mx-auto flex max-w-6xl grow flex-col px-8 py-12 md:px-20 xl:px-0">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}

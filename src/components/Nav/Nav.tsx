"use client";

import { Fade as Hamburger } from "hamburger-react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { useMediaQuery } from "@react-hookz/web";
import { usePathname } from "next/navigation";
import type { Meta, NavItem } from ".";
import LinkWrapper from "../LinkWrapper";

const MetaContext = createContext<Meta>({} as Meta);

function Social({ className }: { className?: string }) {
    const meta = useContext(MetaContext);
    return (
        <div className={`flex flex-row gap-4 text-xl text-neutral-500 ${className}`}>
            <a
                aria-label="Check us out on GitHub"
                className="inline-flex items-center transition-all duration-500 hover:brightness-125"
                href={meta.social.github}
                rel="noopener noreferrer"
                target="_blank"
            >
                <FaGithub className="text-2xl" />
            </a>
        </div>
    );
}

function MenuItem({
    children,
    link,
    dropdown
}: {
    children: React.ReactNode;
    link: string;
    dropdown?: {
        [key: string]: {
            link: string;
        };
    };
}) {
    const [open, setopen] = useState(false);

    if (!dropdown)
        return (
            <LinkWrapper
                className="inline-flex w-full max-w-xs cursor-pointer items-center gap-2 border-b-1 border-neutral-200 py-3 text-sm leading-6 transition-all duration-200 md:rounded-lg md:border-none md:px-3 md:py-2 md:hover:bg-neutral-200 md:hover:text-sky-600"
                to={link}
            >
                {children}
                {link.includes("//") && <FaExternalLinkAlt className="fill-neutral-400" size={9} />}
            </LinkWrapper>
        );
    return (
        <div
            className="w-full max-w-xs cursor-pointer border-b-1 border-neutral-200 py-3 text-sm leading-6"
            onClick={() => setopen((s) => !s)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    setopen((s) => !s);
                }
            }}
            role="menuitem"
            tabIndex={0}
        >
            <div className="flex flex-row items-center justify-between pr-2">
                <span className={open ? "text-sky-600" : ""}>{children}</span>
                <div className={`transition-transform ${open ? "rotate-45" : "rotate-0"}`}>
                    <AiOutlinePlus />
                </div>
            </div>
            {open && (
                <div className="flex flex-col">
                    {Object.keys(dropdown).map((item) => (
                        <LinkWrapper
                            key={item}
                            className="inline-flex items-center gap-2 pl-3 text-sm leading-8 first:mt-2"
                            to={dropdown[item].link}
                        >
                            {item}
                            {dropdown[item].link.includes("//") && (
                                <FaExternalLinkAlt className="fill-neutral-400" size={9} />
                            )}
                        </LinkWrapper>
                    ))}
                </div>
            )}
        </div>
    );
}

function Dropdown({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={`invisible absolute right-0 top-12 z-30 float-left grid min-w-max translate-x-1/3 grid-cols-2 rounded-xl border-1 border-neutral-700 bg-white p-3 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:top-14 ${className}`}
        >
            {children}
        </div>
    );
}

function MenuItemSmall({
    children,
    link,
    dropdown
}: {
    children: React.ReactNode;
    link: string;
    dropdown?: NavItem["items"];
}) {
    if (!dropdown)
        return (
            <LinkWrapper
                aria-label={`Link to ${children}`}
                className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium transition-all duration-200 hover:text-sky-600"
                to={link}
            >
                {children}
            </LinkWrapper>
        );
    return (
        <div className="group relative inline-flex text-sm font-medium">
            <div className="inline-flex cursor-pointer items-center gap-1 transition-all duration-200 group-hover:brightness-50">
                {children}
                <FiChevronDown />
            </div>
            <Dropdown>
                {Object.keys(dropdown)
                    .sort((a, b) => {
                        // Highest priority first
                        // Then alphabetical
                        const aPriority = dropdown[a].priority || 0;
                        const bPriority = dropdown[b].priority || 0;
                        if (aPriority === bPriority) return a.localeCompare(b);
                        return bPriority - aPriority;
                    })
                    .map((item) => (
                        <MenuItem key={item} link={dropdown[item].link}>
                            {item}
                        </MenuItem>
                    ))}
            </Dropdown>
        </div>
    );
}

export default function Nav(props: { meta: Meta }) {
    const { meta } = props;

    const pathname = usePathname();
    const [open, setopen] = useState(false);
    const mobile = useMediaQuery("(max-width: 640px)", {
        initializeWithValue: false
    });

    useEffect(() => {
        setopen(false);
        return () => {};
    }, [pathname]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.overflow = open ? "hidden" : "auto";
        return () => {};
    }, [open]);

    useEffect(() => {
        if (!mobile) setopen(false);
        return () => {};
    }, [mobile]);

    return (
        <MetaContext.Provider value={meta}>
            <header className="w-full bg-white text-neutral-800">
                <nav className="flex w-full max-w-[88rem] flex-row items-stretch justify-between border-b-1 border-neutral-200 xs:px-4 md:px-8 xl:mx-auto xl:border-0">
                    <LinkWrapper to="/">
                        <span className="my-4 flex flex-row flex-wrap items-center text-lg font-medium leading-normal transition-all duration-200 hover:brightness-150 max-md:ml-3 xl:my-6">
                            <span className="mr-1 whitespace-nowrap font-bold max-xs:text-sm">
                                MP4
                            </span>
                            <span className="whitespace-nowrap font-light max-xs:text-sm">
                                Registration Authority
                            </span>
                        </span>
                    </LinkWrapper>
                    <div className="hidden flex-row items-stretch gap-6 md:flex">
                        {Object.keys(meta.menu).map((item) => (
                            <MenuItemSmall
                                key={item}
                                dropdown={meta.menu[item]?.items}
                                link={meta.menu[item]?.link || "#"}
                            >
                                {item}
                            </MenuItemSmall>
                        ))}
                        <Social className="items-stretch" />
                    </div>
                    <div className="inline-flex items-center md:hidden">
                        <Hamburger
                            label={open ? "Close Menu" : "Open Menu"}
                            onToggle={(toggled) => setopen(toggled)}
                            rounded
                            size={18}
                            toggled={open}
                        />
                    </div>
                </nav>
                <div
                    className={`fixed left-0 z-30 flex h-screen w-screen flex-col items-center bg-white px-12 pt-4 transition-all ${
                        open ? "" : "invisible opacity-0"
                    }`}
                >
                    {Object.keys(meta.menu).map((item) => (
                        <MenuItem
                            key={item}
                            dropdown={meta.menu[item]?.items}
                            link={meta.menu[item]?.link || "#"}
                        >
                            {item}
                        </MenuItem>
                    ))}
                    <Social className="mt-6" />
                </div>
            </header>
        </MetaContext.Provider>
    );
}

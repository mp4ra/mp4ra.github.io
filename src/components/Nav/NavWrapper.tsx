import React from "react";
import getRegisteredTypes from "../../app/(rest)/registered-types";
import Nav from "./Nav";
import type { Meta } from ".";

const meta: Meta = {
    social: {
        github: "https://github.com/mp4ra/mp4ra.github.io"
    },
    menu: {
        References: {
            link: "/references"
        },
        "Registered Types": {
            link: "/registered-types"
        },
        "Request Registiration": {
            link: "/request"
        },
        Search: {
            link: "/search"
        }
    }
};

export default async function NavWrapper() {
    // Get all registered types
    const types = await getRegisteredTypes();
    const expandedMeta = meta;

    // Add registered types to menu
    expandedMeta.menu["Registered Types"].items = Object.entries(types).reduce(
        (acc: any, [link, { title, priority }]) => {
            acc[title] = { link, priority };
            return acc;
        },
        {}
    );

    return <Nav meta={expandedMeta} />;
}

import NavWrapper from "./NavWrapper";

export type NavItem = {
    link: string;
    items?: {
        [key: string]: {
            link: string;
            priority?: number;
        };
    };
};

export type Meta = {
    social: {
        [key: string]: string;
    };
    menu: {
        "Registered Types": NavItem;
        [key: string]: NavItem;
    };
};

export default NavWrapper;

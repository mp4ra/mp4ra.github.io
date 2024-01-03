import Search from "./search";
import getData from ".";

export const metadata = {
    title: "Search",
    description: "Search for a 4cc, a specification, any information registered."
};

export default async function Page() {
    return (
        <>
            <h1>Search</h1>
            <p>
                Trying to find a 4cc, a specification, any information registered, just type in
                below the keyword you are looking for.
            </p>
            <Search data={await getData()} />
        </>
    );
}

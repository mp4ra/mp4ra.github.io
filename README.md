# MP4RA

## MPEG-4 Registration Authority Web Site

This site contains the master copy of the official MP4RA.
Registration requests are formally sent to the email address documented on the site. These can be supported by a Pull Request here, which can reduce the possibility of error or confusion on the part of the maintainers.
The simplest way to submit a pull request is probably as follows:

- Fork the repository into your own area at GitHub
- Go to that fork, and edit the GitHub.io link from mp4ra.github.io/mp4ra to change the first mp4ra to your area name
- In your fork, make changes to the appropriate CSV files; start first by making sure that you have your specifications in specifications.csv, and then add/fix the code points in other tables (e.g. sample-entries for codec sample entry types). In those other tables, the visible specification name is used for cross-reference; the linkname you enter in specifications.csv will be retrieved and used to make HTML fragment URLs to refer to that entry.
- Preview that in your fork
- When it is right, submit a Pull Request, supported by a formal email, to the MP4RA.

## Branches

- `main` branch (configured as default branch)
  - All the commits to modify the registry or the website must be pushed the main branch.
  - Every pull request and commit in this branch triggers the compilation of the website using [GitHub Actions](https://github.com/mp4ra/mp4ra.github.io/actions).

## Development

This part is only relevant for developers of the web site showing the registration authority.
Owners of specifications wanting to submit a pull request to register some code points do not
need to be concerned about this section.

### Install dependencies

The dependencies of the project are tracked in `src/package.json`. To install them,
run the following command in `src` directory.

```shell
npm install
```

### Building

The website is built with [Next.js](https://nextjs.org/) framework. To build the website, run the following command in `src` directory.

```shell
npm run build
```

### Application design

The website is built with [Next.js](https://nextjs.org/) framework. The framework allows to create a mostly static website. The pages are generated at build time and served statically. All of the pages are created in [MDX](https://mdxjs.com) which is a combination of Markdown and JSX. The pages are located in `src/app` of the project.

### Adding content

#### A page

It is strongly advised that you skim through the [Next.js documentation](https://nextjs.org/docs/app/building-your-application/routing) before adding content.

There are two ways to add a page to the website:

- Create a new MDX file in `src/app` directory. The file directory will be used as the URL of the page. For example, `src/app/my-page/page.mdx` will be available at `https://mp4ra.org/my-page`.
  > **Note:** The file name must be `page.mdx` for the page to be generated.
- Add the appropriate entry in `src/app/(rest)/registered-types/[type]/page.tsx`. This is a dynamic route that generates a page for every entry in `MISC_TYPES`. This is useful if you do not want to add additional content to the page except for the title and table.

## 4CC_Automation/

See the 4CC_Automation/readme.md file for more details about this addition.

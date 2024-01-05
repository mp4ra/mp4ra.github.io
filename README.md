# MPEG-4 Registration Authority (MP4RA)

This repository contains the master copy of the official MP4 Registration Authority (MP4RA) and serves as the primary platform for the submission and management of registration requests to the MP4RA.

## Submission of Registration Requests

In order to apply for an identifier to be registered, you must abide by the following terms established by ISO. (Note that RID stands for "registered identifier", a code-point in this case).

The party requesting a format identifier shall:

1.  apply using the Form and procedures supplied by the Registration Authority;
2.  include a description of the purpose of the registered identifier, and the required technical details as specified in the application form;
3.  provide contact information describing how a complete description can be obtained on a non-discriminatory basis;
4.  agree to institute the intended use of the granted RID within a reasonable time frame; and
5.  to maintain a permanent record of the application form and the notification received from the Registration Authority of a granted RID.

If your suggested code-point is already in use, or the authority considers that the suggested value is unsuitable or may be misleading, the authority may suggest an alternative value.

There are two distinct methods for submitting a registration request. Regardless of the submission method, an issue along with an associated pull request will be opened in this repository to track and manage the registration request process.

### Issue Template Submission

1. **Initiate Request**: Registration requests can be initiated by using the specifically designed [issue templates](https://github.com/mp4ra/mp4ra.github.io/issues/new/choose) available in this repository.
2. **Mandatory and Optional Information**: The issue template includes a series of mandatory fields that must be filled out to process the request. Additionally, optional fields are provided for supplementary information.
3. **Handling Sensitive Information**: Given the public nature of GitHub, any sensitive information, particularly contact details, should not be disclosed directly in the issue if the requester opts for privacy. In such cases, leave these fields blank and send us an email to `mp4reg [at] group.apple.com` or `qtfourcc [at] group.apple.com` with that information including the link to the issue you created.

### Email Submission

As an alternative to the issue template, requests can be formally sent via email to `mp4reg [at] group.apple.com` (or `qtfourcc [at] group.apple.com` for QuickTime Registration) using the following:

<details>
<summary>Email submission form</summary>

1. The name, address, and URL of the organization requesting the code-point.
1. The kind of code-point you wish to register (please choose from the set of registered types).
1. For all except object-type registrations, the suggested identifier (four-character code). Note that four-character codes use four 8-bit printable characters, usually from the first 128 Unicode characters (commonly thought of as plain ASCII), but at most from the first 256 Unicode characters.
1. The specification in which this code-point is defined, if possible. A copy of the specification would be appreciated, as it enables the authority to understand the registration better. If you are requesting a 'codec' code-point, a reference to the definition of the coding system itself, if separate from the definition of its storage in these files, would also be appreciated.
1. A brief 'abstract' of the meaning of the code-point, perhaps ten to twenty words (see examples on this site)
1. Contact information for an authorized representative for the code-point, including:
   - Contact person's name, title, and orgaanization.
   - Contact email.
   - Contact telephone number, and fax number if available.
   - Contact physical address (street address), if applicable.
1. Date of definition or implementation (if known) or intended date (if in future).
1. Statement of an intention to apply (implement) the assigned code-point.

</details>

Please make sure to include `mp4reg` or `qtreg` in the subject of your email.

### Communication and Collaboration

1. **Direct Communication**: The requestor is encouraged to communicate any desired changes or additional information directly on the issue or the associated pull request. This ensures a transparent and collaborative environment for request management.
2. **Repository Forking Unnecessary**: It is not required for the requestor to fork this repository for the purpose of submitting or discussing registration requests.

## Development

This part is only relevant for developers of the web site showing the registration authority.
Owners of specifications wanting to submit a pull request to register some code points do not
need to be concerned about this section.

### Branches

- `main` branch (configured as default branch)
  - All the commits to modify the registry or the website must be pushed the main branch.
  - Every pull request and commit in this branch triggers the compilation of the website using [GitHub Actions](https://github.com/mp4ra/mp4ra.github.io/actions).

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

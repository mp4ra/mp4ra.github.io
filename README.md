# mp4ra

## MPEG-4 Registration Authority Web Site

This site contains the master copy of the official MP4RA.
Registration requests are formally sent to the email address documented on the site. These can be supported by a Pull Request here, which can reduce the possibility of error or confusion on the part of the maintainers.
The simplest way to submit a pull request is probably as follows:
* Fork the repository into your own area at GitHub
* Go to that fork, and edit the GitHub.io link from mp4ra.github.io/mp4ra to change the first mp4ra to your area name
* In your fork, make changes to the appropriate CSV files; start first by making sure that you have your specifications in specifications.csv, and then add/fix the code points in other tables (e.g. sample-entries for codec sample entry types). In those other tables, the visible specification name is used for cross-reference; the linkname you enter in  specifications.csv will be retrieved and used to make HTML fragment URLs to refer to that entry.
* Preview that in your fork
* When it is right, submit a Pull Request, supported by a formal email, to the Mp4RA.

## Branches

- ``dev`` branch (configured as default branch)
  - All the commits to modify the registry or the website must be pushed the dev branch.
  - Every commit in this branch triggers the compilation of the website on Travis CI ([build log](https://travis-ci.org/github/mp4ra/mp4ra.github.io)).
- ``master`` branch
  - The compiled website is pushed by the Travis CI bot to this branch
  - The Github Pages feature picks up the changes made to the master branch and republishes the website few seconds after a new commit in this branch

## Development

This part is only relevant for developers of the web site showing the registration authority.
Owners of specifications wanting to submit a pull request to register some code points do not
need to be concerned about this section.

### Install dependencies

The dependencies of the project are tracked in `package.json`. To install them,
run the following command.

```
npm install
```

### Building

[Browserify](https://router.vuejs.org/) bundles the complete frontend
JavaScript, including dependencies, into one target file. The following
command performs this operation.

```
browserify -t brfs src/app.js -o dist/js/bundle.js
```

### Application design

The application logic is built using [Vuejs](https://vuejs.org/) framework.
The data element of the application contains two main properties: `db` and `urls`.
The URLs of the CSV files are contained in the `urls` property while the data
from these CSV are loaded in the `db` property.

The navigation on the website follows the [single-page application](https://en.wikipedia.org/wiki/Single-page_application) approach. That is, the web browser loads
the entire HTML and the [router-vue](https://router.vuejs.org/) component
updates the DOM when the user nagivates via the menu.

### Adding content

#### A page

The pages are located in `src/pages` of the project. Each of the page has
a JavaScript file and a Vue template, e.g. `my_page.js` and `my_page.vue`.

The JavaScript file contains the Vuejs component defining the page. Similarly,
the Vue template contains the HTML data associated to this page.

The main application defined in `src/app.js` loads the pages via their
respective JavaScript files and then injects them in the Vue router as
Vue components with an associated `path`, i.e. the relative URL of the given
page.

## 4CC_Automation/

See the 4CC_Automation/readme.md file for more details about this addition.

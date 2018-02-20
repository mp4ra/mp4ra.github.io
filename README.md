# mp4ra
MPEG-4 Registration Authority Web Site

This site contains the master copy of the official MP4RA.
Registration requests are formally sent to the email address documented on the site. These can be supported by a Pull Request here, which can reduce the possibility of error or confusion on the part of the maintainers.
The simplest way to submit a pull request is probably as follows:
* Fork the repository into your own area at GitHub
* Go to that fork, and edit the GitHub.io link from mp4ra.github.io/mp4ra to change the first mp4ra to your area name
* In your fork, make changes to the appropriate CSV files; start first by making sure that you have your specifications in specifications.csv, and then add/fix the code points in other tables (e.g. sample-entries for codec sample entry types). In those other tables, the visible specification name is used for cross-reference; the linkname you enter in  specifications.csv will be retrieved and used to make HTML fragment URLs to refer to that entry.
* Preview that in your fork
* When it is right, submit a Pull Request, supported by a formal email, to the Mp4RA.

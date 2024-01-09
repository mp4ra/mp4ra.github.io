# PR Sanity Check Script

Created by Jason Kopp for David Singer of Apple Inc.  
First uploaded to Github: 6/21/2019  
Last updated: 7/11/2019

## Description

PRsanitycheck.py was created to automate testing pull requests submitted to the MP4RA GitHub repo using [Travis CI](https://travis-ci.org). When a pull request is submitted to the repo, this script is automatically started and the results are reported on the Travis CI website and linked to GitHub in the "Conversation" tab of the PR.

## Five Checks

The script runs five different "checks".

1. Valid, Four Characters Check
   - Checks to ensure all 4CCs are four characters long and within the valid unicode character range (0x20 – 0x7E inclusive)
   - To do this, I use this regex: `^[\u0020-\u007E]{4}$`
2. Duplicate 4CC Check
   - Checks for 4CCs that are used multiple times. All duplicates are reported on Travis CI but the check will only fail if duplicates are found in the same CSV file
3. Registered Specification Check
   - Checks to ensure any 4CCs that have a Specification also register that Specification in the specifications.json file
4. Missing Columns Check
   - Checks for any missing columns
   - The 5th column of sample-entries.csv is ignored because it is not mandatory
5. Registered Handlers Check
   - Checks to ensure any 4CCs that have a Handler also register that Handler in the handlers.csv file

## Exceptions

You may need to provide exceptions to these checks to force them to pass manually. You can provide exceptions for all but the "Missing Columns Check".

1. Valid, Four Characters Check
   - Python list of 4CCs at the bottom of the script: `codeExceptions = []`
2. Duplicate 4CC Check
   - List any known duplicates in the knownduplicates.csv file
3. Registered Specification Check
   - Python list of specifications at the bottom of the script: `specexceptions = ["see (1) below"]`
4. Missing Columns Check
   - No exceptions allowed
5. Registered Handlers Check
   - Python list of handlers at the bottom of the script: `handlerexceptions = ["n/a", "(various)", "General"]`
   - "n/a" must remain in handlerexceptions because it is introduced by this script. See "Note" below.

## Running Locally

The folder hierarchy changes between Travis and when you clone the MP4RA repo to your local machine and run the check. Because of that, you need to change where the script searches for the CSV files when you run it locally. At the bottom of the script, comment out `repo = "github"` and comment in `repo = "local"`. And vice-versa when pushing back up to Github.

## Note

Travis CI seems to read CSV files differently than when running the script locally. So I couldn't rely on the column index or other normal means when building variables. I needed to convert all the CSV rows/columns into a single Python nested list: "codesInCSV". So every 4CC in my script needed a description, specification, handler, ObjectType, and Type despite not every 4CC actually having all of those attributes. That is why I introduced "n/a" into many of the indices of those nested lists. For instance, I needed every 4CC to have a handler index so I could refer to them later. Those without a Handler, were given the Handler "n/a".

## Output

On the Travis CI website, you will see the following when the PR passes all checks. You may need to expand the `$ ./scripts/PRsanitycheck.py` line.

```
$ ./scripts/PRsanitycheck.py
  1. Valid, Four Characters Check:
  	All 4CCs are valid, four characters - PASS
  2. Duplicate 4CC Check
  	['ID32', 'id3 version 2 container', 'id3v2', 'boxes.csv', 'n/a', 'n/a', 'n/a']
  	['ID32', 'id3 version 2 meta-data handler (meta box)', 'id3v2', 'handlers.csv', 'n/a', 'n/a', 'handler']
  	...
  	['url ', 'a url', 'jpeg2000', 'boxes.csv', 'n/a', 'n/a', 'n/a']
  	['url ', 'url data location', 'iso', 'data-references.csv', 'n/a', 'n/a', 'data reference']
  	No duplicates found in the same CSV - PASS
  3. Registered Specification Check
  	All specs are registered - PASS
  4. Missing Columns Check
  	No missing columns - PASS
  5. Registered Handlers Check
  	All handles are registered - PASS
  PR passed all checks
```

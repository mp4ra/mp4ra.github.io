# 4CC Automation script
Created by Jason Kopp for David Singer of Apple Inc.  
First uploaded to Github: 5/30/2019  
Last updated: 5/30/2019  

## Description
The 4CCAutomationScript.py was created to automate finding unregistered or mistakenly registered specifications on the MP4RA website. The script takes a specification file, the folder of CSV files from the MP4RA (CSV/), finds all the four character codes (4CCs) in each, and compares what is in the specification file to what is registered in the MP4RA.

## unlisted.csv and textualcontent.csv
We created two new MP4RA CSV files: CSV/unlisted.csv and CSV/textualcontent.csv.
- unlisted.csv should store 4CCs that are purposely unlisted/unregistered. Meaning, we know they are missing from the MP4RA and they should stay that way, at least for now.
- textualcontent.csv should store four character long strings that are mistakenly found by this script but are not 4CCs. This script finds any four character long strings that are between single quotes (The regex being used is: `[\'\‘\’][A-Za-z0-9 +-]{4}[\'\‘\’]`) so mistakes happen (i.e. " to ", "also", etc.).

## How to Run
To run this script on your own specifications type in terminal:
```
python3 4CCAutomationScript.py [path/to/specificationFilename] [specification shortname] [*optional* path/to/outputFilename]"'
```
*All paths are relative to the script: "MP4RArepo/4CC_Automation/4CCAutomationScript.py"*

1. [path/to/specificationFilename] = specification file, exported from Microsoft Word as a text file, encoded as unicode (UTF-8).
2. [specification shortname] = the short code of that specification (as listed at mp4ra.org). For example:
```
$ Python3 4CCsAutomationScript.py w18310_23008-12_Ed2_FDIS+COR1_R1.txt heif
```
OR
```
$ Python3 4CCsAutomationScript.py wXXXXX-FDIS-MIAF-RB-3.txt miaf
```
3. [\*optional\* path/to/outputFilename] = the name of the csv file produced by this script. If you do not provide this argument, shortname + "-check.csv" will be used.
```
$ Python3 4CCsAutomationScript.py wXXXXX-FDIS-MIAF-RB-3.txt miaf newfile.csv
```

## Output
The script outputs a CSV file with:

1. Code-points that are in an RA CSV file and registered to this spec. (good)
2. Code-points that are in an RA CSV file and registered to a different spec. (probably a citation)
3. Code-points that are in a special CSV file (unlisted.csv), listed as for this spec., that documents deliberately unregistered 4CCs (so they don’t repeatedly show up as 'missing')
4. 4-character patterns that are actually not 4CCs at all, that are in a special CSV file (textualcontent.csv), listed as for this spec., that documents text that looks like a 4CC but is not (e.g. like ’this’).
5. \*Code-points that seem to be unregistered/missing
6. \*4CCs that use curly quotes, not straight ones, and are not in the textualcontent.csv file listed against this spec.

\* Ideally, there is nothing in section 5 or 6. If there is, it should be easy to take these rows, and make pull requests as needed against the CSV files to register the codes reported in (5). To fix (6), either list them as textual content, or if they are 4CCs in curly quotes, fix the text.

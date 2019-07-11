#!/usr/bin/env python3
import csv, re, os

# Cycles through the CSV files in the MP4RA repo and returns a tuple contatining 1.)list of all the 4CCs and the associated columns and 2.) list of the specifications and their associtated columns
def getCSV4CCs(directory):
    codesInCSV = []
    speclist = []
    for fileName in os.listdir(directory):
        #Ignores some files in the CSV directory that don't have 4CCs or aren't needed
        if fileName.endswith(".csv") and fileName != "oti.csv" and fileName != "stream-types.csv" and fileName != "unlisted.csv" and fileName != "textualcontent.csv" and fileName != "knownduplicates.csv":
            with open(directory+fileName, 'r') as csvfile:
                csvReader = csv.DictReader(csvfile)
                headers = csvReader.fieldnames
                if 'code' in headers:
                    for row in csvReader:
                        #Replaces spaces with underscores and then $20 with spaces.
                        #I needed to build the CSV files into python using "n/a" because otherwise the travis check would rearranged the columns. So including all the information I needed in every line of the python csv object was my only solution for solving that issue.
                        csvCode = row['code'].replace(' ', '_').replace('$20', ' ')
                        if 'description' in headers:
                            csvDesc = row['description']
                        else:
                            csvDesc = "n/a"
                        if 'specification' in headers:
                            csvSpec = row['specification']
                        else:
                            csvSpec = "n/a"
                        csvFile = fileName
                        if 'handler' in headers:
                            csvHandle = row['handler']
                        else:
                            csvHandle = "n/a"
                        if 'ObjectType' in headers:
                            csvObjectType = row['ObjectType']
                        else:
                            csvObjectType = "n/a"
                        if 'type' in headers:
                            csvType = row['type']
                        else:
                            csvType = "n/a"
                        codesInCSV.append([csvCode, csvDesc, csvSpec, csvFile, csvHandle, csvObjectType, csvType])
                #Build speclist
                if fileName == "specifications.csv":
                    for row in csvReader:
                        linkname = row['linkname']
                        spec = row['specification']
                        desc = row['description']
                        speclist.append([linkname, spec, desc])
    return (codesInCSV, speclist)

# 1. Valid, Four Characters Check
# Check to ensure all 4CCs are actually four characters long and valid characters matching the regex below
def notfourcharacters(codes, exceptions=[]):
    pattern = re.compile(u'^[\u0020-\u007E]{4}$', re.UNICODE)
    mistakeCodes = []
    for code in codes:
        if pattern.match(code[0]) == None:
            if code[0] not in exceptions:
                mistakeCodes.append([code[0], code[3]])
    print("\n1. Valid, Four Characters Check:")
    if mistakeCodes == []:
        print("\tAll 4CCs are valid, four characters - PASS")
        return 0
    elif mistakeCodes != []:
        for i in mistakeCodes:
            print("\t'%s' from '%s'" % (i[0], i[1]))
        print("\tAll 4CCs are either longer than four characters or not valid - FAIL")
        return 1

# 2. Duplicate 4CC Check
#Finds duplitcated codes. Only fails the check if the duplicates are in the same CSV File
def duplicatecodes(codes, exceptions=[]):
    #First build a list of just the 4CCs excluding any you want to exclude
    allcodes = [code[0] for code in codes if code[0] not in exceptions]
    #Build a list of codes that occur more than once, these are duplicates.
    dups = []
    for i in range(len(codes)):
        if allcodes.count(codes[i][0]) > 1:
            dups.append(codes[i])
    dupssorted = sorted(dups)

    print("\n2. Duplicate 4CC Check:")
    if dupssorted == []:
        print("\tNo duplicates found - PASS")
        return 0
    #If duplicates are found. Then:
    else:
        dupstest = []
        dupsame = []
        dupdiff = []
        # build a list of the duplicate codes and their associated file names
        for i in range(len(dupssorted)):
            dupstest.append([dupssorted[i][0], dupssorted[i][3]])
        # If a duplicate + filename occurs more than once, then you know if occurs in the same file. Print that result and fail the test.
        for i in range(len(dupssorted)):
            if dupstest.count([dupssorted[i][0], dupssorted[i][3]]) == 1:
                print("\t%s" % (dupssorted[i][0:7]))
                dupdiff.append(dupssorted[i][0])
            if dupstest.count([dupssorted[i][0], dupssorted[i][3]]) > 1:
                print("\t----SAME CSV----%s" % (dupssorted[i][0:7]))
                dupsame.append([dupssorted[i][0]])
        if dupsame != []:
            print("\tDuplicates found in the same CSV - FAIL")
            return 1
        elif dupsame == []:
            print("\tNo duplicates found in the same CSV - PASS")
            return 0

# Create and return the known duplicates file for exceptions to the duplicatecodes check
def knownduplicates(filename):
    with open(filename, 'r') as file:
        knownduplicatescsv = [row.replace('$20', ' ').replace('\n', '') for row in file]
    return knownduplicatescsv

# 3. Registered Specification Check
# Check to make sure all the codes that have Specifications are registered in the specifications.csv file
def registerspecs(codesInCSV, speclist, specexceptions=[]):
    unregisteredspecs = []
    allspecs = [spec[1] for spec in speclist]+specexceptions
    for a in range(len(codesInCSV)):
        if codesInCSV[a][2] not in allspecs:
            unregisteredspecs.append(codesInCSV[a])
    print("\n3. Registered Specification Check:")
    if unregisteredspecs == []:
        print("\tAll specs are registered - PASS")
        return 0
    elif unregisteredspecs != []:
        for i in unregisteredspecs:
            print("\t'%s' - '%s' from '%s'" % (i[0], i[2], i[3]))
        print("\tThere are unregistered specs - FAIL")
        return 1

# 4. Missing Columns Check
# Find CSV Rows that have missing columns
def filledcolumns(codesInCSV):
    missingcols=[]
    for row in codesInCSV:
        for col in row:
            if col == '':
                missingcols.append(tuple(row))
    # Remove rows from sample-entries that have a blank in the 4th index. These aren't mandatory cols
    notsamplemissing = missingcols[:]
    for a in missingcols:
        if a[3] == 'sample-entries.csv' and a[0] != '' and a[1] != '' and a[2] != '' and a[4] != ''and a[5] == '':
            notsamplemissing.remove(a)
    # removes duplicates that arise from rows that have multiple blank cols
    newmissingcols = set(notsamplemissing)
    # return value
    print("\n4. Missing Columns Check:")
    if newmissingcols == set():
        print("\tNo missing columns - PASS")
        return 0
    elif newmissingcols != set():
        for b in newmissingcols:
            print("\t'%s' from '%s'" % (str(b[0]), str(b[3])))
        print("\tThese specs have missing columns - FAIL")
        return 1

# 5. Registered Handlers Check
# Like the specification check, check to ensure all handlers that are used are registered in handlers.csv
def registerhandle(codesInCSV, handleexceptions):
    unregisteredhandles = []
    allhandles = [handle[1] for handle in codesInCSV if handle[3] == "handlers.csv"]+handleexceptions
    for a in range(len(codesInCSV)):
        if codesInCSV[a][4] not in allhandles:
            unregisteredhandles.append(codesInCSV[a])
    print("\n5. Registered Handlers Check:")
    if unregisteredhandles == []:
        print("\tAll handles are registered - PASS")
        return 0
    elif unregisteredhandles != []:
        for i in unregisteredhandles:
            print("\t'%s' - '%s' from '%s'" % (i[0], i[4], i[3]))
        print("\tThere are unregistered handles - FAIL")
        return 1

# Start and perform the sanity check
def prsanitycheck():
    # The location of the CSV Folder changes between the travis repo and when you clone and run the check on your local machine. When uploading to github ensure repo = github
    # repo = "local"
    repo = "github"
    if repo == "github":
        repo = "CSV/"
    elif repo == "local":
        repo = "../CSV/"

    codesspecs = getCSV4CCs(repo)

    # 1. Valid, Four Characters Check
    codeExceptions = [] #Type in exceptions if you need to
    not4CCs = notfourcharacters(codesspecs[0], codeExceptions)

    # 2. Duplicate 4CC Check
    knownduplicateslist = knownduplicates(repo+"knownduplicates.csv")
    duplicates = duplicatecodes(codesspecs[0], knownduplicateslist)

    # 3. Registered Specification Check
    specexceptions = ["see (1) below"]
    unregisteredspecs = registerspecs(codesspecs[0], codesspecs[1], specexceptions)

    # 4. Missing Columns Check
    emptycols = filledcolumns(codesspecs[0])

    # 5. Registered Handlers Check
    # Must leave "n/a" in handleexceptions because that is introduced by the script.
    handleexceptions = ["n/a", "(various)", "General"]
    unregisteredhandles = registerhandle(codesspecs[0], handleexceptions)

    # Exit Codes
    returnvalue = (not4CCs + duplicates + unregisteredspecs + emptycols + unregisteredhandles)
    if returnvalue == 0:
        print("\nPR passed all checks")
        exit(0)
    elif returnvalue == 1:
        print("\nPR failed 1 check")
        exit(1)
    elif returnvalue > 1:
        print("\nPR failed %d checks" % returnvalue)
        exit(1)

prsanitycheck()

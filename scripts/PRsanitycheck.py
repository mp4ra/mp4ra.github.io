#!/usr/bin/env python3
import csv, re, os

def getCSV4CCs(directory):
    codesInCSV = []
    speclist = []
    handlelist = []
    for fileName in os.listdir(directory):
        if fileName.endswith(".csv") and fileName != "oti.csv" and fileName != "stream-types.csv" and fileName != "unlisted.csv" and fileName != "textualcontent.csv" and fileName != "knownduplicates.csv":
            with open(directory+fileName, 'r') as csvfile:
                csvReader = csv.DictReader(csvfile)
                headers = csvReader.fieldnames
                if 'code' in headers:
                    for row in csvReader:
                        csvCode = row['code'].replace(' ', '_').replace('$20', ' ')
                        if 'description' in headers:
                            csvDesc = row['description'].lower()
                        else:
                            csvDesc = "n/a"
                        if 'specification' in headers:
                            csvSpec = row['specification'].lower()
                        else:
                            csvSpec = "n/a"
                        csvFile = fileName.lower()
                        if 'handler' in headers:
                            csvHandle = row['handler'].lower()
                        else:
                            csvHandle = "n/a"
                        if 'ObjectType' in headers:
                            csvObjectType = row['ObjectType'].lower()
                        else:
                            csvObjectType = "n/a"
                        if 'type' in headers:
                            csvType = row['type'].lower()
                        else:
                            csvType = "n/a"
                        codesInCSV.append([csvCode, csvDesc, csvSpec, csvFile, csvHandle, csvObjectType, csvType])
                if fileName == "specifications.csv":
                    for row in csvReader:
                        linkname = row['linkname']
                        spec = row['specification']
                        desc = row['description']
                        speclist.append([linkname, spec, desc])
    return (codesInCSV, speclist, handlelist)

def notfourcharacters(codes, exceptions=[]):
    pattern = re.compile("^[A-Za-z0-9 +-]{4}$")
    mistakeCodes = []
    for code in codes:
        if pattern.match(code[0]) == None:
            if code[0] not in exceptions:
                mistakeCodes.append([code[0], code[3]])
    print("\nFour Character Codes Test:")
    if mistakeCodes == []:
        print("\tAll 4ccs are four characters - PASS")
        return 0
    elif mistakeCodes != []:
        for i in mistakeCodes:
            print("\t'%s' from '%s'" % (i[0], i[1]))
        print("\tAll 4ccs are not four characters - FAIL")
        return 1

def duplicatecodes(codes, exceptions=[]):
    allcodes = [code[0] for code in codes if code[0] not in exceptions]
    dups = []
    for i in range(len(codes)):
        if allcodes.count(codes[i][0]) > 1:
            dups.append(codes[i])
    dupssorted = sorted(dups)

    print("\nDuplicate 4CCs Test:")
    if dupssorted == []:
        print("\tNo duplicates found - PASS")
        return 0
    else:
        dupstest = []
        dupsame = []
        dupdiff = []
        for i in range(len(dupssorted)):
            dupstest.append([dupssorted[i][0], dupssorted[i][3]])
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

def registerspecs(codesInCSV, speclist, specexceptions=[]):
    unregisteredspecs = []
    allspecs = [spec[1].lower() for spec in speclist]+specexceptions
    for a in range(len(codesInCSV)):
        if codesInCSV[a][2].lower() not in allspecs:
            unregisteredspecs.append(codesInCSV[a])
    print("\nRegistered Specs Test:")
    if unregisteredspecs == []:
        print("\tAll specs are registered - PASS")
        return 0
    elif unregisteredspecs != []:
        for i in unregisteredspecs:
            print("\t'%s' - '%s' from '%s'" % (i[0], i[2], i[3]))
        print("\tThere are unregistered specs - FAIL")
        return 1

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
    print("\nMissing Columns Test:")
    if newmissingcols == set():
        print("\tNo missing columns - PASS")
        return 0
    elif newmissingcols != set():
        for b in newmissingcols:
            print("\t'%s' from '%s'" % (str(b[0]), str(b[3])))
        print("\tThese specs have missing columns - FAIL")
        return 1

def knownduplicates(filename):
    with open(filename, 'r') as file:
        knownduplicatescsv = [row.replace('$20', ' ').replace('\n', '') for row in file]
    return knownduplicatescsv

def registerhandle(codesInCSV, handleexceptions):
    unregisteredhandles = []
    allhandles = [handle[1].lower() for handle in codesInCSV if handle[3] == "handlers.csv"]+handleexceptions
    for a in range(len(codesInCSV)):
        if codesInCSV[a][4].lower() not in allhandles:
            unregisteredhandles.append(codesInCSV[a])
    print("\nRegistered Handles Test:")
    if unregisteredhandles == []:
        print("\tAll handles are registered - PASS")
        return 0
    elif unregisteredhandles != []:
        for i in unregisteredhandles:
            print("\t'%s' - '%s' from '%s'" % (i[0], i[4], i[3]))
        print("\tThere are unregistered handles - FAIL")
        return 1

def prsanitycheck():
    #GET CODES
    # repo = "local"
    repo = "travis"
    if repo == "travis":
        repo = "CSV/"
    elif repo == "local":
        repo = "../CSV/"

    codesspecs = getCSV4CCs(repo)

    #TEST for four characters
    codeExceptions = [] #Type in exceptions if you need to
    not4ccs = notfourcharacters(codesspecs[0], codeExceptions)

    #Test for Duplicates
    knownduplicateslist = knownduplicates(repo+"knownduplicates.csv")
    duplicates = duplicatecodes(codesspecs[0], knownduplicateslist)

    #Test for Specifications
    specexceptions = ["see (1) below"]
    unregisteredspecs = registerspecs(codesspecs[0], codesspecs[1], specexceptions)

    #Test for Filled in Columns
    emptycols = filledcolumns(codesspecs[0])

    #Test for registered handle types
    handleexceptions = ["n/a", "(various)", "general"]
    unregisteredhandles = registerhandle(codesspecs[0], handleexceptions)

    # Exit Codes
    returnvalue = (not4ccs + duplicates + unregisteredspecs + emptycols + unregisteredhandles)
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

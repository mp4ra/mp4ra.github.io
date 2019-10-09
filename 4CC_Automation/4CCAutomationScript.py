import csv, re, os, sys
from datetime import datetime

def check4CCs(codecFile, newFileName, userSpec):
    # Find 4CCs in Codec File----------------------------------------------------------
    with open(codecFile, 'r') as file:
        codesStripped = []
        sentenceList = []
        codesCurly = []
        sentencesCurly = []

        f = file.readlines()

        for line in f:
            #convert multiple spaces/tabs/etc into single spaces to print better in the CSV file.
            strippedLine = re.sub('\s+', ' ', line)

            regex = "[\'\‘\’].{4}[\'\‘\’]"
            codesQuotes = re.findall(regex, line)
            if codesQuotes:
                for i in codesQuotes:
                    codeNoSpaces = i.replace(' ', '$20')
                    codeNoQuotes = codeNoSpaces.strip("\'|\‘|\’")
                    codesStripped.append(codeNoQuotes)
                    sentenceList.append(codeNoQuotes + " - " + strippedLine)

            regexCurly = "[\‘\’].{4}[\‘\’]"
            codesBad = re.findall(regexCurly, line)
            if codesBad:
                for i in codesBad:
                    codeBadNoSpaces = i.replace(' ', '$20')
                    codeBadNoQuotes = codeBadNoSpaces.strip("\'|\‘|\’")
                    codesCurly.append(codeBadNoQuotes)
                    sentencesCurly.append([codeBadNoQuotes, strippedLine])

        fileCodes = sorted(set(codesStripped))

    # Find 4ccs in the repo CSV Files----------------------------------------------------------
    csvCodes = []
    codesInCSV = []
    for fileName in os.listdir(CSVFileDirectory):
        if fileName.endswith(".csv"):
            with open(CSVFileDirectory+fileName, 'r') as csvfile:
                csvReader = csv.DictReader(csvfile)
                headers = csvReader.fieldnames
                if 'code' in headers:
                    for row in csvReader:
                        csvCode = row['code']
                        csvFile = fileName
                        csvLine = str(list(row.values()))
                        if 'specification' in headers:
                            csvSpec = row['specification']
                        else:
                            csvSpec = "No spec"

                        csvCodes.append(csvCode)
                        codesInCSV.append([csvCode, csvSpec, csvFile, csvLine])

    # Comparing CSV codes and codec codes-------------------------------------------------------------------------------
    registeredSame = []
    registeredDiff = []
    unlistedSpecs = []
    textualSpecs = []
    missingSpecs = []
    curlySpecsList = []

    for filecode in fileCodes:
        smallSentenceList=[]
        for sentence in sentenceList:
            sentenceCode, sentenceSentence = sentence.split(' - ')
            if filecode == sentenceCode:
                smallSentenceList.append(sentenceSentence)
        sentences = str(len(smallSentenceList)) + ": " + str(smallSentenceList).strip("[]")

        if filecode in csvCodes:
            for i in range(len(codesInCSV)):
                if filecode == codesInCSV[i][0]:
                    if codesInCSV[i][2] != "unlisted.csv" and codesInCSV[i][2] != "textualcontent.csv":
                        if userSpec == codesInCSV[i][1]:
                            registeredSame.append([filecode, userSpec, codesInCSV[i][1], codesInCSV[i][2], codesInCSV[i][3].strip("[]"), sentences])
                        if userSpec != codesInCSV[i][1]:
                            registeredDiff.append([filecode, userSpec, codesInCSV[i][1], codesInCSV[i][2], codesInCSV[i][3].strip("[]"), sentences])
                    # If userspec != the csv code's spec, AND the code isnt somewhere else in the csvCodes (excluding the current code, i).
                    # Needed to add this because, if the same 4cc was in two spec in unlisted.csv. It would show up as in unlisted and missing.
                    elif codesInCSV[i][2] == "unlisted.csv":
                        if userSpec == codesInCSV[i][1]:
                            unlistedSpecs.append([filecode, userSpec, codesInCSV[i][1], codesInCSV[i][2], codesInCSV[i][3].strip("[]"), sentences])
                        # the userspec doesnt equal the code's spec and the code in the csv file isn't in any other CSV files.
                        elif userSpec != codesInCSV[i][1] and codesInCSV[i][0] not in csvCodes[0:i] and codesInCSV[i][0] not in csvCodes[i+1:]:
                            missingSpecs.append([filecode, userSpec, sentences])
                    elif codesInCSV[i][2] == "textualcontent.csv":
                        if userSpec == codesInCSV[i][1]:
                            textualSpecs.append([filecode, userSpec, codesInCSV[i][1], codesInCSV[i][2], codesInCSV[i][3].strip("[]"), sentences])
                        elif userSpec != codesInCSV[i][1] and codesInCSV[i][0] not in csvCodes[0:i] and codesInCSV[i][0] not in csvCodes[i+1:]:
                            missingSpecs.append([filecode, userSpec, sentences])
        else:
            missingSpecs.append([filecode, userSpec, sentences])

    #Curly Quotes minus the 4ccs we put in textual.csv
    setOfTextCodes = set([textualSpecs[i][0] for i in range(len(textualSpecs))])
    setofCurlies = set(codesCurly)
    curlySpecs = setofCurlies.difference(setOfTextCodes)
    for i in range(len(sentencesCurly)):
        if sentencesCurly[i][0] in curlySpecs:
            curlySpecsList.append([sentencesCurly[i][0], userSpec, sentencesCurly[i][1]])

    # Creating New File-------------------------------------------------------------------------------
    with open(newFileName, 'w') as newFile:
        csvWriter = csv.writer(newFile)

        if registeredSame:
            csvWriter.writerow(["", "", "", "REG To This Spec", "", ""])
            csvWriter.writerow(["CODE", "INPUT SPEC", "REG SPEC", "CSV FILE", "CSV ROW", "SENTENCES"])
            for i in registeredSame:
                csvWriter.writerow([i[0], i[1], i[2], i[3], i[4], i[5]])

        if registeredDiff:
            csvWriter.writerow(["", "", "", "", "", ""])
            csvWriter.writerow(["", "", "", "", "", ""])
            csvWriter.writerow(["", "", "", "Reg To Other Spec", "", ""])
            csvWriter.writerow(["CODE", "INPUT SPEC", "REG SPEC", "CSV FILE", "CSV ROW", "SENTENCES"])
            for i in registeredDiff:
                csvWriter.writerow([i[0], i[1], i[2], i[3], i[4], i[5]])

        if unlistedSpecs:
            csvWriter.writerow(["", "", "", "", "", ""])
            csvWriter.writerow(["", "", "", "", "", ""])
            csvWriter.writerow(["", "", "", "Listed as Unreg", "", ""])
            csvWriter.writerow(["CODE", "INPUT SPEC", "REG SPEC", "CSV FILE", "CSV ROW", "SENTENCES"])
            for i in unlistedSpecs:
                csvWriter.writerow([i[0], i[1], i[2], i[3], i[4], i[5]])

        if textualSpecs:
            csvWriter.writerow(["", "", "", "", "", ""])
            csvWriter.writerow(["", "", "", "", "", ""])
            csvWriter.writerow(["", "", "", "Listed as Text", "", ""])
            csvWriter.writerow(["CODE", "INPUT SPEC", "REG SPEC", "CSV FILE", "CSV ROW", "SENTENCES"])
            for i in textualSpecs:
                csvWriter.writerow([i[0], i[1], i[2], i[3], i[4], i[5]])

        if missingSpecs:
            csvWriter.writerow(["", "", "", "", "", ""])
            csvWriter.writerow(["", "", "", "", "", ""])
            csvWriter.writerow(["", "", "", "Missing", "", ""])
            csvWriter.writerow(["CODE", "INPUT SPEC", "REG SPEC", "CSV FILE", "CSV ROW", "SENTENCES"])
            for i in missingSpecs:
                csvWriter.writerow([i[0], i[1], "", "", "", i[2]])

        if curlySpecsList:
            csvWriter.writerow(["", "", "", "", "", ""])
            csvWriter.writerow(["", "", "", "", "", ""])
            csvWriter.writerow(["", "", "", "Uses Curly Quotes", "", ""])
            csvWriter.writerow(["CODE", "INPUT SPEC", "REG SPEC", "CSV FILE NAME", "CSV ROW", "SENTENCES"])
            for i in curlySpecsList:
                csvWriter.writerow([i[0], i[1], "", "", "", i[2]])

    # Test-------------------------------------------------------------------------------
    # missingCodes = set(fileCodes) - set(csvCodes)
    # print("Codes in file: %d" % len(codesStripped))
    # print("Sentences in file: %d" % len(sentenceList))
    # print("Unique codes in file: %d" % len(fileCodes))
    # print("Curly quotes: %d" % len(curlySpecs))
    # print("In CSV files: %d" % len(codesInCSV))
    # print("Missing: %d" % len(missingCodes))
    #
    # print("-----------------------------------------------------------")
    return
# End check4CCs Function----------------------------------------------------------

# Start Loop to check the entire CodecFileDirectory------------------------------------------
# CodecFileDirectory = "specs/"
# CSVFileDirectory = "../CSV/"
# outputDirectory = "output/" + datetime.now().strftime("%Y%m%d%H%M%S/")
# os.mkdir(outputDirectory)
# for fileName1 in os.listdir(CodecFileDirectory):
#     if fileName1.endswith(".txt"):
#         codecFile = CodecFileDirectory+fileName1
#         while True:
#             print(fileName1)
#             userSpec = input("Please enter the shortname of the specification: ")
#             userSpec = userSpec
#             if userSpec == "":
#                 print("You didn't type anything.")
#             else:
#                 break
#         newFileName = outputDirectory + userSpec + "-check.csv"
#         check4CCs(codecFile, newFileName, userSpec)
# End Loop to check the entire CodecFileDirectory------------------------------------------

# Runs only one specification from the specs/ folder at a time using arguments from the command line:
CSVFileDirectory = "../CSV/"
warning = 'You need to type "python(3) 4CCAutomationScript.py [path/to/specificationFilename] [specification shortname] [*optional* path/to/outputFilename]"'

if len(sys.argv) < 3:
    print("You didn't provide enough arguments.")
    print(warning)
elif len(sys.argv) == 3:
    scriptname = sys.argv[0]
    codecFile = sys.argv[1]
    userSpec = sys.argv[2]
    newFileName = userSpec + "-check.csv"

    print("Running %s on %s with shortname %s > %s" % (scriptname, codecFile, userSpec, newFileName))
    check4CCs(codecFile, newFileName, userSpec)
elif len(sys.argv) == 4:
    scriptname = sys.argv[0]
    codecFile = sys.argv[1]
    userSpec = sys.argv[2]
    newFileName = sys.argv[3]

    print("Running %s on %s with shortname %s > %s" % (scriptname, codecFile, userSpec, newFileName))
    check4CCs(codecFile, newFileName, userSpec)
elif len(sys.argv) > 4:
    print("You provided too many arguments.")
    print(warning)

const fs = require('fs');

Array.prototype.contains = function (necessaryElement) {
    for (let element in this)
        if (element == necessaryElement)
            return true;
    return false;
}

function getParametersOfProgram() {
    let pathToFileWithString;
    let pathToWritableFile;
    let substring;
    process.argv.forEach((value, index) => {
        if (index == 2)
            pathToFileWithString = value;
        if (index == 3)
            pathToWritableFile = value;
        if (index == 4)
            substring = value;
    });

    if (!pathToFileWithString) {
        console.error('ERROR!\nThe path to the readable file was not specified');
        process.exit(-1);
    }
    if (!pathToWritableFile) {
        console.error('ERROR!\nThe path to the writable file was not specified');
        process.exit(-1);
    }
    if (!substring) {
        console.error('ERROR!\nThe substring was not specified');
        process.exit(-1);
    }

    return new Array(pathToFileWithString, pathToWritableFile, substring);
}

function findAllOccurrencesOfSubstringInString(pathToFileWithString, pathToWritableFile, substring) {
    fs.readFile(pathToFileWithString, (err, data) => {
        if (err) {
            if (err.code == 'ENOENT') {
                console.error('ERROR!\nThe path ' + pathToFileWithString + ' does not exist');
                process.exit(-1);
            }
            if (err.code == 'EISDIR') {
                console.error('ERROR!\nPath to file expected\n(the path to the directory is specified)');
                process.exit(-1);
            }
            if (err.code == 'EACCES') {
                console.error('ERROR!\nAccess is denied to the file ' + pathToFileWithString);
                process.exit(-1);
            }
        }

        let start = new Date();
        let occurrences = findSubstringWithAutomat(data.toString(), substring);
        let end = new Date();
        console.log("Operating time: ", end - start, " milliseconds");

        let indexs = "";
        for (let i = 0; i < occurrences.length; i++)
            indexs += occurrences[i] + '\n';

        fs.writeFile(pathToWritableFile, indexs, (err) => {
            if (err) {
                if (err.code == 'EACCES')
                    console.error('ERROR!\nAccess is denied to the file ' + pathToWritableFile);
                process.exit(-1);
            }
        });
    })
}

function findSubstringWithAutomat(string, substring) {
    let alphabet = getAlphabetFor(substring);
    let jumpTable = getJumpTableFor(substring);
    let currentState = 0;
    let occurrences = new Array();

    for (let i = 0; i < string.length; i++) {
        if (alphabet.contains(string[i]))
            currentState = jumpTable[currentState][string.charAt(i)];
        else
            currentState = 0;
        if (currentState == jumpTable.length - 1)
            occurrences.push(i - currentState + 2);
    }
    return occurrences;
}

function getAlphabetFor(string) {
    let alphabet = new Array();
    for (let i = 0; i < string.length; i++)
        alphabet[string.charAt(i)] = 0;
    return alphabet;
}

function getJumpTableFor(string) {
    let alphabet = getAlphabetFor(string);
    let jumpTable = new Array(string.length + 1);
    for (j = 0; j <= string.length; j++)
        jumpTable[j] = new Array();
    for (i in alphabet)
        jumpTable[0][i] = 0;
    for (j = 0; j < string.length; j++) {
        let prev = jumpTable[j][string.charAt(j)];
        jumpTable[j][string.charAt(j)] = j + 1;
        for (i in alphabet)
            jumpTable[j + 1][i] = jumpTable[prev][i];
    }
    return jumpTable;
}

function main() {
    let parametersOfProgram = getParametersOfProgram();
    let pathToFileWithString = parametersOfProgram[0];
    let pathToWritableFile = parametersOfProgram[1];
    let substring = parametersOfProgram[2];
    findAllOccurrencesOfSubstringInString(pathToFileWithString, pathToWritableFile, substring);
}


main();

const fs = require('fs');
const readsync = require('readline-sync');

function getPathToProgram() {
    if (process.argv.length < 3) {
        console.error('ERROR!\nЕhe path to the program file was not passed');
        process.exit(-1);
    }
    return process.argv[2];
}

function writeProgramToMemory(pathToProgram) {
    let program = fs.readFileSync(pathToProgram);
    program = program.toString();
    return program.split(/\r\n| /);
}

function runProgram(memory) {
    let ip = 0;
    let flag = true;
    while (flag)
        switch (memory[ip]) {
            case 'input':
                let value = readsync.question('Entered value: ');
                memory[memory[ip + 1]] = parseFloat(value);
                ip += 2;
                break;
            case 'output':
                console.log(memory[memory[ip + 1]]);
                ip += 2;
                break;
            case 'set':
                memory[memory[ip + 1]] = parseFloat(memory[ip + 2]);
                ip += 3;
                break;
            case 'add':
                memory[memory[ip + 3]] = memory[memory[ip + 1]] + memory[memory[ip + 2]];
                ip += 4;
                break;
            case 'sub':
                memory[memory[ip + 3]] = memory[memory[ip + 1]] - memory[memory[ip + 2]];
                ip += 4;
                break;
            case 'mult':
                memory[memory[ip + 3]] = memory[memory[ip + 1]] * memory[memory[ip + 2]];
                ip += 4;
                break;
            case 'cmp':
                if (memory[memory[ip + 1]] == memory[memory[ip + 2]])
                    memory[memory[ip + 3]] = 0;
                else
                    memory[memory[ip + 3]] = 1;
                ip += 4;
                break;
            case 'cml':
                if (memory[memory[ip + 1]] < memory[memory[ip + 2]])
                    memory[memory[ip + 3]] = 0;
                else
                    memory[memory[ip + 3]] = 1;
                ip += 4;
                break;
            case 'cmpl':
                if (memory[memory[ip + 1]] <= memory[memory[ip + 2]])
                    memory[memory[ip + 3]] = 0;
                else
                    memory[memory[ip + 3]] = 1;
                ip += 4;
                break;
            case 'cmm':
                if (memory[memory[ip + 1]] > memory[memory[ip + 2]])
                    memory[memory[ip + 3]] = 0;
                else
                    memory[memory[ip + 3]] = 1;
                ip += 4;
                break;
            case 'cmpm':
                if (memory[memory[ip + 1]] >= memory[memory[ip + 2]])
                    memory[memory[ip + 3]] = 0;
                else
                    memory[memory[ip + 3]] = 1;
                ip += 4;
                break;
            case 'jmp':
                ip = parseFloat(memory[ip + 1]);
                break;
            case 'jz':
                if (memory[memory[ip + 1]] == 0)
                    ip = parseFloat(memory[ip + 2]);
                else
                    ip += 3;
                break;
            case 'jnz':
                if (memory[memory[ip + 1]] != 0)
                    ip = parseFloat(memory[ip + 2]);
                else
                    ip += 3;
                break;
            case 'exit':
                flag = false;
                break;
            default:
                console.log('Error(s) in the program code!');
                process.exit(-1);
        }
}

function main() {
    let pathToProgram = getPathToProgram();
    let memory = writeProgramToMemory(pathToProgram);
    runProgram(memory);
    console.log('\n---------------------------------');
    console.log('The pogram worked without errors!');
}


main();

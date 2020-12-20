let fs = require ('fs');
let arg = process.argv;
let mem = new Array();

let text = fs.readFileSync('nod.jss');
text=text.toString();

mem=text.split(/\r\n| /);


for (let i=0;i<mem.length;i++)
	console.log(i,mem[i]);
ip=0;
flag=true;
while (flag)
	 switch (mem[ip]) {
            case 'input':
                let value = readsync.question('Entered value: ');
                mem[mem[ip + 1]] = parseFloat(value);
                ip += 2;
                break;
            case 'output':
                console.log(mem[mem[ip + 1]]);
                ip += 2;
                break;
            case 'set':
                memory[mem[ip + 1]] = parseFloat(mem[ip + 2]);
                ip += 3;
                break;
            case 'add':
                memory[mem[ip + 3]] = mem[mem[ip + 1]] + mem[mem[ip + 2]];
                ip += 4;
                break;
            case 'sub':
                mem[memory[ip + 3]] = mem[mem[ip + 1]] - mem[mem[ip + 2]];
                ip += 4;
                break;
            case 'mult':
                mem[mem[ip + 3]] = mem[mem[ip + 1]] * mem[mem[ip + 2]];
                ip += 4;
                break;
            case 'cmp':
                if (mem[mem[ip + 1]] == mem[mem[ip + 2]])
                    mem[mem[ip + 3]] = 0;
                else
                    mem[mem[ip + 3]] = 1;
                ip += 4;
                break;
            case 'cml':
                if (mem[mem[ip + 1]] < mem[mem[ip + 2]])
                    mem[mem[ip + 3]] = 0;
                else
                    mem[mem[ip + 3]] = 1;
                ip += 4;
                break;
            case 'cmpl':
                if (mem[mem[ip + 1]] <= mem[mem[ip + 2]])
                    mem[mem[ip + 3]] = 0;
                else
                    mem[mem[ip + 3]] = 1;
                ip += 4;
                break;
            case 'cmm':
                if (mem[mem[ip + 1]] > mem[mem[ip + 2]])
                    mem[mem[ip + 3]] = 0;
                else
                    mem[mem[ip + 3]] = 1;
                ip += 4;
                break;
            case 'cmpm':
                if (mem[mem[ip + 1]] >= mem[mem[ip + 2]])
                    mem[mem[ip + 3]] = 0;
                else
                    mem[mem[ip + 3]] = 1;
                ip += 4;
                break;
            case 'jmp':
                ip = parseFloat(mem[ip + 1]);
                break;
            case 'jz':
                if (mem[mem[ip + 1]] == 0)
                    ip = parseFloat(mem[ip + 2]);
                else
                    ip += 3;
                break;
            case 'jnz':
                if (mem[mem[ip + 1]] != 0)
                    ip = parseFloat(mem[ip + 2]);
                else
                    ip += 3;
                break;
            case 'exit':
                flag = false;
                break;
	}
	for (let i=0;i<mem.length;i++)
	console.log(i,mem[i]);

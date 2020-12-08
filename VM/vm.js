var fso = new ActiveXObject('Scripting.FileSystemObject');
var text_prog = fso.OpenTextFile(WSH.Arguments(0)); 
var s = '';
while (!text_prog.AtEndOfStream)
    s += text_prog.ReadLine() + ' ';
var mem = s.split(' ');
if(mem[mem.length-1]!='exit')mem[mem.length-1]='exit';
var ip = 0;
var argument1 = 0;
var argument2 = 0;
var argument3 = 0;
while (mem[ip] != 'exit') {
    switch (mem[ip]) {
        case 'assign':
            argument1 = parseInt(mem[ip + 1]);
            argument2 = parseInt(mem[ip + 2]) ;
            mem[argument2] = argument1;
            ip += 3
            break;
        case 'decr':
            argument1 = parseInt(mem[ip + 1]);
            argument2 = parseInt(mem[ip + 2]) ;
            mem[argument2] -= argument1;
            ip += 3;
            break;
        case 'input':
            WScript.Echo('Entry') 
            argument1 = parseInt(mem[ip + 1]) ;
            mem[argument1] = parseFloat(WScript.StdIn.ReadLine()); //приравниваем к введёному числу
            ip += 2;
            break
        case 'jifeq':
            argument1 = parseInt(mem[ip + 1]) ;
            argument2 = parseInt(mem[ip + 2]);
            argument3 = parseInt(mem[ip + 3]);
            if (mem[argument1] == argument2) ip = argument3;
            else ip += 4;
            break;
        case 'jump':
            argument1 = parseInt(mem[ip + 1]);
            ip = argument1;
            break;
        case 'max':
            argument1 = parseInt(mem[ip + 1]) ;
            argument2 = parseInt(mem[ip + 2]) ;
            argument3 = parseInt(mem[ip + 3]) ;
            if (mem[argument1] >= mem[argument2]) mem[argument3] = mem[argument1];
            else mem[argument3] = mem[argument2];
            ip += 4;
            break;
        case 'min':
            argument1 = parseInt(mem[ip + 1]) ;
            argument2 = parseInt(mem[ip + 2]) ;
            argument3 = parseInt(mem[ip + 3]) ;
            if (mem[argument1] <= mem[argument2]) mem[argument3] = mem[argument1];
            else mem[argument3] = mem[argument2];
            ip += 4;
            break;
        case 'mult':
            argument1 = parseInt(mem[ip + 1]) ;
            argument2 = parseInt(mem[ip + 2]) ;
            argument3 = parseInt(mem[ip + 3]) ;
            mem[argument3] = mem[argument1] * mem[argument2];
            ip += 4;
            break;
        case 'output':
            argument = parseInt(mem[ip + 1]);
            WScript.Echo('Answer: ' + mem[argument])
            ip += 2
            break;
        case 'outexp':
            WSH.echo('Exeption');
            ip += 1;
            break;
        case 'compar':
            argument1 = parseInt(mem[ip + 1]) ;
            argument2 = parseInt(mem[ip + 2]);
            argument3 = parseInt(mem[ip + 3]);
            if (mem[argument1] < argument2) ip = argument3;
            else ip += 4;
            break;
        case 'divide':
            argument1 = parseInt(mem[ip + 1]);
            argument2 = parseInt(mem[ip + 2]) ;
            argument3 = parseInt(mem[ip + 3]) ;
            mem[argument3] = mem[argument1] % mem[argument2];
            ip += 4;
            break;
        case 'sum':
            argument1 = parseInt(mem[ip + 1]);
            argument2 = parseInt(mem[ip + 2]) ;
            argument3 = parseInt(mem[ip + 3]) ;
            mem[argument3] = mem[argument2] + mem[argument1];
            ip += 4
            break;
        default:
            for (var count = 0; count < mem.length; count++)
                WScript.echo('In cell', count, 'stored', mem[count]);
            WScript.Echo('ne zashlo(')
            WScript.Quit()
            break
    }
}

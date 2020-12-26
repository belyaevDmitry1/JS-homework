let fs = require ('fs');
let example = new Array();
let result = new Array();
//let numbers = new arr();
//numbers = [0,1,2,3,4,5,6,7,8,9];
example = [1, "+", 2]; // 12+
let priority = new Array();
let stack = new Array();
priority['+'] = 0; 
priority['-'] = 0;
priority['*'] = 1;
priority['/'] = 1;
priority['^'] = 2;

for(let i =0; i < example.length; i++)
{
	if(example[i] >= '0' && example[i] <= '9')
	{
		result.push(example[i]);
        continue;
    }
		
	if (example[i] == '(') 
	{
            stack.push('(');
            continue;
	}

    if (example[i] == ')') 
	{
        while (stack[stack.length - 1] != '(')
            result.push(stack.pop());
        stack.pop();
        continue;
    }

    if (priority[example[i]] == 2) 
	{
        stack.push('^');
        continue;
    }
	while (stack.length > 0
            && priority[stack[stack.length - 1]] >= priority[example[i]])
            result.push(stack.pop());
        stack.push(example[i]);
		
}

while (stack.length > 0)
        result.push(stack.pop());
console.log(result);

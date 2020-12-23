let fs = require('fs');
let arg = process.argv;
let stack = new Array();
let text1 = fs.readFileSync('ВойнаИМир.txt');

tStart = new Date();

text1 = text1.toString();
let T = "война";
let tHash = 0;
let tempHash = 0;
stack1 = new Array;
for (let i = 0; i < T.length; i++)
    {
        tHash += Math.pow(T.charCodeAt(i),2);
        tempHash += Math.pow(text1.charCodeAt(i),2);
    }
for (let j = T.length; j < text1.length; j++)
    {
        tempHash = tempHash-Math.pow(text1.charCodeAt(j - T.length),2)+ Math.pow(text1.charCodeAt(j),2);
        if (tHash == tempHash)
        {
            flag = false;
            for (let i = 0; i < T.length; i++)
            {   
                if (text1[j - T.length + 1 + i] != T[i])
                {
                    flag = true;
                    break;
                }
            }
            if (!flag) stack1.push(j - T.length + 1);
        }
    }   
console.log(stack1);
tFinish = new Date();
console.log('Time');
console.log(tFinish - tStart)

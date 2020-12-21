let fs = require ('fs');
let arg = process.argv;
let S = fs.readFileSync('vim.txt');
S=S.toString();
let T="война";

for (let i = 0; i < S.length - T.length + 1; i++) {
    for (let j = 0; j < T.length; j++) {
        if (S[i + j] != T[j])
            break;
        if (j == T.length - 1) {
            console.log(i + 1);
        }
    }
}

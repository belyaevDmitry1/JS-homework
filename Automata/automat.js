let fs = require('fs');
let arg = process.argv;
let S = fs.readFileSync('ВойнаИМир.txt');
let T = "князь";
m = T.length;

tStart = new Date();

alph = new Array()
//Определяем алфавит строки T
for (i = 0; i < m; i++)
    alph[T.charAt(i)] = 0;
//В двумерном массиве del будем хранить таблицу переходов
del = new Array(m + 1)
for (j = 0; j <= m; j++)
    del[j] = new Array();
//Инициализируем таблицу переходов
for (i in alph)
    del[0][i] = 0;
//Формируем таблицу переходов
for (j = 0; j < m; j++) {
    prev = del[j][T.charAt(j)];
    del[j][T.charAt(j)] = j + 1;
    for (i in alph)
        del[j + 1][i] = del[prev][i];
}
//Выводим таблицу переходов
for (j = 0; j <= m; j++) {
    out = " ";
    for (i in alph)
        out += del[j][i] + " ";
    console.log(out);
}
S = S.toString();
let position = 0;
for (let i = 0; i < S.length; i++) {
    if (S[i] in alph) {
        position = del[position][S[i]];
    }
    else
        position = 0;
    if (position == T.length) {
        console.log(i - position + 1);
    }
}
tFinish = new Date();
console.log('Time');
console.log(tFinish - tStart)

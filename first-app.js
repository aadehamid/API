const name = 'hamid';
let age = 50;
const lastNAme = 'Adesokan';
function writeName(name, lastNAme, age) {
    console.log('My name is ' + name + ' ' + lastNAme + ' and I am ' + age + ' years old');

}
writeName(name, lastNAme, age);

const myFunc = (name, lastNAme, age) => {
    console.log('My name is ' + name + ' ' + lastNAme + ' and I am ' + age + ' years old');
}
myFunc(name, lastNAme, age);

'use strict';

const register = require('./phones.json');

console.log(register[0].firstname);
// console.log(register[0].phones);
// console.log(register[0].phones[0]);
// console.log(register[0].phones[0].number);

for(const phone of register[0].phones){
    console.log(phone.number);
}

for(const person of register){
    console.log(`${person.firstname} ${person.lastname}`);
}

console.log('####################');

for (const person of register) {
    console.log(`${person.firstname} ${person.lastname}`);
    for(const phone of person.phones){
        console.log(`\t${phone.type}: ${phone.number}`);
    }
}


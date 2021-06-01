
import "core-js/stable";
import "regenerator-runtime/runtime";


class Account {
    constructor(saldo) {
        this.saldo = saldo;
    }
    getMoney(ammount) {
        this.saldo -= ammount;
    }
    addMoney(ammount) {
        this.saldo += ammount;
    }
    get getSaldo() {
        return console.log(this.saldo.toFixed(2));
    }
}

class Client {
    constructor() {
        this.accounts = [];
    }
    addAccount(acc) {
        this.accounts.push(acc);
    }
}

class Person extends Client {
    constructor(name, surname) {
        super();
        this.name = name;
        this.surname = surname;
    }
    getSaldo(whichAcc) {
        console.log(this.accounts[whichAcc]);
    }
}


let acc1 = new Account(10.20);
console.log(acc1);

acc1.addMoney(20.1);

console.log(acc1);

acc1.getSaldo;

let client1 = new Client();

console.log(client1);

client1.addAccount(acc1);

let person1 = new Person("Daniel", "Chmur");
person1.addAccount(acc1);

console.log(person1);

person1.getSaldo(0);

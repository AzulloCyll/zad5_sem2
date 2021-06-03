
import "core-js/stable";
import "regenerator-runtime/runtime";

const body = document.body;
body.style.padding = "60px";

class Bank {
    constructor(name) {
        this.name = name;
        this.clients = [];
    }
    addClient(client) {
        this.clients.push(client);
    }
    showClientsSaldos() {
        for (let client in this.clients) {
            const name = document.createElement("span");
            let secondName = (this.clients[client].surname) ? (" " + this.clients[client].surname) : "";
            name.innerHTML = this.clients[client].name + secondName + "</br> -------------- </br> ";
            body.append(name);
            console.log(this.clients[client].name + secondName);
            for (let account in this.clients[client].accounts) {
                const acc = document.createElement("span");
                acc.innerHTML = "Account " + account + ": saldo: " + this.clients[client].accounts[account].saldo + "</br >";
                name.append(acc);
                console.log("Account " + account + ": saldo: " + this.clients[client].accounts[account].saldo);
                console.log("-------");
            } const end = document.createElement("span");
            end.innerHTML = "-------------------------------------------------</br></br></br>";
            body.append(end);

        }
    }
}

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
    addMoney(amount) {
        this.money += amount;
    }
    withdrawMoney(amount) {
        this.money -= amount;
    };
}

class AccountVIP extends Account {
    constructor(saldo, provise) {
        super(saldo);
        this.provise = provise;
    }
    addMoney(amount) {
        this.saldo += amount - this.provise;
    }
    withdrawMoney(amount) {
        this.saldo -= amount + this.provise;
    };
}

class AccountVAL extends Account {
    constructor(saldo) {
        super(saldo);
    }
    get getSaldo() {
        return console.log(this.saldo.toFixed(2) + "PLN");
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

class Firm extends Client {
    constructor(name, regon) {
        super();
        this.name = name;
        this.regon = regon;
    }
}

// Stwórz Bank
const bank = new Bank("Pekao S.A");
console.log(bank);

// Dodaj do niego kilku klientów różnych typów
const client1 = new Person("Johny", "Depp");
const client2 = new Firm("Polbud", "654654346");
const client3 = new Person("Sunny", "Leone");
const client4 = new Person("Edward", "Scissorhands");
const client5 = new Firm("Telezakupy MANGO", "9235680");

bank.addClient(client1);
bank.addClient(client2);
bank.addClient(client3);
bank.addClient(client4);
bank.addClient(client5);

let acc1 = new AccountVIP(0, 5);
let acc2 = new AccountVAL(0);
let acc3 = new Account(0);
let acc4 = new AccountVAL(0);
let acc5 = new AccountVAL(0);
let acc6 = new AccountVIP(0, 10);
let acc7 = new Account(0);
let acc8 = new AccountVIP(0, 12);

client1.addAccount(acc1);
client1.addAccount(acc2);

client2.addAccount(acc3);

client3.addAccount(acc4);
client3.addAccount(acc5);

client4.addAccount(acc6);
client4.addAccount(acc7);

client5.addAccount(acc8);

//funkcja losująca do sumy do wpłacenia
function randSum() {
    const sum = Math.floor(1 + Math.random() * 1000);
    return sum;
}

//wpłać losową sumę (do 1000) na każde konto i wypisz stan banku (wszystkich klientów oraz ich konta wraz z saldem)
function addRandSum() {
    for (let client in bank.clients) {
        for (let account in bank.clients[client].accounts) {
            bank.clients[client].accounts[account].saldo += randSum();
        }
    }
}

//wpłać 100 na pierwsze konto każdej Osoby;
function add100toFirstAcc() {
    for (let client in bank.clients) {
        if (bank.clients[client] instanceof Person) {
            console.log(bank.clients[client]);
            bank.clients[client].accounts[0].saldo += 100;

        };
    }
}

function add50toVIPAcc() {
    for (let client in bank.clients) {
        for (let account in bank.clients[client].accounts) {
            if (bank.clients[client].accounts[account] instanceof AccountVIP) {
                console.log(bank.clients[client].name, bank.clients[client].accounts[account]);
                bank.clients[client].accounts[account].saldo += 50;

            }
        }
    }
}

addRandSum();
bank.showClientsSaldos();
add100toFirstAcc();
bank.showClientsSaldos();
add50toVIPAcc();
bank.showClientsSaldos();
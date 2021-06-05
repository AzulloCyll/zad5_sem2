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

        for (let client of this.clients) {
            const name = document.createElement("span");

            if (client.surname) {
                console.log(client.name + ' ' + client.surname);
                name.innerHTML = client.name + ' ' + client.surname + "</br>";
                body.append(name);
            } else {
                console.log(client.name);
                name.innerHTML = client.name + "</br>";
                body.append(name);
            }

            for (let account of client.accounts) {
                const acc = document.createElement("span");
                console.log(account.saldo);
                acc.innerHTML = account.saldo + "</br>";
                body.append(acc);
            }
        }
        const end = document.createElement("span");
        end.innerHTML = "-----------</br>";
        body.append(end);
    }
}


class Account {
    constructor(saldo) {
        this.saldo = saldo;
        this.type = "DEF";
    }

    addMoney(amount) {
        this.saldo += amount;
        const SAL = document.createElement("span");
        SAL.innerHTML = "Konto typu:" + this.type + " | Wpłacono: " + amount + " | Saldo końcowe: " + this.saldo + "</br>";
        body.append(SAL);
    }
    withdrawMoney(amount) {
        this.saldo -= amount;
        const SAL = document.createElement("span");
        SAL.innerHTML = "Konto typu:" + this.type + " | Wypłacono: " + amount + "</br>";
        body.append(SAL);
    }
    get getSaldo() {
        return console.log(this.saldo.toFixed(2));
    }
}

class AccountVIP extends Account {
    constructor(saldo, provise) {
        super(saldo);
        this.provise = provise;
        this.type = "VIP";
    }
    addMoney(amount) {
        this.saldo += amount - this.provise;
        const SAL = document.createElement("span");
        SAL.innerHTML = "Konto typu:" + this.type + " | Wpłacono: " + amount + "| Saldo końcowe: " + this.saldo + " (Prowizja: -" + this.provise + ")</br> ";
        body.append(SAL);

    }
    withdrawMoney(amount) {
        this.saldo -= amount + this.provise;
        const SAL = document.createElement("span");
        SAL.innerHTML = "Konto typu:" + this.type + " | Wypłacono: " + amount + "| Saldo końcowe: " + this.saldo + " (Prowizja: -" + this.provise + ")</br> ";
        body.append(SAL);
    };
}

class AccountVAL extends Account {
    constructor(saldo, val) {
        super(saldo);
        this.val = val;
        this.type = "VAL";
    }
    get getSaldo() {
        return console.log(this.saldo.toFixed(2) + this.val);
    }
    withdrawMoney(amount) {
        const SAL = document.createElement("span");
        SAL.innerHTML = "Konto typu:" + this.type + " | Wypłacono: " + amount + " " + this.val + "</br>";
        body.append(SAL);
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
let acc2 = new AccountVAL(0, "RUB");
let acc3 = new Account(0);
let acc4 = new AccountVAL(0, "EUR");
let acc5 = new AccountVAL(0, "YEN");
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

//1. wpłać losową sumę (do 1000) na każde konto i wypisz stan banku (wszystkich klientów oraz ich konta wraz z saldem)
function addRandSumToAllAccounts(bank) {
    for (let client of bank.clients) {
        for (let account of client.accounts) {
            account.addMoney(randSum());
            console.log(account);
        }
    }
    console.log("--------");
}

//2. wpłać 100 na pierwsze konto każdej Osoby;
function add100toFirstAccOfPerson(bank) {
    for (let client of bank.clients) {
        if (client instanceof Person) {
            client.accounts[0].addMoney(100);
            console.log(client.accounts[0]);
        }
    }
    console.log("--------");
}

//3. wpłać 50 na każde konto VIP
function add50ToEveryVIPAcc(bank) {
    for (let client of bank.clients) {
        for (let account of client.accounts) {
            if (account instanceof AccountVIP) {
                account.addMoney(50);
                console.log("VIP", account);
            }
        }
    }
}

//4. wypłać 25 z kont walutowych prowadzonych w Euro
function withdrawFromEuroAcc(bank) {
    for (let client of bank.clients) {
        for (let account of client.accounts) {
            if (account.val === "EUR") {
                account.withdrawMoney(25);
            }
        }
    }
}

//5. wypłać 200 z VIP - owych kont każdej Firmy, o ile stan tego konta wynosi co najmniej 200
function withdraw200formVIPandFirmACC(bank) {
    for (let client of bank.clients) {
        if (client instanceof Firm) {
            for (let account of client.accounts) {
                if (account instanceof AccountVIP && account.saldo > 200) {
                    console.log(">200");
                    account.withdrawMoney(200);
                }
            }
        }
    }
}

//1
addRandSumToAllAccounts(bank);
// bank.showClientsSaldos();
//2
add100toFirstAccOfPerson(bank);
// // bank.showClientsSaldos();
//3
add50ToEveryVIPAcc(bank);
// // bank.showClientsSaldos();
//4
withdrawFromEuroAcc(bank);
//5
withdraw200formVIPandFirmACC(bank);

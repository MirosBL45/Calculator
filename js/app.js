class Calculator {
    constructor(predhodniTextElement, sadasnjiTextElement) {
        this.predhodniTextElement = predhodniTextElement;
        this.sadasnjiTextElement = sadasnjiTextElement;
        this.ciscenje();
    }

    ciscenje() {
        this.sadasnjiText = '';
        this.predhodniText = '';
        this.operacija = undefined;
    }

    brisanje() {
        this.sadasnjiText = this.sadasnjiText.toString().slice(0, -1); 
    }

    dodajBroj(broj) {
        if (broj === '.' && this.sadasnjiText.includes('.')) return
        this.sadasnjiText = this.sadasnjiText.toString() + broj.toString();
    }

    izaberiOperaciju(operacija) {
        if (this.sadasnjiText === '') return
        if (this.predhodniText !== '') {
            this.racunaj();
        }
        this.operacija = operacija;
        this.predhodniText = this.sadasnjiText;
        this.sadasnjiText = '';
    }

    racunaj() {
        let rezultat;
        const predh = parseFloat(this.predhodniText);
        const sadas = parseFloat(this.sadasnjiText);
        if (isNaN(predh) || isNaN(sadas)) return
        switch (this.operacija) {
            case '+':
                rezultat = predh + sadas                
                break;
            case '-':
                rezultat = predh - sadas
                break;
            case '*':
                rezultat = predh * sadas
                break;
            case ':':
                rezultat = predh / sadas
                break;
            default:
                return;
        }
        this.sadasnjiText = rezultat;
        this.operacija = undefined;
        this.predhodniText = '';
    }

    dodajZarez(broj) {
        const stringBroj = broj.toString();
        const ceoDeo = parseFloat(stringBroj.split('.')[0]);
        const decimalniDeo = stringBroj.split('.')[1];
        let prikazCelogBroja;
        if (isNaN(ceoDeo)) {
            prikazCelogBroja = '';
        } else {
            prikazCelogBroja = ceoDeo.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decimalniDeo != null) {
            return `${prikazCelogBroja}.${decimalniDeo}`;
        } else {
            return prikazCelogBroja;
        }
    }

    azurirajEkran() {
        this.sadasnjiTextElement.innerText = this.dodajZarez(this.sadasnjiText);
        if (this.operacija != null) {
            this.predhodniTextElement.innerText = `${this.dodajZarez(this.predhodniText)} ${this.operacija}`;
        } else {
            this.predhodniTextElement.innerText = '';
        }
    }
}


const brojDugmad = document.querySelectorAll('[data-broj]');
const operacijaDugmad = document.querySelectorAll('[data-operacija]');
const jednakoDugme = document.querySelector('[data-jednako]');
const brisanjeDugme = document.querySelector('[data-brisanje]');
const allClearDugme = document.querySelector('[data-all-clear]');
const predhodniTextElement = document.querySelector('[data-predhodni-rez]');
const sadasnjiTextElement = document.querySelector('[data-sadasnji-rez]');


const digitron = new Calculator(predhodniTextElement, sadasnjiTextElement);


brojDugmad.forEach(dugme => {
    dugme.addEventListener('click', () => {
        digitron.dodajBroj(dugme.innerText);
        digitron.azurirajEkran();
    })
})


operacijaDugmad.forEach(dugme => {
    dugme.addEventListener('click', () => {
        digitron.izaberiOperaciju(dugme.innerText);
        digitron.azurirajEkran();
    })
})


jednakoDugme.addEventListener('click', () => {
    digitron.racunaj();
    digitron.azurirajEkran();
})


allClearDugme.addEventListener('click', () => {
    digitron.ciscenje();
    digitron.azurirajEkran();
})


brisanjeDugme.addEventListener('click', () => {
    digitron.brisanje();
    digitron.azurirajEkran();
})


//this is for some fun
menjaOsnovu(13);
function menjaOsnovu(numic) {
    console.log(numic.toString(16));
}
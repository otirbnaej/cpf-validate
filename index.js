class CPF {
    constructor(cpf) {
        this.cpf = cpf.replace(/\D+/g, "");
    }

    stringToArray() {
        return Array.from(this.cpf);
    }

    static isSequence(cpfArr) {
        cpfArr = cpfArr.join("");
        const sequence = cpfArr[0].repeat(cpfArr.length);
        return sequence === cpfArr;
    }

    static sumDig(cpfArr) {
        return cpfArr.reduce((acc, value, index) => acc + Number(value) * ((cpfArr.length + 1) - index), 0);
    }
    
    static generateDig(acc) {
        return (11 - (acc % 11) > 9) ? 0 : 11 - (acc % 11);
    }

    static cpfCompare(cpfArray, cpfCopy) {
        return cpfArray.join("") === cpfCopy.join("");
    }

    validation() {
        if (typeof this.cpf !== "string") return false;
        let cpfArray = this.stringToArray();
        let cpfCopy = [...cpfArray];
        if (typeof cpfCopy === "undefined" || cpfCopy.length !== 11) return false;
        if (CPF.isSequence(cpfCopy)) return false;

        cpfCopy = cpfCopy.splice(0, 9);

        cpfCopy.push(String(CPF.generateDig(CPF.sumDig(cpfCopy))));
        cpfCopy.push(String(CPF.generateDig(CPF.sumDig(cpfCopy))));


        return CPF.cpfCompare(cpfArray, cpfCopy);
    }
}

// let cpf = new CPF("705.484.450-52");
// cpf = new CPF("111.111.111-11");

// cpf.validation() ? console.log("Valid CPF") : console.log("Invalid CPF");

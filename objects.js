// objects.js

class Musician {
    constructor(name, yearsPlaying, hourlyRate, instrument) {
        this.name = name;
        this.yearsPlaying = yearsPlaying;
        this.hourlyRate = hourlyRate < 50 ? 50 : hourlyRate; // Minimum rate of $50
        this.instrument = instrument;
    }

    getInterestingFact() {
        return "Music is the universal language of mankind.";
    }
}

class Guitarist extends Musician {
    constructor(name, yearsPlaying, hourlyRate, strings) {
        super(name, yearsPlaying, hourlyRate, 'Guitarist');
        this.strings = strings;
    }
    
    getInterestingFact() {
        return "The more strings you have, the better you are";
    }
}

class Bassist extends Musician {
    constructor(name, yearsPlaying, hourlyRate) {
        super(name, yearsPlaying, hourlyRate, 'Bassist');
    }
    
    getInterestingFact() {
        return "Everyone loves a bassist";
    }
}

class Percussionist extends Musician {
    constructor(name, yearsPlaying, hourlyRate) {
        super(name, yearsPlaying, hourlyRate, 'Percussionist');
    }
    
    getInterestingFact() {
        return "Me drum";
    }
}

class Flautist extends Musician {
    constructor(name, yearsPlaying, hourlyRate) {
        super(name, yearsPlaying, hourlyRate, 'Flautist');
    }
    
    getInterestingFact() {
        return "1989 heavy metal instrument of the year";
    }
}

class Troupe {
    constructor(name, genre) {
        this.name = name;
        this.genre = genre;
        this.members = [];
    }

    addMember(musician) {
        if (!(musician instanceof Musician)) {
            throw new Error("Can only add musicians to a troupe");
        }
        this.members.push(musician);
    }

    getSize() {
        return this.members.length;
    }

    getTotalCost(hours) {
        return this.members.reduce((total, musician) => total + musician.hourlyRate * hours, 0);
    }
}

module.exports = {
    Musician,
    Guitarist,
    Bassist,
    Percussionist,
    Flautist,
    Troupe
};
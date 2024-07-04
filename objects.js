// objects.js

class Musician {
    constructor(name, yearsPlaying, hourlyRate, instrument) {
        this.name = name;
        this.yearsPlaying = yearsPlaying;
        this.hourlyRate = hourlyRate < 50 ? 50 : hourlyRate;
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
        this.members.push(musician);
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
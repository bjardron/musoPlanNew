// troupeManagement.js

const prompt = require('prompt-sync')();
const { Troupe } = require('./objects');

function createTroupe(troupes) {
    const name = prompt('Enter troupe name: ');
    
    console.log('Select genre:');
    console.log('1. Rock');
    console.log('2. Jazz');
    console.log('3. Pop');
    
    const genreChoice = parseInt(prompt('Enter your choice: '));
    
    let genre;
    switch (genreChoice) {
        case 1:
            genre = 'Rock';
            break;
        case 2:
            genre = 'Jazz';
            break;
        case 3:
            genre = 'Pop';
            break;
        default:
            console.log('Invalid genre choice.');
            return;
    }

    const newTroupe = new Troupe(name, genre);
    troupes.push(newTroupe);
    console.log('Troupe created successfully.');
}

function addMusicianToTroupe(musicians, troupes) {
    if (musicians.length === 0) {
        console.log('No musicians available. Please register a musician first.');
        return;
    }
    if (troupes.length === 0) {
        console.log('No troupes available. Please create a troupe first.');
        return;
    }

    console.log('Available Musicians:');
    musicians.forEach((musician, index) => {
        console.log(`${index + 1}. ${musician.name} (${musician.instrument})`);
    });
    const musicianIndex = parseInt(prompt('Select a musician (enter number): ')) - 1;

    console.log('Available Troupes:');
    troupes.forEach((troupe, index) => {
        console.log(`${index + 1}. ${troupe.name} (${troupe.genre})`);
    });
    const troupeIndex = parseInt(prompt('Select a troupe (enter number): ')) - 1;

    if (musicianIndex >= 0 && musicianIndex < musicians.length &&
        troupeIndex >= 0 && troupeIndex < troupes.length) {
        troupes[troupeIndex].addMember(musicians[musicianIndex]);
        console.log('Musician added to troupe successfully.');
    } else {
        console.log('Invalid selection.');
    }
}

module.exports = {
    createTroupe,
    addMusicianToTroupe
};
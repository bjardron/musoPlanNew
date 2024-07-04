// musicianManagement.js

const prompt = require('prompt-sync')();
const { Guitarist, Bassist, Percussionist, Flautist } = require('./objects');
const { getInstrumentEmoji, border } = require('./menuUtils');

function registerMusician(musicians) {
    const name = prompt('Enter musician\'s name: ');
    const yearsPlaying = parseInt(prompt('Enter years playing: '));
    const hourlyRate = parseFloat(prompt('Enter hourly rate: '));

    console.log(border);
    console.log('\x1b[36m|     Available Instruments    |\x1b[0m');
    console.log(border);
    console.log(`\x1b[32m| 1. ${getInstrumentEmoji('guitarist')} Guitarist               |\x1b[0m`);
    console.log(`\x1b[33m| 2. ${getInstrumentEmoji('bassist')} Bassist                 |\x1b[0m`);
    console.log(`\x1b[34m| 3. ${getInstrumentEmoji('percussionist')} Percussionist           |\x1b[0m`);
    console.log(`\x1b[35m| 4. ${getInstrumentEmoji('flautist')} Flautist                |\x1b[0m`);
    console.log(border);

    const instrumentChoice = parseInt(prompt('Select the type of instrumentalist (enter number): '));

    let newMusician;

    switch (instrumentChoice) {
        case 1:
            const strings = parseInt(prompt('Enter number of strings: '));
            newMusician = new Guitarist(name, yearsPlaying, hourlyRate, strings);
            break;
        case 2:
            newMusician = new Bassist(name, yearsPlaying, hourlyRate);
            break;
        case 3:
            newMusician = new Percussionist(name, yearsPlaying, hourlyRate);
            break;
        case 4:
            newMusician = new Flautist(name, yearsPlaying, hourlyRate);
            break;
        default:
            console.log('Invalid instrument choice.');
            return;
    }

    musicians.push(newMusician);
    console.log(`${getInstrumentEmoji(newMusician.instrument)} ${newMusician.constructor.name} registered successfully.`);
}

module.exports = {
    registerMusician
};
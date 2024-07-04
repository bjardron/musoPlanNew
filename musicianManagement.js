// musicianManagement.js
const fs = require('fs').promises;
const { getValidName, getValidNumber, getValidHourlyRate } = require('./utils');
const { Guitarist, Bassist, Percussionist, Flautist } = require('./objects');
const logger = require('./logger');

let musicians = [];

async function loadMusicians() {
    try {
        const data = await fs.readFile('musicians.json', 'utf8');
        musicians = JSON.parse(data).map(m => {
            switch (m.instrument) {
                case 'Guitarist': return Object.assign(new Guitarist(), m);
                case 'Bassist': return Object.assign(new Bassist(), m);
                case 'Percussionist': return Object.assign(new Percussionist(), m);
                case 'Flautist': return Object.assign(new Flautist(), m);
                default: throw new Error(`Unknown instrument type: ${m.instrument}`);
            }
        });
        logger.info(`Loaded ${musicians.length} musicians from file`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            logger.warn('No existing musicians data found. Starting with an empty list.');
        } else {
            logger.error(`Error loading musicians: ${error.message}`);
        }
    }
}

async function saveMusicians() {
    try {
        await fs.writeFile('musicians.json', JSON.stringify(musicians, null, 2));
        logger.info(`Saved ${musicians.length} musicians to file`);
    } catch (error) {
        logger.error(`Error saving musicians: ${error.message}`);
    }
}

function registerMusician() {
    const name = getValidName('Enter musician\'s name: ');
    const yearsPlaying = getValidNumber('Enter years playing: ', 0, 100);
    const hourlyRate = getValidHourlyRate('Enter hourly rate: ');

    console.log('Select instrument:');
    console.log('1. Guitarist');
    console.log('2. Bassist');
    console.log('3. Percussionist');
    console.log('4. Flautist');

    const instrumentChoice = getValidNumber('Enter your choice: ', 1, 4);

    let newMusician;

    switch (instrumentChoice) {
        case 1:
            const strings = getValidNumber('Enter number of strings: ', 4, 12);
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
    }

    musicians.push(newMusician);
    logger.info(`Registered new ${newMusician.instrument}: ${name}`);
    console.log(`${newMusician.instrument} registered successfully.`);
}

module.exports = {
    loadMusicians,
    saveMusicians,
    registerMusician,
    musicians
};
// troupeManagement.js
const fs = require('fs').promises;
const { getValidInput, getValidNumber, getValidName } = require('./utils');
const { Troupe } = require('./objects.js');
const { border } = require('./menuUtils.js');
const logger = require('./logger.js');
const { ValidationError } = require('./customErrors.js');

let troupes = [];

async function loadTroupes() {
  try {
    const data = await fs.readFile('troupes.json', 'utf8');
    troupes = JSON.parse(data).map(t => Object.assign(new Troupe(), t));
    await logger.info(`Loaded ${troupes.length} troupes from file`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await logger.warn('No existing troupes data found. Starting with an empty list.');
    } else {
      await logger.error(`Error loading troupes: ${error.message}`);
    }
  }
}

async function saveTroupes() {
  try {
    await fs.writeFile('troupes.json', JSON.stringify(troupes, null, 2));
    await logger.info(`Saved ${troupes.length} troupes to file`);
  } catch (error) {
    await logger.error(`Error saving troupes: ${error.message}`);
    throw new Error('Failed to save troupes');
  }
}

async function createTroupe() {
  console.log(border);
  console.log('\x1b[36m| Choose a genre for the troupe |\x1b[0m');
  console.log(border);
  console.log('\x1b[32m| 1. Rock                       |\x1b[0m');
  console.log('\x1b[33m| 2. Jazz                       |\x1b[0m');
  console.log('\x1b[34m| 3. Pop                        |\x1b[0m');
  console.log(border);

  const genreChoice = getValidNumber('Enter your genre choice (1, 2, or 3): ', 1, 3);

  const genres = ['Rock', 'Jazz', 'Pop'];
  const genre = genres[genreChoice - 1];

  const name = getValidName('Enter troupe name: ');

  try {
    const troupe = new Troupe(name, genre);
    troupes.push(troupe);
    await saveTroupes();
    await logger.info(`Created new troupe: ${name} (${genre})`);
    console.log('Troupe created successfully.');
  } catch (error) {
    await logger.error(`Failed to create troupe: ${error.message}`);
    throw new Error('Failed to create troupe');
  }
}

async function addMusicianToTroupe(musicians) {
  if (musicians.length === 0) {
    await logger.warn('Attempted to add musician to troupe, but no musicians are registered');
    throw new ValidationError('No musicians registered yet.');
  }

  if (troupes.length === 0) {
    await logger.warn('Attempted to add musician to troupe, but no troupes are created');
    throw new ValidationError('No troupes created yet.');
  }

  console.log('Available Troupes:');
  troupes.forEach((troupe, index) => {
    console.log(`${index + 1}. ${troupe.name}`);
  });

  const troupeIndex = getValidNumber('Select troupe to add musician (enter number): ', 1, troupes.length) - 1;
  const selectedTroupe = troupes[troupeIndex];

  console.log('Available Musicians:');
  musicians.forEach((musician, index) => {
    console.log(`${index + 1}. ${musician.name}`);
  });

  const musicianIndex = getValidNumber('Select musician to add to troupe (enter number): ', 1, musicians.length) - 1;
  const selectedMusician = musicians[musicianIndex];

  try {
    selectedTroupe.addMember(selectedMusician);
    await saveTroupes();
    await logger.info(`Added musician ${selectedMusician.name} to troupe ${selectedTroupe.name}`);
    console.log('Musician added to troupe.');
  } catch (error) {
    await logger.error(`Failed to add musician to troupe: ${error.message}`);
    throw new Error('Failed to add musician to troupe');
  }
}

async function selectTroupe() {
  if (troupes.length === 0) {
    await logger.warn('Attempted to select a troupe, but no troupes are created');
    throw new ValidationError('No troupes created yet.');
  }

  console.log('Available Troupes:');
  troupes.forEach((troupe, index) => {
    console.log(`${index + 1}. ${troupe.name}`);
  });

  const troupeIndex = getValidNumber('Select troupe (enter number): ', 1, troupes.length) - 1;
  return troupes[troupeIndex];
}

module.exports = { 
  createTroupe, 
  addMusicianToTroupe, 
  selectTroupe, 
  loadTroupes, 
  saveTroupes, 
  troupes 
};
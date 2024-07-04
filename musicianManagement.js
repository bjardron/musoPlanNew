const prompt = require('prompt-sync')();
const { Guitarist, Bassist, Percussionist, Flautist } = require('./objects.js');
const { border } = require('./menuUtils.js');

let musicians = [];

function registerMusician() {
  const name = getValidName();
  const yearsPlaying = getValidNumber('Enter years playing: ');
  const hourlyRate = getValidNumber('Enter hourly rate (minimum $50): ', 50);

  console.log(border);
  console.log('\x1b[36m|     Available Instruments    |\x1b[0m');
  console.log(border);
  console.log('\x1b[32m| 1. 🎸 Guitarist               |\x1b[0m');
  console.log('\x1b[33m| 2. 🎻 Bassist                 |\x1b[0m');
  console.log('\x1b[34m| 3. 🥁 Percussionist           |\x1b[0m');
  console.log('\x1b[35m| 4. 🎶 Flautist                |\x1b[0m');
  console.log(border);

  const musicianType = prompt('Select the type of instrumentalist (enter number): ');
  let newMusician;

  switch (musicianType) {
    case '1':
      const strings = prompt('Enter number of strings: ');
      newMusician = new Guitarist(name, yearsPlaying, hourlyRate, strings);
      break;
    case '2':
      newMusician = new Bassist(name, yearsPlaying, hourlyRate);
      break;
    case '3':
      newMusician = new Percussionist(name, yearsPlaying, hourlyRate);
      break;
    case '4':
      newMusician = new Flautist(name, yearsPlaying, hourlyRate);
      break;
    default:
      console.log('Invalid selection.');
      return;
  }

  musicians.push(newMusician);
  console.log(`${newMusician.constructor.name} registered successfully.`);
}

function getValidName() {
  let name;
  do {
    name = prompt('Enter musician\'s name (3 to 30 characters): ');
    if (name.length < 3 || name.length > 30) {
      console.log('Name should be between 3 and 30 characters.');
    }
  } while (name.length < 3 || name.length > 30);
  return name;
}

function getValidNumber(promptMessage, minimum = 0) {
  let number;
  do {
    number = parseFloat(prompt(promptMessage));
    if (isNaN(number) || number < minimum) {
      console.log(`Please enter a valid number${minimum > 0 ? ` (minimum ${minimum})` : ''}.`);
    }
  } while (isNaN(number) || number < minimum);
  return number;
}

module.exports = { registerMusician, musicians };
const prompt = require('prompt-sync')();

const border = '\x1b[36m================================\x1b[0m';

function showMenu() {
  console.log(border);
  console.log('\x1b[36m|\x1b[0m\x1b[35m     MUSOPLAN\x1b[0m \x1b[32mMUSIC\x1b[0m \x1b[33mMANAGEMENT \x1b[36m    |\x1b[0m');
  console.log(border);
  console.log('\x1b[36m|\x1b[0m   \x1b[32m1. Create and Register Member   \x1b[36m|\x1b[0m');
  console.log('\x1b[36m|\x1b[0m   \x1b[33m2. Create Troupe                \x1b[36m|\x1b[0m');
  console.log('\x1b[36m|\x1b[0m   \x1b[34m3. Add Member to Troupe         \x1b[36m|\x1b[0m');
  console.log('\x1b[36m|\x1b[0m   \x1b[35m4. Calculate Show Costs         \x1b[36m|\x1b[0m');
  console.log('\x1b[36m|\x1b[0m   \x1b[36m5. Export Troupe Names          \x1b[36m|\x1b[0m');
  console.log('\x1b[36m|\x1b[0m   \x1b[32m6. Import Troupe Names          \x1b[36m|\x1b[0m');
  console.log('\x1b[36m|\x1b[0m   \x1b[33m7. Summary Troupe Info          \x1b[36m|\x1b[0m');
  console.log('\x1b[36m|\x1b[0m   \x1b[34m8. Detailed Troupe Info         \x1b[36m|\x1b[0m');
  console.log('\x1b[36m|\x1b[0m   \x1b[35m9. Exit the program             \x1b[36m|\x1b[0m');
  console.log(border);
}

function returnToMenu(afterOperation = false) {
  if (!afterOperation) {
    const returnOption = prompt('Press Enter to return to the menu.');
    return returnOption === '';
  }
  return false;
}

function exitProgram() {
  console.log('Exiting the program. Goodbye!');
  process.exit();
}

module.exports = { showMenu, returnToMenu, exitProgram, border };
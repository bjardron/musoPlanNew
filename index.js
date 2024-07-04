// index.js

const prompt = require('prompt-sync')();
const { showMenu } = require('./menuUtils');
const { registerMusician } = require('./musicianManagement');
const { createTroupe, addMusicianToTroupe } = require('./troupeManagement');
const { calculateCost, provideSummaryDescriptionOfTroupe, provideDetailedDescriptionOfTroupe } = require('./troupeOperations');
const { importNamesFromTextFile, exportNamesToTextFile } = require('./fileOperations');



let musicians = [];
let troupes = [];

function main() {
    while (true) {
        showMenu();
        const choice = prompt('Enter your choice: ');
        
        switch (choice) {
            case '1':
                registerMusician(musicians);
                break;
            case '2':
                createTroupe(troupes);
                break;
            case '3':
                addMusicianToTroupe(musicians, troupes);
                break;
            case '4':
                calculateCost(troupes);
                break;
            case '5':
                exportNamesToTextFile(musicians, troupes);
                break;
            case '6':
                importNamesFromTextFile(troupes);
                break;
            case '7':
                provideSummaryDescriptionOfTroupe(troupes);
                break;
            case '8':
                provideDetailedDescriptionOfTroupe(troupes);
                break;
            case '9':
                console.log('Exiting program. All data will be lost.');
                process.exit(0);
            default:
                console.log('Invalid choice. Please try again.');
        }
    }
}

main();
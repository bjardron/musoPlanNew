// index.js

const prompt = require('prompt-sync')();
const { showMenu, exitProgram } = require('./menuUtils');
const { registerMusician, loadMusicians, saveMusicians, musicians } = require('./musicianManagement');
const { createTroupe, addMusicianToTroupe, loadTroupes, saveTroupes, troupes } = require('./troupeManagement');
const { calculateAndDisplayCost, provideSummaryDescriptionOfTroupe, provideDetailedDescriptionOfTroupe } = require('./troupeOperations');
const { importNamesFromTextFile, exportNamesToTextFile } = require('./fileOperations');
const logger = require('./logger');

async function main() {
    try {
        await loadMusicians();
        await loadTroupes();

        while (true) {
            showMenu();
            const choice = prompt('Enter your choice: ');
            
            try {
                switch (choice) {
                    case '1':
                        await registerMusician();
                        break;
                    case '2':
                        await createTroupe();
                        break;
                    case '3':
                        await addMusicianToTroupe(musicians);
                        break;
                    case '4':
                        await calculateAndDisplayCost(troupes);
                        break;
                    case '5':
                        await exportNamesToTextFile(musicians, troupes);
                        break;
                    case '6':
                        const importedNames = await importNamesFromTextFile(troupes);
                        console.log(`Imported ${importedNames.length} names.`);
                        break;
                    case '7':
                        if (troupes.length > 0) {
                            const troupe = troupes[0]; // For example, showing the first troupe
                            console.log(provideSummaryDescriptionOfTroupe(troupe));
                        } else {
                            console.log('No troupes available.');
                        }
                        break;
                    case '8':
                        if (troupes.length > 0) {
                            const troupe = troupes[0]; // For example, showing the first troupe
                            console.log(provideDetailedDescriptionOfTroupe(troupe));
                        } else {
                            console.log('No troupes available.');
                        }
                        break;
                    case '9':
                        await saveMusicians();
                        await saveTroupes();
                        exitProgram();
                        break;
                    default:
                        console.log('Invalid choice. Please try again.');
                }
            } catch (error) {
                console.error('An error occurred:', error.message);
                logger.error(`Error in main loop: ${error.message}`);
            }
        }
    } catch (error) {
        console.error('Fatal error:', error.message);
        logger.error(`Fatal error in main: ${error.message}`);
        process.exit(1);
    }
}

main().catch(error => {
    console.error('Unhandled error in main:', error);
    logger.error(`Unhandled error in main: ${error.message}`);
    process.exit(1);
});
// fileOperations.js

const fs = require('fs').promises;
const path = require('path');
const prompt = require('prompt-sync')();
const logger = require('./logger');
const { ValidationError } = require('./customErrors');

/**
 * Import names from a text file.
 * @param {Array} troupes - The array of troupes to potentially add to.
 * @returns {Promise<Array>} The array of imported names.
 */
async function importNamesFromTextFile(troupes) {
    const filePath = prompt('Enter the file path: ');
    let importedNames = [];

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const lines = data.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
            const [name, genre] = line.split(',').map(item => item.trim());
            if (name && genre) {
                importedNames.push({ name, genre });
                logger.info(`Imported: ${name} (${genre})`);
            } else {
                logger.warn(`Invalid line in import file: ${line}`);
            }
        }

        logger.info(`Successfully imported ${importedNames.length} names from ${filePath}`);
        console.log(`Imported ${importedNames.length} names successfully.`);
    } catch (error) {
        logger.error(`Error importing names: ${error.message}`);
        throw new ValidationError('Failed to import names from file.');
    }

    return importedNames;
}

/**
 * Export names to a text file.
 * @param {Array} musicians - The array of musicians.
 * @param {Array} troupes - The array of troupes.
 */
async function exportNamesToTextFile(musicians, troupes) {
    const fileName = prompt('Enter the file name to export: ');
    const filePath = path.join(process.cwd(), `${fileName}.txt`);

    const allNames = [
        ...musicians.map(m => `${m.name},${m.instrument}`),
        ...troupes.map(t => `${t.name},${t.genre}`)
    ];

    if (allNames.length === 0) {
        logger.warn('No names to export');
        console.log('No names to export.');
        return;
    }

    try {
        await fs.writeFile(filePath, allNames.join('\n'));
        logger.info(`Successfully exported ${allNames.length} names to ${filePath}`);
        console.log(`Exported ${allNames.length} names to ${filePath}`);
    } catch (error) {
        logger.error(`Error exporting names: ${error.message}`);
        throw new ValidationError('Failed to export names to file.');
    }
}

module.exports = {
    importNamesFromTextFile,
    exportNamesToTextFile
};
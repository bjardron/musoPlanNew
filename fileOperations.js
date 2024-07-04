// fileOperations.js

const fs = require('fs');
const prompt = require('prompt-sync')();
const { Troupe } = require('./objects');

function exportNamesToTextFile(musicians, troupes) {
    const fileName = prompt('Enter the file name to export: ');
    let content = "Musicians:\n";
    musicians.forEach(musician => {
        content += `${musician.name},${musician.instrument}\n`;
    });
    content += "\nTroupes:\n";
    troupes.forEach(troupe => {
        content += `${troupe.name},${troupe.genre}\n`;
    });

    fs.writeFile(fileName, content, (err) => {
        if (err) {
            console.log('Error writing to file:', err);
        } else {
            console.log('Names exported successfully!');
        }
    });
}

function importNamesFromTextFile(troupes) {
    const fileName = prompt('Enter the file name to import: ');
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file:', err);
            return;
        }

        const lines = data.split('\n');
        let isTroupeSection = false;

        lines.forEach(line => {
            if (line.trim() === 'Troupes:') {
                isTroupeSection = true;
                return;
            }

            if (isTroupeSection) {
                const [name, genre] = line.split(',');
                if (name && genre) {
                    const newTroupe = new Troupe(name.trim(), genre.trim());
                    troupes.push(newTroupe);
                }
            }
        });

        console.log('Names imported successfully!');
    });
}

module.exports = {
    exportNamesToTextFile,
    importNamesFromTextFile
};
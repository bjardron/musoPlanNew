// troupeOperations.js

const prompt = require('prompt-sync')();

function calculateCost(troupes) {
    if (troupes.length === 0) {
        console.log('No troupes available. Please create a troupe first.');
        return;
    }

    console.log('Available Troupes:');
    troupes.forEach((troupe, index) => {
        console.log(`${index + 1}. ${troupe.name} (${troupe.genre})`);
    });

    const troupeIndex = parseInt(prompt('Select a troupe (enter number): ')) - 1;

    if (troupeIndex < 0 || troupeIndex >= troupes.length) {
        console.log('Invalid troupe selection.');
        return;
    }

    const selectedTroupe = troupes[troupeIndex];
    const duration = parseFloat(prompt('Enter performance duration in hours: '));

    if (isNaN(duration) || duration <= 0) {
        console.log('Invalid duration. Please enter a positive number.');
        return;
    }

    const totalCost = selectedTroupe.members.reduce((sum, musician) => sum + musician.hourlyRate * duration, 0);

    console.log(`The total cost for ${selectedTroupe.name} performing for ${duration} hours is $${totalCost.toFixed(2)}.`);
}

function provideSummaryDescriptionOfTroupe(troupes) {
    if (troupes.length === 0) {
        console.log('No troupes available. Please create a troupe first.');
        return;
    }

    console.log('Available Troupes:');
    troupes.forEach((troupe, index) => {
        console.log(`${index + 1}. ${troupe.name} (${troupe.genre})`);
    });

    const troupeIndex = parseInt(prompt('Select a troupe (enter number): ')) - 1;

    if (troupeIndex < 0 || troupeIndex >= troupes.length) {
        console.log('Invalid troupe selection.');
        return;
    }

    const selectedTroupe = troupes[troupeIndex];

    console.log(`\nSummary of ${selectedTroupe.name}:`);
    console.log(`Genre: ${selectedTroupe.genre}`);
    console.log(`Number of members: ${selectedTroupe.members.length}`);

    const instrumentCounts = selectedTroupe.members.reduce((counts, musician) => {
        counts[musician.instrument] = (counts[musician.instrument] || 0) + 1;
        return counts;
    }, {});

    console.log('Instruments:');
    for (const [instrument, count] of Object.entries(instrumentCounts)) {
        console.log(`  ${instrument}: ${count}`);
    }
}

function provideDetailedDescriptionOfTroupe(troupes) {
    if (troupes.length === 0) {
        console.log('No troupes available. Please create a troupe first.');
        return;
    }

    console.log('Available Troupes:');
    troupes.forEach((troupe, index) => {
        console.log(`${index + 1}. ${troupe.name} (${troupe.genre})`);
    });

    const troupeIndex = parseInt(prompt('Select a troupe (enter number): ')) - 1;

    if (troupeIndex < 0 || troupeIndex >= troupes.length) {
        console.log('Invalid troupe selection.');
        return;
    }

    const selectedTroupe = troupes[troupeIndex];

    console.log(`\nDetailed Description of ${selectedTroupe.name}:`);
    console.log(`Genre: ${selectedTroupe.genre}`);
    console.log(`Number of members: ${selectedTroupe.members.length}`);
    console.log('\nMembers:');

    selectedTroupe.members.forEach((musician, index) => {
        console.log(`  ${index + 1}. ${musician.name}`);
        console.log(`     Instrument: ${musician.instrument}`);
        console.log(`     Years Playing: ${musician.yearsPlaying}`);
        console.log(`     Hourly Rate: $${musician.hourlyRate}`);
        console.log(`     Interesting Fact: ${musician.getInterestingFact()}`);
        console.log();
    });
}

module.exports = {
    calculateCost,
    provideSummaryDescriptionOfTroupe,
    provideDetailedDescriptionOfTroupe
};
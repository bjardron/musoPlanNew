// utils.js

const prompt = require('prompt-sync')();

/**
 * Get valid input from the user based on a custom validator function.
 * @param {string} promptMessage - The message to display to the user.
 * @param {function} validator - A function that returns true if the input is valid.
 * @param {string} errorMessage - The message to display if the input is invalid.
 * @returns {string} The valid input from the user.
 */
function getValidInput(promptMessage, validator, errorMessage) {
    let input;
    do {
        input = prompt(promptMessage);
        if (!validator(input)) {
            console.log(errorMessage);
        }
    } while (!validator(input));
    return input;
}

/**
 * Get a valid number input from the user within a specified range.
 * @param {string} promptMessage - The message to display to the user.
 * @param {number} min - The minimum acceptable value.
 * @param {number} max - The maximum acceptable value.
 * @returns {number} The valid number input from the user.
 */
function getValidNumber(promptMessage, min, max) {
    return parseInt(getValidInput(
        promptMessage,
        (input) => !isNaN(input) && Number(input) >= min && Number(input) <= max,
        `Please enter a number between ${min} and ${max}.`
    ));
}

/**
 * Get a valid name input from the user.
 * @param {string} promptMessage - The message to display to the user.
 * @returns {string} The valid name input from the user.
 */
function getValidName(promptMessage) {
    return getValidInput(
        promptMessage,
        (input) => input.length >= 3 && input.length <= 30,
        'Name should be between 3 and 30 characters.'
    );
}

/**
 * Get a valid hourly rate input from the user.
 * @param {string} promptMessage - The message to display to the user.
 * @returns {number} The valid hourly rate input from the user.
 */
function getValidHourlyRate(promptMessage) {
    return parseFloat(getValidInput(
        promptMessage,
        (input) => !isNaN(input) && Number(input) >= 50,
        'Hourly rate should be a number and at least $50.'
    ));
}

/**
 * Format currency to two decimal places.
 * @param {number} amount - The amount to format.
 * @returns {string} The formatted currency string.
 */
function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

module.exports = {
    getValidInput,
    getValidNumber,
    getValidName,
    getValidHourlyRate,
    formatCurrency
};
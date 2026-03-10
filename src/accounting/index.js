#!/usr/bin/env node

// Node.js port of COBOL account management app
// Preserves the same business logic and data flow:
// - Main menu
// - Operations: TOTAL, CREDIT, DEBIT
// - Data persistence (memory storage)

const readline = require('readline');

let storageBalance = 1000.00; // equivalent to DataProgram STORAGE-BALANCE

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function readBalance(callback) {
  callback(storageBalance);
}

function writeBalance(newBalance, callback) {
  storageBalance = newBalance;
  callback();
}

function showMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
  rl.question('Enter your choice (1-4): ', handleMenu);
}

function handleMenu(rawChoice) {
  const choice = rawChoice.trim();

  if (choice === '1') {
    // TOTAL
    readBalance(balance => {
      console.log(`Current balance: ${balance.toFixed(2)}`);
      showMenu();
    });

  } else if (choice === '2') {
    // CREDIT
    rl.question('Enter credit amount: ', input => {
      const amount = parseFloat(input);
      if (Number.isNaN(amount) || amount < 0) {
        console.log('Invalid credit amount. Please enter a positive number.');
        return showMenu();
      }

      readBalance(balance => {
        const finalBalance = parseFloat((balance + amount).toFixed(2));
        writeBalance(finalBalance, () => {
          console.log(`Amount credited. New balance: ${finalBalance.toFixed(2)}`);
          showMenu();
        });
      });
    });

  } else if (choice === '3') {
    // DEBIT
    rl.question('Enter debit amount: ', input => {
      const amount = parseFloat(input);
      if (Number.isNaN(amount) || amount < 0) {
        console.log('Invalid debit amount. Please enter a positive number.');
        return showMenu();
      }

      readBalance(balance => {
        if (balance >= amount) {
          const finalBalance = parseFloat((balance - amount).toFixed(2));
          writeBalance(finalBalance, () => {
            console.log(`Amount debited. New balance: ${finalBalance.toFixed(2)}`);
            showMenu();
          });
        } else {
          console.log('Insufficient funds for this debit.');
          showMenu();
        }
      });
    });

  } else if (choice === '4') {
    console.log('Exiting the program. Goodbye!');
    rl.close();

  } else {
    console.log('Invalid choice, please select 1-4.');
    showMenu();
  }
}

function startApp() {
  showMenu();
}

if (require.main === module) {
  startApp();
}

module.exports = {
  startApp,
  readBalance,
  writeBalance,
  showMenu,
  handleMenu,
  __data: () => ({ storageBalance })
};

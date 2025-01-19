const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Greeting! Please enter some text to save to a file.');

rl.question('Enter your text: ', (userInput) => {

    if (userInput.toLowerCase() === 'exit') {
        rl.close();
        return;
      }
  
  fs.writeFile('./text.txt', userInput, (err) => {
    if (err) {
      console.error('Error', err);
      rl.close();
      return;
    }
    rl.close();
  });

  rl.on('SIGINT', () => {
    rl.close();
    process.exit(0);
  });
});

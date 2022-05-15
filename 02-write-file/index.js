const fs = require('fs');
const path = require('path');

const { stdin, stdout } = require('process');

fs.writeFile(
  path.join(__dirname, 'text.txt'), '',
  (err) => {
    if (err) throw err;
  }
);
stdout.write('Write your message, to finish press Ctrl+C or enter "exit"\n');
stdin.on('data', data => {
  if (data.toString().replace(/\s/g, '') === 'exit') {
    console.log('Goodbye!!!');
    process.exit(); 
  }
  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    data,  
    (err) => {
      if (err) throw err;
    },
  );
});
process.on('SIGINT', () => {
  console.log('Goodbye!!!');
  process.exit();
});

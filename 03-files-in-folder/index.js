const fs = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, (err, files) => {
  if (err) {
    console.error('Error', err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(pathToFolder, file);
    
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error('Error', err);
        return;
      }

      const fileExt = path.extname(file).slice(1);
      
      const fileSizeKb = (stats.size / 1024).toFixed(3);

      console.log(`${file} - ${fileExt} - ${fileSizeKb}kb`);
    });
  });
});
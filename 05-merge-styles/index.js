const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const projectDistDir = path.join(__dirname, 'project-dist');
const cssPath = path.join(projectDistDir, 'bundle.css');

if (!fs.existsSync(projectDistDir)) {
  fs.mkdirSync(projectDistDir);
}

fs.readdir(stylesDir, (err, files) => {
  if (err) {
    console.error('Error', err);
    return;
  }

  const cssFiles = files.filter(file => path.extname(file) === '.css');

  Promise.all(cssFiles.map(file => 
    fs.promises.readFile(path.join(stylesDir, file), 'utf8')
  ))
  .then(stylesContents => {

    const allStyles = stylesContents.join('\n');

    return fs.promises.writeFile(cssPath, allStyles);
  })
});
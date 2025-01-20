const fs = require('fs');
const path = require('path');

function copyDir(sourcePath, destinationPath, callback) {
    fs.mkdir(destinationPath, { recursive: true }, () => {
        fs.readdir(sourcePath, (readdirErr, files) => {
            if (readdirErr) {
                return callback(readdirErr);
            }

            let pendingOperations = files.length;

            if (pendingOperations === 0) {
                return callback(null);
            }

            files.forEach((file) => {
                const sourceFile = path.join(sourcePath, file);
                const destFile = path.join(destinationPath, file);

                fs.stat(sourceFile, (statErr, stats) => {
                    if (stats.isFile()) {
                        fs.copyFile(sourceFile, destFile, () => {
                            checkCompletion();
                        });
                    } else if (stats.isDirectory()) {
                        copyDir(sourceFile, destFile, () => {
                            checkCompletion();
                        });
                    }
                });
            });

            function checkCompletion() {
                pendingOperations--;
                if (pendingOperations === 0) {
                    callback(null);
                }
            }
        });
    });
}

const sourceDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

copyDir(sourceDir, destDir, (err) => {
    if (err) {
        console.error('Error copying directory:', err);
    } else {
        console.log('Directory copied successfully');
    }
});
const fs = require('fs');
const path = require('path');
const directoryPath = path.resolve('./mock/json-bodys');
let data = {};
function readJsonFiles(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            data = { ...readJsonFiles(filePath) };
        } else if (path.extname(file) === '.json') {
            const fileContent = fs.readFileSync(filePath);
            const jsonObject = JSON.parse(fileContent);
            const key = path.basename(file, '.json');
            data[key] = jsonObject;
        }
    });

    return data;
}
//{ '.json file name inside json-bodys': js obj}
const dbData = readJsonFiles(directoryPath);

module.exports = dbData;

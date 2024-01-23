const fs = require('fs')

function readDB(dbName) {
    // read Json object form file
    const data = fs.readFileSync(dbName, 'utf8')
    return JSON.parse(data)
}

function writeDb(obj, dbName = 'Votingdb.json') {
    if (!obj) {
        return console.log('Please provide data to save')
    }
    try {
        fs.writeFileSync(dbName, JSON.stringify(obj)) //overrites current data
        return console.log('SAVE SUCCESS')
    } catch (err) {
        return console.log('FAILED TO WRITE')
    }
}

module.exports = {readDB, writeDb}
const express = require('express')
const app = express()
const port = 8383

const {readDB, writeDb} = require('./dbFunctions')

app.use(express.static('public')) //Will look for a public file and serve up items in the file
app.use(express.json()) //Telling app to expect a json file



//routes HTTP verbs (GET, POST, PUT, DELETE)
app.post('/' ,  (req, res) => {
    const currentPolls = readDB('db.json')
    res.sendStatus(200)

})

//Send through an array of ID making sure there are no repeating ids (May need to remove)
app.get('/pollIds', (req, res) => {
    const pollIds = readDB('db.json')
    res.status(200).send({pollIds: Object.keys(pollIds)})
})

//has a dynamic id /:pollId
app.get('/:pollId', (req, res) => {
    const {pollId} = req.params
    try {
        return res.status(200).sendFile( 'Vote.html', {root: __dirname + '/public' })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

//Sending Poll data to html
app.get('/data/:pollId', (req, res) => {
    const { pollId } = req.params
    const data = readDB('db.json')
    res.status(200).send({ data })
})

// Sending voting data to html
app.get('/voting/:pollId', (req, res) => {
    const {pollId} = req.params
    const voting = readDB('Votingdb.json')
    res.status(200).send({ voting })
})

app.post('/vote', (req, res) => {
    const { id, vote } = req.body
    const voting = readDB('Votingdb.json')
    voting[id]['options'][vote] += 1
    writeDb(voting)
    res.sendStatus(200)
})


// Used to check and show that database is connected and data is recieved. 
console.log(readDB('db.json'))
console.log(readDB('Votingdb.json'))
app.listen(port, () => console.log(`Server has started on port: ${port}`))
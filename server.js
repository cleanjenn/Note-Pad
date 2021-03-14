const { dbnotes } = require('./Develop/db/db.json');
const express = require('express');
const fs = require('fs');
const path = require('path');

//listen for express
const app = express();
// transfer the json data by parse
app.use(express.json());
// creating the public file to static 
app.use(express.static('public'));

// add the route for notes
app.get('api/notes', (req, res) => {
    console.log(req.query);
    res.sendFile(path.join(__dirname, './public/notes.html'))
    res.json(req.query);
});

//direct the notes to html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));

});

app.get('/api/notes', (req, res) => {
    console.log('app.get request for /api/notes');
    console.log(dbnotes)
    res.json(dbnotes);
});

app.post('/api/notes', (req, res) => {
    res.body.id = dbnotes.length.toString();
    const notes = req.body;
    dbnotes.push(notes);

    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify(dbnotes, null, 2)
    ); res.json(notes);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
} );

// chain method to listen 
app.listen(3001, () => {
   console.log(`API server now on port 3001!`);
});
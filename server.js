const dbnotes = require('./db/db.json');
const express = require('express');
const fs = require('fs');
const path = require('path');
//listen for express
const app = express();
const PORT = process.env.PORT || 3001;  //process env for heroku 

// transfer the json data by parse
app.use(express.urlencoded({ extended: true }));
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
    console.log('get request for /api/notes');
    res.json(dbnotes);
});

app.post('/api/notes', (req, res) => {
    console.log(res.body);
      // req.body is where our incoming content will be
    req.body.id = dbnotes.length.toString();
    const note = req.body;
    dbnotes.push(note);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(dbnotes, null, 2)
    ); 
    res.json(note);
});


//bonus delete notes
app.delete('/api/notes/:id', (req, res) => {
    dbnotes.filter(dbnote => dbnote.id != req.params.id);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(dbnotes.filter(dbnote => dbnote.id != req.params.id), null, 2)
    );
    res.send('Note being deleted');
});
    
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// chain method to listen via port of Heroku
app.listen(PORT, () => {
   console.log(`API server now on port ${PORT}`);
});
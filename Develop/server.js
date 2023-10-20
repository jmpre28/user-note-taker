const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const app = express();
const { readAndAppend, readFromFile } = require('./helpers/fs')

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('public'));

// generates unique id
const id = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
});

// Create route to write notes
app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
    if (req.body) {
        let newNote = {
            title,
            text,
            id: id()
        };
        readAndAppend(newNote, './db/db.json')
        res.json(newNote)
    }
});

// Delete route to remove notes
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const deleteNote = JSON.parse(data).filter(newNote => newNote.id !== id);
            fs.writeFile('./db/db.json', JSON.stringify(deleteNote), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(deleteNote);
                }
            });
        }
    });
});

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen( PORT, () => 
    console.log(`App listening at port: ${PORT}`)
);
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const app = express();

const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res) => {
    res.status(200).json(db);
});

app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
    if (req.body) {
        let newNote = {
            title,
            text,
            id
        };


            // readfile

            // then write file
    }
});

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen( PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);
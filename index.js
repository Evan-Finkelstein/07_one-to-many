
require('dotenv').config();
const express = require('express');
const Owner = require('./models/owners.js');
const Pet = require('./models/pets.js');
const app = express();
app.use(express.json());


app.post('/pets', async (req, res) => {
    Pet
        .insert(req.body)
        .then(pet => res.send(pet));
});


app.get('/pets', async (req, res) => {
    Pet
        .find()
        .then(pet => res.send(pet));

});

app.get('/pets/:id', async (req, res) => {
    Pet
        .findById(req.params.id)
        .then(pet => res.send(pet));

});

app.put('/pets/:id', async (req, res) => {
    Pet
        .update(req.params.id, req.body)
        .then(pet => res.send(pet));
});

app.delete('/pets/:id', async (req, res) => {
    Pet
        .delete(req.params.id)
        .then(pet => res.send(pet));
});
app.post('/owners', async (req, res) => {
    Owner
        .insert(req.body)
        .then(owner => res.send(owner));
});


app.get('/owners', async (req, res) => {
    Owner
        .find()
        .then(owner => res.send(owner));

});

app.get('/owners/:id', async (req, res) => {
    Owner
        .findById(req.params.id)
        .then(owner => res.send(owner));

});

app.put('/owners/:id', async (req, res) => {
    Owner
        .update(req.params.id, req.body)
        .then(owner => res.send(owner));
});

app.delete('/owners/:id', async (req, res) => {
    Owner
        .delete(req.params.id)
        .then(owner => res.send(owner));
});

module.exports = app;

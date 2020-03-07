const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8082;

const app = express();
// Sets up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const characters = [
    {
        route: 'yoda',
        name: 'Yoda',
        role: 'Jedi Master',
        age: 900,
        forcePoints: 2000
    },
    {
        route: 'darthmaul',
        name: 'Darth Maul',
        role: 'Sith Lord',
        age: 200,
        forcePoints: 1200
    },
    {
        route: 'obiwankenobi',
        name: 'Obi-wan Kenobi',
        role: 'Jedi',
        age: '140',
        forcePoints: 1300
    }
]

app.get('/', (req, res) => {
    //res.send('Welcome to the Star Wars page')
    res.sendFile(path.join(__dirname, 'view.html'));
});

app.get('/add', (req, res) => {
    //res.send('Welcome to the Star Wars page')
    res.sendFile(path.join(__dirname, 'add.html'));
});

app.get('/api/characters/:character', (req, res) => {
    const character = req.params.character;

    console.log(character);

    let found;

    characters.forEach(char => {
        if(character === char.route){
            return res.json(char);
        }
    })

    res.json(found || { success: false })

});

app.post('/api/characters', (req, res) => {
    const newCharacter = req.body;

    newCharacter.route = req.body.name.split(' ').join('').toLowerCase();
    
    characters.push(newCharacter);
    res.json(newCharacter);
})

app.listen(PORT, () => {
    console.log(`Server is listening to port: ${PORT}`);
});
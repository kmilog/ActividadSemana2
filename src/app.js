const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const directorioPublico = path.join(__dirname, '../public');
app.use(express.static(directorioPublico));
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'hbs');

app.post('/cursos', (req, res) => {
    res.render('cursos', {
        id: parseInt(req.body.id),
        nombre: parseInt(req.body.nota1),
        descripcion : parseInt(req.body.nota2),
        valor : parseInt(req.body.nota3) 
    })
})

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
})
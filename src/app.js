const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const {check,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
require('./HelperCursos');

const directorioPublico = path.join(__dirname, '../public');
app.use(express.static(directorioPublico));
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'hbs');

app.get('/Cursos', (req, res) => {
    res.render('cursos', {
    });
});

app.post('/CrearCursos', 
    [
        check('id', 'El id es campo obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es campo obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es campo obligatorio').not().isEmpty(),
        check('valor', 'El valor es campo obligatorio').not().isEmpty(),
    ],
    (req, res) => {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('cursos', {error: errors.array()}); //res.status(422).jsonp(errors.array());
        }else{
                res.render('cursos', {
                    id: parseInt(req.body.id),
                    nombre: req.body.nombre,
                    descripcion : req.body.descripcion,
                    valor : parseInt(req.body.valor),
                    modalidad: req.body.modalidad
            })
        }
})

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
})
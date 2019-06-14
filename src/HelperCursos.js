const hbs = require('hbs');
const fs = require('fs');

listaCursos = [];

const listar = () => {
    try{
        listaCursos = require('../ListadoCursos.json');
    }catch(error){
        listaCursos = [];
    }
}

hbs.registerHelper('CrearCurso', (id, nombre, descripcion, valor, modalidad, error) => {
    listar();
    if(error != undefined){
        var texto = '';
        error.forEach(element => {
            texto = texto + ' ' + element.msg;
        })
        return texto;
    }
    let cur = {
        id : id,
        nombre : nombre,
        descripcion : descripcion,
        valor : valor,
        modalidad: modalidad,
        estado: 'Disponible'
    };
    let duplicado = listaCursos.find(x => x.id == id);
    if(!duplicado){
        listaCursos.push(cur);
        return guardar();
    }else{
        return "El id del curso ingresa ya se encuentra en la base.";
    }
})

const guardar = () => {
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('ListadoCursos.json', datos, (err) => {
        if(err) throw (err);
        return "Registro guardado con exito";
    })
}

hbs.registerHelper('Listar', () => {
    listaCursos = require('../ListadoCursos.json');
    let texto = '<table> \
                        <th> Id </th> \
                        <th> Nombre </th> \
                        <th> Descripcion </th> \
                        <th> Valor </th> \
                        <th> Modalidad </th> \
                        <th> Estado </th> \
                    </thead> \
                    <tbody>';
    
        listaCursos.forEach(element => {
            if(element.id != undefined){
                texto = texto + '<tr>' +
                        "<td>" + element.id + '</td>' + 
                        "<td>" + element.nombre + '</td>' + 
                        "<td>" + element.descripcion + '</td>' + 
                        "<td>" + element.valor + '</td>' +
                        "<td>" + element.modalidad + '</td>' +
                        "<td>" + element.estado + '</td>' +
                        "</tr>"
            }
    });
    texto = texto + "</tbody></table>";

    return texto;
})
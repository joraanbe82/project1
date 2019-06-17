// el controlador es el que se encarga de gestionar la info que llega del modelo


const path = require("path");
const fs = require("fs");
const model = require('../model/modelAlumno');

function list(req, res) {
    model.getAllAlumnos()
        .then(result => {//ha funcionado
                res.render('perfil', {
                data: result
            });
            
        })
        .catch(function (err) { // ha fallado
            console.log("Ha fallado la promesa de conexion a la BDD");
            res.send("Ha fallado la promesa de conexion a la BDD");
        })
        
};

function save(req, res) {

    const tempPath = req.file.path;
    
    let imgName = req.file.filename + ".png";
    const targetPath = path.join("controllers/images/img-perfiles/" + imgName);
   
    fs.rename(tempPath, targetPath, err => {
        console.log("PETADAA: " + err);
    });
     

    let data = req.body; // aqui como entra la imagen imgName
    console.log("req.file: "+ JSON.stringify(req.file));
    model.addNewAlumno(data, imgName)
        .then(result => {
            console.log("ha ido guay")
            res.redirect('/perfil');
        })
        .catch(function (err) {
            console.log(err)
            res.send("vaya respuesta chunga")
        })

};

function edit(req, res) {

    const id = req.params.id;
    model.editAlumno(id)
    .then(result => {
        console.log("ha servido el edit")
        res.render('updateDatos', {data:result[0]});//importante indicar el indice para que solo lea el ID
        console.log("ha servido el edit " +  JSON.stringify(result));
    })
    .catch(function (err) {
        console.log(err)
        res.send("falla el edit")
    })
};

function update(req, res) {

    const tempPath2 = req.file.path;
    
    let imgName2 = req.file.filename + ".png";
    const targetPath2 = path.join("controllers/images/img-perfiles/" + imgName2);
    console.log("ImgName: " + imgName2);
    console.log("TEMPPATH: " + tempPath2);
    console.log("TARGETPATH: " + targetPath2);

    fs.rename(tempPath2, targetPath2, err => {
        console.log("PETADAA: " + err);
    });

    let id = req.params.id;
    let newAlumno = req.body;
    console.log(newAlumno.first_name)
    model.updateAlumno(id, newAlumno, imgName2)
    .then(result => {
        console.log("ha servido el update")
        res.redirect('/perfil');
    })
    .catch(function (err) {
        console.log(err)
        res.send("falla el update")
    })
};

function delAlumno(req, res) {
    const id = req.params.id;
    let newAlumno = req.body;
    console.log(id);
    model.deleteAlumno(id, newAlumno)
    .then(result => {
        console.log("Borrado ok")
        res.redirect('/perfil');
    })
    .catch(function (err) {
        console.log(err)
        res.send("falla el delete")
    })

};


function orderByName(req, res) {
    model.orderByName()
        .then(result => { //ha funcionado
            res.render('orderByName', {
                data: result
            });
        })
        .catch(function (err) { // ha fallado
            console.log("Ha fallado la promesa de conexion a la BDD");
            res.send("Ha fallado la promesa de conexion a la BDD");
        })
};

function orderByBelt(req, res) {
    model.orderByBelt()
        .then(result => { //ha funcionado
            res.render('orderByBelt', {
                data: result
            });
        })
        .catch(function (err) { // ha fallado
            console.log("Ha fallado la promesa de conexion a la BDD");
            res.send("Ha fallado la promesa de conexion a la BDD");
        })
};


function orderByAge(req, res) {
    model.orderByAge()
        .then(result => { //ha funcionado
            res.render('orderByAge', {
                data: result
            });
        })
        .catch(function (err) { // ha fallado
            console.log("Ha fallado la promesa de conexion a la BDD");
            res.send("Ha fallado la promesa de conexion a la BDD");
        })
};

module.exports = {
    list,
    save,
    delAlumno,
    update, 
    edit,
    orderByName,
    orderByBelt,
    orderByAge   

};
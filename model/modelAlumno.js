// Aqui trabajamos con la conexion a la base de datos
//Hago una referencia a la bd con el archivo creado en la carpeta config
const dbConn = require('../config/db');

function getAllAlumnos(){
    return new Promise ((resolve, reject) => {
        const sqlFindAll = 'SELECT * FROM alumno';
        dbConn.query(
            sqlFindAll,
            (err, result) => {
                console.log("Tengo respuesta de la BDD");
                if(err)
                    reject(err);
                else {
                    resolve(result);
                };    
            }
        );
    });
};

const validate = data => {
    if (!data.first_name) return false;
    return true;
}
  
function addNewAlumno (data, imgName) {  
    return new Promise ( (resolve, reject) => {
      if (!validate(data)) reject("Invalid data");
      let sqlAddNew = "INSERT INTO alumno(first_name, last_name, birth_date, nationality, weight, belt, email, picture) VALUES";
      sqlAddNew += "('" + data.first_name + "', '" + data.last_name + "', '" + data.birth_date + "', '" + data.nationality + "', '" + data.weight + "', '" + data.belt + "', '" + data.email +"', '" + imgName +"')";
      dbConn.query(
         sqlAddNew,
        (err, result) => {
          console.log("Hay respuesta de la bd");
          if (err)
            reject(err);
          else {
            resolve(result);
        };
    })
  })
};


function editAlumno(id) {
    return new Promise ((resolve, reject) =>{
        const sqlEdit = 'SELECT * FROM alumno WHERE id=' + id;
        console.log(' espacio ' + sqlEdit)
    dbConn.query(
        sqlEdit,
        (err, result) => {
            console.log("hay respuesta promesa edit " + result);
            if(err)
                reject({"Fallo ":err});
            else {
                resolve(result);
            }
        });
    })
};


function updateAlumno(id, newAlumno, imgName2) {
    console.log("id de promesa update "+ id + " objeto newAlumno " + newAlumno.first_name);
    return new Promise ((resolve, reject)=> {
        const sqlNewAlumno =  "UPDATE alumno SET first_name = '"+ newAlumno.first_name +"' , last_name = '"+newAlumno.last_name+"', birth_date = '"+newAlumno.birth_date+"', nationality = '"+newAlumno.nationality+"', weight = '"+newAlumno.weight+"', belt = '"+newAlumno.belt+"', email = '"+newAlumno.email+"', picture= '"+imgName2+"' WHERE id ='"+id+"'";

        console.log("query de la promesa update: " + sqlNewAlumno);
        dbConn.query(
            sqlNewAlumno,
            (err, result) =>{
                console.log("hay respuesta promesa update");
                if(err)
                    reject({"petado2":err});
                else {
                    resolve(result);
                }
            
            });
    });
};

function deleteAlumno(id) {
    return new Promise ((resolve, reject)=>{
        const sqlDeleteAlumno = "DELETE FROM alumno WHERE id ='" + id + "'";
        console.log(sqlDeleteAlumno);
        dbConn.query(
            sqlDeleteAlumno,
            (err, result) =>{
                console.log("Funciona borrar en BDD");
            if(err)
                reject({"Ha fallado borrar en la BDD":err});
            else {
                resolve(result);
            }
            
        });
    })
};





function orderByName(){
    return new Promise ((resolve, reject) => {
        const sqlFindAll = 'SELECT * FROM alumno ORDER BY first_name';
        dbConn.query(
            sqlFindAll,
            (err, result) => {
                console.log("Tengo respuesta de la BDD");
                if(err)
                    reject(err);
                else {
                    resolve(result);
                    console.log("Funciona ordenar" + result )

                };    
            }
        );
    });
};

function orderByBelt(){
    return new Promise ((resolve, reject) => {
        const sqlFindAll = 'SELECT * FROM alumno ORDER BY belt';
        dbConn.query(
            sqlFindAll,
            (err, result) => {
                console.log("Tengo respuesta de la BDD");
                if(err)
                    reject(err);
                else {
                    resolve(result);
                    console.log("Funciona ordenar" + result )

                };    
            }
        );
    });
};

function orderByAge(){
    return new Promise ((resolve, reject) => {
        const sqlFindAll = 'SELECT * FROM alumno ORDER BY birth_date';
        dbConn.query(
            sqlFindAll,
            (err, result) => {
                console.log("Tengo respuesta de la BDD");
                if(err)
                    reject(err);
                else {
                    resolve(result);
                    console.log("Funciona ordenar" + result )

                };    
            }
        );
    });
};





module.exports = {
    getAllAlumnos,
    addNewAlumno,
    updateAlumno,
    deleteAlumno,
    editAlumno,
    orderByName,
    orderByBelt,
    orderByAge
};


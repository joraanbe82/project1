var express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/controlAlumno')
/* Modulo para poder subir fotos */
const multer = require("multer");
const upload = multer({
   dest: "controllers/images/img-perfiles"
});

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

/*GET home page */
router.get('/index', function (req, res, next){
  res.render('index')
});

// /* GET users listing. */
router.get('/perfil', alumnoController.list);
router.get('/orderByName', alumnoController.orderByName);
router.get('/orderByBelt', alumnoController.orderByBelt);
router.get('/orderByAge', alumnoController.orderByAge);

/*GET update/register page*/
router.get('/newDatos', function (req, res, next){
  res.render('newDatos')
});

/*ADD new datas */
router.post('/add', upload.single("file"), alumnoController.save);
router.get('/delete/:id', alumnoController.delAlumno);
router.get('/update/:id', alumnoController.edit);
router.post('/update/:id', upload.single("file2"), alumnoController.update);


module.exports = router ;

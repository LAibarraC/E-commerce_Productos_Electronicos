const multer = require('multer');

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Crea el middleware de multer
/*const upload = multer({ storage: storage });*/

module.exports = upload; // Asegúrate de exportarlo correctamente

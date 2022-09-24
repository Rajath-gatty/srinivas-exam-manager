const multer  = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       const imgPath = path.join(__dirname,'..','uploads',file.fieldname+'s');
//       cb(null, imgPath)
//     },
//     filename: function (req, file, cb) {
//       const uid = (Math.random() + 1).toString(36).substring(2);
//       const mimeType = file.mimetype.split('/')[1];
//       cb(null, uid+'.'+mimeType)
//     }
//   })

const storage = multer.memoryStorage()

const upload = multer({ storage: storage });

module.exports = upload;
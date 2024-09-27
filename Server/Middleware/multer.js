import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/temp'); 
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname); 
      const fileName = `${Date.now()}-${file.originalname}`; 
      cb(null, fileName);
    }
  });
  
 export const upload = multer({ storage });
  
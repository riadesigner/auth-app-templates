const multer = require('multer')
const path = require('path')

const fileFilter = (req, file, cb) => {  
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
 }

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{        
        if(req.files.length>4){
            cb("слишком много файлов загружаете.. разрешено только 4.",false)    
        }else{
            const p = path.join(__dirname,'..','public/adds');
            cb(null,p)
        }
    },
    filename:(req,file,cb)=>{        
        let nm = `${Date.now()}-${file.originalname}`;
        if(req.user && req.user._id) nm = `user-${req.user._id}-${Date.now()}-${file.originalname}`;
        cb(null,nm)
    }
})


module.exports = multer({storage});
// module.exports = multer({storage,fileFilter});
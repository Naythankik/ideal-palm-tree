const multer = require('multer');

const storage = multer.diskStorage({});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|webp/;
        const extname = fileTypes.test(file.originalname.toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            return cb(new Error('Only image files are allowed (jpeg, jpg, png, webp)'), false);
        }
    },
    limits: {
        fileSize: 1024 * 1024
    }
});

module.exports = upload;

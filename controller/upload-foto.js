const multer = require("multer");
const path = require("path");

// Fungsi untuk membuat storage multer
const createStorage = (destination) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./images/${destination}`);
    },
    filename: (req, file, cb) => {
      cb(null, `${destination}-${Date.now()}${path.extname(file.originalname)}`);
    },
  });

// Fungsi untuk membuat middleware multer
const createMulter = (destination) =>
  multer({
    storage: createStorage(destination),
    fileFilter: (req, file, cb) => {
      const acceptedTypes = ["image/jpg", "image/jpeg", "image/png"];
      if (!acceptedTypes.includes(file.mimetype)) {
        cb(null, false);
        return cb(`Invalid file type ${file.mimetype}`);
      }

      const fileSize = req.headers["content-length"];
      const maxSize = 1 * 1024 * 1024;

      if (fileSize > maxSize) {
        cb(null, false);
        return cb("File size is too large");
      }

      cb(null, true);
    },
  });

// Inisialisasi middleware untuk foto member
const uploadMember = createMulter("foto-member");

// Inisialisasi middleware untuk foto admin
const uploadAdmin = createMulter("foto-admin");

// Inisialisasi middleware untuk foto admin
const uploadCover = createMulter("cover");

// Mengekspor middleware agar bisa digunakan di file lain
module.exports = {
  uploadMember,
  uploadAdmin,
  uploadCover
};

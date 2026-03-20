const path = require("path");
const multer = require("multer");

const allowedExtensions = new Set([".pdf", ".docx"]);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname || "").toLowerCase();

    if (!allowedExtensions.has(extension)) {
      const error = new Error("Only PDF and DOCX files are allowed");
      error.statusCode = 400;

      return cb(error);
    }

    return cb(null, true);
  },
});

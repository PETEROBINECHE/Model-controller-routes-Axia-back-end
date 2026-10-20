import multer from "multer";

// const upload = multer({dest: "uploads/"});

const Storage = multer.memoryStorage();


const upload = multer({
  Storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  }
});

export default upload;
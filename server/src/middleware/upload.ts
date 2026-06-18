import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  
  filename: (req, file, cb) => {
  const cleanName =
    file.originalname.replace(/\s+/g, "-");

  cb(
    null,
    `${Date.now()}-${cleanName}`
  );
},
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
import multer from "multer";
import path from "path";
import sharp from "sharp";
import fs from "fs";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink);

const MAX_FILE_SIZE = 6 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ 
  storage, 
  limits: { fileSize: MAX_FILE_SIZE } 
});

const convertToWebP = async (req, res, next) => {
  if (!req.files) {
    return next();
  }

  try {
    const filePromises = [];

    for (const key in req.files) {
      if (Array.isArray(req.files[key])) {
        req.files[key].forEach((file) => {
          const outputFilename = file.filename.replace(
            path.extname(file.filename),
            ".webp"
          );
          const outputFilePath = path.join(file.destination, outputFilename);

          const filePromise = sharp(file.path)
            .webp({
              quality: 80, 
              nearLossless: true,
            })
            .resize({ width: 1024 }) 
            .toFile(outputFilePath)
            .then(async () => {
              // console.log(`Converting file: ${file.path} to ${outputFilePath}`);
              await unlinkAsync(file.path); 
              file.path = outputFilePath;
              file.filename = outputFilename;
              file.mimetype = "image/webp";
            })
            .catch((err) => {
              console.error(`Error converting file: ${file.path}`, err);
            });

          filePromises.push(filePromise);
        });
      }
    }

    await Promise.all(filePromises);
    next();
  } catch (err) {
    console.error("Error in convertToWebP middleware:", err);
    next(err);
  }
};

export { upload, convertToWebP };

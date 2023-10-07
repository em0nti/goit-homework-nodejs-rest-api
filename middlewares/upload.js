const multer = require('multer');
const path = require('path');

const tmpPath = path.resolve('../', 'tmp');

const multerConfig = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, tmpPath);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
	limits: {
		fileSize: 2048 * 2048 * 3,
	},
});

const upload = multer({ storage: multerConfig });

module.exports = upload;

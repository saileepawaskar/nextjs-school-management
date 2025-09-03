import { createRouter } from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import db from '../../db';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

const isVercel = !!process.env.VERCEL;

// Cloudinary config (for deployment)
if (isVercel) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Multer memory storage: we upload later only if DB check passes
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter: (req, file, cb) =>
    file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Only images allowed')),
}).single('image');

const apiRoute = createRouter({
  onError(error, req, res) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
});

apiRoute.use(upload);

apiRoute.post(async (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;

  if (!name || !address || !city || !state || !contact || !email_id) {
    return res.status(400).json({ error: 'All fields including image are required' });
  }

  try {
    // ✅ Check for duplicate school before saving image
    const [existing] = await db.query('SELECT id FROM schools WHERE email_id=?', [email_id]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'School with this email already exists' });
    }
	
	let imageUrl = '/default-school.jpg'; // fallback path

	if (req.file) {
	  if (!isVercel) {
		// Local Mode: save to /public/schoolImages
		const uploadDir = './public/schoolImages';
		if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
		const filename = Date.now() + path.extname(req.file.originalname);
		const filepath = path.join(uploadDir, filename);
		fs.writeFileSync(filepath, req.file.buffer);
		imageUrl = `/schoolImages/${filename}`;
	  } else {
		// Vercel Mode: upload to Cloudinary
		const streamUpload = () =>
		  new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
			  { folder: 'schoolImages' },
			  (err, result) => {
				if (result) resolve(result);
				else reject(err);
			  }
			);
			streamifier.createReadStream(req.file.buffer).pipe(stream);
		  });
		const uploadResult = await streamUpload();
		imageUrl = uploadResult.secure_url;
	  }
	}
	
    // ✅ Insert into DB with image URL/path
    const [result] = await db.query(
      `INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, imageUrl, email_id]
    );

    res.status(201).json({ message: 'School added successfully', id: result.insertId });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: err.message });
  }
});

export const config = { api: { bodyParser: false } };
export default apiRoute.handler();

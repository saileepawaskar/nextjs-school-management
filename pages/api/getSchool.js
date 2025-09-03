import db from '../../db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const [rows] = await db.query(
      'SELECT id, name, address, city, image FROM schools ORDER BY id DESC'
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error('DB fetch error:', err);
    res.status(500).json({ error: err.message });
  }
}

import express from 'express';
import pool from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_me';

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email+password required' });

  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users(email, password_hash) VALUES($1,$2) RETURNING id, email, role, created_at',
      [email, hashed]
    );
    const user = result.rows[0];
    res.status(201).json({ user });
  } catch (err: any) {
    if (err.code === '23505') return res.status(409).json({ error: 'email exists' });
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email+password required' });

  try {
    const result = await pool.query(
      'SELECT id, email, password_hash, role FROM users WHERE email=$1',
      [email]
    );
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

export default router;

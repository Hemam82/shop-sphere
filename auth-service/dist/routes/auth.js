"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_me';
// Register
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: 'email+password required' });
    try {
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const result = await db_1.default.query('INSERT INTO users(email, password_hash) VALUES($1,$2) RETURNING id, email, role, created_at', [email, hashed]);
        const user = result.rows[0];
        res.status(201).json({ user });
    }
    catch (err) {
        if (err.code === '23505')
            return res.status(409).json({ error: 'email exists' });
        console.error(err);
        res.status(500).json({ error: 'internal error' });
    }
});
// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: 'email+password required' });
    try {
        const result = await db_1.default.query('SELECT id, email, password_hash, role FROM users WHERE email=$1', [email]);
        const user = result.rows[0];
        if (!user)
            return res.status(401).json({ error: 'invalid credentials' });
        const ok = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!ok)
            return res.status(401).json({ error: 'invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'internal error' });
    }
});
exports.default = router;

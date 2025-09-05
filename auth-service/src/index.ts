import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/auth';

const app = express();
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.use('/auth', authRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Auth service listening on ${port}`));

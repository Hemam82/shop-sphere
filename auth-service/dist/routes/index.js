"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.use('/auth', auth_1.default);
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Auth service listening on ${port}`));

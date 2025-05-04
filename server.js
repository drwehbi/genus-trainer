/* 
server.js 
server.js (ESM) 
*/

/* import dotenv from 'dotenv';
import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import { Sequelize, DataTypes } from 'sequelize';

dotenv.config();

const app = express();
const port = 3000; */


import dotenv from 'dotenv';
import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './words.db',
});

const Word = sequelize.define('Word', {
    word: { type: DataTypes.STRING, allowNull: false },
    genus: { type: DataTypes.STRING, allowNull: false },
});

AdminJS.registerAdapter(AdminJSSequelize);

const adminJs = new AdminJS({
    resources: [Word],
    rootPath: '/admin',
});

const ADMIN = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
};

const adminRouter = await AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        if (email === ADMIN.email && password === ADMIN.password) {
            return ADMIN;
        }
        return null;
    },
    cookiePassword: process.env.COOKIE_SECRET,
});

app.use(adminJs.options.rootPath, adminRouter);
app.use(express.static(path.join(__dirname, 'public')));

// Route: Einzelnes zufälliges Wort
app.get('/random-word', async (req, res) => {
    try {
        const word = await Word.findOne({ order: sequelize.random() });
        res.json(word);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Datenbankfehler' });
    }
});

// Route: Alle Wörter abrufen
app.get('/all-words', async (req, res) => {
    try {
        const words = await Word.findAll();
        res.json(words);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Datenbankfehler' });
    }
});

// Route: Wörter für Spiel basierend auf Level
app.get('/game-words', async (req, res) => {
    try {
        const level = req.query.level || 'mittel';
        let limit;

        if (level === 'leicht') limit = 8;
        else if (level === 'mittel') limit = 16;
        else if (level === 'schwer') limit = 32;
        else limit = 16; // fallback

        const words = await Word.findAll({ limit, order: sequelize.random() });
        res.json(words);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Datenbankfehler' });
    }
});

app.listen(port, async () => {
    await sequelize.sync();
    console.log(`✅ Server läuft auf http://localhost:${port}`);
    console.log(`✅ Admin-Interface erreichbar unter http://localhost:${port}/admin`);
});

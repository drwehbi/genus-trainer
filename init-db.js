/* init-db.js (ESM) */

import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './words.db',
});

const Word = sequelize.define('Word', {
    word: { type: DataTypes.STRING, allowNull: false },
    genus: { type: DataTypes.STRING, allowNull: false },
});

async function init() {
    await sequelize.sync({ force: true });

    await Word.bulkCreate([
        { word: 'Tisch', genus: 'der' },
        { word: 'Blume', genus: 'die' },
        { word: 'Auto', genus: 'das' },
        { word: 'Hund', genus: 'der' },
        { word: 'Lampe', genus: 'die' },
        { word: 'Buch', genus: 'das' },
        {word: 'Ergebnis', genus: '	Das' },
        {word: 'Jobcenter', genus: 'des' },
        {word: 'Feedback', genus: 'Das' },
        {word: 'Zertifikat', genus: 'Das' },
        {word: 'Adjektiv', genus: 'Das' },
        {word: 'Substantiv', genus: 'Das' },
        {word: 'Gebiet', genus: 'Das' },
        {word: 'Koran', genus: 'Der' },
        {word: 'Gang', genus: 'Der' },
        {word: 'Plan', genus: 'Der' },
        {word: 'Webseite', genus: 'Die' },
        {word: 'Website', genus: 'Die' },
        {word: 'Uhrzeit', genus: 'Die' },
        {word: 'Misstrauen', genus: 'Das' },
        {word: 'Bibliothek', genus: 'Die' },
        {word: 'Diskothek', genus: 'Die' },
        {word: 'WhatsApp', genus: 'Der' },
        {word: 'Desktop	', genus: 'Der' },
        {word: 'App', genus: 'Die' },
        {word: 'PC', genus: 'Der' },
        {word: 'Schmalz', genus: 'Der' },
        {word: 'Herz', genus: 'Das' },
        {word: 'Herz', genus: 'Das' },
        {word: 'Link', genus: 'Der' },
        {word: 'Button', genus: 'Der' },
        {word: 'Befehl', genus: 'Der' },
        {word: 'Segment', genus: 'Das' },
        {word: 'Spektakel', genus: 'Das' },
        
    ]);

    console.log('Datenbank initialisiert.');
    process.exit();
}

init();

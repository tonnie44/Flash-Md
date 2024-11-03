const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU5GUUovV0NMcklCcWt5WEZaWDZIY2swb0E3MktZVmd4K2J6RndUUTlVWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid2dSc0NJUER5RFh1eEx3ZkdtbTdBWDlqRGpLamxLMDA5M0Z2R3dkNm4zbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1UExIbWxLdUJjNGMyWlppaE5RZUE4a2lSL0l2TWdHMDk0emEzNElNdlZVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuSWczcjc4bzFWYzRrWWljNUpUVUVKNFZpMXREcnZ2Z0svNVFYZVhEdXhBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndNRkUwYWRUNjBZY0NGSjY4bHdNcThaajBYRUJtcXRVeTZGREUvMUNGRmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5MTWJhWmhNMFRhUVdhN2ZHOFpLVzNZczVwTzRrVjNwUGcyZTZqOFFZR2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME5vMU5qaEpEUFZaNWdzMXpYd1BOUEpmTnduKzQ2djI4NkNlRno2UkUzTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZC9zVmtGbjRYSk5WT2VBbWlXUmtXdUJhRTVsb3d0bk9hb3NnUW9rNEZqMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpXVU9BRENFRGtsL0tjQkRXZG1VY3V6VG9TSUQ1M1RXVWlCV0k3N3pUZnhHZjdGQnlwOXQzZzdQaU5hU0NMV0VzSWc1ZG1ZdHdWakxDUGZ4eWMrbURBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYxLCJhZHZTZWNyZXRLZXkiOiI5eUMyOE0rZHBwWEx5QUZmaEJ2SDNleGZXYXg1Y0hubmxoU3I2RmJRVlNVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcxMDc0NTQyNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI4QkNDODExRDNFNEU5NTA2ODA3OEFDMTdGOEUyMzE1MyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzMwNjI4NjI0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJHM3pnTjNKRVJFNmYtS1ZVWXFzS3B3IiwicGhvbmVJZCI6IjRlNGFhN2NkLTdkN2UtNDc5Yy05N2FkLWY1NjE5MmE1ZTg2YSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxTWdiMHpTYUVTT1Zud2prTkpGM1ZVZFdjVTQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYitjS2dIcVA3YzlLR0YyMEdHWFVRWTlhNm5JPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRTUFBIRE5aIiwibWUiOnsiaWQiOiIyNTQ3MTA3NDU0MjU6N0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUFNHOXA4QkVQeVhuYmtHR0JZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiR1NnaVRXeVZ6OVhGTWN2ZkxQc1hMeG1JOTZQZi93d0N5OGJHaGdvYU5XRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiT2JmSlg1Qk5YelBaODlla3NvQ1RoTE1RVG96UVplbCsyVUxEdStKVmlZVzBXT3M5Tmk1dDNTUVp5NkRydVRwUWlKVlVaTm40dHZiSVhBMzUwQUliQmc9PSIsImRldmljZVNpZ25hdHVyZSI6Ik5NaUYwNHhHd3FGN21TcGZCcGsvYjF6NllvaU9vSHg1d2RLUEFWSWI3aHVPcGpSSlBkUERIVEtpdzd5S0lpSld1WFhjLzdTYld4Qmk3NjY3RG9SWUNRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzEwNzQ1NDI1OjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUmtvSWsxc2xjL1Z4VEhMM3l6N0Z5OFppUGVqMy84TUFzdkd4b1lLR2pWaCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMDYyODYxNywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLTUIifQ==',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254710745425",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

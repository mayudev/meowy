import Bot from './bot/main';
import connectDatabase from './database/database';
import Database from './database/database';

// Start the bot
const db = await connectDatabase();

const bot = new Bot(db);
bot.start();

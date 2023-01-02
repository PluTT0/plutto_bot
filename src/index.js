import TelegramBot from "node-telegram-bot-api";
import express, { json } from "express";
import dotenv from "dotenv";

dotenv.config();

const { BOT_TOKEN, SERVER_URL, PORT } = process.env;

const app = express();
const bot = new TelegramBot(BOT_TOKEN);
bot.setWebHook(`${SERVER_URL}/bot${BOT_TOKEN}`);

app.use(json())
app.post(`/bot${BOT_TOKEN}`, (req, res) => {
  const { body } = req;
  try{
  bot.processUpdate(body)
  res.sendStatus(200);
  } catch (err) {
    console.log(err)
  }
});
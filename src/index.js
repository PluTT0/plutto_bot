import TelegramBot from "node-telegram-bot-api";
import express, { json } from "express";
import dotenv from "dotenv";
import * as helper from "./helper.js";
import * as kb from "./keyboardButtons.js";
import * as keyboard from "./keyboard.js";
import connectDB from "./config.js";
import "./models/location.model.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const { BOT_TOKEN, SERVER_URL, PORT, DBconnection} = process.env;

// connect to database
connectDB(DBconnection);
//server and bot initialization
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

helper.logStart();

app.listen(PORT, () => {
  console.log(`Server is start on PORT: ${PORT}`)
});

const Location = mongoose.model('location');

//================================================================
bot.on('message', async (msg) => {

  const chatId = helper.getChatId(msg);
  
  switch (msg.text) {
    case kb.userKeboard.sertch: 
      await bot.sendMessage(chatId, `Choose location category:`, {
        reply_markup: {
          inline_keyboard:
            [keyboard.categotyKeyboard]
          },
      });

      bot.on('callback_query', (callbackQuery) => {
        const msg = callbackQuery.message;
        bot.answerCallbackQuery(callbackQuery.id)
        .then(() => bot.sendMessage(msg.chat.id, "You clicked!"));
      })
      break
    case kb.userKeboard.create:
      break;
    case kb.userKeboard.edit:
      break
    case kb.backButton.back:
      await bot.sendMessage(chatId, `Please chose command`, {
        reply_markup: {
          keyboard: keyboard.homeKeyboard
        }
      });
      break
  }
});


bot.onText(/\/start/, msg => {
  const text = `Hello ${msg.chat.username}, please choose command for start work`
  bot.sendMessage(helper.getChatId(msg), text, {
    reply_markup: {
      keyboard: keyboard.homeKeyboard
    }
  })
});
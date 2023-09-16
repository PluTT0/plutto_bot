import TelegramBot from "node-telegram-bot-api";
import express, { json, query, text } from "express";
import dotenv from "dotenv";
import * as helper from "./helper.js";
import * as kb from "./keyboardButtons.js";
import * as keyboard from "./keyboard.js";
import connectDB from "./config.js";
import "./models/location.model.js";
import dataBase from "../database.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const { BOT_TOKEN, SERVER_URL, PORT, DBconnection} = process.env;

// connect to database
connectDB(DBconnection);

//server and bot initialization
/* const bot = new TelegramBot(BOT_TOKEN);
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

helper.logStart(); */
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

app.listen(PORT, () => {
  console.log(`Server is start on PORT: ${PORT}`)
});

const Location = mongoose.model('location');


//================================================================

bot.on('message', async (msg) => {
  const chatId = helper.getChatId(msg);

  switch (msg.text) {
    case kb.userKeboard.filter: 
        
    break;
    case kb.userKeboard.info:
      bot.sendMessage(chatId, `Choose location category:`, {
        reply_markup: {
          keyboard:
            keyboard.categotyKeyboard,
            resize_keyboard: true
          },
      });
    break;
    case kb.userKeboard.allLocations:
      
      sendLocationQuery(chatId, {})
      break
    case kb.backButton.back:
      await bot.sendMessage(chatId, `Please chose command`, {
        reply_markup: {
          keyboard: keyboard.homeKeyboard,
          resize_keyboard: true},
      });
      break
  }
});


bot.onText(/\/start/, msg => {
  const text = `Hello ${msg.chat.username}, please choose command for start work`;
  
  const chatId = helper.getChatId(msg);
  bot.sendMessage(helper.getChatId(msg), text, {
    reply_markup: {
      keyboard: keyboard.homeKeyboard,
      resize_keyboard: true,
    }
  })
});


const sendLocationQuery = (chatId, query) => {
  Location.find(query).then((location) => {
    const html = location.map((f, i) => {
      return `<b>${i + 1}.</b> ${f.name} -/f${f.uuid}`
    }).join('\n');
    bot.sendMessage(chatId, html, {
      parse_mode: 'HTML'
    })
  })
}

bot.on('message', msg => {
  if(msg.text==='Pavilion'){
    sendFilterLocation()
  }
})

const sendFilterLocation = () => {
  Location.filter(word => {
    if (word.type === 'pavilion') {
      console.log(word)
    }
  })
}
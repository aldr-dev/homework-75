import express from "express";
import {CipherData} from "../types";
import {vigenereCipher} from "../vigenere";

export const cipherRouter = express.Router();

cipherRouter.post('/decode',   (req, res) => {
   try {
      const {message, password}: CipherData = req.body;
      if (message.length !== 0 && password.length !== 0) {
         const decoded = vigenereCipher(message, password, false);
         return res.json({decoded});
      }
      return res.status(500).send('Invalid input!');
   } catch (error) {
      console.error(error);
      res.status(500).send('error decode!')
   }
});

cipherRouter.post('/encode',   (req, res) => {
   try {
      const {message, password}: CipherData = req.body;
      if (message.length !== 0 && password.length !== 0) {
         const encoded = vigenereCipher(message, password, true);
         return res.json({encoded});
      }
      return res.status(500).send('Invalid input!');
   } catch (error) {
      console.error(error);
      res.status(500).send('error encode!')
   }
});
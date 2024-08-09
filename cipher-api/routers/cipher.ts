import express from "express";
import {CipherData} from "../types";
import {vigenereCipher} from "../vigenere";

export const cipherRouter = express.Router();

cipherRouter.post('/decode',   (req, res) => {
   try {
      const {message, password}: CipherData = req.body;
      const decoded = vigenereCipher(message, password, false);
      return res.json({decoded});
   } catch (error) {
      console.error(error);
      res.status(500).send('error decode!')
   }
});

cipherRouter.post('/encode',   (req, res) => {
   try {
      const {message, password}: CipherData = req.body;
      const encoded = vigenereCipher(message, password, true);
      return res.json({encoded});
   } catch (error) {
      console.error(error);
      res.status(500).send('error encode!')
   }
});
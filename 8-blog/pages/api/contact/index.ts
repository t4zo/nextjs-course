import axios from "axios";
import { IContact } from "interfaces";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    const { email, name, message } : IContact  = req.body;

    if(!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
      return res.status(422).json({ message: 'Invalid input' });
    }

    await axios.post(`${process.env.FIREBASE_URL}/contact.json`, {
       email, 
       name, 
       message
    });

    res.status(201).json({ message: 'Successfully stored message' });
  }
}

export default handler;
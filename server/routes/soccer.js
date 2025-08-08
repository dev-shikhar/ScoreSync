import axios from "axios";
import express from "express";
import dotenv from "dotenv";
import { Competition } from "../models/soccer.js";

dotenv.config();
const router = express.Router();


router.get("/top-competitions",async (req,res) =>{
  try {
    const result = await Competition.find({}).sort({ popularity_index: -1 }) ;
    const compName = result.map((comp) => {
      return comp.name;
    });
    res.json(compName);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(error.response.status);
  }
});



export default router;

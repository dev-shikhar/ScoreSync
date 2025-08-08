import {model,Schema} from "mongoose";

const competitions = new Schema({
    category: {
        country_code : String,
        id : String,
        name: String
    },
    gender: String,
    id : String,
    name : String,
    parent_id : String,
    type : String,
});

const seasons = new Schema({
    competition_id : String,
    disabled : Boolean,
    end_date : String,
    id : String,
    name : String,
    start_date : String,
    year : String
});

const Competition = model('Soccer',competitions);
const Season = model('Soccer Seasons', seasons);
export {Competition,Season};

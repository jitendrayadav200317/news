import mongoose from 'mongoose' ;


const NewsSummarySchema = new mongoose.Schema({
    url : {type : String , required : true , unique : true} ,
    summary : {type : String , required : true},
    createdAt : {type : Date , default : Date.now()}
})

const NewsSummary = mongoose.model('newssummary', NewsSummarySchema);
export default NewsSummary ;
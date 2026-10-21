import mongoose from 'mongoose';
const schema=new mongoose.Schema({title:{type:String,required:[true,'Title is required.'],trim:true,minlength:1,maxlength:120},description:{type:String,trim:true,default:'',maxlength:1000},completed:{type:Boolean,default:false},priority:{type:String,enum:['low','medium','high'],default:'medium'},createdAt:{type:Date,default:Date.now}},{timestamps:{updatedAt:'updatedAt'},versionKey:false});
export default mongoose.model('Task',schema);

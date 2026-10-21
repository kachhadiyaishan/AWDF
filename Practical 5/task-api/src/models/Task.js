import mongoose from 'mongoose';
const schema=new mongoose.Schema({title:{type:String,required:[true,'Title is required.'],trim:true,minlength:[1,'Title cannot be empty.'],maxlength:120},description:{type:String,default:'',maxlength:1000,trim:true},completed:{type:Boolean,default:false},priority:{type:String,enum:{values:['low','medium','high'],message:'Priority must be low, medium, or high.'},default:'medium'},createdAt:{type:Date,default:Date.now}},{timestamps:{updatedAt:'updatedAt'},versionKey:false});
schema.pre('save',function(next){if(typeof this.title==='string')this.title=this.title.trim();next()});
export default mongoose.model('Task',schema);

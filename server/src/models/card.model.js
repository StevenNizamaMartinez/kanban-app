import {model, Schema} from 'mongoose';

const CardSchema = new Schema({
    title: {type: String, required: true, default: "Untitled"},
    content : {type: String, default : "Add your content here"},
    listId: {ref: 'List', type: Schema.Types.ObjectId},
    userId: {ref: 'User', type: Schema.Types.ObjectId},
    position : {type: Number},
    comments : {type: Array, default: []},
    labels : {type: Array, default: []},
    files : {type: Array, default: []},
},
{
  timestamps: true,
  versionKey: false
})

const cardModel =  model('Card', CardSchema);

export default cardModel 

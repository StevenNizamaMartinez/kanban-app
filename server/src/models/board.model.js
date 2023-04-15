import {model, Schema} from 'mongoose';

const boardSchema = new Schema({
    title: {type: String, default:"Board Untitled" ,required: true},
    description : {type: String, default : "Add your description here"},
    userId: {ref: 'User', type: Schema.Types.ObjectId},
    favorite: {type: Boolean, default: false},
    icon : {type : String , default : "💯"}
},
{
    timestamps: true,
    versionKey: false
})

const boardModel = model('Board', boardSchema);
export default boardModel

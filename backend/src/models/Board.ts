import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IBoard extends Document {
  name: string;
  owner: IUser['_id'];
  tasks: string[]; // Task IDs
  updatedAt: Date;
}

const BoardSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true, 
    maxlength: 100 
  },
  owner: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task' 
  }]
}, {
  timestamps: true,
});

export default mongoose.model<IBoard>('Board', BoardSchema);

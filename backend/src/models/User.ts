import mongoose, { Schema, Document} from 'mongoose'
import bcrypt from 'bcryptjs'
import { assert } from 'node:console';

export interface IUser extends Document {
    email: string;
    password: string;
    createdAt: Date;
    comparePassword(candidatePassword: string): Promise <boolean>;   
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
},
{
    timestamps: true,
});

UserSchema.pre('save', async function () {
    if (typeof this.password === 'string') {
        if(this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string){
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);

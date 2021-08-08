import * as mongoose from 'mongoose';

interface User {
	_id: string;
    name: string;
    hobbies: string;
}

const UserSchema = new mongoose.Schema({
    name: String,
    hobbies: String,
});

const UserModel = mongoose.model('User', UserSchema);

export { UserModel, User }
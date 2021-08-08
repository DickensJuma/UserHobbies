import * as mongoose from 'mongoose';

interface Hobbies {
	_id: string;
	name: string;
	year: string;
	passionLevel: string;
}

const HobbiesSchema = new mongoose.Schema({
	name: String,
	year: String,
	passionLevel: String
});

const HobbiesModel = mongoose.model('Hobbies', HobbiesSchema);

export { HobbiesModel, Hobbies }
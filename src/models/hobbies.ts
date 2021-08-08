const mongoose = require('mongoose')
  , Schema = mongoose.Schema


interface Hobbies {
	_id: string;
	name: string;
	year: string;
	passionLevel: string;
}

const HobbiesSchema = new mongoose.Schema({
	id: { type: Schema.ObjectId, ref: 'User' },
	name: String,
	year: String,
	passionLevel: String
});

const HobbiesModel = mongoose.model('Hobbies', HobbiesSchema);

export { HobbiesModel, Hobbies }
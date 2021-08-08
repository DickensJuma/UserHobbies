import { HobbiesModel, Hobbies } from '../models/hobbies';
import { Controller, Route, Get, Post, BodyProp, Put, Delete } from 'tsoa';

@Route('/hobbies')
export class HobbiesController extends Controller {
	@Get()
	public async getAll(): Promise<Hobbies[]> {
		try {
			let items: any = await HobbiesModel.find({});
			items = items.map((item) => { return {id: item._id, name: item.name, year: item.year, passionLevel: item.passionLevel}});
			return items;
		} catch (err) {
			this.setStatus(500);
			console.error('Caught error', err);
		}
	}

	@Post()
	public async create(@BodyProp() name: string, year: string, passionLevel: string) : Promise<void> {
		const item = new HobbiesModel(
			{
				name: name,
				year: year,
				passionLevel: passionLevel
		});
		console.log(item)
		await item.save();
		
	}
	@Put('/{id}')
	public async update(id: string, @BodyProp() passionLevel: string) : Promise<void> {
		await HobbiesModel.findOneAndUpdate({_id: id},  {passionLevel:passionLevel});
	}

	@Delete('/{id}')
	public async remove(id: string) : Promise<void> {
		await HobbiesModel.findByIdAndRemove(id);
	}
}

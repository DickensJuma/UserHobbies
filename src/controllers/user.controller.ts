import { UserModel, User } from '../models/user';
import { Controller, Route, Get, Post, BodyProp, Put, Delete } from 'tsoa';

@Route('/users')
export class UserController extends Controller {
	@Get()
	public async getAll(): Promise<User[]> {
		try {
			let items: any = await UserModel.find({});
			items = items.map((item) => { return {id: item._id, name: item.name, hobbies:item.hobbies}});
			return items;
		} catch (err) {
			this.setStatus(500);
			console.error('Caught error', err);
		}
	}

	@Post()
	public async create(@BodyProp() name: string, hobbies:string) : Promise<void> {
        const item = new UserModel(
            {
                name: name,
                hobbies: hobbies 
            });
		await item.save();
	}

    @Put('/{id}')
    public async update(id: string, @BodyProp() name: string ): Promise<void> {
        await UserModel.findOneAndUpdate(
            { _id: id },
            { name: name },
            
            
        );
	}

	@Delete('/{id}')
	public async remove(id: string) : Promise<void> {
		await UserModel.findByIdAndRemove(id);
	}
}

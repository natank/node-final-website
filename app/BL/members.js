import * as Subscriptions from '../models/Subscriptions';

export async function getMembers(req, res, next) {
	var { name, genres } = req.query;
	try {
		var members = await Subscriptions.getMembers({ name, genres });
		res.status(200).json(members);
	} catch (err) {
		res.status(500).end();
		throw err;
	}
}

export async function getMember(req, res, next) {
	try {
		const memberId = req.params.id;
		var member = await Subscriptions.getMember(memberId);
		res.status(200).json(member);
	} catch (err) {
		res.status(500).end();
		throw err;
	}
}

export async function getCreateMember(req, res, next) {
	var {name, email, city} = req.body
	try {
		var member = Subscriptions.createMember(name,email, city)
		res.status(200).json(member)
	} catch (err) {
		res.status(500).end()
		next(err);
	}
}

export async function createMember(req, res, next) {
	const { name, email, city } = req.body;
	
	try {
		var member = await Subscriptions.createMember({ name, email, city });
		res.status(200).json(member)
	} catch (err) {
		console.log(err)
		next(err);
	}
}

export async function deleteMember(req, res, next) {
	var {id} = req.params
	try {
		await Subscriptions.deleteMember(id)
		res.status(200).end()
	} catch(err){
		console.log(err)
		res.status(500).end()
	}}

export async function updateMember(req, res, next) {
	var {name, email, city} = req.body
	var {id} = req.params
	console.log(`id = ${id}`)
	try{
		var member = await Subscriptions.updateMember({id, name, email, city})
		res.status(200).end()
	} catch(err){
		res.status(500).end()
		console.log(err)
	}
}


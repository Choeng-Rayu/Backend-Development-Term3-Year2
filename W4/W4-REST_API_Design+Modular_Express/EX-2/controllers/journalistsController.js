const data = require('../models/data.js');	

const getAllJournalists = (req, res)=>{
    res.status(201).json(data.journalists);
}

const journalistsById = (req, res) =>{
    const journalistId = parent(req.params.id);
    const {name, email} = req.body;
    const journalists = data.journalists.find(j => j.id === journalistId);
    if(!email || !email){return res.status(400).json({error: 'journalists not found'})};
    if(name) journalists.name = name;
    if(email) journalist.email = email;
    res.status(201).json(journalists)
}

const createJournalist= (req, res)=>{
    const {name, email} = req.body;
    if(!name || !email){ return res.status(404).json({error: 'Name and email are required'})}
    const NewJournalist = {
        id: journalists.length ? journalists[journalists.length - 1].id + 1 : 1,
        name,
        email
    }
    journalists.push(NewJournalist);
    res.status(201).json(NewJournalist);
}

const updateJournalist = (req, res) =>{
    const journalistId = parseInt(req.params.id);
    const {name, email} = req.body;
    const journalists = journalists.find(j => j.id === journalistId);
    if(!journalists) return res.status(404).json({error: 'Journalist not found'})
    if(name) journalists.name = name;
    if(email)journalists.email = email;
    res.status(201).json(journalists);
}
const deleteJournalist = (req, res) =>{
    const journalistId = parseInt(req.params.id);
    const index = journalists.findIndex(j => j.id === journalistId);
    if(index === -1) return res.status(404).json({error: 'Journalist not found'});
    journalists.splice(index, 1);
    res.status(204).send();
}


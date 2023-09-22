const Person = require('../models/person.model')

exports.create = async(req, res) => {
    const person = await Person.create(req.body)

    if(person){
        res.status(200).send({message: `Ok. Person with name: '${req.body.name}' created.`});
    }else{
        res.status(500).send({message: `Error. Person with name: ${req.body.name} not created.`});
    }
}

exports.read = async(req, res) => {
    const persons = await Person.read();
    console.log(persons)
    const array = persons.map(p => p.name);
    res.status(200).send(`"Ok. Retrieved entries: ${array}`)
}

exports.update = async(req, res) => {
    const person = await Person.update(req.params.id, req.body)

    if(person){
        res.status(200).send({message: 'Ok!'})
    }else{
        res.status(500).send({message: 'Error.'})
    }
}

exports.delete = async (req, res) => {
    const person = await Person.delete(req.params.id, req.body);

    if (person) {
        res.status(200).send({ message: 'Ok!' })
    } else {
        res.status(500).send({ message: 'Error.' });
    }
}


exports.readById = async(req, res) => {
    const person = await Person.readById(req.params.id)
    res.status(200).send(person)
}

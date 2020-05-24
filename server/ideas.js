const  {getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId}  =  require('./db.js');

const ideasRouter = require('express').Router();
const checkIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id)=>{
    const idea = getFromDatabaseById('ideas', id);
    if(idea){
        req.ideaId = id;
        req.idea = idea;
        next();
    }else{
        res.status(404).send();
    }
});

ideasRouter.get('/', (req,res,next)=>{
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.get('/:ideaId', (req,res,next)=>{
    res.send(req.idea);
});

ideasRouter.post('/', checkIdea, (req,res,next)=>{
    const idea = req.body; // b/c we used parser middleware by express
    const ideaAdded = addToDatabase('ideas', idea);
    res.status(201).send(ideaAdded);

});

ideasRouter.put('/:ideaId', checkIdea, (req,res,next)=>{
    const ideaUpdated = updateInstanceInDatabase('ideas', req.body);
    res.send(ideaUpdated);
});

ideasRouter.delete('/:ideaId', (req,res,next)=>{
    const deleted = deleteFromDatabasebyId('ideas', req.ideaId);
    if(deleted){
        res.status(204).send();
    }else{
        res.status(500).send();
    }
});

module.exports = ideasRouter;
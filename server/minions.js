const  {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,}  =  require('./db.js');

const minionsRouter = require('express').Router();
  
minionsRouter.param('minionId', (req, res, next, id)=>{
    // If we get a truthy value (non undef)
    const minion = getFromDatabaseById('minions', id) 
    if (minion){
        req.minionId = id
        req.minion = minion;
        next();
    } else{
        // console.log("Error: Minion doesn\'t exist");
        res.status(404).send();
    }
});

minionsRouter.get('/', (req, res, next) =>{
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId', (req, res, next)=> {
    res.send(req.minion);   
});

minionsRouter.post('/', (req, res, next)=>{
    const minion = req.body; // From body-parsing middleware
    addToDatabase('minions', minion);
    res.status(201).send(minion);
});

minionsRouter.put('/:minionId', (req, res, next)=>{
    let minion = updateInstanceInDatabase('minions', req.body);
    res.send(minion);
});

minionsRouter.delete('/:minionId', (req, res, next)=>{
    const deleted = deleteFromDatabasebyId('minions', req.minionId);
    if(deleted){
        res.status(204);
    }else{
        res.status(500);
    }
    res.send();
});

// Fixing work functionallity:
// minionsRouter.get('/:minionId/work', (req, res, next) => {
//     const work = getAllFromDatabase('work').filter((singleWork) => {
//       return singleWork.minionId === req.params.minionId;
//     });
//     res.send(work);
// });

minionsRouter.get('/:minionId/work', (req,res,next)=>{
    const allWork = getAllFromDatabase('work');
    const work = [];
    for (let job = 0; job < allWork.length; job++){
        if (allWork[job].minionId === req.minionId){
            work.push(allWork[job]);
        }
    }
    res.send(work);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const createdWork = addToDatabase('work', workToAdd);
    res.status(201).send(createdWork);
});

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
      req.work = work;
      next();
    } else {
      res.status(404).send();
    }
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
if (req.params.minionId !== req.body.minionId) {
    res.status(400).send();
} else {
    updatedWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
}
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
const deleted = deleteFromDatabasebyId('work', req.params.workId);
if (deleted) {
    res.status(204);
} else {
    res.status(500);
}
res.send();
});
module.exports = minionsRouter;
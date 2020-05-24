const  {createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,}  =  require('./db.js');

const meetingsRouter = require('express').Router();


meetingsRouter.get('/', (req,res,next)=>{
    res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req,res,next)=>{
    const newMeeting = createMeeting();
    addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req,res,next)=>{
    const deleted = deleteAllFromDatabase('meetings');
    if(deleted){
        res.status(204);
    }else{
        res.status(500);
    }
    res.send();
});

module.exports = meetingsRouter;
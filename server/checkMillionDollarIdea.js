// const checkMillionDollarIdea = (req, res, next) => {
//     const idea = req.body;
//     if(idea.numWeeks && idea.weeklyRevenue){

//         const numWeeks = parseInt(idea.numWeeks)
//         const weeklyRevenue = parseInt(idea.weeklyRevenue);

//         if(numWeeks && weeklyRevenue){
//             const worth = numWeeks*weeklyRevenue;
//             if (worth < 1000000){
//                 res.status(400).send();
//             }else{
//                 next();
//             }
//         }else{
//             res.status(400).send();
//         }
//     }else{
//         res.status(400).send()
//     }
// };

const checkMillionDollarIdea = (req,res,next) =>{
    const {numWeeks, weeklyRevenue} = req.body;
    const worth = Number(numWeeks)*Number(weeklyRevenue);
    if ((numWeeks && weeklyRevenue) && 
            !isNaN(worth) && 
            worth >=1000000){
        next();
    }else{
        res.status(400).send();
    }
}

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

const Fertilizer = require("../models/fertilizerModel")

exports.saveFertilizers = async (req,res) => {
    try{
        const fertilizers = req.body.Fertilizer
        console.log(fertilizers)
        if(!fertilizers || !fertilizers.length){
            return res.status(400).json({message: "Fertilizers list is empty"})
        }
        const fertilizerList = await Fertilizer.insertMany(fertilizers)
        res.status(201).json({message: "Fertilizers saved successfully", fertilizerList})
    }catch(err){
        console.error(err)
        res.status(500).json({message: 'Failed to save Fertilizers'})
    }
}
exports.getAllFertilizers = async (req,res) => {
    try{
        const fertilizers = await Fertilizer.find()
        
        // If no fertilizers are found, return an empty array
        if (!fertilizers.length) {
            return res.status(404).json({ message: 'No fertilizers found' });
        }

        // Return the list of fertilizers with a 200 status
        res.status(200).json(fertilizers);
    }catch(err){
        console.error(err)
        res.status(500).json({message: 'Failed to fetch Fertilizers'})
    }
}
const Crop = require("../models/cropModel")

exports.saveCrops = async (req,res) => {
    try{
        const crops = req.body.crops
        if(!crops || !crops.length){
            return res.status(400).json({message: "crops list is empty"})
        }
        const cropList = await Crop.insertMany(crops)
        res.status(201).json({message: "crops saved successfully", cropList})
    }catch(err){
        console.error(err)
        res.status(500).json({message: 'Failed to save crops'})
    }
}
exports.getAllCrops = async (req,res) => {
    try{
        const crops = await Crop.find()
        
        // If no crops are found, return an empty array
        if (!crops.length) {
            return res.status(404).json({ message: 'No crops found' });
        }

        // Return the list of crops with a 200 status
        res.status(200).json(crops);
    }catch(err){
        console.error(err)
        res.status(500).json({message: 'Failed to fetch crops'})
    }
}
exports.updateCrop = async (req,res) =>{
    try {
        const cropID = req.params.cropId; // Use cropId instead of _id
        const cropUpdates = req.body; // Updates provided in request body
    
        if (!Object.keys(cropUpdates).length) {
          return res.status(400).json({ message: "No crop details provided" });
        }
    
        // Find crop by cropId and update only the provided fields
        const updatedCrop = await Crop.findOneAndUpdate(
          { cropID: cropID }, // Find by cropId
          { $set: cropUpdates }, // Update only provided fields
          { new: true } // Return the updated document
        );
    
        if (!updatedCrop) {
          return res.status(404).json({ message: "Crop not found" });
        }
    
        res.status(200).json({ message: "Crop updated successfully", updatedCrop });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update crop" });
      }
        
}
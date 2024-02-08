const Pirate=require('../models/pirate.model');

module.exports.findAll = (req, res) => {
    Pirate.find()
    .then((allpirates) => {
        res.json({pirates: allpirates})
    })
    .catch((err) => {
        res.json({message: "Something went wrong", error: err})
    })
}



module.exports.findOne = (req, res) => {
    Pirate.findOne({_id: req.params.id})
    .then((onepirate) => {
        res.json({pirate: onepirate})
    })
    .catch((err) => {
        res.json({message: "Something went wrong", error: err})
    })
}

module.exports.findAllbyRole = (req, res) => {
    Pirate.find({ crewPosition: req.params.role })
        .then((onePirate) => {
            res.json({ pirates: onePirate })
        })
        .catch((err) => {
            res.json({ message: "Something went wrong", error: err })
        })
}




module.exports.create = (req, res) => {
    Pirate.create(req.body)
    .then((createpirate) => {
        res.json({pirates: createpirate})
    })
    .catch((err) => {
        res.json({message: "Something went wrong", error: err})
    })

}


module.exports.update = (req, res) => {
    Pirate.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
    .then((updatepirate) => {
        res.json({pirates: updatepirate})
    })
    .catch((err) => {
        res.json({message: "Something went wrong", error: err})
    })

}


module.exports.delete = (req, res) => {
    Pirate.deleteOne({_id: req.params.id})
    .then((result) => {
        res.json({result: result})
    })
    .catch((err) => {
        res.json({message: "Something went wrong", error: err})
    })
}

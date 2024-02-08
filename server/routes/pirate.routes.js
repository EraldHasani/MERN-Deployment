const PirateController= require("../controllers/pirate.controller")
const {authenticate} = require('../config/jwt.config');
module.exports=(app) =>{

    app.get('/api/pirates', authenticate, PirateController.findAll)
    app.get('/api/pirate/:id', authenticate, PirateController.findOne)
    app.post('/api/pirate/',authenticate, PirateController.create)
    app.put('/api/pirate/:id',authenticate, PirateController.update)
    app.delete('/api/pirate/:id',authenticate, PirateController.delete)
    app.get('/api/pirates/:role',authenticate, PirateController.findAllbyRole)


}


const express = require('express');
/* gets router form express */
const router = express.Router();

/* gets client from models */
const Client = require('../models/client');

/*-------------------- RESTs ------------------ */
// returns all deails 
router.get('/', async (req, res) => {
    try {
        // gets all of the clients details 
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        // if error caught, respond in json--- error in server 
        res.status(500).json({ message: err.message });
    }
});

// retrieves only one id by calling the middleware 
router.get('/:id', getClient, (req, res) => {
    res.json(res.client);
})

// creates one data entry 
router.post('/', async (req, res) => {

    /*client object structure */
    const client = new Client({
        name: req.body.name,
        phone: req.body.phone
    })

    // saves the client object 
    try {
        const newClient = await client.save();
        // handles create specifically 
        res.status(201).json(newClient);
    } catch (err) {
        /*filters out bad data from client */
        res.status(400).json({ message: err.message });
    }
})

/*updates one data entry */
router.patch('/:id', getClient, async (req, res) => {
    if (req.body.name != null) {
        res.body.name = req.body.name;
    }
    if (req.body.phone != null) {
        res.body.phone = req.body.phone;
    }

    try {
        const updatedClient = await res.client.save();
        res.json(updatedClient);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

/*deletes one data entry */
router.delete('/:id', getClient, async (req, res) => {
    try {
        await res.client.remove();
        res.json({message: 'Client successfully deleted'});
    } catch (error) {
        res.status(500).json({message: error.message });
    }
})


// handles the get/post requests as a middleware func for id CRUD  

async function getClient(req, res, next) {
    let client
    try {
        // gets client details based on id passed 
        client = await Client.findById(req.params.id);

        if (client == null) {
            // throws a 404 if client doesn't exist 
            return  res.status(404).json({message: "user does't exist"});
        } 
    } catch (err) {
        // handles server error
        return res.status(500).json({message: err.message});
    }
    // handles the response on getclient call 
    res.client = client;
    // executes the next func after this.completes exe 
    next();
}
module.exports = router;
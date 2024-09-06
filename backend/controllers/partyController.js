const PartyModel = require("../models/Party");

const checkPartyBudget = (budget, services) => {
    const priceSum = services.reduce((sum, service) => sum + service.price, 0);
    return (budget >= priceSum);
}

const partyController = {
    create: async(req, res) => {
        try {
            const party = {
                title: req.body.title,
                owner: req.body.owner,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            }

            if (party.services && (!checkPartyBudget(party.budget, party.services))) {
                res.status(406).json({ msg: "Your budget is insufficient." });
                return;
            }

            const response = await PartyModel.create(party);

            res.status(201).json({ response, msg: "Party created successfully." });
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async(req, res) => {
        try {
            const parties = await PartyModel.find();
            res.json(parties);
        } catch (error) {
            console.log(error);
        }
    },
    get: async(req, res) => {
        try {
            const party = await PartyModel.findById(req.params.id);
            
            if (!party){
                res.status(404).json({ msg: "Party not found" });
                return;
            }

            res.json(party);
        } catch (error) {
            console.log(error);
        }
    },
    delete: async(req, res) => {
        try {
            const deletedParty = await PartyModel.findByIdAndDelete(req.params.id);

            if (!deletedParty) {
                res.status(404).json({ msg: "Party not found" });
                return;
            }

            res.status(200).json({ deletedParty, msg: "Party deleted successfully" });
        } catch (error) {
            console.log(error);
        }
    },
    update: async(req, res) => {
        try {
            const party = {
                title: req.body.title,
                owner: req.body.owner,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            };

            if (party.services && !checkPartyBudget(party.budget, party.services)) {
                res.status(406).json({ msg: "Your budget is insufficient." });
                return;
            }

            const updatedParty = await PartyModel.findByIdAndUpdate(req.params.id, party);
            
            if (!updatedParty) {
                res.status(404).json({ msg: "Party not found" });
                return;
            }

            res.status(200).json({ party, msg: "Party updated successfully" });
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = partyController;
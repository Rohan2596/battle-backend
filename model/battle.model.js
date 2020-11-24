const mongoose = require('mongoose');

const battleSchema = new mongoose.Schema({
    'name': {
        type: String,
        required: true
    },
    'year': {
        type: Number,
        required: true
    },
    'battle_number': {
        type: Number,
        required: true
    },
    'attacker_king': {
        type: String,
        required: true
    },
    'defender_king': {
        type: String,
        required: true
    },
    'attacker_1': {
        type: String,
        required: true
    },
    'attacker_2': {
        type: String,
        required: true
    },

    'attacker_3': {
        type: String,

    },

    'attacker_4': {
        type: String,

    },

    'defender_1': {
        type: String,

    },

    'defender_2': {
        type: String,

    },

    'defender_3': {
        type: String,

    },

    'defender_4': {
        type: String,

    },

    'attacker_outcome': {
        type: String,
        required: true
    },

    'battle_type': {
        type: String,
        required: true
    },

    'major_death': {
        type: Number,
        required: true
    },
    'major_capture': {
        type: Number,
        required: true
    },

    'attacker_size': {
        type: Number,
        required: true
    },
    'defender_size': {
        type: Number,
        required: true
    },
    'attacker_commander': {
        type: String,
        required: true
    },
    'defender_commander': {
        type: String,
        required: true
    },
    'summer': {
        type: Number,
        required: true
    },
    'location': {
        type: String,
        required: true
    },
    'region': {
        type: String,
        required: true
    },
    'note': {
        type: String,
    },

})
const battleModel = mongoose.model("battle", battleSchema, "battle");
battleSchema.index({
    'name': 'text',

    'attacker_king': 'text',
    'defender_king': 'text',
    'attacker_1': 'text',
    'attacker_2': 'text',

    'attacker_3': 'text',

    'attacker_4': 'text',

    'defender_1': 'text',

    'defender_2': 'text',

    'defender_3': 'text',

    'defender_4': 'text',

    'attacker_outcome': 'text',
    'battle_type': 'text',
    'attacker_commander': 'text',
    'defender_commander': 'text',
    'summer': 'text',
    'location': 'text',
    'region': 'text',
    'note': 'text',
})
class BattleModel {

    getBattleList = (next) => {
        try {
            return new Promise((resolve, reject) => {
                battleModel.find()
                    .then(result => {
                        if (result) {
                            let i = 0;
                            const data = [];
                            for (i = 0; i < result.length; i++) {
                                data[i] = result[i].location;
                            }
                            resolve({ message: "Battles Found are :- ", data: data })

                        } else {
                            reject({ message: "No Battle Found!", data: [] })
                        }

                    }).catch(err => {
                        reject(err)
                    })
            })
        } catch (error) {
            next(error);
        }
    };
    getTotalBattleCount = (next) => {
        try {
            return new Promise((resolve, reject) => {
                battleModel.find()
                    .then(result => {
                        if (result) {

                            resolve({ message: "Battles Count are :- ", data: result.length })

                        } else {
                            reject({ message: "No Battles Found!", data: 0 })
                        }

                    }).catch(err => {
                        reject(err)
                    })
            })
        } catch (error) {
            next(error);
        }
    };
    search = (req, next) => {
        try {
            return new Promise((resolve, reject) => {
                battleModel.find(
                    {
                        $or:
                            [
                                { name: { $regex: req, $options: 'i' } },
                                { battle_type: { $regex: req, $options: 'i' } },
                                { attacker_king: { $regex: req, $options: 'i' } },
                                { defender_king: { $regex: req, $options: 'i' } },
                                { attacker_1: { $regex: req, $options: 'i' } },
                                { attacker_2: { $regex: req, $options: 'i' } },
                                { attacker_3: { $regex: req, $options: 'i' } },
                                { attacker_outcome: { $regex: req, $options: 'i' } },
                                { defender_1: { $regex: req, $options: 'i' } },
                                { defender_2: { $regex: req, $options: 'i' } },
                                { defender_3: { $regex: req, $options: 'i' } },
                                { battle_type: { $regex: req, $options: 'i' } },
                                { region: { $regex: req, $options: 'i' } },
                                { attacker_commander: { $regex: req, $options: 'i' } },
                                { location: { $regex: req, $options: 'i' } },
                                { note: { $regex: req, $options: 'i' } }

                            ]
                      }
                )
                    .then(result => {
                        if (result) {
                            console.log(result.length);
                            resolve({ message: "Battles Found are :- ", data: result })

                        } else {
                            reject({ message: "No Battles Found!", data: [] })
                        }

                    }).catch(err => {
                        reject(err)
                    })
            })
        } catch (error) {
            next(error);
        }
    };
    getSearchQuery = (req, next) => {
        try {
            console.log(req);
            return new Promise((resolve, reject) => {
                battleModel.find({
                    $or:
                        [
                            { location: req.location },
                            { battle_type: req.type },
                            { attacker_king: req.attacker_king },
                            { defender_king: req.defender_king }
                        ]
                })
                    .then(result => {
                        if (result) {

                            resolve({ message: "Search Output:- ", data: result })

                        } else {
                            reject({ message: "No Battles Found!", data: 0 })
                        }
                    }).catch(err => {
                        reject(err)
                    })
            })
        } catch (error) {
            next(error);
        }
    };

}
module.exports = new BattleModel();
const battleService = require('../service/battle.service');

class BattleController {

    getBattleList = (req, res, next) => {
        try {
            const response = {}
            battleService.getBattleList().then((data) => {
                response.success = true;
                response.message = data.message;
                response.data = data.data;
                response.error = ""
                return res.status(200).send(response);

            }).catch((error) => {
                response.success = false;
                response.message = data.message;
                response.data = data.data;
                response.error = ""
                return res.status(400).send(response);

            })
        } catch (error) {
            console.log(error);

            next(error)
        }
    };
    getBattleCount = (req, res, next) => {
        try {
            const response = {}
            battleService.getBattleCount().then((data) => {
                response.success = true;
                response.message = data.message;
                response.data = data.data;
                response.error = ""
                return res.status(200).send(response);

            }).catch((error) => {
                console.log(error);
                response.success = false;
                response.message = data.message;
                response.data = data.data;
                response.error = error
                return res.status(400).send(response);

            })
        } catch (error) {
            next(error)
        }
    };
    searchingAll = (req, res, next) => {
        try {

            const response = {}
            let search = req.params.search;
            battleService.searchAll(search).then((data) => {
                response.success = true;
                response.message = data.message;
                response.data = data;
                response.error = ""
                return res.status(200).send(response);

            }).catch((error) => {
                response.success = false;
                response.message = data.message;
                response.data = data.data;
                response.error = error
                return res.status(400).send(response);

            })
        } catch (error) {
            next(error)
        }
    };

    searchQuery = (req, res, next) => {
        try {

            const response = {}
            let search = req.query;
            let { location, name, king,type } = req.query;
            let query = {};
            if (location != null) query.location = location;
            if (king != null) {
                query.attacker_king = king, query.defender_king = king
            }
            if (type != null) {
                query.type = type;
            }
            if(name!=null){
                query.name = name;
            }
            battleService.searchQuery(query).then((data) => {
                response.success = true;
                response.message = "Searching battle and any more";
                response.data = data;
                response.error = ""
                return res.status(200).send(response);

            }).catch((error) => {
                response.success = false;
                response.message = data.message;
                response.data = data.data;
                response.error = error
                return res.status(400).send(response);

            })
        } catch (error) {
            next(error)
        }
    }


};
module.exports = new BattleController();
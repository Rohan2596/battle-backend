const battleModel = require('../model/battle.model');
class BattleService {
    getBattleList = (next) => {
        try {
            return battleModel.getBattleList().then((data) => {
                return data;
            }).catch((err) => {
                return err;
            })
        } catch (error) {
            next(error)
        }
    };
    getBattleCount = (next) => {
        try {
            return battleModel.getTotalBattleCount().then((data) => {
                return data;
            }).catch((err) => {
                return err;
            })
        } catch (error) {
            next(error)
        }
    };
    searchAll = (req, res, next) => {
        try {
            return battleModel.search(req).then((data) => {
                console.log(req);
                return data;
            }).catch((err) => {
                return err;
            })
        } catch (error) {
            next(error)
        }
    };
    searchQuery = (req, res, next) => {
        try {
            return battleModel.getSearchQuery(req).then((data) => {
                return data;
            }).catch((err) => {
                return err;
            })
        } catch (error) {
            next(error)
        }
    }


}
module.exports = new BattleService();
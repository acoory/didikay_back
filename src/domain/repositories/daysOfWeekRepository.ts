import daysOfWeekModel from "../models/daysOfWeek.model";

class daysOfWeekRepository {
    getAll() {
        return daysOfWeekModel.findAll();
    }
}

export default new daysOfWeekRepository();
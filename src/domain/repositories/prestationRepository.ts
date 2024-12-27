import PrestationModel from "../models/prestation.model";
import subprestationModel from "../models/subprestation.model";
import servicesModel from "../models/services.model";

class prestationRepository {
    async getAll() {
        return await PrestationModel.findAll({
            include: {
                model: subprestationModel,
                include: {
                    model: servicesModel
                }
            }
        });
    }
}

export default new prestationRepository();
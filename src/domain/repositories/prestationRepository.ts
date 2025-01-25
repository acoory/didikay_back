import PrestationModel from "../models/prestation.model";
import subprestationModel from "../models/subprestation.model";
import servicesModel from "../models/services.model";
import {SubprestationModel} from "../models";

class prestationRepository {
    async getAll() {
        return await PrestationModel.findAll({
            include: [
                {
                    model: SubprestationModel,
                    as: 'subprestations',  // L'alias défini dans `hasMany` dans PrestationModel
                    include: [
                        {
                            model: servicesModel,
                            as: 'services', // L'alias défini dans `hasMany` dans SubprestationModel
                        },
                    ],
                },
            ],
        });
    }
}


export default new prestationRepository();
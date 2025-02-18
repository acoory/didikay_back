import adminModel, { adminType } from "../models/admin.model";

class AdminRepository {
    async create(data: adminType): Promise<adminType> {
        try {
            // @ts-ignore
            const admin = await adminModel.create(data) as unknown as adminType;

            if (!admin) {
                throw new Error('Failed to create admin');
            }

            return admin;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getAdminByEmail(email: string): Promise<adminType | any> {
        try {
            const admin = await adminModel.findOne({ where: { email } });

            if (!admin) {
                throw new Error('Admin not found');
            }

            return admin;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new AdminRepository();

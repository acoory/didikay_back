import { adminType } from "../models/admin.model";
import adminRepository from "../repositories/adminRepository";
const bcrypt = require('bcrypt');

export default class AdminService {
    static async createAdmin(data: adminType): Promise<adminType> {
        try {
            if (!data.email || !data.firstname || !data.lastname || !data.password) {
                throw new Error('Please provide all required fields');
            }

            if (!this.verifEmail(data.email)) {
                throw new Error('Invalid email');
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);

            data.password = hashedPassword;

            return await adminRepository.create(data);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async login(email: string, password: string): Promise<adminType> {
        try {
            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            const admin = await adminRepository.getAdminByEmail(email);

            if (!admin) {
                throw new Error('Admin not found');
            }

            const match = await bcrypt.compare(password, admin.password);

            if (!match) {
                throw new Error('Invalid credentials');
            }

            return admin;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static verifEmail(email: string): boolean {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    }
}

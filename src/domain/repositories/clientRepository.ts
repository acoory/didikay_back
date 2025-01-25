import ClientModel from '../models/client.model';


class ClientRepository {

    async createUser(client :{firstname: string, lastname: string, email: string, phone: string}, transaction?: any) {
        try {

            let localTransaction = transaction

            if (!localTransaction) {
                // @ts-ignore
                localTransaction = await ClientModel.sequelize.transaction();
            }
            const user = await ClientModel.create(client, {transaction: localTransaction});

            if (!transaction) {
                await localTransaction.commit();
            }

            if (!user) {
                throw new Error('Failed to create user');
            }
            
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getUserById(id: number) {
        try {
            const user = await ClientModel.findOne({where: {id}});

            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await ClientModel.withScope('withPassword').findOne({where: {email}});

            return user || null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


}

export default new ClientRepository();



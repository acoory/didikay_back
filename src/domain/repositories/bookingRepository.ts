import BookingModel from "../models/booking.model";

class bookingRepository {
    async findAll()  {
        return await BookingModel.findAll();
    }

    async createBooking(bookingData:any, transaction?: any) {

        try {
            let localTransaction = transaction

            if (!localTransaction) {
                // @ts-ignore
                localTransaction = await BookingModel.sequelize.transaction();
            }


            // @ts-ignore
            const booking = await BookingModel.create(bookingData, {transaction: localTransaction});
            //
            if (!transaction) {
                await localTransaction.commit();
            }

            if (!booking) {
                throw new Error('Failed to create booking');
            }

            return booking;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

        // @ts-ignore
        // return await BookingModel.create({booking,...services,userId});


    async cancelBooking(bookingId: number, code: string) {
        try {
            return await BookingModel.destroy({where: {id: bookingId, code}});
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new bookingRepository();
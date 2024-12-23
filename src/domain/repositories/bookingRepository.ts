import BookingModel from "../models/booking.model";

class bookingRepository {
    async findAll()  {
        return await BookingModel.findAll();
    }

    async createBooking(dateTimeStart: Date, dateTimeEnd: Date, userId: number) {

        const code = Math.random().toString(36).substring(7);

        return await BookingModel.create({dateTimeStart, dateTimeEnd, userId, code});
    }

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
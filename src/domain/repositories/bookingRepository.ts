import BookingModel from "../models/booking.model";

class bookingRepository {
    async findAll()  {
        return await BookingModel.findAll();
    }

    async createBooking(dateTimeStart: Date, dateTimeEnd: Date, userId: number) {
        return await BookingModel.create({dateTimeStart, dateTimeEnd, userId});
    }
}

export default new bookingRepository();
import BookingModel from "../models/booking.model";
import UserModel from "../models/client.model";
import mailService from "../../infrastructure/mailer/mailService";
import {formatDataForMail} from "../usecases/formatDataForMail";

class mailRepository {
  async sendMail(bookingId: number, userId: number) {
    try {
      const data:any = await BookingModel.findOne({where: {id: bookingId, userId: userId}, include: {
          model: UserModel
        }});

      if(!data) {
        throw new Error('Booking not found');
      }

      const formatData = formatDataForMail(data);

      // const sendMail = await mailService.sendMailConfirmation(data.user.email, 'Confirmation réservation', 'Your booking has been confirmed', formatData);
      //  // @ts-ignore
      // if(!sendMail) {
      //   throw new Error('Failed to send email');
      //   }

       return true;
    } catch (e: any) {
        throw new Error(e.message);
    }

  }
}

export default new mailRepository();
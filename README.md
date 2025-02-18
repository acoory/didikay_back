<p align="center"> <em><code>❯ Backend Project - Hairdresser Appointment Management</code></em> </p> 

<p align="center"> 
  <img src="https://img.shields.io/github/last-commit/acoory/boilerplate_express_clean_architecture?style=flat-square&logo=git&logoColor=white&color=e84118" alt="Last Commit"> 
  <img src="https://img.shields.io/github/languages/top/acoory/boilerplate_express_clean_architecture?style=flat-square&color=0080ff" alt="Top Language"> 
  <img src="https://img.shields.io/github/languages/count/acoory/boilerplate_express_clean_architecture?style=flat-square&color=0080ff" alt="Language Count"> 
</p> 

<p align="center">Built with powerful tools and technologies:</p> 

<p align="center"> 
  <img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat-square&logo=Docker&logoColor=white" alt="Docker"> 
  <img src="https://img.shields.io/badge/Typescript-3178C6.svg?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"> 
</p>

## 📚 About This Project

This project was designed to specifically manage hairdresser appointments. It allows for appointment booking, cancellation, and automated email confirmations for both the client and the business owner, ensuring smooth and efficient communication.

For more details on the boilerplate used, visit the GitHub repository:  
👉 <a href="https://github.com/acoory/boilerplate_express_clean_architecture">BoilerPlate Express Clean Architecture</a>.

## ✨ Features

- **Appointment Booking**: Users can book appointments based on availability.
- **Time Slot Validation**: The system checks if an appointment slot is already taken before confirming a booking.
- **Appointment Cancellation**: Clients can cancel their appointments if needed.
- **Client Refunds on Cancellation**: If a client cancels an appointment, they receive a refund automatically.
- **Stripe Integration**: Secure online payments for appointments.
- **Email Notifications**: Automatic confirmation emails sent to both the client and the service provider.
- **Secure Payment Processing**: Payments are handled securely on the backend to prevent fraud.

## 📦 Seeders

Run all seeders:

```bash
npx sequelize-cli db:seed:all

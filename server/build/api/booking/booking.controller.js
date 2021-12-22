"use strict";
// // TODO use custome solution instead validator
// import validator from "validator";
// import { Request, Response } from "express";
// // TODO maybe use jwt instead or custome algorithm for hash checking
// import bcrypt from "bcrypt";
// import logger from "../../services/logger";
// import BookingService from "./booking.service";
// import { IBooking } from "./booking.model";
// import uuid from "uuid";
// import sendEmail from "../../services/mailer";
// import UserRegisterBody from "../../models/userRegisterBody.model";
// import ErrorObject from "../../models/error.model";
// import { MailOptions } from "nodemailer/lib/sendmail-transport";
// import { generateVerificationEmail } from "../../services/utils";
// import conferenceService from "../conference/conference.service";
// export const getAllBookings = async (req: Request, res: Response) => {
//   try {
//     const bookings = await BookingService.getAllBookings();
//     res.send(bookings).status(200);
//   } catch (error) {
//     return res.send({ error: true, errorObject: error }).status(400);
//   }
// };
// export const getBookingById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const booking: IBooking | null = await BookingService.getBookingById(id);
//     return res.send(booking).status(200);
//   } catch (error) {
//     return res.send({ error: true, errorObject: error }).status(400);
//   }
// };
// // TODO don't expose this
// // TODO change how to call it (not API)
// export const createBooking = async (req: Request, res: Response) => {
//   try {
//     const newBooking: IBooking | null = await BookingService.createBooking(
//       req.body
//     );
//     res.send(newBooking).status(200);
//   } catch (error) {
//     return res.send({ error: true, errorObject: error }).status(400);
//   }
// };
// export const updateBooking = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const booking: IBooking | null = await BookingService.updateBooking(
//       id,
//       req.body
//     );
//     res.send(booking).status(200);
//   } catch (error) {
//     return res.send({ error: true, errorObject: error }).status(400);
//   }
// };
// export const deleteBookingById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const deletedBooking = await BookingService.deleteBookingById(id);
//     res.send(deletedBooking).status(200);
//   } catch (error) {
//     return res.send({ error: true, errorObject: error }).status(400);
//   }
// };
// const checkEmptyFields = (fields: UserRegisterBody) => {
//   const { firstname, lastname, email, phone } = fields;
//   let errorMessage = "";
//   if (!firstname) {
//     errorMessage += "Please enter your first name";
//   }
//   if (!lastname) {
//     errorMessage += "Please enter your last name";
//   }
//   if (!email) {
//     errorMessage += "Please enter your email";
//   }
//   if (!phone) {
//     errorMessage += "Please enter your phone number";
//   }
//   return {
//     errorMessage,
//     error: errorMessage !== ""
//   };
// };
// // Admin login
// export async function register(req: Request, res: Response) {
//   const errorObject: ErrorObject = checkEmptyFields(req.body);
//   const { email, phone, conferenceid } = req.body;
//   if (!conferenceid) {
//     return res.status(500).send({
//       error: true,
//       errorMessage: "Something wrong with request, conference id not sent"
//     });
//   }
//   if (!validator.isEmail(email)) {
//     errorObject.errorMessage += "Not valid email format";
//   }
//   if (!validator.isMobilePhone(phone)) {
//     errorObject.errorMessage += "Not valid phone number format";
//   }
//   if (errorObject.errorMessage) {
//     return res.status(400).send(errorObject);
//   }
//   const conference = await conferenceService.getConferenceById(conferenceid);
//   if (!conference) {
//     return res.status(404).send({
//       error: true,
//       errorMessage: "Something wrong, conference not found"
//     });
//   }
//   // Generate token - can use JWT or hashing for more secure approach
//   const token = uuid();
//   const mailOptions: MailOptions = {
//     from: "Confi",
//     to: email,
//     subject: "Verification Email",
//     html: generateVerificationEmail(token)
//   };
//   // Sending email
//   await sendEmail(mailOptions);
//   // Create new booking with token and flag verified set to false
//   await BookingService.createBooking({ ...req.body, token });
//   res.sendStatus(200);
// }
// export const verification = async (req: Request, res: Response) => {
//   const { token } = req.params;
//   if (!token) {
//     return res.send({ error: true, errorMessage: "Invalid token" });
//   }
//   const booking = await BookingService.getBookingByToken(token);
//   if (!booking) {
//     return res.send({ error: true, errorMessage: "Invalid token" });
//   }
//   booking.verified = true;
//   await booking.save();
//   res.sendStatus(200);
// };

"use strict";
// import { compare } from "bcrypt";
// import { Request, Response } from "express";
// import adminService from "./admin.service";
// import { IAdmin } from "./admin.model";
// // const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "9", 10);
// // Admin login
// export async function login(req: Request, res: Response) {
//   const { username, password } = req.body;
//   const admin: IAdmin | null = await adminService.getAdminByUsername(username);
//   if (admin) {
//     const match = await compare(password, admin.password);
//     if (match) {
//       // Login
//       // Add session - this can be token (simple for now)
//       if (req?.session?.admin) {
//         req.session.admin = true;
//       }
//       return res.send(200);
//     }
//     return res
//       .send({ error: true, errorMessage: "Wrong password" })
//       .status(400);
//   }
//   res.send({ error: true, errorMessage: "No matching user " });
// }
// export async function logout(req: Request, res: Response) {
//   // logout
//   if (req?.session?.admin) {
//     req.session.admin = null;
//   }
// }

import { Router, Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

const userRoutes = Router();

// Login
userRoutes.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  UserModel.findOne({ email: body.email }, (err, userDB: any) => {
    // Si no encuentra la respuesta
    if (err) {
      res.status(500).json({
        ok: false,
        message: err
      });
    }

    if (userDB.comparePassword(body.password)) {
      res.json({
        of: true,
        token: 'asdasd'
      })
    } else {
      res.status(500).json({
        ok: false,
        message: 'Usuario/Contraseña Incorrecto ***'
      });
    }

  });

});

// Crear usuario
userRoutes.post('/create', async (req: Request, res: Response, next: NextFunction) => {

  try {

    const body = req.body;
    const user: any = {
      nombre: body.nombre,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      avatar: body.avatar
    }

    let rpt = await UserModel.create(user);

    res.status(201).json({
      ok: true,
      user: rpt
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error
    });
  }

});

export default userRoutes;
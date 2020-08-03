import { Router, Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import Token from "../classes/token";
import { verificaToken } from "../middlewares/auth";

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

      const token = Token.getJwtToken({
        _id: userDB._id,
        nombre: userDB.nombre,
        email: userDB.email,
        avatar: userDB.avatar
      })

      res.json({
        of: true,
        token
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

    let userDB = await UserModel.create(user);

    const token = Token.getJwtToken({
      _id: userDB._id,
      nombre: userDB.nombre,
      email: userDB.email,
      avatar: userDB.avatar
    })

    res.status(201).json({
      ok: true,
      user: userDB,
      token
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error
    });
  }

});

userRoutes.post('/update', verificaToken, async (req: Request, res: Response, next: NextFunction) => {

  res.json({
    ok: true,
    usuario: req.user
  });

});

export default userRoutes;
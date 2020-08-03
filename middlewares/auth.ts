import { Request, Response, NextFunction } from "express";
import Token from "../classes/token";


export const verificaToken = async (req: any, res: Response, next: NextFunction) => {

  try {
    const userToken = req.get('x-token') || '';

    let decoded: any = await Token.comprobarToken(userToken);
    if (decoded) {
      console.log('Decoded', decoded);
      req.user = decoded.user;
      next();
    }

  } catch (error) {
    res.json({
      ok: false,
      message: 'Token no es correcto'
    })
  }

}
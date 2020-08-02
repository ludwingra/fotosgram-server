import { Router, Request, Response, NextFunction } from "express";

const userRoutes = Router();

userRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {

  res.json({
    ok: true,
    message: 'Todo ok'
  })

});

export default userRoutes;
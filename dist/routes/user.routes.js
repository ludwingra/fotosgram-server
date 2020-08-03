"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const auth_1 = require("../middlewares/auth");
const userRoutes = express_1.Router();
// Login
userRoutes.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    user_model_1.UserModel.findOne({ email: body.email }, (err, userDB) => {
        // Si no encuentra la respuesta
        if (err) {
            res.status(500).json({
                ok: false,
                message: err
            });
        }
        if (userDB.comparePassword(body.password)) {
            const token = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                of: true,
                token
            });
        }
        else {
            res.status(500).json({
                ok: false,
                message: 'Usuario/Contraseña Incorrecto ***'
            });
        }
    });
}));
// Crear usuario
userRoutes.post('/create', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = {
            nombre: body.nombre,
            email: body.email,
            password: bcrypt_1.default.hashSync(body.password, 10),
            avatar: body.avatar
        };
        let userDB = yield user_model_1.UserModel.create(user);
        const token = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.status(201).json({
            ok: true,
            user: userDB,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        });
    }
}));
userRoutes.post('/update', auth_1.verificaToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        ok: true,
        usuario: req.user
    });
}));
exports.default = userRoutes;

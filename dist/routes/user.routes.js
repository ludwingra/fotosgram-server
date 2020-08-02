"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes = express_1.Router();
userRoutes.get('/', (req, res, next) => {
    res.json({
        ok: true,
        message: 'Todo ok'
    });
});
exports.default = userRoutes;

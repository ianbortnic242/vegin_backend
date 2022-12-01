"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;
var admin = false;
var auth = function auth(req, res, next) {
  if (!admin) {
    res.status(401).json({
      msg: 'No Autorizado'
    });
  }
  next();
};
exports.auth = auth;
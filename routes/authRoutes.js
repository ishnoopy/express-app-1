const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { registerDTO, loginDTO } = require('../dto/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const AuthController = require('../controller/authController');
const authController = new AuthController();

router.post('/register', (req, res, next) => authController.register(req, res, next));
router.post('/login', (req, res, next) => authController.login(req, res, next));


module.exports = router;

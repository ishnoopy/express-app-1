const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwtAuthGuard = require('../middleware/authGuard');
const ProfileController = require('../controller/profileController');
const profileController = new ProfileController();

router.get('/', jwtAuthGuard, (req, res, next) => profileController.getProfile(req, res, next));

router.get('/:id', jwtAuthGuard, async (req, res, next) => profileController.getProfileById(req, res, next));

router.post('/', jwtAuthGuard, async (req, res, next) => profileController.createProfile(req, res, next));

module.exports = router;
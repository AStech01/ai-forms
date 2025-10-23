"use strict";
// // import express from 'express';
// // import { body, validationResult } from 'express-validator';
// // import jwt from 'jsonwebtoken';
// // import User from '../models/User';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // const router = express.Router();
// // // Sign up
// // router.post('/signup',
// //   [
// //     body('email').isEmail(),
// //     body('password').isLength({ min: 6 }),
// //     body('name').notEmpty(),
// //   ],
// //   async (req, res) => {
// //     try {
// //       const errors = validationResult(req);
// //       if (!errors.isEmpty()) {
// //         return res.status(400).json({ errors: errors.array() });
// //       }
// //       const { email, password, name } = req.body;
// //       const existingUser = await User.findOne({ email });
// //       if (existingUser) {
// //         return res.status(400).json({ message: 'Email already registered' });
// //       }
// //       const user = new User({ email, password, name });
// //       await user.save();
// //       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
// //         expiresIn: '7d',
// //       });
// //       res.status(201).json({
// //         token,
// //         user: {
// //           id: user._id,
// //           email: user.email,
// //           name: user.name,
// //         },
// //       });
// //     } catch (error) {
// //       res.status(500).json({ message: 'Server error' });
// //     }
// //   }
// // );
// // // Login
// // router.post('/login',
// //   [
// //     body('email').isEmail(),
// //     body('password').notEmpty(),
// //   ],
// //   async (req, res) => {
// //     try {
// //       const errors = validationResult(req);
// //       if (!errors.isEmpty()) {
// //         return res.status(400).json({ errors: errors.array() });
// //       }
// //       const { email, password } = req.body;
// //       const user = await User.findOne({ email });
// //       if (!user) {
// //         return res.status(401).json({ message: 'Invalid credentials' });
// //       }
// //       const isMatch = await user.comparePassword(password);
// //       if (!isMatch) {
// //         return res.status(401).json({ message: 'Invalid credentials' });
// //       }
// //       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
// //         expiresIn: '7d',
// //       });
// //       res.json({
// //         token,
// //         user: {
// //           id: user._id,
// //           email: user.email,
// //           name: user.name,
// //         },
// //       });
// //     } catch (error) {
// //       res.status(500).json({ message: 'Server error' });
// //     }
// //   }
// // );
// // export default router;
// import express, { Request, Response } from 'express';
// import { body, validationResult } from 'express-validator';
// import jwt from 'jsonwebtoken';
// import User from '../models/User';
// const router = express.Router();
// // Sign up
// router.post(
//   '/signup',
//   [
//     body('email').isEmail(),
//     body('password').isLength({ min: 6 }),
//     body('name').notEmpty(),
//   ],
//   async (req: Request, res: Response) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       const { email, password, name } = req.body;
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ message: 'Email already registered' });
//       }
//       const user = new User({ email, password, name });
//       await user.save();
//       if (!process.env.JWT_SECRET) {
//         return res.status(500).json({ message: 'JWT secret not configured' });
//       }
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//         expiresIn: '7d',
//       });
//       res.status(201).json({
//         token,
//         user: {
//           id: user._id,
//           email: user.email,
//           name: user.name,
//         },
//       });
//     } catch (error) {
//       console.error('Signup error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   }
// );
// // Login
// router.post(
//   '/login',
//   [
//     body('email').isEmail(),
//     body('password').notEmpty(),
//   ],
//   async (req: Request, res: Response) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       const { email, password } = req.body;
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//       }
//       const isMatch = await user.comparePassword(password);
//       if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//       }
//       if (!process.env.JWT_SECRET) {
//         return res.status(500).json({ message: 'JWT secret not configured' });
//       }
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//         expiresIn: '7d',
//       });
//       res.json({
//         token,
//         user: {
//           id: user._id,
//           email: user.email,
//           name: user.name,
//         },
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   }
// );
// export default router;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// 🧍 Signup
router.post('/signup', [(0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 6 }), (0, express_validator_1.body)('name').notEmpty()], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const { email, password, name } = req.body;
    const existing = await User_1.default.findOne({ email });
    if (existing)
        return res.status(400).json({ message: 'Email already exists' });
    const user = new User_1.default({ email, password, name });
    await user.save();
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
});
// 🔑 Login
router.post('/login', [(0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').notEmpty()], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
});
// 👤 Get current user
router.get('/me', auth_1.authenticate, async (req, res) => {
    const user = await User_1.default.findById(req.userId).select('-password');
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    res.json({ id: user._id, email: user.email, name: user.name });
});
exports.default = router;

// // import express from 'express';
// // import { body, validationResult } from 'express-validator';
// // import jwt from 'jsonwebtoken';
// // import User from '../models/User';

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

import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

// 🧍 Signup
router.post('/signup',
  [body('email').isEmail(), body('password').isLength({ min: 6 }), body('name').notEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, name } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const user = new User({ email, password, name });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
  }
);

// 🔑 Login
router.post('/login',
  [body('email').isEmail(), body('password').notEmpty()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  }
);

// 👤 Get current user
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.userId).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ id: user._id, email: user.email, name: user.name });
});

export default router;

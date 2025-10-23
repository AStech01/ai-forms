"use strict";
// import express from 'express';
// import multer from 'multer';
// import { authenticate, AuthRequest } from '../middleware/auth';
// import { uploadImage } from '../services/cloudinary';
// import Form from '../models/Form';
// import Submission from '../models/Submission';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });
// // Submit form
// router.post('/:formId', upload.any(), async (req, res) => {
//   try {
//     const { formId } = req.params;
//     const form = await Form.findById(formId);
//     if (!form) {
//       return res.status(404).json({ message: 'Form not found' });
//     }
//     const submissionData: Record = {};
//     // Handle regular fields
//     for (const [key, value] of Object.entries(req.body)) {
//       submissionData[key] = value;
//     }
//     // Handle file uploads
//     if (req.files && Array.isArray(req.files)) {
//       for (const file of req.files) {
//         const imageUrl = await uploadImage(file as Express.Multer.File);
//         submissionData[file.fieldname] = imageUrl;
//       }
//     }
//     const submission = new Submission({
//       formId,
//       data: submissionData,
//     });
//     await submission.save();
//     res.status(201).json({ message: 'Form submitted successfully', submission });
//   } catch (error) {
//     console.error('Submission error:', error);
//     res.status(500).json({ message: 'Failed to submit form' });
//   }
// });
// // Get submissions for a form
// router.get('/:formId', authenticate, async (req: AuthRequest, res) => {
//   try {
//     const { formId } = req.params;
//     // Verify form belongs to user
//     const form = await Form.findOne({ _id: formId, userId: req.userId });
//     if (!form) {
//       return res.status(404).json({ message: 'Form not found' });
//     }
//     const submissions = await Submission.find({ formId }).sort({ submittedAt: -1 });
//     res.json(submissions);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// export default router;
// import express, { Request, Response } from 'express';
// import multer from 'multer';
// import { authenticate, AuthRequest } from '../middleware/auth';
// import { uploadImage } from '../services/cloudinary';
// import Form from '../models/Form';
// import Submission from '../models/Submission';
// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });
// // =============================
// // 📤 Submit Form (Public)
// // =============================
// router.post('/:formId', upload.any(), async (req: Request, res: Response) => {
//   try {
//     const { formId } = req.params;
//     const form = await Form.findById(formId);
//     if (!form) {
//       return res.status(404).json({ message: 'Form not found' });
//     }
//     // Record<string, any> for dynamic form fields
//     const submissionData: Record<string, any> = {};
//     // Handle regular text/number fields
//     for (const [key, value] of Object.entries(req.body)) {
//       submissionData[key] = value;
//     }
//     // Handle file uploads
//     if (req.files && Array.isArray(req.files)) {
//       for (const file of req.files as Express.Multer.File[]) {
//         const imageUrl = await uploadImage(file);
//         submissionData[file.fieldname] = imageUrl;
//       }
//     }
//     const submission = new Submission({
//       formId,
//       data: submissionData,
//       submittedAt: new Date(),
//     });
//     await submission.save();
//     res.status(201).json({
//       message: 'Form submitted successfully',
//       submission,
//     });
//   } catch (error) {
//     console.error('❌ Submission error:', error);
//     res.status(500).json({ message: 'Failed to submit form' });
//   }
// });
// // =============================
// // 📥 Get Submissions (Protected)
// // =============================
// router.get('/:formId', authenticate, async (req: AuthRequest, res: Response) => {
//   try {
//     const { formId } = req.params;
//     // Check if the form belongs to the authenticated user
//     const form = await Form.findOne({ _id: formId, userId: req.userId });
//     if (!form) {
//       return res.status(404).json({ message: 'Form not found or not authorized' });
//     }
//     const submissions = await Submission.find({ formId }).sort({ submittedAt: -1 });
//     res.json(submissions);
//   } catch (error) {
//     console.error('❌ Get submissions error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// export default router;
// src/routes/submissions.ts
// import express, { Request, Response } from 'express';
// import multer from 'multer';
// import { authenticate, AuthRequest } from '../middleware/auth';
// import { uploadImage } from '../services/cloudinary';
// import Form from '../models/Form';
// import Submission from '../models/Submission';
// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });
// // Public - submit a form submission
// router.post('/:formId', upload.any(), async (req: Request, res: Response) => {
//   try {
//     const { formId } = req.params;
//     const form = await Form.findById(formId);
//     if (!form) {
//       return res.status(404).json({ message: 'Form not found' });
//     }
//     const submissionData: Record<string, any> = { ...req.body };
//     if (req.files && Array.isArray(req.files)) {
//       for (const file of req.files as Express.Multer.File[]) {
//         const imageUrl = await uploadImage(file);
//         submissionData[file.fieldname] = imageUrl;
//       }
//     }
//     const submission = new Submission({
//       formId,
//       data: submissionData,
//       submittedAt: new Date(),
//     });
//     await submission.save();
//     res.status(201).json({
//       message: 'Form submitted successfully',
//       submission,
//     });
//   } catch (error) {
//     console.error('Submission error:', error);
//     res.status(500).json({ message: 'Failed to submit form' });
//   }
// });
// // Protected - get submissions for a form
// router.get('/:formId', authenticate, async (req: AuthRequest, res: Response) => {
//   try {
//     const { formId } = req.params;
//     // Check form ownership
//     const form = await Form.findOne({ _id: formId, userId: req.userId });
//     if (!form) {
//       return res.status(404).json({ message: 'Form not found or not authorized' });
//     }
//     const submissions = await Submission.find({ formId }).sort({ submittedAt: -1 });
//     res.json(submissions);
//   } catch (error) {
//     console.error('Get submissions error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// export default router;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("../middleware/auth");
const cloudinary_1 = require("../services/cloudinary");
const Form_1 = __importDefault(require("../models/Form"));
const Submission_1 = __importDefault(require("../models/Submission"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
/** Public – submit a form submission */
router.post('/:formId', upload.any(), async (req, res) => {
    try {
        const { formId } = req.params;
        const form = await Form_1.default.findById(formId);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        const submissionData = { ...req.body };
        if (req.files && Array.isArray(req.files)) {
            for (const file of req.files) {
                const imageUrl = await (0, cloudinary_1.uploadImage)(file);
                submissionData[file.fieldname] = imageUrl;
            }
        }
        const submission = new Submission_1.default({
            formId,
            data: submissionData,
            submittedAt: new Date(),
        });
        await submission.save();
        res.status(201).json({
            message: 'Form submitted successfully',
            submission,
        });
    }
    catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ message: 'Failed to submit form' });
    }
});
/** Protected – get submissions for a form */
router.get('/:formId', auth_1.authenticate, async (req, res) => {
    try {
        const { formId } = req.params;
        // Ensure the current user owns the form
        const form = await Form_1.default.findOne({ _id: formId, userId: req.userId });
        if (!form) {
            return res.status(404).json({ message: 'Form not found or not authorized' });
        }
        const submissions = await Submission_1.default.find({ formId }).sort({ submittedAt: -1 });
        res.json(submissions);
    }
    catch (error) {
        console.error('Get submissions error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;

// import express from 'express';
// import multer from 'multer';
// import { authenticate, AuthRequest } from '../middleware/auth';
// import { generateFormSchema } from '../services/gemini';
// import Form, { IFormField } from '../models/Form';
// import Submission from '../models/Submission';
// import mongoose from 'mongoose'
// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

// /**
//  * ✅ Generate a new form from a prompt
//  */
// router.post('/generate', authenticate, async (req: AuthRequest, res) => {
//   try {
//     const { prompt } = req.body;

//     // Validate prompt
//     if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Valid prompt is required' 
//       });
//     }

//     const cleanPrompt = prompt.trim();
//     if (cleanPrompt.length > 1000) {
//       return res.status(400).json({
//         success: false,
//         message: 'Prompt too long. Maximum 1000 characters.'
//       });
//     }

//     console.log(`👤 User ${req.userId} generating form for: "${cleanPrompt}"`);

//     // Generate form schema
//     const schema = await generateFormSchema(cleanPrompt);

//     // Clean and validate the schema
//     const cleanSchema = {
//       title: (schema.title || `Form: ${cleanPrompt.substring(0, 50)}`).trim(),
//       description: (schema.description || `Generated from: ${cleanPrompt}`).trim(),
//       fields: (schema.fields || []).map((field, index) => {
//         // Generate clean field ID
//         let cleanId = field.id || `field_${index + 1}`;
//         cleanId = cleanId
//           .toLowerCase()
//           .replace(/[^a-z0-9_]/g, '_')
//           .replace(/_+/g, '_')
//           .replace(/^_|_$/g, '');

//         if (!cleanId) {
//           cleanId = `field_${index + 1}`;
//         }

//         // Clean options if present
//         let cleanOptions = undefined;
//         if (field.options && Array.isArray(field.options)) {
//           cleanOptions = field.options
//             .filter(opt => opt && opt.value && opt.label)
//             .map(opt => ({
//               value: String(opt.value).trim(),
//               label: String(opt.label).trim()
//             }));
          
//           // Remove options array if empty
//           if (cleanOptions.length === 0) {
//             cleanOptions = undefined;
//           }
//         }

//         // Return cleaned field
//         return {
//           id: cleanId,
//           type: field.type,
//           label: (field.label || `Field ${index + 1}`).trim(),
//           placeholder: field.placeholder ? String(field.placeholder).trim() : '',
//           required: Boolean(field.required),
//           options: cleanOptions,
//           validation: field.validation
//         };
//       })
//     };

//     // Ensure we have at least one field
//     if (cleanSchema.fields.length === 0) {
//       cleanSchema.fields = [
//         {
//           id: "name",
//           type: "text",
//           label: "Name",
//           placeholder: "Enter your name",
//           required: true
//         }
//       ];
//     }

//     // Limit number of fields
//     if (cleanSchema.fields.length > 20) {
//       cleanSchema.fields = cleanSchema.fields.slice(0, 20);
//     }

//     // Create and save the form
//     const form = new Form({
//       userId: req.userId,
//       title: cleanSchema.title,
//       description: cleanSchema.description,
//       fields: cleanSchema.fields,
//       prompt: cleanPrompt,
//       isPublic: true
//     });

//     const savedForm = await form.save();

//     console.log(`✅ Form saved successfully: ${savedForm._id}`);

//     // Return success response
//     res.status(201).json({
//       success: true,
//       message: 'Form generated successfully',
//       form: {
//         id: savedForm._id,
//         title: savedForm.title,
//         description: savedForm.description,
//         fields: savedForm.fields,
//         isPublic: savedForm.isPublic,
//         createdAt: savedForm.createdAt
//       }
//     });

//   } catch (error: any) {
//     console.error('❌ Generate form error:', error);

//     // Handle validation errors
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map((err: any) => err.message);
//       return res.status(400).json({
//         success: false,
//         message: 'Form validation failed',
//         errors
//       });
//     }

//     // Handle cast errors
//     if (error.name === 'CastError') {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid data format'
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Failed to generate form',
//       error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
//     });
//   }
// });

// /**
//  * 📄 Get all forms for authenticated user
//  */
// router.get('/my-forms', authenticate, async (req: AuthRequest, res) => {
//   try {
//     const page = parseInt(req.query.page as string) || 1;
//     const limit = parseInt(req.query.limit as string) || 10;
//     const skip = (page - 1) * limit;

//     const forms = await Form.find({ userId: req.userId })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .select('-__v');

//     const total = await Form.countDocuments({ userId: req.userId });

//     res.json({
//       success: true,
//       forms,
//       pagination: {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });
//   } catch (error: any) {
//     console.error('❌ Get forms error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch forms',
//       error: error.message
//     });
//   }
// });

// /**
//  * 📄 Get single form by ID (public access)
//  */
// // router.get('/:id', async (req, res) => {
// //   try {
// //     const form = await Form.findById(req.params.id).select('-__v');

// //     if (!form) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Form not found'
// //       });
// //     }

// //     if (!form.isPublic) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'This form is not publicly accessible'
// //       });
// //     }

// //     res.json({
// //       success: true,
// //       form: {
// //         id: form._id,
// //         title: form.title,
// //         description: form.description,
// //         fields: form.fields,
// //         isPublic: form.isPublic,
// //         createdAt: form.createdAt
// //       }
// //     });
// //   } catch (error: any) {
// //     console.error('❌ Get form error:', error);
    
// //     if (error.name === 'CastError') {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Invalid form ID'
// //       });
// //     }
    
// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to fetch form',
// //       error: error.message
// //     });
// //   }
// // });
// router.get('/:id', async (req, res) => {
//   const formId = req.params.id;

//   if (!formId || !mongoose.Types.ObjectId.isValid(formId)) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid form ID'
//     });
//   }

//   try {
//     const form = await Form.findById(formId).select('-__v');
    
//     if (!form) {
//       return res.status(404).json({
//         success: false,
//         message: 'Form not found'
//       });
//     }

//     if (!form.isPublic) {
//       return res.status(403).json({
//         success: false,
//         message: 'This form is not publicly accessible'
//       });
//     }

//     res.json({
//       success: true,
//       form: {
//         id: form._id,
//         title: form.title,
//         description: form.description,
//         fields: form.fields,
//         isPublic: form.isPublic,
//         createdAt: form.createdAt
//       }
//     });
//   } catch (error: any) {
//     console.error('❌ Get form error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch form',
//       error: error.message
//     });
//   }
// });

// /**
//  * 🗑️ Delete a form (only owner)
//  */
// router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
//   try {
//     const form = await Form.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.userId
//     });

//     if (!form) {
//       return res.status(404).json({
//         success: false,
//         message: 'Form not found or you do not have permission to delete it'
//       });
//     }

//     // Delete associated submissions
//     await Submission.deleteMany({ formId: form._id });

//     console.log(`🗑️ Form ${form._id} deleted by user ${req.userId}`);

//     res.json({
//       success: true,
//       message: 'Form and its submissions deleted successfully'
//     });
//   } catch (error: any) {
//     console.error('❌ Delete form error:', error);
    
//     if (error.name === 'CastError') {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid form ID'
//       });
//     }
    
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete form',
//       error: error.message
//     });
//   }
// });

// /**
//  * 🔍 Search forms by title or description
//  */
// router.get('/search/my-forms', authenticate, async (req: AuthRequest, res) => {
//   try {
//     const { q } = req.query;
    
//     if (!q || typeof q !== 'string') {
//       return res.status(400).json({
//         success: false,
//         message: 'Search query is required'
//       });
//     }

//     const forms = await Form.find({
//       userId: req.userId,
//       $or: [
//         { title: { $regex: q, $options: 'i' } },
//         { description: { $regex: q, $options: 'i' } }
//       ]
//     }).sort({ createdAt: -1 }).select('-__v');

//     res.json({
//       success: true,
//       forms,
//       count: forms.length
//     });
//   } catch (error: any) {
//     console.error('❌ Search forms error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Search failed',
//       error: error.message
//     });
//   }
// });

// export default router;



import express from 'express';
import mongoose from 'mongoose';
import { authenticate, AuthRequest } from '../middleware/auth';
import { generateFormSchema } from '../services/gemini';
import Form from '../models/Form';
import Submission from '../models/Submission';

const router = express.Router();

/** ✅ Generate a new form from a prompt */
router.post('/generate', authenticate, async (req: AuthRequest, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Valid prompt is required',
      });
    }

    const cleanPrompt = prompt.trim();
    if (cleanPrompt.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Prompt too long. Maximum 1000 characters.',
      });
    }

    console.log(`👤 User ${req.userId} generating form for: "${cleanPrompt}"`);

    const schema = await generateFormSchema(cleanPrompt);

    const cleanSchema = {
      title: (schema.title || `Form: ${cleanPrompt.substring(0, 50)}`).trim(),
      description: (schema.description || `Generated from: ${cleanPrompt}`).trim(),
      fields: (schema.fields || []).map((field, index) => {
        let cleanId = field.id || `field_${index + 1}`;
        cleanId = cleanId
          .toLowerCase()
          .replace(/[^a-z0-9_]/g, '_')
          .replace(/_+/g, '_')
          .replace(/^_|_$/g, '');

        if (!cleanId) {
          cleanId = `field_${index + 1}`;
        }

        let cleanOptions: undefined | { value: string; label: string }[];
        if (field.options && Array.isArray(field.options)) {
          cleanOptions = field.options
            .filter(opt => opt && opt.value && opt.label)
            .map(opt => ({
              value: String(opt.value).trim(),
              label: String(opt.label).trim(),
            }));
          if (cleanOptions.length === 0) {
            cleanOptions = undefined;
          }
        }

        return {
          id: cleanId,
          type: field.type,
          label: (field.label || `Field ${index + 1}`).trim(),
          placeholder: field.placeholder ? String(field.placeholder).trim() : '',
          required: Boolean(field.required),
          options: cleanOptions,
          validation: field.validation,
        };
      }),
    };

    if (cleanSchema.fields.length === 0) {
      cleanSchema.fields = [
        {
          id: 'name',
          type: 'text',
          label: 'Name',
          placeholder: 'Enter your name',
          required: true,
        },
      ];
    }

    if (cleanSchema.fields.length > 20) {
      cleanSchema.fields = cleanSchema.fields.slice(0, 20);
    }

    const form = new Form({
      userId: req.userId,
      title: cleanSchema.title,
      description: cleanSchema.description,
      fields: cleanSchema.fields,
      prompt: cleanPrompt,
      isPublic: true,
    });

    const savedForm = await form.save();

    console.log(`✅ Form saved successfully: ${savedForm._id}`);

    res.status(201).json({
      success: true,
      message: 'Form generated successfully',
      form: {
        id: savedForm._id,
        title: savedForm.title,
        description: savedForm.description,
        fields: savedForm.fields,
        isPublic: savedForm.isPublic,
        createdAt: savedForm.createdAt,
      },
    });
  } catch (error: any) {
    console.error('❌ Generate form error:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Form validation failed',
        errors,
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data format',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to generate form',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/** 📄 Get all forms for authenticated user */
router.get('/my-forms', authenticate, async (req: AuthRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const forms = await Form.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Form.countDocuments({ userId: req.userId });

    res.json({
      success: true,
      forms,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('❌ Get forms error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch forms',
      error: error.message,
    });
  }
});

/** 🔍 Search forms by title or description */
router.get('/search/my-forms', authenticate, async (req: AuthRequest, res) => {
  try {
    const q = req.query.q as string;
    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }
    const regex = new RegExp(q, 'i');
    const forms = await Form.find({
      userId: req.userId,
      $or: [
        { title: regex },
        { description: regex },
      ],
    })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      forms,
      count: forms.length,
    });
  } catch (error: any) {
    console.error('❌ Search forms error:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message,
    });
  }
});

/** 📄 Get single form by ID (public access) */
router.get('/:id', async (req, res) => {
  const formId = req.params.id;
  if (!formId || !mongoose.Types.ObjectId.isValid(formId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid form ID',
    });
  }
  try {
    const form = await Form.findById(formId).select('-__v');
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found',
      });
    }
    if (!form.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'This form is not publicly accessible',
      });
    }
    res.json({
      success: true,
      form: {
        id: form._id,
        title: form.title,
        description: form.description,
        fields: form.fields,
        isPublic: form.isPublic,
        createdAt: form.createdAt,
      },
    });
  } catch (error: any) {
    console.error('❌ Get form error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid form ID',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to fetch form',
      error: error.message,
    });
  }
});

/** 🗑️ Delete a form (only owner) */
router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const form = await Form.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found or you do not have permission to delete it',
      });
    }

    // Delete associated submissions
    await Submission.deleteMany({ formId: form._id });

    console.log(`🗑️ Form ${form._id} deleted by user ${req.userId}`);

    res.json({
      success: true,
      message: 'Form and its submissions deleted successfully',
    });
  } catch (error: any) {
    console.error('❌ Delete form error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid form ID',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to delete form',
      error: error.message,
    });
  }
});

export default router;

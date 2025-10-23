"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Schema for field options
const FormFieldOptionSchema = new mongoose_1.Schema({
    value: {
        type: String,
        required: true,
        trim: true
    },
    label: {
        type: String,
        required: true,
        trim: true
    }
}, { _id: false });
// Schema for field validation
const FormFieldValidationSchema = new mongoose_1.Schema({
    min: Number,
    max: Number,
    minLength: Number,
    maxLength: Number,
    pattern: String,
    required: Boolean
}, { _id: false });
// Schema for form fields
const FormFieldSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['text', 'email', 'number', 'textarea', 'select', 'radio', 'checkbox', 'file', 'date'],
        required: true
    },
    label: {
        type: String,
        required: true,
        trim: true
    },
    placeholder: {
        type: String,
        default: '',
        trim: true
    },
    required: {
        type: Boolean,
        default: false
    },
    options: {
        type: [FormFieldOptionSchema],
        default: undefined
    },
    validation: {
        type: FormFieldValidationSchema,
        default: undefined
    }
}, { _id: false });
// Main form schema
const formSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    description: {
        type: String,
        default: '',
        trim: true,
        maxlength: 500
    },
    fields: {
        type: [FormFieldSchema],
        required: true,
        validate: {
            validator: function (fields) {
                return Array.isArray(fields) && fields.length > 0;
            },
            message: 'Form must have at least one field'
        }
    },
    prompt: {
        type: String,
        required: true,
        trim: true
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
// Indexes for better performance
formSchema.index({ userId: 1, createdAt: -1 });
formSchema.index({ isPublic: 1, createdAt: -1 });
exports.default = mongoose_1.default.model('Form', formSchema);

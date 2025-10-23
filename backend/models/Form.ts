import mongoose, { Document, Schema } from 'mongoose';

// Interface for field options
export interface IFormFieldOption {
  value: string;
  label: string;
}

// Interface for field validation
export interface IFormFieldValidation {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  required?: boolean;
}

// Interface for form fields
export interface IFormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'date';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: IFormFieldOption[];
  validation?: IFormFieldValidation;
}

// Main form interface
export interface IForm extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  fields: IFormField[];
  prompt: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for field options
const FormFieldOptionSchema = new Schema({
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
const FormFieldValidationSchema = new Schema({
  min: Number,
  max: Number,
  minLength: Number,
  maxLength: Number,
  pattern: String,
  required: Boolean
}, { _id: false });

// Schema for form fields
const FormFieldSchema = new Schema({
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
const formSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
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
      validator: function(fields: IFormField[]) {
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

export default mongoose.model<IForm>('Form', formSchema);
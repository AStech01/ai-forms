// import mongoose, { Document, Schema } from 'mongoose';

// export interface ISubmission extends Document {
//   formId: mongoose.Types.ObjectId;
//   data: Record;
//   submittedAt: Date;
// }

// const submissionSchema = new Schema({
//   formId: {
//     type: Schema.Types.ObjectId,
//     ref: 'Form',
//     required: true,
//   },
//   data: {
//     type: Map,
//     of: Schema.Types.Mixed,
//     required: true,
//   },
//   submittedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model('Submission', submissionSchema);

import mongoose, { Document, Schema } from 'mongoose';

export interface ISubmission extends Document {
  formId: mongoose.Types.ObjectId;
  data: Record<string, any>;  // ✅ Properly typed record
  submittedAt: Date;
}

const submissionSchema = new Schema<ISubmission>(
  {
    formId: {
      type: Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
    },
    data: {
      type: Map,
      of: Schema.Types.Mixed,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }  // 💡 adds createdAt and updatedAt automatically
);

export default mongoose.model<ISubmission>('Submission', submissionSchema);

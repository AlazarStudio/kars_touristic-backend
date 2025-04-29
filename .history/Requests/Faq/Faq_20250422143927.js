import mongoose from 'mongoose';

const Faq = new mongoose.Schema(
  {
    description: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Faq', Faq);

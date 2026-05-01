import mongoose from 'mongoose';

const NgoProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  targetTrees: { type: Number, required: true, default: 100 },
  treesPlanted: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Completed', 'Planning'], default: 'Active' },
  fundingProgress: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', NgoProjectSchema);

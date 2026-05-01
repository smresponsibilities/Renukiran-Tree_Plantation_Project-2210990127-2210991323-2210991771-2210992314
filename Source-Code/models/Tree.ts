import mongoose from 'mongoose';

const NgoTreeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  img: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Tree || mongoose.model('Tree', NgoTreeSchema);

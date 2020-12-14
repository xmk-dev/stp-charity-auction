import mongoose from 'mongoose';

const AuctionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    active: { type: Boolean, default: false },
    price: { type: Number, min: 0, default: 0 },
    url: { type: String, default: '#' },
    winnerEmail: { type: String },
  },
  {
    versionKey: false,
    timestamps: {
      updatedAt: true,
      createdAt: false,
    },
  },
);

const Auction = mongoose.model('auctions', AuctionSchema);

export default Auction;

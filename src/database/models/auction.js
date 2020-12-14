import mongoose from 'mongoose';

const AuctionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    active: { type: Boolean, default: false },
    price: { type: Number, min: 0, default: 0 },
    currency: { type: String, default: 'PLN' },
    url: { type: String, default: '#' },
    winnerEmail: { type: String },
  },
  {
    timestamps: true,
  },
);

const Auction = mongoose.model('auctions', AuctionSchema);

export default Auction;

import Auction from '../database/models/auction.js';
import { emitData } from '../utils/socket.js';

const transformAuctionForResponse = ({ _id: id, __v, createdAt, updatedAt, ...data }) => ({
  id,
  ...data,
});

export const findOne = async (request, response) => {
  const { auctionId } = request.params || {};

  const item = await Auction.findById(auctionId).lean();

  if (!item) {
    return response.status(404).send();
  }
  const result = transformAuctionForResponse(item);

  return response.status(200).send(result);
};

export const bid = async (request, response) => {
  const { price: userPrice } = request.body || {};
  const { auctionId } = request.params || {};
  const { nameID: winnerEmail } = request.user || {};

  const price = Math.round(userPrice);
  const { price: currentPrice, active } = await Auction.findById(auctionId);

  if (auctionId && price > currentPrice && active) {
    await Auction.findOneAndUpdate(
      { _id: auctionId },
      { price, winnerEmail },
      { new: true, lean: true },
    );
    emitData({ winnerEmail, price, id: auctionId });
    return response.status(200).send();
  }

  return response.status(400).send();
};

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

export const findAll = async (request, response) => {
  const items = await Auction.find().lean();
  const result = items.map(transformAuctionForResponse);

  return response.status(200).send(result);
};

export const update = async (request, response) => {
  const { active } = request.query || {};
  const updateData = {};

  if (active) {
    // eslint-disable-next-line eqeqeq
    const activeBoolean = active == 'true';
    updateData.active = activeBoolean;
  }

  const updatedAuction = await Auction.findOneAndUpdate(
    { id: request.params.eventId },
    updateData,
    { new: true },
  );

  const result = transformAuctionForResponse(updatedAuction);

  return response.status(200).send(result);
};

export const bid = async (request, response) => {
  const { price } = request.body || {};
  const { auctionId } = request.params || {};
  const { nameID: winnerEmail } = request.user || {};

  const priceNumber = Math.round(price);
  const { price: currentPrice } = await Auction.findById(auctionId);

  if (auctionId && price && priceNumber && priceNumber > currentPrice) {
    const updatedAuction = await Auction.findOneAndUpdate(
      { _id: auctionId },
      { price: priceNumber, winnerEmail },
      { new: true, lean: true },
    );
    emitData({ winnerEmail, price: priceNumber, id: auctionId });
    const result = transformAuctionForResponse(updatedAuction);
    return response.status(200).send(result);
  }

  return response.status(400).send();
};

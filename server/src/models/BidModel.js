
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BidSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    price: {
      type: Number,
      required: true,
    },
    times:{
      type: Number,
    },
    bidpriceMax:{
      type:Number,
      default:0,
    },
    isWinBid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Bid = mongoose.model("Bid", BidSchema);

export default Bid;

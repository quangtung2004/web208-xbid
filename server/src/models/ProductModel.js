import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceold: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    starRating: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    isShow: {
      type: Boolean,
      default: true,
    },
    startAt: {
      type: Date,
    },
    endAt: {
      type: Date,
    },
    bidpriceMax:{
      type:Number,
      default:0,
    },
    bids: {
      type: [Schema.Types.ObjectId],
      ref: "Bid",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;

import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})


const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // any time we create anything in the database that has the _id field, it will be an object id
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

    hoverImage: {
        type: String,
        required: true
    },
    additionalImages: {
        type: Array,
        required: true
    },

    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviwes: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },   
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);


export default Product;

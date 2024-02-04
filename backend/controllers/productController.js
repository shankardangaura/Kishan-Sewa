
//const product = require('../models/product')
const Product = require('../models/product')
const ErrorHandler=require('../utils/errorHandler');
const catchAsyncErrors= require('../middlewares/catchAsyncErrors');
const APIFeatures= require('../utils/apiFeatures')
const cloudinary= require('cloudinary')

// create a new product =>/api/v1/product/new
exports.newProduct = catchAsyncErrors(async (req,res,next) => {
    let images=[]
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imagesLinks
    req.body.user=req.user.id;
    try{
        const products =await Product.create(req.body)
    res.status(201).json({ 
        success:true,
        products
    })
    }catch(error){
        console.log(error)
    }
})

// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts=catchAsyncErrors(async(req,res,next)=>{
    const resPerPage=9;
    const productsCount=await Product.countDocuments();
    const apiFeatures=new APIFeatures(Product.find(),req.query)
                            .search()
                            .filter()
                            let products = await apiFeatures.query;
                            let filteredProductsCount = products.length;
                            apiFeatures.pagination(resPerPage)
    
    res.status(200).json({
        success:true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })
})

// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })

})

//get single products detials => /api/v1/product/:id 


exports.getSingleProuct = catchAsyncErrors(async (req,res,next) => {
    const  product =await Product.findById(req.params.id)

    if(!product)
    {
        return next (new ErrorHandler('Product not Found',404));
        
    }

    res.status(200).json({
        success:true,
        product
    })
})

//update product => /api/v1/product/:id
exports.updateProduct = catchAsyncErrors(async (req,res,next) => { 
    let product =await Product.findById(req.params.id);

    
    if(!product)
    {
        return next (new ErrorHandler('Product not Found',404));
    }

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }



    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true ,
        runValidators:true,
        useFindAndModify:true
    });

    res.status(200).json({
         success: true,
         product
    })

})



//delete product => /api/v1/admin/product/:id
exports.deleteProduct = async  (req,res,next)=>{
    const product =await Product.findById(req.params.id);

    if(!product)
    {
        return next (new ErrorHandler('Product not Found',404));
    }  
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message: 'Product deleted successfully'

    })

}


// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else { 
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})


// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    console.log(product);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })

})

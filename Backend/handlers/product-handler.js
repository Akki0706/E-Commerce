// const Product = require("./../db/product");

// async function addProduct(model){
//     let product = new Product({
//         ...model,
//     });
//     await product.save();
//     return product.toObject();
// }

// async function updateProduct(id,model){
//     await Product.findByIdAndUpdate(id,model);
// }

// async function deleteProduct(id){
//     await Product.findByIdAndDelete(id);
// }

// async function getAllProducts() {
//     let products = await Product.find();
//     return products.map((x)=> x.toObject()); 

// }

// async function getProduct(id){
//     let product = await Product.findById(id);
//     return product.toObject();
// }


// async function getNewProducts(){
//     let newProducts = await Product.find({
//         isNewProduct:true,
//     });
//     return newProducts.map((x)=>x.toObject());
// }

// async function getFeaturedProducts(){
//     let featuredProducts = await Product.find({
//         isFeatured:true,
//     });
//     return featuredProducts.map((x)=>x.toObject());
// }

// // async function getProductForListing(searchTerm, categoryId, page, pageSize, sortBy = 'price', sortOrder = -1, brandId) {
// //   let queryFilter = {};

// //   if (searchTerm) {
// //     queryFilter.$or = [
// //       { name: { $regex: '.*' + searchTerm + '.*', $options: 'i' } },
// //       { shortDescription: { $regex: '.*' + searchTerm + '.*', $options: 'i' } },
// //     ];
// //   }

// //   if (categoryId) {
// //     queryFilter.categoryId = categoryId;
// //   }

// //   if (brandId) {
// //     queryFilter.brandId = brandId;
// //   }

// //   const products = await Product.find(queryFilter)
// //     .sort({ [sortBy]: +sortOrder })
// //     .skip((+page - 1) * +pageSize)
// //     .limit(+pageSize);

// //   return products.map(product => product.toObject());
// // }

// async function getProductForListing(searchTerm, categoryId, page, pageSize, sortBy = 'price', sortOrder = -1, brandId) {
//     let queryFilter = {};
  
//     // Search filter
//     if (searchTerm) {
//       queryFilter.$or = [
//         { name: { $regex: '.*' + searchTerm + '.*', $options: 'i' } },
//         { shortDescription: { $regex: '.*' + searchTerm + '.*', $options: 'i' } },
//       ];
//     }
  
//     // Category filter
//     if (categoryId) {
//       queryFilter.categoryId = categoryId;
//     }
  
//     // Brand filter
//     if (brandId) {
//       queryFilter.brandId = brandId;
//     }
  
//     // Ensure sortBy is valid, set to 'price' by default
//     sortBy = sortBy && sortBy.trim() ? sortBy : 'price'; // Fallback to 'price' if sortBy is empty or invalid
  
//     // Ensure sortOrder is a valid number
//     sortOrder = sortOrder ? +sortOrder : -1; // Fallback to -1 if sortOrder is empty or invalid
  
//     // Fetch the products
//     const products = await Product.find(queryFilter)
//       .sort({ [sortBy]: sortOrder })  // Sort by the provided field and order
//       .skip((+page - 1) * +pageSize)
//       .limit(+pageSize);
  
//     // Return the result as objects
//     return products.map(product => product.toObject());
//   }
  
// module.exports ={addProduct,getAllProducts,getProduct,updateProduct,deleteProduct,getNewProducts,getFeaturedProducts,getProductForListing};


//Some correction after adding review section......
const mongoose = require('mongoose');
const Product = require('./../db/product');

// Add new product
async function addProduct(model) {
  let product = new Product({
    ...model,
  });
  await product.save();
  return product.toObject();
}

// Update product by ID with validation
async function updateProduct(id, model) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid product ID');
  }

  await Product.findByIdAndUpdate(id, model);
}

// Delete product by ID with validation
async function deleteProduct(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid product ID');
  }

  await Product.findByIdAndDelete(id);
}

// Get all products
async function getAllProducts() {
  let products = await Product.find();
  return products.map((x) => x.toObject());
}

// Get product by ID with validation
async function getProduct(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid product ID');
  }

  let product = await Product.findById(id);
  return product.toObject();
}

// Get new products
async function getNewProducts() {
  let newProducts = await Product.find({
    isNewProduct: true,
  });
  return newProducts.map((x) => x.toObject());
}

// Get featured products
async function getFeaturedProducts() {
  let featuredProducts = await Product.find({
    isFeatured: true,
  });
  return featuredProducts.map((x) => x.toObject());
}

// Get products for listing with filters
async function getProductForListing(searchTerm, categoryId, page, pageSize, sortBy = 'price', sortOrder = -1, brandId) {
  let queryFilter = {};

  // Search filter
  if (searchTerm) {
    queryFilter.$or = [
      { name: { $regex: '.*' + searchTerm + '.*', $options: 'i' } },
      { shortDescription: { $regex: '.*' + searchTerm + '.*', $options: 'i' } },
    ];
  }

  // Category filter
  if (categoryId) {
    if (mongoose.Types.ObjectId.isValid(categoryId)) {
      queryFilter.categoryId = categoryId;
    }
  }

  // Brand filter
  if (brandId) {
    if (mongoose.Types.ObjectId.isValid(brandId)) {
      queryFilter.brandId = brandId;
    }
  }

  // Ensure sortBy is valid, set to 'price' by default
  sortBy = sortBy && sortBy.trim() ? sortBy : 'price'; // Fallback to 'price' if sortBy is empty or invalid

  // Ensure sortOrder is a valid number
  sortOrder = sortOrder ? +sortOrder : -1; // Fallback to -1 if sortOrder is empty or invalid

  // Fetch the products
  const products = await Product.find(queryFilter)
    .sort({ [sortBy]: sortOrder }) // Sort by the provided field and order
    .skip((+page - 1) * +pageSize)
    .limit(+pageSize);

  // Return the result as objects
  return products.map((product) => product.toObject());
}

module.exports = {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getNewProducts,
  getFeaturedProducts,
  getProductForListing,
};

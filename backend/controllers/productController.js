import Product from '../models/Product.js';
import { isMemoryDb, jsonStore, saveJsonDb } from '../config/db.js';

// @desc    Fetch all products with filtering, search & sort
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? req.query.keyword.toLowerCase()
      : '';
    const category = req.query.category || '';
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0;
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : 10000;
    const sortBy = req.query.sortBy || 'newest';

    const genderCategories = ['men', 'women', 'kids'];
    const isGenderFilter = genderCategories.includes(category.toLowerCase());

    if (isMemoryDb) {
      let filtered = jsonStore.products.filter((p) => {
        const matchesKeyword =
          !keyword ||
          p.name.toLowerCase().includes(keyword) ||
          p.description.toLowerCase().includes(keyword) ||
          p.brand.toLowerCase().includes(keyword);

        let matchesCategory = true;
        if (category && category !== 'All') {
          if (isGenderFilter) {
            matchesCategory = Boolean(p.gender && p.gender.toLowerCase() === category.toLowerCase());
          } else {
            matchesCategory = Boolean(p.category && p.category.toLowerCase() === category.toLowerCase());
          }
        }

        const matchesPrice = p.price >= minPrice && p.price <= maxPrice;

        return matchesKeyword && matchesCategory && matchesPrice;
      });

      // Sort
      if (sortBy === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else {
        // newest
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      }

      return res.json({ products: filtered });
    }

    // Mongoose MongoDB query
    let query = {};

    if (keyword) {
      query.name = { $regex: keyword, $options: 'i' };
    }

    if (category && category !== 'All') {
      if (isGenderFilter) {
        query.gender = { $regex: `^${category}$`, $options: 'i' };
      } else {
        query.category = { $regex: category, $options: 'i' };
      }
    }

    query.price = { $gte: minPrice, $lte: maxPrice };

    let sortOptions = {};
    if (sortBy === 'price-asc') sortOptions.price = 1;
    else if (sortBy === 'price-desc') sortOptions.price = -1;
    else if (sortBy === 'rating') sortOptions.rating = -1;
    else sortOptions.createdAt = -1;

    const products = await Product.find(query).sort(sortOptions);
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    if (isMemoryDb) {
      const product = jsonStore.products.find((p) => String(p._id) === String(req.params.id));
      if (product) return res.json(product);
      res.status(404);
      return res.json({ message: 'Product not found' });
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      res.json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    if (isMemoryDb) {
      const index = jsonStore.products.findIndex((p) => String(p._id) === String(req.params.id));
      if (index !== -1) {
        jsonStore.products.splice(index, 1);
        saveJsonDb();
        return res.json({ message: 'Product removed' });
      }
      res.status(404);
      return res.json({ message: 'Product not found' });
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      res.json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    if (isMemoryDb) {
      const newProduct = {
        _id: 'prd_' + Date.now(),
        name: name || 'Sample Product',
        price: Number(price) || 99.99,
        user: req.user._id,
        image: image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
        brand: brand || 'Generic Brand',
        category: category || 'Electronics',
        countInStock: Number(countInStock) || 10,
        numReviews: 0,
        rating: 4.5,
        description: description || 'High quality product description sample.',
        reviews: [],
        createdAt: new Date().toISOString(),
      };

      jsonStore.products.unshift(newProduct);
      saveJsonDb();

      return res.status(201).json(newProduct);
    }

    const product = new Product({
      name: name || 'Sample Product',
      price: Number(price) || 99.99,
      user: req.user._id,
      image: image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      brand: brand || 'Generic Brand',
      category: category || 'Electronics',
      countInStock: Number(countInStock) || 10,
      numReviews: 0,
      rating: 4.5,
      description: description || 'High quality product description sample.',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  try {
    if (isMemoryDb) {
      const product = jsonStore.products.find((p) => String(p._id) === String(req.params.id));
      if (product) {
        product.name = name ?? product.name;
        product.price = price !== undefined ? Number(price) : product.price;
        product.description = description ?? product.description;
        product.image = image ?? product.image;
        product.brand = brand ?? product.brand;
        product.category = category ?? product.category;
        product.countInStock = countInStock !== undefined ? Number(countInStock) : product.countInStock;

        saveJsonDb();
        return res.json(product);
      }
      res.status(404);
      return res.json({ message: 'Product not found' });
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name ?? product.name;
      product.price = price !== undefined ? Number(price) : product.price;
      product.description = description ?? product.description;
      product.image = image ?? product.image;
      product.brand = brand ?? product.brand;
      product.category = category ?? product.category;
      product.countInStock = countInStock !== undefined ? Number(countInStock) : product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      res.json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    if (isMemoryDb) {
      const product = jsonStore.products.find((p) => String(p._id) === String(req.params.id));
      if (product) {
        const alreadyReviewed = product.reviews.find(
          (r) => String(r.user) === String(req.user._id)
        );

        if (alreadyReviewed) {
          res.status(400);
          return res.json({ message: 'Product already reviewed' });
        }

        const review = {
          _id: 'rev_' + Date.now(),
          name: req.user.name,
          rating: Number(rating),
          comment,
          user: req.user._id,
          createdAt: new Date().toISOString(),
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        saveJsonDb();
        return res.status(201).json({ message: 'Review added' });
      }
      res.status(404);
      return res.json({ message: 'Product not found' });
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        res.json({ message: 'Product already reviewed' });
        return;
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      res.json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

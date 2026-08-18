import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { isMemoryDb, jsonStore, saveJsonDb } from '../config/db.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    return res.json({ message: 'No order items' });
  }

  try {
    if (isMemoryDb) {
      const createdOrder = {
        _id: 'ord_' + Date.now(),
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod: paymentMethod || 'Stripe / Credit Card',
        itemsPrice: Number(itemsPrice),
        taxPrice: Number(taxPrice),
        shippingPrice: Number(shippingPrice),
        totalPrice: Number(totalPrice),
        isPaid: false,
        isDelivered: false,
        createdAt: new Date().toISOString(),
      };

      // Decrease stock in products
      orderItems.forEach((item) => {
        const prod = jsonStore.products.find((p) => String(p._id) === String(item.product));
        if (prod) {
          prod.countInStock = Math.max(0, prod.countInStock - item.qty);
        }
      });

      jsonStore.orders.unshift(createdOrder);
      saveJsonDb();

      return res.status(201).json(createdOrder);
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    // Decrease stock
    for (const item of orderItems) {
      const prod = await Product.findById(item.product);
      if (prod) {
        prod.countInStock = Math.max(0, prod.countInStock - item.qty);
        await prod.save();
      }
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    if (isMemoryDb) {
      const order = jsonStore.orders.find((o) => String(o._id) === String(req.params.id));
      if (order) {
        // Populate user name/email
        const user = jsonStore.users.find((u) => String(u._id) === String(order.user));
        return res.json({
          ...order,
          user: user ? { name: user.name, email: user.email } : { name: 'Customer', email: 'user@example.com' },
        });
      }
      res.status(404);
      return res.json({ message: 'Order not found' });
    }

    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      res.json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order to paid (Mock Payment Gateway integration)
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
  try {
    if (isMemoryDb) {
      const order = jsonStore.orders.find((o) => String(o._id) === String(req.params.id));
      if (order) {
        order.isPaid = true;
        order.paidAt = new Date().toISOString();
        order.paymentResult = {
          id: req.body.id || 'ch_stripe_mock_' + Date.now(),
          status: req.body.status || 'succeeded',
          update_time: new Date().toISOString(),
          email_address: req.body.email_address || req.user.email,
        };

        saveJsonDb();
        return res.json(order);
      }
      res.status(404);
      return res.json({ message: 'Order not found' });
    }

    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id || 'ch_stripe_mock_' + Date.now(),
        status: req.body.status || 'succeeded',
        update_time: req.body.update_time || new Date().toISOString(),
        email_address: req.body.email_address || req.user.email,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      res.json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = async (req, res) => {
  try {
    if (isMemoryDb) {
      const order = jsonStore.orders.find((o) => String(o._id) === String(req.params.id));
      if (order) {
        order.isDelivered = true;
        order.deliveredAt = new Date().toISOString();
        saveJsonDb();
        return res.json(order);
      }
      res.status(404);
      return res.json({ message: 'Order not found' });
    }

    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      res.json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    if (isMemoryDb) {
      const orders = jsonStore.orders.filter((o) => String(o.user) === String(req.user._id));
      return res.json(orders);
    }

    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    if (isMemoryDb) {
      const orders = jsonStore.orders.map((o) => {
        const u = jsonStore.users.find((usr) => String(usr._id) === String(o.user));
        return {
          ...o,
          user: u ? { name: u.name, email: u.email } : { name: 'Customer', email: 'user@example.com' },
        };
      });
      return res.json(orders);
    }

    const orders = await Order.find({}).populate('user', 'id name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete / Cancel order
// @route   DELETE /api/orders/:id
// @access  Private
export const deleteOrder = async (req, res) => {
  try {
    if (isMemoryDb) {
      const index = jsonStore.orders.findIndex(
        (o) =>
          String(o._id) === String(req.params.id) &&
          (req.user.isAdmin || String(o.user) === String(req.user._id))
      );

      if (index !== -1) {
        jsonStore.orders.splice(index, 1);
        saveJsonDb();
        return res.json({ message: 'Order removed successfully' });
      } else {
        return res.status(404).json({ message: 'Order not found or unauthorized' });
      }
    }

    const order = await Order.findById(req.params.id);

    if (order) {
      if (req.user.isAdmin || String(order.user) === String(req.user._id)) {
        await order.deleteOne();
        return res.json({ message: 'Order removed successfully' });
      } else {
        return res.status(401).json({ message: 'Not authorized to delete this order' });
      }
    } else {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

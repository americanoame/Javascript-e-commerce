import asyncHandler from "../middleware/asyncHandler.js";
import Order from '../models/orderModel.js';


// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) =>  {

    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error("No order items");
        
    } else {
        const order = new Order({
           orderItems: orderItems.map((x) => ({
            ...x,
            product: x._id,
            _id: undefined
           })),
              user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
        });
        
        const createdOrder = await order.save();
        
        res.status(201).json(createdOrder);
    }
        
        res.send("add order items");
    }
)

    


// @desc    Get loggged in user new order
// @route   POST /api/orders/myorders
// @access  Private
const getMYOrders = asyncHandler(async (req, res) =>  {
    
    const orders = await Order.find({ user: req.user._id });

    res.status(201).json(orders);


  }
);

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) =>  {
    
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(order){
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
  }
);

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) =>  {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();

       // Safely handle missing payer or email_address
    const emailAddress = req.body.payer?.email_address || "No email provided";

        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: emailAddress,
        };
        
        const updatedOrder = await order.save();
        
        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
  }
);


// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) =>  {
        
        res.send("update order to delivered");
    }
);

//get all orders
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin

const getOrders = asyncHandler(async (req, res) =>  {
        
    res.send("get all orders");
}
);


export { addOrderItems, getMYOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders};
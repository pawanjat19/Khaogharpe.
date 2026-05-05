import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';

// 🌱 Real Veg Icon (FSSAI style)
const VegIcon = ({ size = 16 }) => (
    <div
        style={{ width: size, height: size }}
        className="border-2 border-green-600 flex items-center justify-center bg-white"
    >
        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
    </div>
);

// 🍗 Real Non-Veg Icon (FSSAI style)
const NonVegIcon = ({ size = 16 }) => (
    <div
        style={{ width: size, height: size }}
        className="border-2 border-[#7B3F00] flex items-center justify-center bg-white"
    >
        <div className="w-2 h-2 bg-[#7B3F00] rounded-full"></div>
    </div>
);

function FoodCard({ data }) {
    const [quantity, setQuantity] = useState(0)
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.user)
    const renderStars = (rating) => {   //r=3
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                (i <= rating) ? (
                    <FaStar className='text-yellow-500 text-lg' />
                ) : (
                    <FaRegStar className='text-yellow-500 text-lg' />
                )
            )

        }
        return stars
    }

    const handleIncrease = () => {
        const newQty = quantity + 1
        setQuantity(newQty)
    }
    const handleDecrease = () => {
        if (quantity > 0) {
            const newQty = quantity - 1
            setQuantity(newQty)
        }

    }

    return (
        <div className="w-[260px] rounded-2xl bg-white border border-green-600/30 
shadow-md hover:shadow-2xl hover:-translate-y-1 
transition-all duration-300 flex flex-col overflow-hidden">

            {/* Image Section */}
            <div className="relative h-[170px]">
                <img
                    src={data.image}
                    alt={data.name}
                    className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                {/* Veg / Non-Veg badge */}
                <div className="absolute top-3 left-3 bg-white rounded-full p-1 shadow-md">
                    {data.foodType === "veg" ? <VegIcon size={16} /> : <NonVegIcon size={16} />}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4">
                <h1 className="font-semibold text-gray-900 text-base line-clamp-1">
                    {data.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                    {renderStars(data.rating?.average || 0)}
                    <span className="text-xs text-gray-500">
                        ({data.rating?.count || 0})
                    </span>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="p-3 flex items-center justify-between border-t">

                {/* Price */}
                <span className="text-lg font-bold text-gray-900">
                    ₹{data.price}
                </span>

                {/* Quantity + Cart */}
                <div className="flex items-center bg-gray-100 rounded-full overflow-hidden shadow-sm">

                    <button
                        onClick={handleDecrease}
                        className="px-3 py-2 hover:bg-gray-200 transition"
                    >
                        <FaMinus size={12} />
                    </button>

                    <span className="px-2 text-sm font-medium">{quantity}</span>

                    <button
                        onClick={handleIncrease}
                        className="px-3 py-2 hover:bg-gray-200 transition"
                    >
                        <FaPlus size={12} />
                    </button>

                    <button
                        className={`px-4 py-2 flex items-center justify-center transition-all
        ${cartItems.some(i => i.id === data._id)
                                ? "bg-gray-800"
                                : "bg-green-600 hover:bg-green-700"
                            } text-white`}
                        onClick={() => {
                            quantity > 0 &&
                                dispatch(
                                    addToCart({
                                        id: data._id,
                                        name: data.name,
                                        price: data.price,
                                        image: data.image,
                                        shop: data.shop,
                                        quantity,
                                        foodType: data.foodType,
                                    })
                                );
                        }}
                    >
                        <FaShoppingCart size={16} />
                    </button>

                </div>
            </div>
        </div>

    )
}

export default FoodCard

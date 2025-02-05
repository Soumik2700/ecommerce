/* eslint-disable react/prop-types */
// import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

function ProductItem(props) {
    const {
        availabilityStatus,
        brand,
        category,
        thumbnail,
        price,
        rating,
        discountPercentage,
        stock,
        shippingInformation,
        title
    } = props.product;

    // console.log(props.product);

    return (
        <div className="w-[660px] h-[330px] bg-white shadow-lg rounded-lg overflow-hidden flex border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            {/* Left: Image Section */}
            <div className="w-[40%] h-full bg-gray-100 flex flex-col items-center justify-center p-2">
                <div className="w-full h-[80%] flex items-center justify-center">
                    <img src={thumbnail} alt={title} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="w-full h-[20%] flex flex-col items-center mt-2">
                    <h1 className="text-md font-semibold text-gray-800">{title}</h1>
                    <span className="text-sm text-gray-500">{category}</span>
                </div>
            </div>

            {/* Right: Details Section */}
            <div className="w-[60%] h-full flex flex-col p-4">
                {/* Price & Rating */}
                <div className="w-full flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-blue-600">${price}</h1>
                        <span className="text-sm text-gray-600">({brand ? brand : "NA"})</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <h1 className="text-sm text-gray-600">{rating} Rating</h1>
                        <Stack spacing={1}>
                            <Rating name="half-rating" defaultValue={rating} precision={0.5} />
                        </Stack>
                    </div>
                </div>

                {/* Discount & Availability */}
                <div className="w-full mt-3 flex flex-col space-y-2">
                    <div className="flex justify-center items-center text-white bg-green-500 px-3 py-1 rounded-lg text-sm font-semibold shadow-md">
                        <h1>Discount: {discountPercentage}%</h1>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <div className="text-gray-700">
                            <h1 className="font-semibold">Availability</h1>
                            <span className="text-green-600 font-medium">{availabilityStatus}</span>
                        </div>
                        <div className="text-gray-700">
                            <h1 className="font-semibold">Stock</h1>
                            <span className="text-red-500 font-medium">{stock} left</span>
                        </div>
                    </div>
                </div>

                {/* Shipping Information */}
                <div className="mt-auto flex justify-center items-center text-gray-700 font-medium bg-gray-100 p-2 rounded-md">
                    <h1>{shippingInformation}</h1>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;

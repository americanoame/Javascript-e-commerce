import React from "react";
import { Link } from "react-router-dom";

const ProductScreenThumbnail = ({
  mainImage,
  additionalImages,
  onSelectImage,
}) => {
  return (
    <div className="space-y-1 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10">
      <Link to="/" className="text-start">
        <div className=" text-red-800 ">⇠ GO BACK</div>
      </Link>

      <div className="bg-gray-900 p-5 rounded-lg mx-4 sm:mx-6 md:mx-auto">
        <img
          src={mainImage}
          alt="Product"
          className="object-cover h-auto md:max-w-full mr-2"
        />
        {additionalImages && (
          <div className="flex mt-4 space-x-3 justify-center text-center">
            {additionalImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => onSelectImage(img)}
                className="w-14 h-16 sm:w-6 sm:h-6 md:w-20 md:h-20 object-cover border p-2 border-gray-300 cursor-pointer hover:border-red-500"
                
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductScreenThumbnail;

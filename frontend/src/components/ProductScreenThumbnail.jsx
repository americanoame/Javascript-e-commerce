import React from 'react'

const ProductScreenThumbnail = ({ mainImage, additionalImages, onSelectImage }) => {
  return (
    <div className="flex-shrink-0 w-full  md:w-3/5 lg:w-2/5 bg-gray-100 p-7">
      <img
        src={mainImage}
        alt="Product"
        className="object-cover w-full h-auto md:max-w-full"
      />
      {additionalImages && (
        <div className="flex mt-4 space-x-3">
          {/* Show additional images, making sure not to repeat the main image */}
          {additionalImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => onSelectImage(img)}
              className="w-16 h-16 object-cover border p-2 border-gray-300 cursor-pointer hover:border-red-500"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductScreenThumbnail
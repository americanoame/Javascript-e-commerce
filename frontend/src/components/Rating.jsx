import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rating = ({ value, text}) => {
  return (
    <div className="rating">
        <span>
            {value >= 1 ? (
            <FaStar className="text-yellow-400" />
            ) : value >= 0.5 ? (
            <FaStarHalfAlt className="text-yellow-400" />
            ) : (
            <FaRegStar className="text-yellow-400" />
            )}
        </span>
        <span>
            {value >= 2 ? (
            <FaStar className="text-yellow-400" />
            ) : value >= 1.5 ? (
            <FaStarHalfAlt className="text-yellow-400" />
            ) : (
            <FaRegStar className="text-yellow-400" />
            )}
        </span>
        <span>
            {value >= 3 ? (
            <FaStar className="text-yellow-400" />
            ) : value >= 2.5 ? (
            <FaStarHalfAlt className="text-yellow-400" />
            ) : (
            <FaRegStar className="text-yellow-400" />
            )}
        </span>
        <span>
            {value >= 4 ? (
            <FaStar className="text-yellow-400" />
            ) : value >= 3.5 ? (
            <FaStarHalfAlt className="text-yellow-400" />
            ) : (
            <FaRegStar className="text-yellow-400" />
            )}
        </span>
        <span>
            {value >= 5 ? (
            <FaStar className="text-yellow-400" />
            ) : value >= 4.5 ? (
            <FaStarHalfAlt className="text-yellow-400" />
            ) : (
            <FaRegStar className="text-yellow-400" />
            )}
        </span>
        <span className="rating-text">{text && text}</span>
    </div>
  )
}

export default Rating
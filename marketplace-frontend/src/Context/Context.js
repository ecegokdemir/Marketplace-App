import React, { useState, createContext } from 'react'
export const ContextFunction = createContext()

const Context = ({ children }) => {
    const [wishlistData, setWishlistData] = useState([])
    const [blackListData, setBlackListData] = useState([])
    const [availableSeller, setAvailableSeller] = useState([])

    const updateWishlist = (blacklist) => {
        console.log(wishlistData)
        setWishlistData(prevWishlist =>
            prevWishlist.filter(item => !blacklist.some(b => b.id === item.seller.id))
        );
    };

    return (
        <ContextFunction.Provider value={{ wishlistData, setWishlistData , blackListData, setBlackListData ,availableSeller,setAvailableSeller, updateWishlist}}>
            {children}
        </ContextFunction.Provider>
    )
}

export default Context
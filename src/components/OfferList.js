import React from "react";
import Offer from "./Offer";

function OffersList (props) {
    const fallbackImages = ["https://img.icons8.com/ios-filled/50/000000/reflector-bulb.png","https://img.icons8.com/ios/50/000000/gift--v2.png","https://img.icons8.com/fluency-systems-regular/48/000000/star--v1.png"]
    const offersList = props.offersData.map(offer => {
        return (
            <Offer
                key={offer.id}
                id ={offer.id}
                title={offer.title}
                desc={offer.short_description}
                originalPrice={offer.original_price}
                discountedPrice={offer.discounted_price}
                image={offer.image}
                updateCartAdd={props.updateCartAdd}
                updateCartRemove={props.updateCartRemove}
                offerSelected={(props.cartIds).indexOf(offer.id)}
                fallbackImage = {fallbackImages[(offer.id)-1]}
            />
        )
    })
    
    return (
       <>
        {offersList}
       </>
    )
}

export default OffersList


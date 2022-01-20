import React from "react";
import Offer from "./Offer";

function OffersList (props) {
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


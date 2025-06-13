import React from "react";

export const NoProductsFound = () => (
    <div className="no-items-animated">
        <div className="search-icon">
            <div className="magnifier"></div>
            <div className="handle"></div>
        </div>
        <h3>Nothing here!</h3>
        <p>We couldn`&apos;`t find any matching products</p>
    </div>
);
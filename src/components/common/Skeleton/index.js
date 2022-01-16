import React from 'react'
import './index.css';

const Skeleton = (props) => {
    const totalCollectionCount = parseInt(props.totalCollections) || 1;
    const items = new Array(totalCollectionCount).fill(null);

    return (
        <div>
            {/* nft skeleton list start here */}
            <div className="row">
                {items.map((_, index) => {
                    return (
                        <div key={index} className="skeletom-loader col-12 col-sm-12"></div>
                    )
                })}
            </div>
        </div>
    );

}



export default Skeleton

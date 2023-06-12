import React from 'react';

export default function DisplayCard(props: | { handleGetItNowClick: () => void; }) {
  const handleClick = () => {
    props.handleGetItNowClick();
  };

  return (
    <div>
      <img src="https://cdn.shopify.com/s/files/1/0606/8482/8929/products/10_bc06b69a-fff0-415b-b753-f3de8fe716c6.jpg?v=1645969533&width=1200" alt="Dummy jumper" />
      <h2> Maroon jumper </h2>
      <button onClick={handleClick} className='greenButton'>Get it now</button>
    </div>
  );
}







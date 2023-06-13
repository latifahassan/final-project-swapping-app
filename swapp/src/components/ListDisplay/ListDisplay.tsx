import React from 'react';
import DisplayCard from '../DisplayCard/DisplayCard';

type ListDisplayProps = {
  numItems: number;
  items: { title: string; image: string; username: string; id: string }[];
  handleGetItNowClick: () => void;
  spendATokenClicked: boolean;
};

export default function ListDisplay({ numItems, items, handleGetItNowClick, spendATokenClicked }: ListDisplayProps) {
  const slicedItems = items.slice(0, numItems);

  return (
    <>
      {slicedItems.map((item) => (
        <DisplayCard
          key={item.id}
          id={item.id}
          image={item.image}
          title={item.title}
          username={item.username}
          handleGetItNowClick={handleGetItNowClick}
          spendATokenClicked={spendATokenClicked}
        />
      ))}
    </>
  );
}
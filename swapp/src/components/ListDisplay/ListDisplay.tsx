import React from 'react';
import DisplayCard from '../DisplayCard/DisplayCard';

type ListDisplayProps = {
  numItems: number;
  handleGetItNowClick: () => void;
  searchResults: {
    title:string,
    username: string,
    image: string,
    id: string
  }[];
};

export default function ListDisplay({ numItems, handleGetItNowClick, searchResults }: ListDisplayProps) {
  const slicedSearchResults = searchResults.slice(0, numItems);

  return (
    <>
    <h2>Search Results:</h2>
      {slicedSearchResults.map((item) => (
        <DisplayCard
          key={item.id}
          id={item.id}
          image={item.image}
          title={item.title}
          username={item.username}
          handleGetItNowClick={handleGetItNowClick}
        />
      ))}
    </>
  );
}
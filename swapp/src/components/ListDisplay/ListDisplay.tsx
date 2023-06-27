import React from 'react';
import DisplayCard from '../DisplayCard/DisplayCard';
import Grid from '@mui/material/Grid';
import { TableResults } from '../App/App';

type ListDisplayProps = {
  items: TableResults[];
  numItems: number;
  handleGetItNowClick?: (itemId: string) => void;
  spendATokenClicked?: boolean;
  selectedItem?: string[];
  filteredItems: TableResults[];
  claimedItems?: string[]
};

export default function ListDisplay({
  items,
  numItems,
  handleGetItNowClick,
  spendATokenClicked,
  selectedItem,
  claimedItems,
  filteredItems,
}: ListDisplayProps) {
  const slicedFilteredItems = filteredItems.slice(0, numItems);

console.log(claimedItems)
  return (
    <>
      <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ px: 2 }}>
        {slicedFilteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.item_id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <DisplayCard
              key={item.item_id}
              id={item.item_id}
              image={item.image}
              title={item.title}
              username={item.username}
              handleGetItNowClick={() => handleGetItNowClick && handleGetItNowClick(item.item_id)}
              claimedItems={claimedItems}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
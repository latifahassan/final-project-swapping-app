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
  setFilteredItems: (items:TableResults[]) => void
}

export default function ListDisplay({
  items,
  numItems,
  handleGetItNowClick,
  spendATokenClicked,
  selectedItem,
  claimedItems,
  filteredItems,
  setFilteredItems
}: ListDisplayProps) {

  const slicedFilteredItems = filteredItems.slice(0, numItems);

console.log(claimedItems)
  return (
    <>

    {/* <Grid container rowSpacing={2} columnSpacing={{ xs: 10, sm: 5, md: 7 }} sx={{pl: 1.5}}> */}
    <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ px: 2}}>
      {slicedFilteredItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.item_id} sx={{ display: 'flex', justifyContent: 'center' }}>
        <DisplayCard
          key={item.item_id}
          id={item.item_id}
          image={item.image}
          title={item.title}
          username={item.username}
          // we use short circuiting to check if the function exists before calling it. We have to do this since in the props it is optional, thanks to the '?'.
          handleGetItNowClick={() => handleGetItNowClick && handleGetItNowClick(item.item_id)}
          spendATokenClicked={spendATokenClicked}
          selectedItem={selectedItem}
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems}
          claimedItems={claimedItems}
        />
        </Grid>
      ))}
      </Grid>
    </>
  );
}
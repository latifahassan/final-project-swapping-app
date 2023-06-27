import React from 'react';
import { render } from '@testing-library/react';
import ListDisplay from '../ListDisplay/ListDisplay';
import DisplayCard from '../DisplayCard/DisplayCard';

jest.mock('../DisplayCard/DisplayCard', () => {
  return jest.fn(() => null);
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ListDisplay", () => {
  test('renders correct number of DisplayCards', () => {
    const handleGetItNowClick = jest.fn();
    render(
      <ListDisplay
        numItems={3}
        handleGetItNowClick={handleGetItNowClick}
        spendATokenClicked={false}
        selectedItem={['abc123']}
        setFilteredItems={jest.fn()}
        filteredItems={[
          { title: 'test title 1', image: 'test1.jpg', username: 'test username 1', item_id: 'abc123', user_id: 'abc123', created_at: '2023' },
          { title: 'test title 2', image: 'test2.jpg', username: 'test username 2', item_id: 'def456', user_id: 'abc123', created_at: '2023' },
          { title: 'test title 3', image: 'test3.jpg', username: 'test username 3', item_id: 'ghi789', user_id: 'abc123', created_at: '2023' }
        ]}
        items={[
          { title: 'test title 1', image: 'test1.jpg', username: 'test username 1', item_id: 'abc123', user_id: 'abc123', created_at: '2023' },
          { title: 'test title 2', image: 'test2.jpg', username: 'test username 2', item_id: 'def456', user_id: 'abc123', created_at: '2023' },
          { title: 'test title 3', image: 'test3.jpg', username: 'test username 3', item_id: 'ghi789', user_id: 'abc123', created_at: '2023' }
        ]}
      />
    );
    expect(DisplayCard).toHaveBeenCalledTimes(3);
  });
}); 
  

import React from 'react';
import { render, screen } from '@testing-library/react';
import ListDisplay from '../ListDisplay/ListDisplay';
import DisplayCard from '../DisplayCard/DisplayCard';

jest.mock('../DisplayCard/DisplayCard', () => {
    return jest.fn(() => null);
    }
);

beforeEach(() => {
    jest.clearAllMocks();
});

describe("ListDisplay", () => {
    test('renders correct number of DisplayCards', () => {
        const handleGetItNowClick = jest.fn();
        render(<ListDisplay numItems={3} handleGetItNowClick={handleGetItNowClick} searchResults={[
          {title: 'test title 1', image: 'test1.jpg', username: 'test username 1', id: 'abc123'},
          {title: 'test title 2', image: 'test2.jpg', username: 'test username 2', id: 'def456'},
          {title: 'test title 3', image: 'test3.jpg', username: 'test username 3', id: 'ghi789'}
         ]} spendATokenClicked={true} />);
        expect(DisplayCard).toHaveBeenCalledTimes(3);
      });

    test('Passes correct props to DisplayCard', () => {
      const handleGetItNowClick = jest.fn();
      render(<ListDisplay numItems={2} handleGetItNowClick={handleGetItNowClick} searchResults={[
        {title: 'test title 1', image: 'test1.jpg', username: 'test username 1', id: 'abc123'},
        {title: 'test title 2', image: 'test2.jpg', username: 'test username 2', id: 'def456'},
        {title: 'test title 3', image: 'test3.jpg', username: 'test username 3', id: 'ghi789'}
       ]} spendATokenClicked={true} />)
        expect(DisplayCard).toHaveBeenNthCalledWith(1, {id: 'abc123', image: 'test1.jpg', title: 'test title 1', username: 'test username 1', handleGetItNowClick: handleGetItNowClick}, {});
        expect(DisplayCard).toHaveBeenNthCalledWith(2, {id: 'def456', image: 'test2.jpg', title: 'test title 2', username: 'test username 2', handleGetItNowClick: handleGetItNowClick}, {});
    });

    test('print search results heading on page', () => {
      const handleGetItNowClick = jest.fn();
        render(<ListDisplay numItems={3} handleGetItNowClick={handleGetItNowClick} spendATokenClicked={true} searchResults={[
          {title: 'test title 1', image: 'test1.jpg', username: 'test username 1', id: 'abc123'},
          {title: 'test title 2', image: 'test2.jpg', username: 'test username 2', id: 'def456'},
          {title: 'test title 3', image: 'test3.jpg', username: 'test username 3', id: 'ghi789'}
        ]}/>);
        const heading = screen.getByText('Search Results:');
        expect(heading).toBeInTheDocument();
    });
})
    
  

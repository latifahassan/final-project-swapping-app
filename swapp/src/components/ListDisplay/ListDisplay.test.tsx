import React from 'react';
import { render, screen } from '@testing-library/react';
import ListDisplay from '../ListDisplay/ListDisplay';
import DisplayCard from '../DisplayCard/DisplayCard';

jest.mock('../DisplayCard/DisplayCard', () => {
    return jest.fn(() => null);
    }
);

describe("ListDisplay", () => {
    test('renders correct number of DisplayCards', () => {
        render(<ListDisplay numItems={3} itemsArray={[
          {title: 'test title 1', image: 'test1.jpg', username: 'test username 1', id: 'abc123'},
          {title: 'test title 2', image: 'test2.jpg', username: 'test username 2', id: 'def456'},
          {title: 'test title 3', image: 'test3.jpg', username: 'test username 3', id: 'ghi789'}
        ]} />);
        expect(DisplayCard).toHaveBeenCalledTimes(3);
      });

    test('Passes correct props to DisplayCard', () => {
        render(<ListDisplay numItems={1} itemsArray={[
            title: 'test title 1', image: 'test1.jpg', username: 'test username 1', id: 'abc123'
        ]} />);
        expect(DisplayCard).toHaveBeenCalledWith({title: 'test title 1', image: 'test1.jpg', username: 'test username 1', id: 'abc123'});
    })
    
})
    
    


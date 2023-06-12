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
          {title: 'test title 1', image: 'test1.jpg', username: 'test username 1'},
          {title: 'test title 2', image: 'test2.jpg', username: 'test username 2'},
          {title: 'test title 3', image: 'test3.jpg', username: 'test username 3'}
        ]} />);
        expect(DisplayCard).toHaveBeenCalledTimes(3);
      });
    
    
    
    

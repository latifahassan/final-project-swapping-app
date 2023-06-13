import React from 'react';
import {render, screen} from '@testing-library/react';
import PopUp from '../PopUp/PopUp'

jest.mock('../PopUp/PopUp', () => {
    return jest.fn(() => null);
    }
);

beforeEach(() => {
    jest.clearAllMocks();
});

// describe("PopUp", () => {
//     test('Contains title', () => {
//         const actual = render(<PopUp/>);
//       });
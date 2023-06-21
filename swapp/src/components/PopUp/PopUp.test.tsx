import React from 'react';
import { render, screen } from '@testing-library/react';
import PopUp from './PopUp';
// import DisplayCard from '../DisplayCard/DisplayCard';

describe('PopUp component', () => {
  const handleSpendATokenClickMock = jest.fn();
  const setGetItNowClickedMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {

    render(<PopUp
      handleSpendATokenClick={handleSpendATokenClickMock}
      numberOfTokens={4}
      getItNowClicked={true}
      setGetItNowClicked={setGetItNowClickedMock}/>);

    const titleElement = screen.getByText('Confirm your address');
    // const addressInput = screen.getByRole('input');
    const spendTokenButton = screen.getByText('Spend a token');

    expect(titleElement).toBeInTheDocument();
    // expect(addressInput).toBeInTheDocument();
    expect(spendTokenButton).toBeInTheDocument();
  });

  // it('calls the handleSpendATokenClick function when the button is clicked', () => {
  //   render(<PopUp handleSpendATokenClick={handleSpendATokenClickMock} />);

  //   const spendTokenButton = screen.getByText('Spend a token');

  //   fireEvent.click(spendTokenButton);

  //   expect(handleSpendATokenClickMock).toHaveBeenCalledTimes(1);
  // });
//   Here is a test for the DisplayCard component to see if the button text changes to "Claimed" when the button is clicked
// it('Removes the button', () => {
//     render(<DisplayCard handleGetItNowClick={handleSpendATokenClickMock} spendATokenClicked={false} />);
//     const greenButton = screen.getByTestId('greenButton');
//     fireEvent.click(greenButton); // Simulate click on the greenButton, not the handleSpendATokenClickMock
//     expect(greenButton).not.toBeInTheDocument();
//   });
});
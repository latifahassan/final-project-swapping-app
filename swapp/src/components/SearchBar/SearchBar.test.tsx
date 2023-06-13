import SearchBar from "./SearchBar";
import { render, fireEvent, screen } from "@testing-library/react"


//🧪 check that the search query is updated with the input and displays the search results


describe('SearchBar component', () => {
    test('update search query state on input change', () => {
      const setSearchResults = jest.fn();
      render(<SearchBar setSearchResults={setSearchResults}/>);
      const inputElement = screen.getByPlaceholderText('Search') as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: 'jumper' } });
      expect(inputElement.value).toBe('jumper');
    });
});
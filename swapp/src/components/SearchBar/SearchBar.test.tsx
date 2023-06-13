import SearchBar from "./SearchBar";
import { render, fireEvent, screen } from "@testing-library/react"


//🧪 check that the search query is updated with the input and displays the search results


describe('SearchBar component', () => {
    test('update search query state on input change', () => {
      render(<SearchBar />);
      const inputElement = screen.getByPlaceholderText('Search') as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: 'jumper' } });
      expect(inputElement.value).toBe('jumper');
    });
test("displays search result header on page", ()=> {
    render(<SearchBar />)
    const inputElement = screen.getByPlaceholderText('Search')
    fireEvent.change(inputElement, { target: { value: 'jumper' } })
    const resultHeader = screen.getByText('Search Results:')
    expect(resultHeader).toBeInTheDocument();
})
test("displays a search result item on page", ()=> {
    render(<SearchBar />)
    const inputElement = screen.getByPlaceholderText('Search')
    fireEvent.change(inputElement, { target: { value: 'jumper' } })
    const searchResultItem = screen.getByAltText('Knitted jumper in maroon')
    expect(searchResultItem).toBeInTheDocument();
}
)})
import SearchBar from "./SearchBar";
import { render, fireEvent } from "@testing-library/react"


//🧪 check that the search query is updated with the input and displays the search results



describe ('SearchBar component', ()=> {
it("should update search query and display search results", ()=> {
    const { getByPlaceholderText, getByText } = render(<SearchBar />) 
    const inputElement = getByPlaceholderText('Search')
    fireEvent.change(inputElement, { target: { value: 'jumper' } })
}) 
}
)





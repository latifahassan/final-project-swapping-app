import SearchBar from "./SearchBar";
import { render, fireEvent, screen } from "@testing-library/react"

describe('SearchBar component', () => {
  test('update search query state on input change', () => {
    const setItems = jest.fn();
    const items = [
      {
        title: "Knitted jumper in maroon",
        username: "jumperlover91",
        image: "https://m.media-amazon.com/images/I/91F0TNvmWGL._AC_UL1500_.jpg",
        user_id: "abc123",
        created_at: "2023",
        item_id: "abc23234"
      }
    ];

    render(<SearchBar items={items} setItems={setItems} />);
    const inputElement = screen.getByPlaceholderText('Search') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'jumper' } });
    expect(inputElement.value).toBe('jumper');
  });
});

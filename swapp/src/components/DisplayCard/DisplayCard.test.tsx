import React from 'react'
import { render, screen } from '@testing-library/react'
import DisplayCard from '../DisplayCard/DisplayCard'

describe("DisplayCard", () => {

    test("Render DisplayCard component", () => {
        const handleGetItNowClick = jest.fn();
        render(<DisplayCard id="abc123" image="img.jpg" title="test title" username="test username" handleGetItNowClick={handleGetItNowClick} spendATokenClicked={true}/>)
        expect(screen.getByRole("img")).toBeInTheDocument();
    })

    test("Render correct title", () => {
        const handleGetItNowClick = jest.fn();
        render(<DisplayCard id="abc123" image="img.jpg" title="test title" username="test username" handleGetItNowClick={handleGetItNowClick} spendATokenClicked={true}/>)
        expect(screen.getByText("test title")).toBeInTheDocument();
    })

    test("Render correct username", () => {
        const handleGetItNowClick = jest.fn();
        render(<DisplayCard id="abc123" image="img.jpg" title="test title" username="test username" handleGetItNowClick={handleGetItNowClick} spendATokenClicked={true}/>)
        expect(screen.getByText("test username")).toBeInTheDocument();
    })

    test("image alt text includes title", () => {
        const handleGetItNowClick = jest.fn();
        render(<DisplayCard id="abc123" image="img.jpg" title="test title" username="test username" handleGetItNowClick={handleGetItNowClick} spendATokenClicked={true}/>)
        expect(screen.getByAltText("img of test title")).toBeInTheDocument();
    })

    test("Render button correctly", () => {
        const handleGetItNowClick = jest.fn();
        render(<DisplayCard id="abc123" image="img.jpg" title="test title" username="test username" handleGetItNowClick={handleGetItNowClick} spendATokenClicked={true}/>)
        expect(screen.getByRole("button")).toHaveTextContent("GET IT NOW");
    })

})
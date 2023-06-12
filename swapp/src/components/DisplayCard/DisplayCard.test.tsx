import React from 'react'
import { render, screen } from '@testing-library/react'
import DisplayCard from '../DisplayCard/DisplayCard'

describe("DisplayCard", () => {

    test("Render DisplayCard component", () => {
        render(<DisplayCard id="abc123" image="img.jpg" title="test title" username="test username"/>)
        expect(screen.getByRole("img")).toBeInTheDocument();
    })

    test("Render correct title", () => {
        render(<DisplayCard id="abc123" image="img.jpg" title="test title" username="test username"/>)
        expect(screen.getByText("test title")).toBeInTheDocument();
    })

    test("Render correct username", () => {
        render(<DisplayCard id="abc123" image="img.jpg" title="test title" username="test username"/>)
        expect(screen.getByText("test username")).toBeInTheDocument();
    })

    test("image alt text includes title", () => {
        render(<DisplayCard id="abc123" image="img.jpg" title="test title" username="test username"/>)
        expect(screen.getByAltText("img of test title")).toBeInTheDocument();
    })

    test("Render button correctly", () => {
        render(<DisplayCard id="abc123" image="img.jpg" title="test title" username="test username"/>)
        expect(screen.getByRole("button")).toHaveTextContent("GET IT NOW");
    })

})
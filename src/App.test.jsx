import { render, screen } from "@testing-library/react";
import App from "./App.jsx";
import { describe, it, expect } from "vitest";

describe("App component", () => {
  it("renders without crashing", () => {
    render(<App />);
    const element = screen.getByText("輸入文章內容");
    expect(element).toBeInTheDocument();
  });
});

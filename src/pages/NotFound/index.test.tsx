import React from "react";
import { render } from "@testing-library/react";

import NotFoundPage from "pages/NotFound";

describe("NotFound", () => {
    it("should render as expected", () => {
        const { container } = render(<NotFoundPage />);

        expect(container).toHaveTextContent("Oops");
        expect(container).toHaveTextContent("Page not found");
    });
});

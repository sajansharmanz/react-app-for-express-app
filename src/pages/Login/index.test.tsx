import React from "react";
import { render } from "@testing-library/react";

import LoginPage from "pages/Login";

describe("Login", () => {
    it("should render as expected", () => {
        const { container } = render(<LoginPage />);

        expect(container).toHaveTextContent("Sign in");
        expect(container).toHaveTextContent("Forgot password?");
        expect(container).toHaveTextContent("Don't have an account? Sign Up");
    });
});

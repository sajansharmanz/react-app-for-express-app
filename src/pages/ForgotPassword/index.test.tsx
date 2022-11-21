import React from "react";
import { render } from "@testing-library/react";

import ForgotPasswordPage from "pages/ForgotPassword";

describe("ForgotPassword", () => {
    it("should render as expected", () => {
        const { container } = render(<ForgotPasswordPage />);

        expect(container).toHaveTextContent("Forgot password");
        expect(container).toHaveTextContent("Return to login");
    });
});

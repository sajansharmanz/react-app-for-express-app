import React from "react";
import { render } from "@testing-library/react";

import ResetPasswordPage from "pages/ResetPassword";

describe("NotFound", () => {
    it("should render as expected", () => {
        const { container } = render(<ResetPasswordPage />);

        expect(container).toHaveTextContent("Reset password");
        expect(container).toHaveTextContent("Token expired or invalid?");
    });
});

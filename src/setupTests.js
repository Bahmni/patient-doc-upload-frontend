import "@testing-library/jest-dom";
import "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockReturnValue({ pathname: "/" }),
  useHistory: jest.fn().mockReturnValue({}),
  useParams: jest.fn().mockReturnValue({}),
  useNavigate: jest.fn(),
}));

const customRender = (ui, options) =>
  render(ui, { wrapper: Router, ...options });

export * from "@testing-library/react";
export { customRender as render };

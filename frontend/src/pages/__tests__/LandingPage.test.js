import { render, screen } from "@testing-library/react";
import LandingPage from "../LandingPage";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../app/store";

test("buttons render", async () => {
  render(
    <Router>
      <LandingPage />
    </Router>
  );

  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
});

test("nav to login", async () => {
  render(
    <Provider store={store}>
      <Router>
        <LandingPage />
        <LoginPage />
      </Router>
    </Provider>
  );
  const user = userEvent;

  user.click(screen.getByTestId("loginButton"));

  expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test("nav to reg", async () => {
  render(
    <Provider store={store}>
      <Router>
        <LandingPage />
        <RegisterPage />
      </Router>
    </Provider>
  );
  const user = userEvent;

  user.click(screen.getByTestId("regButton"));

  expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
  expect(screen.getAllByLabelText(/password/i)).toHaveLength(2);
  expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
});

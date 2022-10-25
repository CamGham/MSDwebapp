import { render, screen } from "@testing-library/react";
import HomePage from "../HomePage";
import userEvent from "@testing-library/user-event";
import ResultPage from "../ResultPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../app/store";

test("initial render", async () => {
  render(
    <Provider store={store}>
      <Router>
        <HomePage />
      </Router>
    </Provider>
  );

  expect(
    screen.getByRole("heading", { name: /welcome user!/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: /results/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: /home/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: /camera/i,
    })
  ).toBeInTheDocument();
});

test("nav to results", async () => {
  render(
    <Provider store={store}>
      <Router>
        <HomePage />
        <ResultPage />
      </Router>
    </Provider>
  );
  const user = userEvent;

  const resultsNav = screen.getAllByRole("button", {
    name: /results/i,
  })[0];

  user.click(resultsNav);

  expect(screen.getAllByText(/date/i)).toHaveLength(2);
  expect(screen.getAllByText(/release angle°/i)).toHaveLength(2);
  expect(screen.getAllByText(/arm ext angle°/i)).toHaveLength(1);
});

import { render, screen } from "@testing-library/react";
import LiveCamera from "../LiveCamera";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../app/store";
import { act } from "react-dom/test-utils";

test("initial render", async () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    render(
      <Provider store={store}>
      <Router>
      <LiveCamera />
      </Router>
    </Provider>
    )});

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

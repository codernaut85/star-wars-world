import { cleanup, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import mockPerson from '../../mocks/mockPerson';
import { MemoryRouter as Router } from 'react-router-dom';

import Home from './';
import PeopleService from "../../services/people";


afterEach(cleanup);

const mockPeople: object[] = [];

for (let index = 0; index < 30; index++) {
  mockPeople.push(mockPerson);
}

const mockedReturnValue = {
  results: mockPeople,
  count: 30,
};


test('renders screen header', () => {
  render(<Home />);
  const titleElement = screen.getByText(/Welcome to Star Wars World/i);
  expect(titleElement).toBeInTheDocument();
});


test('renders pagination when there are more than 10 results from getAllPeople', async () => {
  const mock = jest.spyOn(PeopleService, 'getAllPeople');
  mock.mockImplementation(() => Promise.resolve(mockedReturnValue))

  render(
    <Router>
      <Home />
    </Router>
  );
  
  await waitFor(() => {
    expect(screen.getByTestId("pagination")).toBeInTheDocument();;
  });
});


test('renders title when there are more than 10 results from getAllPeople', async () => {
  const mock = jest.spyOn(PeopleService, 'getAllPeople');
  mock.mockImplementation(() => Promise.resolve(mockedReturnValue))

  render(
    <Router>
      <Home />
    </Router>
  );

  await waitFor(() => {
    const titleElement = screen.getByText(/Star Wars Characters/i);
    expect(titleElement).toBeInTheDocument();
  });
});


test('renders people-list when there are results from getAllPeople', async () => {
  const mock = jest.spyOn(PeopleService, 'getAllPeople');
  mock.mockImplementation(() => Promise.resolve(mockedReturnValue))

  render(
    <Router>
      <Home />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByTestId("people-list")).toBeInTheDocument();;
  });
});

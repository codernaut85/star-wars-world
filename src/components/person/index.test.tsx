import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter as Router } from 'react-router-dom';

import Person from './';
import FilmsService from "../../services/films";
import PeopleService from "../../services/people";
import PlanetsService from "../../services/planets";

const mockFilm = {};

const mockPerson = { "name": "Cliegg Lars", "height": "183", "mass": "unknown", "hair_color": "brown", "skin_color": "fair", "eye_color": "blue", "birth_year": "82BBY", "gender": "male", "homeworld": "https://swapi.dev/api/planets/1/", "films": ["https://swapi.dev/api/films/5/"], "species": [], "vehicles": [], "starships": [], "created": "2014-12-20T15:59:03.958000Z", "edited": "2014-12-20T21:17:50.451000Z", "url": "https://swapi.dev/api/people/62/" };

const mockPlanet = {};

afterEach(cleanup);

test('renders person name', async () => {
  FilmsService.getFilm = async () => (mockFilm);
  PeopleService.getPerson = async () => (mockPerson);
  PlanetsService.getPlanet = async () => (mockPlanet);
  

  render(
    <Router>
      <Person />
    </Router>
  );

  await waitFor(() => {
    const titleElement = screen.getByText(/Cliegg Lars/i);
    expect(titleElement).toBeInTheDocument();
  });
});

test('renders person gender', async () => {
  FilmsService.getFilm = async () => (mockFilm);
  PeopleService.getPerson = async () => (mockPerson);
  PlanetsService.getPlanet = async () => (mockPlanet);

  render(
    <Router>
      <Person />
    </Router>
  );

  await waitFor(() => {
    const titleElement = screen.getByText(/male/i);
    expect(titleElement).toBeInTheDocument();
  });
});

test('renders person hair colour', async () => {
  FilmsService.getFilm = async () => (mockFilm);
  PeopleService.getPerson = async () => (mockPerson);
  PlanetsService.getPlanet = async () => (mockPlanet);

  render(
    <Router>
      <Person />
    </Router>
  );

  await waitFor(() => {
    const titleElement = screen.getByText(/brown/i);
    expect(titleElement).toBeInTheDocument();
  });
});

test('renders Appearance when there are film results', async () => {
  FilmsService.getFilm = async () => (mockFilm);
  PeopleService.getPerson = async () => (mockPerson);
  PlanetsService.getPlanet = async () => (mockPlanet);

  render(
    <Router>
      <Person />
    </Router>
  );

  await waitFor(() => {
    const titleElement = screen.getByText(/brown/i);
    expect(titleElement).toBeInTheDocument();
  });

  await waitFor(() => {
    const titleElement = screen.getByText(/Appearances/i);
    expect(titleElement).toBeInTheDocument();  });
});
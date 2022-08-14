import { useEffect, useState } from 'react';
// @ts-ignore
import { prop, sortBy } from 'ramda';
import PlanetsService from '../../services/planets';
import { useParams } from "react-router-dom";
import utils from '../../utils';
import FilmsService from '../../services/films';
import PeopleService from '../../services/people';
import FilmInterface from '../../interfaces/film';
import PersonInterface from '../../interfaces/person';
import AppHeader from '../appHeader';


function renderLoadingOrErrorView(isLoading: boolean) {
  return <div>
    <AppHeader />
    <div className="main-content">
      <p>{isLoading ? 'Loading...' : 'No data found for this person'}</p>
    </div>
  </div>;
}

function Person() {
  const { id = '1' } = useParams();
  const personId = parseInt(id);

  const [personData, setPersonData] = useState(null);
  const [homeworldName, setHomeworldName] = useState(null);
  const [films, setFilms] = useState<FilmInterface[]>([]);
  const [isPersonDataLoading, setIsPersonDataLoading] = useState(true);
  const [isFilmDataLoading, setIsFilmDataLoading] = useState(true);
  const [isPlanetDataLoading, setIsPlanetDataLoading] = useState(true);

  useEffect(() => {
    const fetchPlanet = async (personData: PersonInterface) => {
      const planetId = utils.getIdFromUrl(personData.homeworld);
      if (planetId) {
        const response = await PlanetsService.getPlanet(parseInt(planetId));
        setHomeworldName(response.name);
        setIsPlanetDataLoading(false);
      }
    }

    const fetchFilms = async (personData: PersonInterface) => {
      const films = personData.films;

      const filmData: FilmInterface[] = [];

      await Promise.all(        
        films.map(async (film) => {
          const filmId = utils.getIdFromUrl(film.toString());

          console.log('filmId', filmId);

          if (filmId) {
            const response = await FilmsService.getFilm(parseInt(filmId));
            console.log('response', response);
            filmData.push(response);
          }
        })
      );

      setFilms(sortBy(prop('release_date'), filmData));
      setIsFilmDataLoading(false);
    }

    const fetchPersonData = async () => {
      const response = await PeopleService.getPerson(personId);
      console.log('person data', response);
      setPersonData(response);
      setIsPersonDataLoading(false);
      fetchPlanet(response);
      fetchFilms(response)
    }

    fetchPersonData();
  }, [])

  const isLoading = isPersonDataLoading || isPlanetDataLoading || isFilmDataLoading;

  if (isLoading || !personData ) {
    return renderLoadingOrErrorView(isLoading);
  }

  const {
    eye_color,
    gender,
    hair_color,
    name,
  } = personData;

  return <div>
    <AppHeader />
    <article className="main-content">
      <h1>{name}</h1>
      <p>Gender: {gender}</p>
      <p>Eye: {eye_color}</p>
      <p>Hair colour: {hair_color}</p>
      <p>Homeworld: {homeworldName}</p>
      <h2>Appearances</h2>
      {films.length > 0 && (<ul className="film-list">
        {films.map((film, idx) => {
          return (
            <li key={idx}>{film.title}</li>
          );
        })}
      </ul>)}
    </article>
  </div>
}

export default Person;

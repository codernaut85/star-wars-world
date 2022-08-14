import { useEffect, useState } from 'react';
// @ts-ignore
import { prop, sortBy } from 'ramda';
import { useParams } from "react-router-dom";
import utils from '../../utils';
import Loader from '../loader';
import FilmsService from '../../services/films';
import PeopleService from '../../services/people';
import PlanetsService from '../../services/planets';
import FilmInterface from '../../interfaces/film';
import PersonInterface from '../../interfaces/person';
import AppHeader from '../appHeader';
import '../../styles/buttons.css';
import '../../styles/person.css';


function renderLoadingOrErrorView(isLoading: boolean) {
  return <div>
    <AppHeader />
    <div className="main-content">
      {isLoading ? <Loader /> : <p>No data found for this person</p>}
    </div>
  </div>;
}

function Person() {
  const { id = '1' } = useParams();
  const personId = parseInt(id);

  const [personData, setPersonData] = useState({
    eye_color: '',
    gender: '',
    hair_color: '',
    name: '',
  });
  const [homeworldName, setHomeworldName] = useState(null);
  const [films, setFilms] = useState<FilmInterface[]>([]);
  const [isPersonDataLoading, setIsPersonDataLoading] = useState(true);
  const [isFilmDataLoading, setIsFilmDataLoading] = useState(true);
  const [isPlanetDataLoading, setIsPlanetDataLoading] = useState(true);
  const [isEditingGender, setIsEditingGender] = useState(false);
  const [editedGender, setEditedGender] = useState('');

  function renderEditGender() {
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      setEditedGender(e.currentTarget.value);
    }

    /*
      We are only saving locally as we cannot
      actually write the change to the Star Wars API database.
      
      This is just for 'demo' purposes
    */
    const saveChanges = () => {
      setPersonData(Object.assign(personData, {
        gender: editedGender,
      }));
      setEditedGender('');
      setIsEditingGender(false);
    }

    const cancelChanges = () => {
      setEditedGender('');
      setIsEditingGender(false);
    }

    return (
      <div className="edit-block">
        <p>Edit gender</p>
        <input type="text" value={editedGender} onChange={handleChange} />
        <button className="button" onClick={saveChanges} disabled={!editedGender}>Save</button>
        <button className="button danger" onClick={cancelChanges}>Cancel</button>
      </div>
    );
  }

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

          if (filmId) {
            const response = await FilmsService.getFilm(parseInt(filmId));
            filmData.push(response);
          }
        })
      );

      setFilms(sortBy(prop('release_date'), filmData));
      setIsFilmDataLoading(false);
    }

    const fetchPersonData = async () => {
      const response = await PeopleService.getPerson(personId);
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
      <div>
        {isEditingGender ? renderEditGender() : <p>Gender: {gender}</p>}
        {!isEditingGender && <button className="button" onClick={() => setIsEditingGender(true)}>Edit</button>}
      </div>
      <p>Eye: {eye_color}</p>
      <p>Hair colour: {hair_color}</p>
      <p>Homeworld: {homeworldName}</p>
      {films.length > 0 && <div>
        <h2>Appearances</h2>
        <ul className="film-list">
          {films.map((film, idx) => {
            return (
              <li key={idx}>{film.title}</li>
            );
          })}
        </ul>
      </div>}
    </article>
  </div>
}

export default Person;

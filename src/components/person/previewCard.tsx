import React, { useEffect, useState } from 'react';
import PlanetService from '../../services/planets';
import { Link } from "react-router-dom";
import utils from '../../utils';


interface PersonProps {
  person: {
    name: string,
    gender: string,
    homeworld: string,
    url: string,
  };
}

function Person({ person }: PersonProps) {

  const { gender, homeworld, name, url } = person;

  const [homeworldName, setHomeworldName] = useState('');

  useEffect(() => {
    const fetchPlanet = async () => {
      const planetId = utils.getIdFromUrl(homeworld);
      if (planetId) {
        const response = await PlanetService.getPlanet(parseInt(planetId));
        if (response) {
          setHomeworldName(response.name);
        } else {
          setHomeworldName('No homeworld data found');
        }
      }
    }

    fetchPlanet();
  }, [])

  const personId = utils.getIdFromUrl(url);

  return (
    <li className="people-list__person">
      <Link to={`/people/${personId}`}>
        <article className="people-list__person__content">
          <h3>{name}</h3>
          {gender && <p>Gender: {gender}</p>}
          <p>Homeworld: {homeworldName || 'Retrieving homeworld data...'}</p>
        </article>
      </Link>
    </li>
  );
}

export default Person;
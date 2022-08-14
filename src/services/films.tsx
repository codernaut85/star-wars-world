import { baseApiURL } from '../constants';

const PlanetService = {
  async getFilm(filmId: number) {
    const response = await fetch(`${baseApiURL}/films/${filmId}/`);
    return response.json();
  }
}

export default PlanetService;


const PlanetService = {
  async getFilm(filmId: number) {
    const response = await fetch(`https://swapi.dev/api/films/${filmId}/`);
    return response.json();
  }
}

export default PlanetService;

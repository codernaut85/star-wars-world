
const PlanetsService = {
  async getPlanet(planetId: number) {
    const response = await fetch(`https://swapi.dev/api/planets/${planetId}/`);
    return response.json();
  }
}

export default PlanetsService;

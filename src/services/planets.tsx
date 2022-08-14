import { baseApiURL } from '../constants';

const PlanetsService = {
  async getPlanet(planetId: number) {
    const response = await fetch(`${baseApiURL}/planets/${planetId}/`);
    return response.json();
  }
}

export default PlanetsService;

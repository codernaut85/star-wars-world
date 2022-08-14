import { baseApiURL } from '../constants';

const PeopleService = {
  async getAllPeople(page = 1) {
    const response = await fetch(`${baseApiURL}/people/?page=${page}`);
    return response.json();
  },

  async getPerson(id: number) {
    const response = await fetch(`${baseApiURL}/people/${id}/`);
    return response.json();
  }
}

export default PeopleService;

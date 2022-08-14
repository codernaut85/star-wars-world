
const PeopleService = {
  async getAllPeople(page = 1) {
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    return response.json();
  },

  async getPerson(id: number) {
    console.log('check id', id);
    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    return response.json();
  }
}

export default PeopleService;

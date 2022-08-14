import { useEffect, useState } from 'react';
import PeopleService from '../../services/people';
import PreviewCard from '../person/previewCard';
import AppHeader from '../appHeader';
import '../../styles/people.css';
import '../../styles/pagination.css';


function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');

  const [people, setPeople] = useState([]);
  const [peopleCount, setPeopleCount] = useState(0);

  const page = pageParam ? parseInt(pageParam) : 1;
  const pages = Math.ceil(peopleCount / 10);
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await PeopleService.getAllPeople(page);
      setPeople(response.results);
      setPeopleCount(response.count);
    }

    fetchPeople();
  }, []);

  console.log('people', people);
  console.log('peopleCount', peopleCount);
  console.log('pages', pages);

  return (
    <div className="App">
      <AppHeader />
      <section className="main-content">
        <h1>Star Wars Characters</h1>
        {people.length > 0 && (<ul className="people-list">
          {people.map((person, idx) => <PreviewCard key={idx} person={person} />)}
        </ul>)}
        <nav>
          <ul className="pagination">
            {pageNumbers.map(pageNumber => {
              return (
                <li className="pagination__item">
                  <a href={`/people/?page=${pageNumber}`}>{pageNumber}</a>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>
    </div>
  );
}

export default Home;

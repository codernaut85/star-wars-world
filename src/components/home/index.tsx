import { useEffect, useState } from 'react';
import PeopleService from '../../services/people';
import PreviewCard from '../person/previewCard';
import AppHeader from '../appHeader';
import Loader from '../loader';
import '../../styles/people.css';
import '../../styles/pagination.css';

function renderLoadingOrErrorView(isLoading: boolean) {
  return <div>
    <AppHeader />
    <div className="main-content">
      {isLoading ? <Loader /> : <p>No data for Star Wars characters currently available. Please try again later.</p>}
    </div>
  </div>;
}

function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');

  const [people, setPeople] = useState([]);
  const [peopleCount, setPeopleCount] = useState(0);
  const [isPeopleDataLoading, setIsPeopleDataLoading] = useState(true);


  const page = pageParam ? parseInt(pageParam) : 1;
  const pages = Math.ceil(peopleCount / 10);
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await PeopleService.getAllPeople(page);
      if (response) {
        setPeople(response.results);
        setPeopleCount(response.count);
      } 
      setIsPeopleDataLoading(false);
    }

    fetchPeople();
  }, []);

  if (isPeopleDataLoading || !people || people.length === 0) {
    return renderLoadingOrErrorView(isPeopleDataLoading);
  }

  return (
    <div className="App">
      <AppHeader />
      <section className="main-content">
        <h1>Star Wars Characters</h1>
        {people && people.length > 0 && (<ul data-testid="people-list"  className="people-list">
          {people.map((person, idx) => <PreviewCard key={idx} person={person} />)}
        </ul>)}
        {pageNumbers.length > 1 && <nav>
          <ul id="pagination" data-testid="pagination" className="pagination">
            {pageNumbers.map((pageNumber, idx) => {
              return (
                <li key={idx} className={`pagination__item ${idx+1 === page ? 'current' : ''}`}>
                  <a href={`/people/?page=${pageNumber}`}>{pageNumber}</a>
                </li>
              );
            })}
          </ul>
        </nav>}
      </section>
    </div>
  );
}

export default Home;

import utils from ".";

test('slugify correctly formats a string', () => {
  const testString = 'this is some string';
  const slugifiedString = utils.slugifyString(testString);
  expect(slugifiedString).toEqual('this-is-some-string');
});

test('slugify correctly formats a string when empty string supplied', () => {
  const testString = '';
  const slugifiedString = utils.slugifyString(testString);
  expect(slugifiedString).toEqual('');
});

test('getIdFromUrl correctly returns the ID from a URL when id is a single digit', () => {
  const testString = 'https://swapi.dev/api/people/7/';
  const id = utils.getIdFromUrl(testString);
  expect(id).toEqual('7');
});

test('getIdFromUrl correctly returns the ID from a URL when id is two digits', () => {
  const testString = 'https://swapi.dev/api/films/14/';
  const id = utils.getIdFromUrl(testString);
  expect(id).toEqual('14');
});

test('formateDateAsYear correctly returns a post 2000 date string as a standard full year', () => {
  const testString = '2005-05-19';
  const formatted = utils.formateDateAsYear(testString);
  expect(formatted).toEqual(2005);
});

test('formateDateAsYear correctly returns a pre 2000 date string as a standard full year', () => {
  const testString = '1976-05-19';
  const formatted = utils.formateDateAsYear(testString);
  expect(formatted).toEqual(1976);
});

test('formateDateAsYear correctly handles a year only date string', () => {
  const testString = '2022';
  const formatted = utils.formateDateAsYear(testString);
  expect(formatted).toEqual(2022);
});

test('formateDateAsYear correctly handles a month and year only date string', () => {
  const testString = '2019-05';
  const formatted = utils.formateDateAsYear(testString);
  expect(formatted).toEqual(2019);
});


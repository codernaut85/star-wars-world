import utils from ".";

test('slugify correct formats a string', () => {
  const testString = 'this is some string';
  const slugifiedString = utils.slugifyString(testString);
  expect(slugifiedString).toEqual('this-is-some-string');
});

test('slugify correct formats a string when empty string supplied', () => {
  const testString = '';
  const slugifiedString = utils.slugifyString(testString);
  expect(slugifiedString).toEqual('');
});

test('getIdFromUrl correct returns the ID from a URL when id is a single digit', () => {
  const testString = 'https://swapi.dev/api/people/7/';
  const id = utils.getIdFromUrl(testString);
  expect(id).toEqual('7');
});

test('getIdFromUrl correct returns the ID from a URL when id is two digits', () => {
  const testString = 'https://swapi.dev/api/films/14/';
  const id = utils.getIdFromUrl(testString);
  expect(id).toEqual('14');
});

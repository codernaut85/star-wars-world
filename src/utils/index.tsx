
const utils = {
  slugifyString: (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, ''),

  getIdFromUrl: (str: string) => {
    const parts = str.split("/");
    parts.length = parts.length - 1;
    const id = parts.pop();
    return id;
  },

  formateDateAsYear: (year: string) => {
    if (!year) {
      return null;
    }
    return new Date(year).getFullYear();
  }
}

export default utils;
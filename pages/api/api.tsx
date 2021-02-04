const API_ENDPOINT = "http://api.pathofexile.com";
export const api = async (path: string) => {
  const url = `${API_ENDPOINT}/${path}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default async function getBooks() {
  try {
    const fetcher = await fetch("./books.json");
    const res = await fetcher.json();

    return res;
  } catch (error) {
    console.log(error);
  }
}

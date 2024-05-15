export type Book = {
  title: string;
  pages: number;
  genere: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  author: {
    name: string;
    otherBooks: string[];
  };
};

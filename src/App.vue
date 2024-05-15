<script setup lang="ts">
import { onMounted, ref } from "vue";
import getBooks from "./lib/api/getBooks";
type Book = {
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
const books = ref([]);
async function getLocalBooks() {
  const res = await getBooks();
  books.value = res.library;
}
onMounted(() => {
  getLocalBooks();
});
</script>

<template>
  <h1 class="">Libros</h1>
  <div>
    <div v-for="book in books" :key="book">
      <h2>{{ book.book.title }}</h2>
    </div>
  </div>
</template>

<style scoped></style>

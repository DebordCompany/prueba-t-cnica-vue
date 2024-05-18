<script setup lang="ts">
import { onMounted, ref } from "vue";
import getBooks from "./lib/api/getBooks";
import type { Book } from "./lib/types";
const books = ref<Book[]>();
const booksFilter = ref<Book[]>();
const booksReaded = ref<Book[]>([]);
const input = ref({
  pages: 2000,
  genre: "Fantasía",
});

function getBooksFilter() {
  const filter = books.value?.filter((book) => {
    return book.pages <= input.value.pages && book.genre === input.value.genre;
  });
  booksFilter.value = filter;
}

function getBooksReaded(item: Book) {
  console.log(item);
  booksReaded.value.push(item);
  const filter = booksFilter.value?.filter((element) => {
    return element != item;
  });
  booksFilter.value = filter;
}
function returnBooksReaded(item: Book) {
  booksFilter.value?.push(item);
  const filter = booksReaded.value?.filter((element) => {
    return element != item;
  });
  booksReaded.value = filter;
}
function resetFilter() {
  booksFilter.value = books.value;
}
async function getLocalBooks() {
  const res = await getBooks();
  const uniqueBook = res.library.map((item: { book: Book }) => {
    return item.book;
  });
  books.value = uniqueBook;
  booksFilter.value = uniqueBook;
}
onMounted(() => {
  getLocalBooks();
});
</script>

<template>
  <main class="max-w-screen-2xl m-auto p-6 min-h-dvh">
    <h1 class="text-6xl">Tus libros disponibles: {{ booksFilter?.length }}</h1>
    <div class="flex gap-8 items-center">
      <div>
        <input
          min="1"
          max="2000"
          step="1"
          type="range"
          @change="getBooksFilter"
          v-model="input.pages"
        />
        <div class="flex justify-between">
          <p>0</p>
          <p>{{ input.pages }}</p>
        </div>
      </div>
      <select name="genre" v-model="input.genre" @change="getBooksFilter">
        <option value="Fantasía" selected>Fantasia</option>
        <option value="Terror">Terror</option>
        <option value="Aventuras">Aventuras</option>
      </select>
      <div
        @click="resetFilter"
        class="px-4 py-2 bg-neutral-800 text-neutral-50"
      >
        <p>Reset Filter</p>
      </div>
    </div>
    <section class="grid grid-cols-[3fr,1fr] pt-10 gap-4">
      <article class="grid grid-cols-2 gap-4">
        <div
          v-for="(item, index) in booksFilter"
          :key="index"
          @click="getBooksReaded(item)"
          class="grid grid-cols-[1fr,2fr] gap-4 p-4 shadow-[0px_0px_30px_#00000020] rounded-md"
        >
          <img
            class="object-cover rounded-md shadow-[3px_3px_0px_#33333375]"
            :src="item.cover"
            alt=""
          />
          <div>
            <h2 class="font-bold text-lg">{{ item.title }}</h2>
            <p class="text-sm">Páginas: {{ item.pages }}</p>
            <p class="text-sm">Año: {{ item.year }}</p>
            <p class="text-sm">Genero: {{ item.genre }}</p>
            <p class="text-sm">ISBN: {{ item.ISBN }}</p>
          </div>
        </div>
      </article>
      <aside>
        <h2>Tus libros leidos</h2>
        <div class="grid grid-cols-4 gap-2">
          <div
            @click="returnBooksReaded"
            v-for="(item, index) in booksReaded"
            :key="index"
          >
            <img
              class="object-cover rounded-md shadow-[3px_3px_0px_#33333375]"
              :src="item.cover"
              alt=""
            />
          </div>
        </div>
      </aside>
    </section>
  </main>
</template>

<style scoped></style>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import getBooks from "./lib/api/getBooks";
import type { Book } from "./lib/types";
import { setLocalStorage, getLocalStorage } from "./lib/utils";

import Componente from "./components/Componente.vue";
const booksReaded = ref<Book[]>([]);
const booksUnReaded = ref<Book[]>([]);
const input = ref({
  pages: 2000,
  genre: "Todos",
});

function getBooksFilter() {
  const books = getLocalStorage("books");
  const booksRead = getLocalStorage("readBooks");
  const booksNotReaded = books.filter((element: Book) => {
    return !booksRead.some((e: Book) => e.ISBN === element.ISBN);
  });
  const filter = booksNotReaded.filter((element: Book) => {
    if (input.value.genre == "Todos") {
      return (
        element.genre == element.genre && element.pages <= input.value.pages
      );
    }
    return (
      element.pages <= input.value.pages && element.genre == input.value.genre
    );
  });
  booksUnReaded.value = filter;
}

function getBooksReaded(item: Book) {
  booksReaded.value.push(item);
  const filter = booksUnReaded.value?.filter((element) => {
    return element != item;
  });
  booksUnReaded.value = filter;
  setLocalStorage("readBooks", booksReaded.value);
}
function returnBooksReaded(item: Book) {
  booksUnReaded.value?.push(item);
  const filter = booksReaded.value?.filter((element) => {
    return element != item;
  });
  booksReaded.value = filter;
  setLocalStorage("readBooks", booksReaded.value);
}
function resetFilter() {
  const books = getLocalStorage("books");
  const booksReaded = getLocalStorage("readBooks");
  const bookUnRead = books.filter((element: Book) => {
    return !booksReaded.some((e: Book) => e.ISBN === element.ISBN);
  });
  booksUnReaded.value = bookUnRead;
}
async function getLocalBooks() {
  const res = await getBooks();
  const books = res.library.map((item: { book: Book }) => {
    return item.book;
  });
  setLocalStorage("books", books);
  const state = getLocalStorage("readBooks");
  if (state) {
    const booksNotReaded = books.filter((element: Book) => {
      return !state.some((a: Book) => a.ISBN === element.ISBN);
    });
    booksReaded.value = state;
    booksUnReaded.value = booksNotReaded;
  } else {
    booksUnReaded.value = books;
  }
}
onMounted(() => {
  getLocalBooks();
});
</script>

<template>
  <main class="max-w-screen-2xl m-auto p-6 min-h-dvh">
    <h1 class="text-6xl">
      Tus libros disponibles: {{ booksUnReaded?.length }}
    </h1>
    <Componente />
    <div class="flex gap-8 items-center">
      <div>
        <input
          min="1"
          max="2000"
          step="1"
          type="range"
          v-model="input.pages"
          @change="getBooksFilter"
        />
        <div class="flex justify-between">
          <p>0</p>
          <p>{{ input.pages }}</p>
        </div>
      </div>
      <select name="genre" v-model="input.genre" @change="getBooksFilter">
        <option value="Todos" selected>Todos</option>
        <option value="Fantasía" selected>Fantasia</option>
        <option value="Terror">Terror</option>
        <option value="Aventuras">Aventuras</option>
      </select>

      <button
        @click="resetFilter"
        class="px-4 py-2 bg-neutral-800 text-neutral-50"
      >
        <p>Limpiar filtros</p>
      </button>
    </div>
    <section class="grid grid-cols-[3fr,1fr] pt-10 gap-4">
      <article class="grid grid-cols-2 gap-4">
        <div
          v-for="(item, index) in booksUnReaded"
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
      <aside class="shadow-[2px_2px_5px_#33333330] bg-white p-3 rounded-lg">
        <h2>Tus libros leidos: {{ booksReaded.length }}</h2>
        <div class="grid grid-cols-4 gap-2">
          <div
            @click="returnBooksReaded(item)"
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

<script setup lang="ts">
import { onMounted, ref } from "vue";
import getBooks from "./lib/api/getBooks";
import type { Book } from "./lib/types";
const books = ref<Book[]>();
const input = ref({
  pages: 1200,
  genere: "",
});

async function getLocalBooks() {
  const res = await getBooks();
  const uniqueBook = res.library.map((item: { book: Book }) => {
    return item.book;
  });
  books.value = uniqueBook;
}
onMounted(() => {
  getLocalBooks();
});
</script>

<template>
  <main class="max-w-screen-2xl m-auto p-6 bg-neutral-900 text-neutral-50">
    <h1 class="text-6xl">Tus libros disponibles: {{ books?.length }}</h1>
    <div class="flex gap-4">
      <div>
        <input min="1" max="1000" step="1" type="range" />
        <div class="flex justify-between">
          <p>0</p>
          <p>{{ input.pages }}</p>
        </div>
      </div>
      <select
        class="text-neutral-800 py-1 px-4"
        name="generos"
        id=""
        v-model="input.genere"
      >
        <option value="Fantasia" selected>Fantasia</option>
        <option value="Fantasia" selected>Fantasia</option>
      </select>
    </div>
    <section class="grid grid-cols-[3fr,1fr] pt-10 gap-4">
      <article class="grid grid-cols-2 gap-4">
        <div
          v-for="item in books"
          class="grid grid-cols-[1fr,2fr] gap-4 p-4 shadow-[0px_0px_30px_#00000050] rounded-md"
        >
          <img
            class="object-cover rounded-md shadow-2xl"
            :src="item.cover"
            alt=""
          />
          <div>
            <h2 class="font-bold text-lg">{{ item.title }}</h2>
            <p class="text-sm">Páginas: {{ item.pages }}</p>
            <p class="text-sm">Año: {{ item.year }}</p>
            <p class="text-sm">Genero: {{ item.genere }}</p>
            <p class="text-sm">ISBN: {{ item.ISBN }}</p>
            <p class="overflow-hidden text-xs">Sinipsis: {{ item.synopsis }}</p>
          </div>
        </div>
      </article>
      <article>Tus libros leidos</article>
    </section>
  </main>
</template>

<style scoped></style>

<template>
  <!-- section Hero -->
  <section class="h-[40vh]">
    <img
      src="./assets/img/bg-desktop-dark.jpg"
      alt="dark image"
      v-if="isDarkMode"
      class="h-full w-full object-cover"
    />
    <img
      v-else
      src="./assets/img/bg-desktop-light.jpg"
      alt="dark image"
      class="h-full w-full object-cover"
    />
  </section>
  <!-- section input -->
  <section class="lg:w-5/12 w-11/12 mx-auto mt-[-6rem]">
    <div class="flex justify-end">
      <ThemeSwitcher class="my-4" />
    </div>
    <form
      class="bg-base-300 opacity-80 rounded-sm h-11"
      @submit.prevent="handleNewTask"
    >
      <input
        type="text"
        v-model="newTask"
        class="bg-transparent w-full h-full pl-4 border-base-200 active:border-base-300 focus:border-base-300 rounded-sm"
        placeholder="Add new task"
      />
    </form>
  </section>

  <section
    class="todos lg:w-5/12 w-11/12 mx-auto relative z-10 opacity-90 mt-2"
  >
    <ul class="bg-base-300 rounded-sm">
      <li
        v-for="todo in store.tasks"
        @click="store.toggleTask(todo.id)"
        class="py-2 px-3 flex items-center justify-between border-base-content [&:not(:nth-child(1))]:border-t"
      >
        <div class="content">
          <input
            type="checkbox"
            :checked="todo.completed"
            class="checkbox checkbox-xs mr-3"
          />
          <span>{{ todo.name }}</span>
        </div>
        <button class="text-xs opacity-80">
          <img src="./assets/img/icon-cross.svg" alt="" />
        </button>
      </li>
    </ul>
    <ul
      class="flex items-center lg:justify-around justify-between bg-base-300 px-4 py-1 rounded-sm border-t border-base-content"
    >
      <li>
        <button class="text-xs opacity-60">3 items left</button>
      </li>
      <li class="lg:block hidden">
        <button class="text-xs opacity-60">All</button>
        <button class="text-xs opacity-60 px-3">Active</button>
        <button class="text-xs opacity-60">Completed</button>
      </li>
      <li>
        <button class="text-xs opacity-60">Clear Completed</button>
      </li>
    </ul>
    <div
      class="lg:hidden bg-base-300 rounded-sm mt-2 py-2 px-3 flex justify-around"
    >
      <button class="text-xs opacity-60">All</button>
      <button class="text-xs opacity-60">Active</button>
      <button class="text-xs opacity-60">Completed</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTaskStore } from "./store/task";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";
import { useDarkMode } from "./composables/useTheme";
import { ref } from "vue";
const store = useTaskStore();
const { isDarkMode } = useDarkMode();
const newTask = ref<string>("");
const handleNewTask = () => {
  store.addTask({
    id: Math.floor(Math.random() * 1000),
    name: newTask.value,
    completed: false,
  });
  newTask.value = "";
};
</script>

<style scoped></style>

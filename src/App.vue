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
      <div class="flex justify-between w-full items-center">
        <h1 class="text-4xl font-extrabold">TODO APP</h1>
        <ThemeSwitcher class="my-4" />
      </div>
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
      <template v-if="allTasks.length <= 0">
        <li
          class="py-2 px-3 flex items-center justify-between border-base-content text-center"
        >
          <span class="text-xs opacity-60">No task available</span>
        </li>
      </template>
      <template v-else>
        <li
          v-for="todo in allTasks"
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
      </template>
    </ul>
    <ul
      class="flex items-center lg:justify-around justify-between bg-base-300 px-4 py-1 rounded-sm border-t border-base-content"
    >
      <li>
        <span class="text-xs opacity-60">{{ store.tasksLeft }} items left</span>
      </li>
      <li class="lg:block hidden">
        <button
          class="text-xs opacity-60"
          @click="showAll"
          :class="{ 'text-primary': activeTab === 'all' }"
        >
          All
        </button>
        <button
          class="text-xs opacity-60 px-5"
          @click="showActive"
          :class="{ 'text-primary': activeTab === 'active' }"
        >
          Active
        </button>
        <button
          class="text-xs opacity-60"
          @click="showCompleted"
          :class="{ 'text-primary': activeTab === 'completed' }"
        >
          Completed
        </button>
      </li>
      <li>
        <button class="text-xs opacity-60" @click="handleClearCompleted">
          Clear Completed
        </button>
      </li>
    </ul>
    <div
      class="lg:hidden bg-base-300 rounded-sm mt-2 py-2 px-3 flex justify-around"
    >
      <button
        class="text-xs opacity-60"
        @click="showAll"
        :class="{ 'text-primary': activeTab === 'all' }"
      >
        All
      </button>
      <button
        class="text-xs opacity-60"
        @click="showActive"
        :class="{ 'text-primary': activeTab === 'active' }"
      >
        Active
      </button>
      <button
        class="text-xs opacity-60"
        @click="showCompleted"
        :class="{ 'text-primary': activeTab === 'completed' }"
      >
        Completed
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
type TaskTab = "all" | "active" | "completed";
import { useTaskStore } from "./store/task";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";
import { useDarkMode } from "./composables/useTheme";
import { ref } from "vue";
const store = useTaskStore();
const { isDarkMode } = useDarkMode();
const newTask = ref<string>("");

const allTasks = ref(store.tasks);
const activeTab = ref<TaskTab>("all");
const handleNewTask = () => {
  store.addTask({
    id: Math.floor(Math.random() * 1000),
    name: newTask.value,
    completed: false,
  });
  newTask.value = "";
};

const showAll = () => {
  allTasks.value = store.showAll;
  activeTab.value = "all";
};
const showActive = () => {
  allTasks.value = store.showActive;
  activeTab.value = "active";
};
const showCompleted = () => {
  allTasks.value = store.showCompleted;
  activeTab.value = "completed";
};
const handleClearCompleted = () => {
  store.clearCompleted();
  allTasks.value = store.tasks;
};
</script>

<style scoped></style>

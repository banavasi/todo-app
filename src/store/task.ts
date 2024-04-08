import { defineStore } from "pinia";
import { ref, computed } from "vue";
interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export const useTaskStore = defineStore(
  "task",
  () => {
    const tasks = ref<Task[]>([]);
    const addTask = (task: Task) => {
      tasks.value.push(task);
    };
    const removeTask = (id: number) => {
      tasks.value = tasks.value.filter((task) => task.id !== id);
    };
    const showCompleted = computed(() =>
      tasks.value.filter((task) => task.completed)
    );

    const showAll = computed(() => tasks.value);

    const showActive = computed(() =>
      tasks.value.filter((task) => !task.completed)
    );
    const clearCompleted = () => {
      tasks.value = tasks.value.filter((task) => !task.completed);
    };
    const toggleTask = (id: number) => {
      const task = tasks.value.find((task) => task.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    };
    // show non completed tasks
    const tasksLeft = computed(
      () => tasks.value.filter((task) => !task.completed).length
    );
    return {
      tasks,
      addTask,
      removeTask,
      showCompleted,
      showAll,
      showActive,
      clearCompleted,
      toggleTask,
      tasksLeft,
    };
  },
  { persist: true }
);

import { defineStore } from "pinia";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    addTask(task: Task) {
      this.tasks.push(task);
    },
    toggleTask(id: number) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
      }
    },
  },
});

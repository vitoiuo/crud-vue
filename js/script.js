let app = new Vue({
  el: "#app",
  data: {
    tasks: [],
    taskClone: {
      id: "",
      title: "",
      dueTo: "",
      project: "",
      usuario: "",
    },
  },
  methods: {
    getTasks() {
      fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((tasks) => (this.tasks = tasks));
    },
    addTask() {
      fetch(`http://localhost:3000/tasks`, {
        method: "POST",
        body: JSON.stringify(this.taskClone),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((newTask) => {
          console.log("DONE", newTask);
          window.location.href = "/index.html";
        });
    },
    delTask(id) {
      fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
    },
    editState(index) {
      task = this.tasks[index];
      this.taskClone = { ...task };
      task["showEdit"] = !task["showEdit"] ? true : false;
      this.$set(this.tasks, index, task);
    },
    editTask(id, task) {
      delete task["showEdit"];
      fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
    },
  },
  created() {
    this.getTasks();
  },
});

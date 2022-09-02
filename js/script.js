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
    showAdd: false,
  },
  methods: {
    getTasks() {
      fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((tasks) => (this.tasks = tasks));
    },
    showAddCard() {
      this.showAdd = !this.showAdd;
    },
    addTask() {
      this.taskClone["dueTo"] = new Date(this.taskClone["dueTo"]);
      this.taskClone["dueTo"].setDate(this.taskClone["dueTo"].getDate() + 1);
      fetch(`http://localhost:3000/tasks`, {
        method: "POST",
        body: JSON.stringify(this.taskClone),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
    },
    delTask(id) {
      fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
    },
    showEditCard(index) {
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
  computed: {
    navIcon() {
      if (!this.showAdd) {
        return "fa-solid fa-plus";
      }
      return "fas fa-arrow-left";
    },
  },
  created() {
    this.getTasks();
  },
});

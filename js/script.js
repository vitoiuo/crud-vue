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
    async getTasks() {
      res = await axios.get("http://localhost:3000/tasks");
      this.tasks = res.data;
    },
    showAddCard() {
      if (!this.showAdd) {
        this.tasks.forEach((e, index) => {
          if (e["showEdit"] === true) {
            this.showEditCard(index);
          }
        });
      }
      this.showAdd = !this.showAdd;
    },
    addTask() {
      this.taskClone["dueTo"] = new Date(this.taskClone["dueTo"]);
      this.taskClone["dueTo"].setDate(this.taskClone["dueTo"].getDate() + 1);
      axios.post(`http://localhost:3000/tasks`, this.taskClone);
    },
    delTask(id) {
      axios.delete(`http://localhost:3000/tasks/${id}`);
    },
    showEditCard(index) {
      task = this.tasks[index];
      this.taskClone = { ...task };

      this.taskClone["dueTo"] = new Date(this.taskClone["dueTo"]);

      this.taskClone["dueTo"] = this.taskClone["dueTo"]
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");

      task["showEdit"] = !task["showEdit"] ? true : false;
      if (!task["showEdit"]) {
        Object.keys(this.taskClone).forEach((e) => (this.taskClone[e] = ""));
      }
      this.$set(this.tasks, index, task);
    },
    editTask(id, task) {
      delete task["showEdit"];
      task["dueTo"] = new Date(task["dueTo"]);
      task["dueTo"] = task["dueTo"].setDate(task["dueTo"].getDate() + 1);
      axios.put(`http://localhost:3000/tasks/${id}`, task);
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

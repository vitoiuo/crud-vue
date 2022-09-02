<template>
  <div class="card-stacked">
    <div class="card-content">
      <p>{{ task.title }}</p>
      <span class="project">{{ task.project }}</span>
      <p>{{ new Date(task.dueTo).toLocaleDateString() }}</p>
    </div>
    <div class="card-action">
      <a @click.prevent="showEditCard(index)" href=""
        ><i class="fa-solid fa-pen-to-square"></i
      ></a>
      <a href="" @click.prevent="delTask(task.id)"
        ><i class="fa-solid fa-trash-can"></i
      ></a>
    </div>
    <form action="" v-show="task.showEdit">
      <div class="input-field col s12">
        <input
          v-model="taskClone.title"
          placeholder="Title"
          id="title"
          type="text"
          class="validate"
          required
        />
        <!-- <label for="title">Title</label> -->
      </div>

      <div class="input-field col s12">
        <select v-model="taskClone.project" id="project" class="project-select">
          <option disabled selected>Choose your option</option>
          <option value="Estudos">Estudos</option>
          <option value="Financeiro">Financeiro</option>
          <option value="Trabalho">Trabalho</option>
        </select>
        <label for="project">Pick a Project</label>
      </div>

      <div class="input-field col s12">
        <input v-model="taskClone.dueTo" type="date" class="" id="dueTo" />
        <label for="dueTo">Date due to</label>
      </div>

      <a
        @click="editTask(task.id, taskClone)"
        class="waves-effect waves-light btn-large"
        id="btnSave"
        >Save</a
      >
    </form>
  </div>
</template>

<script>
module.exports = {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div class="dashboard" @click="handleClickOutside">
    <h1>
      Cadastro de Avisos
      <button class="btn-close" @click="closeForm">
        &times;
      </button>
    </h1>

    <div v-if="showForm" class="form-container">
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="title">
            <i class="fas fa-pencil-alt"></i> Título
          </label>
          <input type="text" id="title" v-model="title" required />
        </div>

        <div class="form-group">
          <label for="message">
            <i class="fas fa-comment-dots"></i> Descrição
          </label>
          <textarea id="message" v-model="message" required></textarea>
        </div>

        <div class="form-group">
          <label for="icon">
            <i class="fas fa-icon"></i> Ícone
          </label>
          <select id="icon" v-model="selectedIcon" required>
            <option value="" disabled selected>Selecione um ícone</option>
            <option value="fas fa-bell">🔔 Notificação</option>
            <option value="fas fa-question-circle">❓ Informação</option>
            <option value="fas fa-exclamation-circle">⚠️ Alerta</option>
            <option value="fas fa-check-circle">✅ Sucesso</option>
          </select>
        </div>

        <button type="submit" class="btn-submit">
          <i class="fas fa-paper-plane"></i> Publicar Aviso
        </button>
      </form>
    </div>

    <div class="btn-container" v-if="!showForm">
      <button @click="showForm = true; showCard = false;" class="btn-add">
        <i class="fas fa-plus"></i> Adicionar Aviso
      </button>
    </div>

    <div class="card-container" v-if="showCard">
      <div class="card">
        <div class="card-header">
          <span class="card-title">{{ title || 'Título do Aviso' }}</span>
          <div class="options-container">
            <button class="btn-options" @click="toggleOptions">
              ⋮
            </button>
            <div v-if="showMenu" class="options-menu">
              <button class="btn-edit" @click="editNotice">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn-delete" @click="deleteNotice">
                <i class="fas fa-trash"></i> Excluir
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <span class="card-icon" :class="selectedIcon"></span>
          <p>{{ message || 'Descrição do aviso' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard1',
  data() {
    return {
      title: '',
      message: '',
      selectedIcon: '',
      showForm: false,
      showCard: true,
      showMenu: false
    };
  },
  methods: {
    submitForm() {
      console.log('Aviso publicado:', {
        title: this.title,
        message: this.message,
        icon: this.selectedIcon
      });
      this.showCard = true;
      this.showForm = false;
      this.title = '';
      this.message = '';
      this.selectedIcon = '';
      this.showMenu = false;
    },
    closeForm() {
      this.showForm = false;
      this.showCard = true;
    },
    toggleOptions() {
      this.showMenu = !this.showMenu;
    },
    editNotice() {
      console.log('Editando aviso:', {
        title: this.title,
        message: this.message,
        icon: this.selectedIcon
      });
      this.showForm = true;
      this.showCard = false;
      this.showMenu = false;
    },
    deleteNotice() {
      console.log('Excluindo aviso:', {
        title: this.title,
        message: this.message,
        icon: this.selectedIcon
      });
      this.title = '';
      this.message = '';
      this.selectedIcon = '';
      this.showCard = false;
      this.showMenu = false;
    },
    handleClickOutside(event) {
      const menu = this.$el.querySelector('.options-menu');
      const button = this.$el.querySelector('.btn-options');
      if (this.showMenu && menu && !menu.contains(event.target) && !button.contains(event.target)) {
        this.showMenu = false;
      }
    }
  }
}
</script>

<style>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}

.btn-close {
  font-size: 24px;
  color: #000;
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 5px;
}

.form-container {
  margin-bottom: 20px;
}

.btn-container {
  text-align: center;
}

.btn-add,
.btn-submit {
  display: inline-block;
  background-color: #6f42c1;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.btn-add:hover,
.btn-submit:hover {
  background-color: #593c9a;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

label i {
  margin-right: 8px;
  color: #007bff;
}

input[type="text"],
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}

.btn-submit {
  margin-top: 10px;
}

.card-container {
  margin-top: 20px;
}

.card {
  background-color: #f9f9f9;
  border-radius: 12px;
  border: 1px solid #ddd;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  position: relative;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-weight: bold;
  font-size: 18px;
}

.options-container {
  position: relative;
}

.btn-options {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #6f42c1;
}

.options-menu {
  position: absolute;
  right: 20px; 
  top: -7px; 
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  padding: 10px 0;
}

.options-menu button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  border: none;
  background: none;
  cursor: pointer;
}

.options-menu button:hover {
  background-color: #f1f1f1;
}

.btn-edit {
  color: #007bff;
}

.btn-delete {
  color: #dc3545;
}

.card-body {
  margin-top: 10px;
}

.card-icon {
  font-size: 24px;
  margin-right: 10px;
}
</style>

<template>
  <div class="dashboard">
    <h1>
      Cadastro de Encomendas
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
          <label for="apartment">
            <i class="fas fa-home"></i> Apartamento
          </label>
          <input type="text" id="apartment" v-model="apartment" required />
        </div>

        <div class="form-group">
          <label for="datetime">
            <i class="fas fa-calendar-alt"></i> Data e Hora
          </label>
          <input type="datetime-local" id="datetime" v-model="dateTime" required />
        </div>

        <div class="form-group">
          <label for="image">
            <i class="fas fa-image"></i> Imagem
          </label>
          <input type="file" id="image" @change="handleImageUpload" />
        </div>

        <button type="submit" class="btn-submit">
          <i class="fas fa-paper-plane"></i> Publicar Encomenda
        </button>
      </form>
    </div>

    <div class="btn-container" v-if="!showForm">
      <button @click="showForm = true; showCard = false;" class="btn-add">
        <i class="fas fa-plus"></i> Adicionar Encomenda
      </button>
    </div>

    <div class="card-container" v-if="showCard">
      <div class="card">
        <div class="card-header">
          <span class="card-title">{{ title || 'Título da Encomenda' }}</span>
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
          <p><strong>Apartamento:</strong> {{ apartment || 'N/A' }}</p>
          <p style="margin-top: 10px;"><strong>Data e Hora:</strong> {{ dateTime || 'N/A' }}</p>
          <img v-if="imageUrl" :src="imageUrl" alt="Imagem da Encomenda" class="encomenda-image"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardEncomendas',
  data() {
    return {
      title: '',
      apartment: '',
      dateTime: '',
      imageUrl: '',
      showForm: false,
      showCard: true,
      showMenu: false
    };
  },
  methods: {
    submitForm() {
      console.log('Encomenda publicada:', {
        title: this.title,
        apartment: this.apartment,
        dateTime: this.dateTime,
        imageUrl: this.imageUrl
      });
      this.showCard = true;
      this.showForm = false;
      this.title = '';
      this.apartment = '';
      this.dateTime = '';
      this.imageUrl = '';
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
      console.log('Editando encomenda:', {
        title: this.title,
        apartment: this.apartment,
        dateTime: this.dateTime,
        imageUrl: this.imageUrl
      });
      this.showForm = true;
      this.showCard = false;
      this.showMenu = false;
    },
    deleteNotice() {
      console.log('Excluindo encomenda:', {
        title: this.title,
        apartment: this.apartment,
        dateTime: this.dateTime,
        imageUrl: this.imageUrl
      });
      this.title = '';
      this.apartment = '';
      this.dateTime = '';
      this.imageUrl = '';
      this.showCard = false;
      this.showMenu = false;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
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
  margin-bottom: 20px;
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
input[type="datetime-local"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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
  padding: 20px;
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
  font-size: 20px;
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
  top: -12px; 
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

.encomenda-image {
  max-width: 100%;
  margin-top: 15px;
  border-radius: 4px;
}
</style>

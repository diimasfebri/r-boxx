<template>
  <div class="popup">
    <div class="main-card">
      <div class="error-container"></div>
      <div class="header">
        <div class="name-container">
          <h1 class="name">New Member</h1>
          <p class="message subtext-dark">Silahkan masukkan data</p>
        </div>
        <div class="button-close" @click="keluar">
          <div v-ripple class="button">
            <v-icon class="icon">mdi-close</v-icon>
          </div>
        </div>
      </div>
      <!-- body menggunakan componen TextInput.vue -->
      <div class="body">
        <text-input
          :input="name"
          style="margin-bottom: 0.5rem"
          @update-val="changeNameVal"
        />
        <text-input
          :input="NIK"
          style="margin-bottom: 1rem"
          @update-val="changeNIKVal"
        />
        <div v-ripple class="button" @click="daftar">Enter</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: {
        label: 'Nama',
        type: 'text',
        icon: 'mdi-account-circle',
        placeholder: 'masukkan nama di sini',
        model: '',
      },
      NIK: {
        label: 'NIK',
        type: 'number',
        icon: '',
        placeholder: 'masukkan nomor induk/nomor kartu di sini',
        model: '',
      },
    }
  },

  methods: {
    changeNameVal(val) {
      this.name.model = val
    },
    changeNIKVal(val) {
      this.NIK.model = val
    },
    keluar() {
      this.$emit('tutup-popup')
    },
    daftar() {
      const member = {
        name: this.name.model,
        NIK: this.NIK.model,
        rewards: null,
        transaction: null,
      }
      this.$emit('tambah-member', member)
      this.$emit('tutup-popup')
    },
  },
}
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(#000, 0.5);
  .main-card {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #1e1626;
    width: 80%;
    height: 80%;
    border-radius: 1rem;
    .header {
      width: 100%;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name-container {
        font-family: 'quicksand';
        padding: 1rem;
        position: relative;
        display: flex;
        width: 70%;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }
      .button-close {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30%;
        .button {
          border-radius: 0.2rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          width: 2rem;
          height: 2rem;
          .icon {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            color: $subtext-color;
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
    .body {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 0 1rem 1rem 1rem;
      .button {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 2rem;
        width: 100%;
        background-color: $primary-color;
        border-radius: 0.25rem;
        font-size: 0.65rem;
        cursor: pointer;
        font-family: 'quicksand';
      }
    }
  }
}
</style>

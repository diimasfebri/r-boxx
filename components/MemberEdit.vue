<template>
  <div class="popup">
    <div class="main-card">
      <div class="header">
        <div class="name-container">
          <h1 class="name">Edit Member</h1>
          <p class="message subtext-dark">Silahkan masukkan data yang baru</p>
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
          ref="nameInput"
          :input="name"
          style="margin-bottom: 0.5rem"
          @update-val="changeNameVal"
        />
        <text-input
          ref="nikInput"
          :input="NIK"
          style="margin-bottom: 1rem"
          @update-val="changeNIKVal"
        />
        <div v-ripple class="button" @click="sunting">Enter</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    member: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: {
        label: 'Nama Baru',
        type: 'text',
        icon: 'mdi-account-circle',
        placeholder: 'masukkan nama baru di sini',
        model: '',
      },
      NIK: {
        label: 'NIK Baru ',
        type: 'number',
        icon: 'mdi-card-account-details',
        placeholder: 'masukkan nomor kartu baru di sini',
        model: '',
      },
    }
  },

  mounted() {
    if (this.member.name) {
      this.name.model = this.member.name
    }
    if (this.member.NIK) {
      this.NIK.model = this.member.NIK
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

    async sunting() {
      const member = {
        _id: this.member._id,
        name: this.name.model,
        NIK: this.NIK.model,
      }
      const { message } = await this.$store.dispatch('members/sunting', member)
      console.log(message)
      this.$store.dispatch('members/load', { reset: true })
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
    width: 18rem;
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

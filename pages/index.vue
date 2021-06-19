<template>
  <div class="home-page">
    <div class="container-button">
      <div v-ripple class="button" @click="daftar">
        <span>Daftar</span>
      </div>
      <div v-ripple class="button">
        <span>Masuk</span>
      </div>
    </div>
    <new-member v-if="bukaPopup" @tutup-popup="bukaPopup = false" />
  </div>
</template>

<script>
import NewCust from '../components/NewMember.vue'
export default {
  components: { NewCust },
  middleware: 'auth',

  data() {
    return {
      // insialisasi object
      messageSelected: null,
      bukaPopup: false,
    }
  },
  methods: {
    daftar() {
      this.bukaPopup = true
    },
  },
}
</script>

<style lang="scss" scoped>
.home-page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: center;
  height: calc(100vh - 5rem);
  width: calc(100vw - 5rem);
  .container-button {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid $subtext-color;
    width: 50%;
    height: 30%;
    border-radius: 1rem;
    .button {
      cursor: pointer;
      display: flex;
      position: relative;
      border: 1px solid &subtext-color;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 100%;
      span {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        color: $font-color;
        font-size: 1rem;
        width: 100%;
      }
    }
  }
}
</style>

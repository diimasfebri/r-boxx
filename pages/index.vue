<template>
  <div class="home-page">
    <div class="container-button">
      <div v-ripple class="button">
        <span>Daftar</span>
      </div>
      <div v-ripple class="button">
        <span>Masuk</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
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
    .button {
      display: flex;
      position: relative;
      border: 1px solid &subtext-color;
      flex-direction: row;
      justify-content: space-between;
      padding: 2rem;
      width: 4rem;
      height: 2rem;
      span {
        color: $font-color;
        font-size: 1rem;
        width: 100%;
      }
    }
  }
}
</style>

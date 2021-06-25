<template>
  <div class="home-page">
    <div
      :style="type === 2 ? 'justify-content: flex-end' : ''"
      class="query-header"
    >
      <div v-if="type === 1" class="search-bar">
        <input
          v-model="searchModel"
          type="text"
          class="text-input"
          placeholder="Cari ID (KTP / Kartu Pelajar )"
        />
        <span
          class="icon-container"
          :style="!searchModel ? 'pointer-events: none' : ''"
          @click="searchModel = ''"
        >
          <v-icon class="icon">{{
            !searchModel ? 'mdi-magnify' : 'mdi-close'
          }}</v-icon>
        </span>
      </div>
      <div class="actions">
        <div class="applied-filters">
          <div
            v-if="!isExpired"
            v-ripple
            class="square-btn"
            style="margin: 0"
            @click="tambahMember = true"
          >
            <v-icon class="icon">mdi-plus</v-icon>
            <span class="text">Member</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  data() {
    return {
      // insialisasi object
      messageSelected: null,
      bukaPopup: false,
      bukaDaftar: false,
      bukaMasuk: false,
    }
  },
  methods: {
    daftar() {
      this.bukaDaftar = true
    },
    masuk() {
      this.bukaMasuk = true
    },
  },
}
</script>

<style lang="scss" scoped>
.home-page {
  position: relative;
  width: calc(100% - 4rem);
  height: calc(100% - 6rem);
  margin: 0 2rem;
  background: $background-light-color;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .query-header {
    position: relative;
    width: 100%;
    height: 2rem;
    margin-top: 1rem;
    padding: 0 1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-bar {
      position: relative;
      width: 10rem;
      height: 2rem;
      padding: 0.5rem;
      box-sizing: border-box;
      border-radius: 12px;
      background: $border-color;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      input.text-input {
        position: relative;
        width: calc(100% - 1rem);
        line-height: 1;
        font-size: 0.6rem;
        font-family: 'Quicksand';
        font-weight: 600;
        color: $font-color;
        display: flex;
        align-items: center;
        &::placeholder {
          line-height: 1;
          font-family: 'Quicksand';
          font-weight: 600;
          color: $subtext-color;
        }
        &:focus {
          outline: none;
        }
        &:focus ~ .icon {
          color: $font-color;
        }
      }
      span.icon-container {
        cursor: pointer;
        position: relative;
        width: 1rem;
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .actions {
      position: relative;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .applied-filters {
        position: relative;
        height: 1.5rem;
        margin-right: 0.25rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .square-btn {
        cursor: pointer;
        position: relative;
        height: 2rem;
        border-radius: 12px;
        padding: 0 0.5rem;
        margin-right: 0.5rem;
        background: $border-color;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          color: $font-color;
        }
        span.text {
          position: relative;
          margin-left: 0.25rem;
          font-family: 'Quicksand';
          font-weight: 600;
          font-size: 0.6rem;
        }
        .loader {
          position: absolute;
          width: 100%;
          height: 100%;
          background: $border-color;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &.disabled {
          pointer-events: none;
          opacity: 0.5;
        }
        &:last-child {
          margin: 0;
        }
      }
    }
  }
}
</style>

<template>
  <div class="component">
    <div class="panel">
      <div class="error-container" :class="errorMessage ? 'active' : ''">
        <p class="message">{{ errorMessage }}</p>
      </div>
      <div class="header">
        <h3 class="name">Hapus Data</h3>
        <div v-ripple class="close-btn" @click="$emit('close-panel')">
          <v-icon class="icon">mdi-close</v-icon>
        </div>
      </div>
      <div class="body">
        <div class="message-row">
          <p class="message">Apakah anda yakin ingin menghapus data ini?</p>
        </div>
        <div style="height: 2rem" class="input-row">
          <div v-ripple class="confirm-btn btn" @click="deleteData">
            <span v-if="!loading">Hapus</span>
            <v-progress-circular v-else indeterminate :size="20" :width="3" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      errorMessage: '',
    }
  },
  methods: {
    async deleteData() {
      try {
        this.loading = true
        const { message } = await this.$store.dispatch(
          'members/delete',
          this.id
        )
        if (message === 'SUCCESS') this.$emit('close-panel')
        else throw new Error(message)
      } catch (e) {
        this.loading = false
        switch (e.message) {
          default:
            this.errorMessage = 'Terjadi masalah, silahkan coba lagi'
            break
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.component {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  .panel {
    position: relative;
    width: 15rem;
    background: $background-light-color;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .error-container {
      position: absolute;
      top: 0.125rem;
      left: 0;
      width: 100%;
      height: 2rem;
      border-top-right-radius: 1rem;
      border-top-left-radius: 1rem;
      background: $primary-color;
      transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      p.message {
        position: relative;
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Quicksand';
        font-weight: 600;
        letter-spacing: 0.02rem;
        color: $background-light-color;
      }
      &.active {
        transform: translateY(-1.125rem);
      }
    }
    .header {
      position: relative;
      width: 100%;
      padding: 1rem 1rem 0.5rem 1rem;
      background: $background-light-color;
      border-radius: 1rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3.name {
        position: relative;
        line-height: 1;
        font-family: 'Quicksand';
      }
      .close-btn {
        cursor: pointer;
        position: relative;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          color: $subtext-color;
        }
      }
    }
    .body {
      position: relative;
      width: 100%;
      padding: 0.5rem 1rem 1rem 1rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .message-row {
        position: relative;
        width: 100%;
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        p.message {
          position: relative;
          font-family: 'Quicksand';
          text-align: center;
          span.bold {
            font-weight: 700;
          }
        }
      }
      .input-row {
        position: relative;
        width: 100%;
        height: 4rem;
        overflow-y: visible;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
      .btn {
        cursor: pointer;
        position: relative;
        width: 100%;
        height: 2rem;
        border-radius: 0.25rem;
        font-family: 'Quicksand';
        font-size: 0.65rem;
        font-weight: 600;
        background: $error-color;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.25s background-color, 0.25s color;
        color: #fff;
        &.disabled {
          pointer-events: none;
          background: rgba($font-color, 0.2);
          color: $font-color;
        }
      }
    }
    &::before {
      content: '';
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      right: 0.5rem;
      bottom: -0.5rem;
      z-index: -1;
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.5);
    }
    &::after {
      content: '';
      position: absolute;
      top: calc(4rem / 3);
      right: calc(4rem / 3);
      left: calc(4rem / 3);
      bottom: calc(-4rem / 3);
      border-radius: 1rem;
      z-index: -2;
      background: #cfcfcf;
      -webkit-filter: blur(86.985px);
      filter: blur(86.985px);
    }
  }
}
</style>

<template>
  <div class="popup">
    <div v-click-outside="{ handler: () => keluar() }" class="main-card">
      <div class="error-container" :class="errorMessage ? 'active' : ''">
        <p class="message">{{ errorMessage }}</p>
      </div>
      <div class="header">
        <div class="name-container">
          <h1 class="name">Tambah Transaksi</h1>
          <p class="message subtext-dark">menambah transaksi baru</p>
        </div>
        <div v-ripple class="button-close" @click="keluar">
          <div v-ripple class="button">
            <v-icon class="icon">mdi-close</v-icon>
          </div>
        </div>
      </div>
      <!-- body menggunakan componen TextInput.vue -->
      <div class="body">
        <div class="atas">
          <text-input ref="NIK" :input="NIK" style="margin: 0 1rem 0.5rem 0" />
          <text-input ref="name" :input="name" style="margin-bottom: 0.5rem" />
        </div>
        <div class="action">
          <div v-ripple class="add-btn" @click="transaction++">
            <v-icon class="icon">mdi-plus</v-icon>
          </div>
          <div class="counter">
            <span> {{ transaction }} </span>
          </div>
          <div v-ripple class="sub-btn" @click="transaction--">
            <v-icon class="icon">mdi-minus</v-icon>
          </div>
        </div>
        <div v-ripple class="button" @click="mulai">Enter</div>
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
      errorMessage: '',
      model: '',
      transaction: null,
      rewards: null,
      name: {
        label: 'Nama',
        type: 'text',
        icon: 'mdi-account-circle',
        model: '',
        readonly: true,
      },
      NIK: {
        label: 'NIK',
        type: 'number',
        icon: 'mdi-card-account-details',
        model: '',
        readonly: true,
      },
    }
  },

  mounted() {
    this.transaction = this.member.transaction
    this.rewards = this.member.rewards
    this.name.model = this.member.name
    this.NIK.model = this.member.NIK
  },

  methods: {
    changetransactionVal(val) {
      this.transaction.model = val
    },

    keluar() {
      this.$emit('tutup-popup')
    },
    mulai() {
      if (this.transaction !== this.member.transaction) {
        if (
          this.transaction !== 0 &&
          this.transaction % 10 === 0 &&
          this.transaction > this.member.transaction
        ) {
          this.rewards++
          this.transaksi()
        } else this.transaksi()
      } else this.errorMessage = 'Tidak ada transaksi terjadi'
    },
    async transaksi() {
      const member = {
        _id: this.member._id,
        name: this.member.name,
        NIK: this.member.NIK,
        transaction: this.transaction,
        rewards: this.rewards,
      }
      const { message } = await this.$store.dispatch('members/sunting', member)
      console.log(member)
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
    width: 22rem;
    border-radius: 1rem;
    .error-container {
      position: absolute;
      top: 0.125rem;
      left: 0;
      width: 100%;
      height: 2rem;
      border-top-right-radius: 1rem;
      border-top-left-radius: 1rem;
      background: $error-color;
      transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      z-index: 0;
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
        color: $font-color;
      }
      &.active {
        transform: translateY(-1.125rem);
      }
    }
    .header {
      width: 100%;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $background-light-color;
      border-top-right-radius: 1rem;
      border-top-left-radius: 1rem;
      z-index: 2;

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
        justify-content: flex-end;
        width: 30%;
        margin-right: 1rem;
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
      .atas {
        position: relative;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.1rem;
      }

      .action {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        font-size: 0.55rem;
        font-family: 'Quicksand';
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        .icon {
          pointer-events: none;
        }
        .add-btn {
          z-index: 2;
          position: relative;
          width: 3rem;
          height: 2rem;
          border-radius: 0.3rem;
          background: $primary-color;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          .icon {
            color: #fff;
            font-size: 0.65rem;
          }
        }
        .counter {
          position: relative;
          width: 2rem;
          height: 1.5rem;
          will-change: transform;
          transition: 0.25s transform ease-in-out;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-size: 1rem;
          }
        }
        .sub-btn {
          position: relative;
          width: 3rem;
          height: 2rem;
          border-radius: 0.3rem;
          border: 1px solid $primary-color !important;
          box-sizing: border-box;
          will-change: transform;
          transition: 0.25s transform cubic-bezier(0.17, 0.67, 0.36, 0.89);
          color: $primary-color;
          display: flex;
          justify-content: center;
          align-items: center;
          .icon {
            color: $primary-color;
            font-size: 0.65rem;
          }
          &.disabled {
            filter: grayscale(100);
            pointer-events: none;
          }
        }
        &.minimalize {
          .counter {
            transform: translateX(1rem);
          }
          .sub-btn {
            transform: translateX(2rem);
          }
        }
      }
      .button {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 2rem;
        width: 100%;
        flex-shrink: 0;
        margin-top: 1rem;
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

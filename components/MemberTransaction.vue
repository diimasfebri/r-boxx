<template>
  <div class="popup">
    <div
      v-click-outside="{ handler: () => keluar() }"
      class="main-card"
      @keypress.enter="mulai"
    >
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
        <div class="head">
          <div class="head kanan">
            <p class="message subtext-dark">NIK</p>
          </div>
          <div class="head kiri">
            <p class="message subtext-dark">Nama</p>
          </div>
        </div>
        <div class="data">
          <div class="data kiri">
            {{ member.NIK }}
          </div>
          <div class="data kanan">
            {{ member.name }}
          </div>
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
      model: '',
      transaction: null,
      rewards: null,
    }
  },

  mounted() {
    this.transaction = this.member.transaction
    this.rewards = this.member.rewards
  },

  methods: {
    changetransactionVal(val) {
      this.transaction.model = val
    },

    keluar() {
      this.$emit('tutup-popup')
    },
    mulai() {
      if (
        this.transaction !== 0 ||
        this.transaction !== this.member.transaction ||
        this.transaction % 10 === 0
      ) {
        this.rewards++
        this.transaksi()
      } else {
        this.transaksi()
      }
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
      .head {
        position: relative;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.1rem;
        .kiri {
          width: 48%;
        }
        .kanan {
          width: 48%;
        }
      }
      .data {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 0.5rem;
        .kiri {
          padding: 0 0 0 0.5rem;
          background-color: $background-color;
          height: 2rem;
          width: 48%;
          border-radius: 0.5rem;
        }
        .kanan {
          padding: 0 0 0 0.5rem;
          background-color: $background-color;
          height: 2rem;
          width: 48%;
          border-radius: 0.5rem;
        }
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

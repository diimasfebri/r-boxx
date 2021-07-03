<template>
  <div class="popup">
    <div v-click-outside="{ handler: () => keluar() }" class="main-card">
      <div class="error-container" :class="errorMessage ? 'active' : ''">
        <p class="message">{{ errorMessage }}</p>
      </div>
      <div class="header">
        <div class="name-container">
          <h1 class="name">Member Rewards</h1>
          <p class="message subtext-dark">Mengubah data rewards milik member</p>
        </div>
        <div class="button-close" @click="keluar">
          <div v-ripple class="button">
            <v-icon class="icon">mdi-close</v-icon>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="atas">
          <text-input ref="NIK" :input="NIK" style="margin: 0 1rem 0.5rem 0" />
          <text-input ref="name" :input="name" style="margin-bottom: 0.5rem" />
        </div>
        <div class="bawah">
          <text-input
            ref="transaction"
            :input="transaction"
            style="margin: 0 1rem 0.5rem 0"
          />
          <text-input
            ref="rewards"
            :input="rewards"
            style="margin-bottom: 0.5rem"
          />
        </div>
        <div class="message-container">
          <p class="message subtext-dark">Progress rewards terkini</p>
        </div>
        <div class="bar-container">
          <div
            :style="`width: ${((member.transaction % 10) / 10) * 100}%`"
            class="filled"
          ></div>
          <div class="counter">
            <span>{{ member.transaction % 10 }}</span>
            <v-icon class="icon">mdi-slash-forward</v-icon>
            <span>10</span>
          </div>
        </div>
        <p class="message subtext-dark">Ambil rewards member?</p>
        <div class="button-container">
          <div v-ripple class="button" @click="ambil">Ya</div>
          <div v-ripple class="button no" @click="keluar">Tidak</div>
        </div>
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
      rewards: {
        label: 'Jumlah rewards',
        type: 'number',
        icon: 'mdi-account-circle',
        model: '',
        readonly: true,
      },
      transaction: {
        label: 'Jumlah transaction',
        type: 'number',
        icon: 'mdi-card-account-details',
        model: '',
        readonly: true,
      },
    }
  },
  mounted() {
    this.name.model = this.member.name
    this.NIK.model = this.member.NIK
    this.rewards.model = this.member.rewards || 0
    this.transaction.model = this.member.transaction || 0
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
    async ambil() {
      if (this.member.rewards >= 1) {
        const member = {
          _id: this.member._id,
          name: this.member.name,
          NIK: this.member.NIK,
          transaction: this.member.transaction,
          rewards: this.member.rewards - 1,
        }
        const { message } = await this.$store.dispatch(
          'members/sunting',
          member
        )
        console.log(message)
        this.$store.dispatch('members/load', { reset: true })
        this.$emit('tutup-popup')
      } else this.errorMessage = 'Tidak ada rewards tersedia'
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
    width: 30rem;
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
      background: $background-light-color;
      border-top-right-radius: 1rem;
      border-top-left-radius: 1rem;
      justify-content: space-between;
      align-items: center;
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
      .bawah {
        position: relative;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.1rem;
      }

      .message-container {
        margin-bottom: 0.3rem;
      }
      .bar-container {
        display: flex;
        position: relative;
        align-items: center;
        width: 100%;
        height: 1.5rem;
        border-radius: 1rem;
        background-color: $subtext-color;
        overflow: hidden;
        margin-bottom: 1rem;
        .filled {
          position: absolute;
          height: 100%;
          background-color: $primary-color;
        }
        .counter {
          position: absolute;
          width: 100%;
          height: 100%;
          color: $background-color;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            position: absolute;
            font-family: 'Quicksand';
            font-size: 0.65rem;
            font-weight: 700;
            line-height: 1;
            color: inherit;
            &:first-child {
              transform: translateX(-0.75rem);
            }
            &:last-child {
              transform: translateX(0.75rem);
            }
          }
          .icon {
            font-size: 0.75rem;
            color: inherit;
          }
        }
      }
      .button-container {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        margin-top: 0.3rem;
        .button {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 2rem;
          width: 48%;
          background-color: $primary-color;
          border-radius: 0.25rem;
          font-size: 0.65rem;
          cursor: pointer;
          font-family: 'quicksand';
          &.no {
            background-color: $error-color;
          }
        }
      }
    }
  }
}
</style>

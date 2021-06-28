<template>
  <div class="layout">
    <div class="header">
      <div class="venture-details" @click="home">
        <h1 class="name">R-BOXX</h1>
        <h4 class="address subtext">Sumenep</h4>
      </div>
      <div class="user-actions">
        <div class="user-details">
          <h1 class="name">{{ names }}</h1>
          <h4 class="role subtext">{{ roles }}</h4>
        </div>
        <div v-ripple class="action-btn" @click="userActionsOpened = true">
          <v-icon
            :style="userActionsOpened ? 'transform: rotate(180deg)' : ''"
            class="icon"
            >mdi-chevron-down</v-icon
          >
        </div>
        <div
          v-if="userActionsOpened"
          v-click-outside="{ handler: () => (userActionsOpened = false) }"
          class="actions-container"
          @click="userActionsOpened = false"
        >
          <div class="divider"></div>
          <div v-ripple class="action error" @click="logout">
            <v-icon class="icon">mdi-logout-variant</v-icon>
            <h3 class="name">Keluar</h3>
          </div>
        </div>
      </div>
    </div>
    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userActionsOpened: false,
      bukaAlert: true,
    }
  },
  // fungsi yang dapat berubah terus
  computed: {
    names() {
      return this.$store.getters.name
    },
    roles() {
      return this.$store.getters.role
    },
    pageTitle() {
      //  mencari yang navSelected atau yang Aktif
      return this.navList.find((a) => a.path === this.navSelected)
    },
    setAvatar() {
      return this.$store.getters.avatar
    },
  },
  methods: {
    home() {
      this.$router.push('/')
    },
    // lll
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    changePage(navSelected) {
      this.navSelected = navSelected
      const pages = navSelected
      this.$router.push(pages)
    },
    masukSignIn() {
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  .header {
    position: relative;
    width: 100%;
    height: 4rem;
    padding: 0 2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .venture-details {
      cursor: pointer;
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      h1.name {
        font-family: 'Quicksand';
      }
      h4.address {
        font-family: 'Quicksand';
      }
    }
    .trial-notification {
      position: absolute;
      top: 1rem;
      left: 50%;
      height: 2rem;
      padding: 0 0.5rem;
      transform: translateX(-50%);
      background: $error-color;
      border-radius: 1rem;
      color: #fff;
      display: flex;
      align-items: center;
      h1.message {
        font-family: 'Quicksand';
        line-height: 1;
        margin-right: 0.25rem;
        transform: translateY(-0.03125rem);
      }
      .icon {
        color: inherit;
        font-size: 1.25rem !important;
        margin-right: 0.25rem;
      }
      &.expired {
        background: $error-color;
      }
    }
    .user-actions {
      position: relative;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .user-details {
        position: relative;
        height: 100%;
        margin-right: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        h1.name {
          font-family: 'Quicksand';
        }
        h4.role {
          font-family: 'Quicksand';
          text-transform: capitalize;
        }
      }
      .action-btn {
        cursor: pointer;
        position: relative;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          color: $font-color;
        }
      }
      .actions-container {
        z-index: 1000000;
        position: absolute;
        top: calc(100% - 0.5rem);
        right: 0;
        border-radius: 18px;
        border: 1px solid $border-color;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .action {
          cursor: pointer;
          position: relative;
          width: 10rem;
          height: 1.5rem;
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0);
          transition: 0.25s background-color;
          padding: 0 0.5rem;
          box-sizing: border-box;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          h3.name {
            font-family: 'Quicksand';
            margin-left: 0.5rem;
          }
          &.error {
            color: $error-color;
            .icon {
              color: inherit;
            }
            h3.name {
              color: inherit;
            }
          }
          &:hover {
            background: rgba(230, 230, 230, 0.5);
          }
          &:first-child {
            border-top-left-radius: 18px;
            border-top-right-radius: 18px;
          }
          &:last-child {
            border-bottom-left-radius: 18px;
            border-bottom-right-radius: 18px;
          }
        }
        .divider {
          position: relative;
          width: calc(100% - 1rem);
          height: 1px;
          flex-shrink: 0;
          margin: 0 0.5rem;
          background: rgba(0, 0, 0, 0.05);
        }
        &::before {
          content: '';
          pointer-events: none;
          position: absolute;
          z-index: -2;
          top: calc(4rem / 3);
          right: calc(4rem / 3);
          left: calc(4rem / 3);
          bottom: calc(-4rem / 3);
          border-radius: 1rem;
          background: #cfcfcf;
          -webkit-filter: blur(86.985px);
          filter: blur(86.985px);
        }
        &::after {
          content: '';
          pointer-events: none;
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          border-radius: 1rem;
          z-index: -1;
          background: #fff;
        }
      }
    }
  }
}
</style>

<style lang="scss">
//scroll-bar menghilang
::-webkit-scrollbar {
  display: none;
}
html,
body {
  margin: 0;
  padding: 0;
  font-family: 'quicksand';
  font-size: 24px;
  color: $font-color;
  background: $background-color;
  overflow: hidden;
  @media screen and (max-width: 1919px) {
    font-size: 22px;
  }
  @media screen and (max-width: 1599px) {
    font-size: 21px;
  }
  @media screen and (max-width: 1479px) {
    font-size: 20px;
  }
  @media screen and (max-width: 1379px) {
    font-size: 19px;
  }
}
h1 {
  font-size: 0.9rem;
}
h2 {
  font-size: 0.75rem;
}
h3 {
  font-size: 0.65rem;
}
h4 {
  font-size: 0.6rem;
}
h5 {
  font-size: 0.55rem;
}
p {
  font-size: 0.55rem;
  padding: 0 !important;
  margin: 0 !important;
}
</style>

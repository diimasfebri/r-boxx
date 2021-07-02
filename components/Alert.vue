<template>
  <div
    ref="alert"
    class="alert"
    :class="alert.type"
    @mouseenter="pauseTimeout"
    @mouseleave="playTimeout"
  >
    <div class="icon-container">
      <v-icon v-if="alert.type === 'success'" class="icon">
        mdi-check-circle
      </v-icon>
      <v-icon v-if="alert.type === 'error'" class="icon">
        mdi-alert-circle
      </v-icon>
    </div>
    <div class="message">
      <h5>{{ message }}</h5>
    </div>
    <div class="close-btn" @click="destroyAlert">
      <v-progress-circular
        :value="progress"
        :size="rem"
        :rotate="-90"
        :width="2"
      >
        <v-icon class="icon">mdi-close</v-icon>
      </v-progress-circular>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'

const animate = {
  updateVal(obj, cb) {
    const tl = gsap.timeline({ paused: true })

    tl.to(obj, 5, {
      ease: 'none',
      progress: 100,
      onComplete() {
        if (cb) cb()
      },
    })

    return tl
  },
}

export default {
  props: {
    alert: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      progress: 0,
      timeout: null,
      message: '',
    }
  },
  computed: {
    rem() {
      return parseInt(getComputedStyle(document.body).fontSize)
    },
  },
  mounted() {
    const { updateVal, $refs } = this
    const firstActive = document.querySelector(
      '.alerts-container .alert.active'
    )
    if (
      typeof this.alert.message !== 'string' ||
      this.alert.message === '[object Object]'
    )
      this.destroyAlert()
    switch (this.alert.message) {
      case 'INVALID_COMBINATION':
        this.message = 'Kombinasi username dan password salah'
        break
      case 'INVALID_REQUEST':
        this.message = 'Semua kolom harus diisi'
        break
      case 'USER_ALREADY_EXIST':
        this.message = 'Username telah dipakai'
        break
      case 'CUSTOMER_ALREADY_EXIST':
        this.message = 'Nama customer telah dipakai'
        break
      case 'SUPPLIER_ALREADY_EXIST':
        this.message = 'Nama supplier telah dipakai'
        break
      case 'APP_EXPIRED':
        this.message = 'Masa trial sudah habis'
        break
      default:
        this.message = this.alert.message
        break
    }
    if (firstActive) {
      const offset = parseInt(
        getComputedStyle(firstActive).transform.split(',')[5]
      )
      gsap.to($refs.alert, 0, {
        y: `${offset}px`,
      })
    }
    gsap.from($refs.alert, 0.25, {
      x: '110%',
      ease: 'power2.out',
      onComplete() {
        updateVal()
      },
    })
  },
  methods: {
    updateVal() {
      this.$refs.alert.classList.add('active')
      this.timeout = animate.updateVal(this.$data, this.destroyAlert)
      this.timeout.play()
    },
    destroyAlert() {
      const { $refs, $root, alert } = this
      if (this.timeout) {
        this.timeout.clear()
        gsap.to($refs.alert, 0.25, {
          x: '110%',
          ease: 'power2.in',
          onComplete() {
            $refs.alert.classList.remove('active')
            $root.$emit('delete-alert', alert.id)
          },
        })
      } else {
        $root.$emit('delete-alert', alert.id)
      }
    },
    pauseTimeout() {
      if (this.timeout) this.timeout.pause()
    },
    playTimeout() {
      if (this.timeout) this.timeout.play()
    },
  },
}
</script>

<style lang="scss" scoped>
.alert {
  position: relative;
  width: 17rem;
  height: 2rem;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  background: #f2f2f2;
  color: #333;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  .icon-container {
    position: relative;
    width: 2rem;
    height: 100%;
    border-radius: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 3px solid #333;
    color: inherit;
    .icon {
      color: inherit;
    }
  }
  .message {
    position: relative;
    width: calc(100% - 4rem);
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    h5 {
      position: relative;
      font-family: 'Quicksand';
    }
  }
  .close-btn {
    cursor: pointer;
    position: relative;
    width: 2rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      color: inherit;
      font-size: 0.75rem;
    }
  }
  &.success {
    background: #f0f9f3;
    color: $primary-color;
    .icon-container {
      border-left: 3px solid $primary-color;
    }
  }
  &.error {
    background: #ffeeed;
    color: $error-color;
    .icon-container {
      border-left: 3px solid $error-color;
    }
  }
}
</style>

<style lang="scss">
.alert {
  .close-btn {
    .v-progress-circular__overlay {
      transition: none;
    }
  }
}
</style>

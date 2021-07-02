<template>
  <div ref="container" class="alerts-container">
    <alert
      v-for="alert in visibleAlerts"
      ref="alerts"
      :key="alert.id"
      :alert="alert"
      :alert-id="alert.id"
    />
  </div>
</template>

<script>
import gsap from 'gsap'

const animate = {
  deleteAlert(elements, rem, cb) {
    const tl = gsap.timeline({ paused: true })

    tl.to(elements, 0.25, {
      y: `-=${2.5 * rem}px`,
      ease: 'power2.inOut',
      onComplete() {
        if (cb) cb()
      },
    })

    return tl
  },
}

export default {
  data() {
    return {
      visibleAlerts: [],
    }
  },
  computed: {
    alerts() {
      return this.$store.getters['alerts/alerts']
    },
    rem() {
      return parseInt(getComputedStyle(document.body).fontSize)
    },
  },
  watch: {
    alerts(val) {
      if (val.length === 0) this.visibleAlerts = []
      else {
        for (let i = 0; i < val.length; i++) {
          if (!this.visibleAlerts.find((a) => a.id === val[i].id))
            this.visibleAlerts.push(val[i])
        }
      }
    },
  },
  mounted() {
    this.$root.$on('delete-alert', this.deleteAlert)
  },
  methods: {
    deleteAlert(id) {
      const {
        rem,
        $store: { dispatch },
        $refs: { alerts },
      } = this
      let nextEl = false
      const elements = []
      for (let i = 0; i < alerts.length; i++) {
        const { $el: el } = alerts[i]
        if (el.getAttribute('alert-id') === id.toString()) nextEl = true
        if (nextEl) elements.push(el)
        if (i === alerts.length - 1) {
          animate
            .deleteAlert(elements, rem, () => {
              dispatch('alerts/remove', id)
            })
            .play()
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.alerts-container {
  z-index: 10000;
  position: fixed;
  top: 5rem;
  right: 0;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
}
</style>

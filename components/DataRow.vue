<template>
  <div class="data-row">
    <div class="data number">
      <span>{{ data.NIK }}</span>
    </div>
    <div class="data name">
      <span>{{ data.name }}</span>
    </div>
    <div class="data rewards">
      <span>{{ data.rewards }}</span>
    </div>
    <div class="data transaction">
      <span>{{ data.transaction }}</span>
    </div>
    <div class="data actions">
      <div v-ripple class="btn" @click="$emit('edit-data', data)">
        <v-icon class="icon">mdi-pencil</v-icon>
        <tooltips class="tooltips" :name="'Edit data'" />
      </div>
      <div v-ripple class="btn" @click="$emit('delete-data', data._id)">
        <v-icon class="icon">mdi-currency-usd</v-icon>
        <tooltips class="tooltips" :name="'data'" />
      </div>
      <div v-ripple class="btn" @click="$emit('delete-data', data._id)">
        <v-icon class="icon">mdi-delete</v-icon>
        <tooltips class="tooltips" :name="'Hapus data'" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loadingReceipt: false,
      loadingInvoice: false,
    }
  },
  computed: {},
  methods: {
    printReceipt(data) {
      this.loadingReceipt = true
      this.$emit('print-receipt', data)
      setTimeout(() => {
        this.loadingReceipt = false
      }, 500)
    },
    printInvoice(data) {
      this.loadingInvoice = true
      this.$emit('print-invoice', data)
      setTimeout(() => {
        this.loadingInvoice = false
      }, 500)
    },
  },
}
</script>

<style lang="scss" scoped>
.data-row {
  position: relative;
  width: calc(100% - 2rem);
  height: 3rem;
  margin-top: 1rem;
  padding: 0.5rem calc(1rem - 1px);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid $border-color;
  flex-shrink: 0;
  .data {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    &.actions {
      .btn {
        cursor: pointer;
        position: relative;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 0.25rem;
        border: 1px solid $border-color;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0.5rem;
        .icon {
          color: $font-color;
        }
        &:hover {
          > .tooltips {
            transform: translateX(-50%) scale(1);
            opacity: 1;
            color: $background-light-color;
          }
        }
      }
    }
    span {
      position: relative;
      font-weight: 600;
      font-family: 'Quicksand';
      font-size: 0.5rem;
      text-transform: uppercase;
      color: $font-color;
      user-select: none;
    }
  }
  .number {
    width: 20%;
  }
  .name {
    width: 20%;
  }
  .rewards {
    width: 20%;
  }
  .transaction {
    width: 20%;
  }
  .actions {
    width: 20%;
    width: 7.5rem;
    justify-content: flex-end;
  }
}
</style>

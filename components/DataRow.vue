<template>
  <div class="data-row">
    <div class="data NIK">
      <p>{{ data.nik }}</p>
      <div class="data name">
        <p>{{ data.name }}</p>
      </div>
    </div>
    <div class="data rewards">
      <p>{{ data.rewards }}</p>
    </div>
    <div class="data transaction">
      <p>{{ data.transaction }}</p>
    </div>

    <div class="data action">
      <div v-ripple class="btn" @click="$emit('edit-data', data)">
        <v-icon class="icon">mdi-pencil</v-icon>
        <tooltips class="tooltips" :name="'Edit data'" />
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
  height: 4rem;
  margin: 0 1rem 0.5rem 1rem;
  border-radius: 0.5rem;
  padding: 0.5rem calc(1rem - 1px);
  box-sizing: border-box;
  border: 1px solid $border-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .data {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    &.status {
      p {
        position: relative;
        width: 90%;
        height: 1.5rem;
        border-radius: 0.25rem;
        font-weight: 600;
        background: rgba(0, 0, 0, 0.1);
        color: rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        text-transform: capitalize;
        display: flex;
        justify-content: center;
        align-items: center;
        &.completed {
          background: rgba($primary-color, 0.2);
          color: $primary-color;
        }
      }
    }
    &.action {
      .btn {
        cursor: pointer;
        position: relative;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 0.25rem;
        border: 1px solid rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          color: rgba(0, 0, 0, 0.3);
        }
        &:hover {
          > .tooltips {
            transform: translateX(-50%) scale(1);
            opacity: 1;
          }
        }
      }
    }
  }
  &:first-child {
    margin-top: 1rem;
  }
  .record {
    width: 3rem;
    justify-content: flex-start;
    &.data {
      padding: 0.25rem;
      box-sizing: border-box;
      &:hover {
        .tooltips {
          transform: scale(1);
          opacity: 1;
        }
      }
    }
  }
  .entry-date {
    width: 10%;
    justify-content: flex-start;
  }
  .exit-date {
    width: 10%;
    justify-content: flex-start;
  }
  .license-plate {
    width: 10%;
    justify-content: flex-start;
    text-align: left;
  }
  .material {
    width: 5%;
    justify-content: flex-start;
    text-align: left;
  }
  .customer {
    width: 5%;
    justify-content: flex-start;
    text-align: left;
  }
  .supplier {
    width: 5%;
    justify-content: flex-start;
    text-align: left;
  }
  .weight {
    width: 5%;
    justify-content: flex-end;
    text-align: right;
  }
  .entry-weight {
    width: 5%;
    justify-content: flex-end;
    text-align: right;
  }
  .exit-weight {
    width: 5%;
    justify-content: flex-end;
    text-align: right;
  }
  .net {
    width: 5%;
    justify-content: flex-end;
    text-align: right;
  }
  .status {
    width: 8%;
    margin: 0 0.5rem 0 1rem;
    justify-content: center;
    text-align: center;
  }
  .action {
    width: 7.5rem;
    justify-content: flex-end;
  }
  &:hover {
    > .tooltips {
      transform: translateX(-50%) scale(1);
      opacity: 1;
    }
  }
}
</style>

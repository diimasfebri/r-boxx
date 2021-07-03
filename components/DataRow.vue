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
    <div class="data progress">
      <div class="bar-container">
        <div
          :style="`width: ${((data.transaction % 10) / 10) * 100}%`"
          class="filled"
        ></div>
        <div class="counter">
          <span>{{ data.transaction % 10 }}</span>
          <v-icon class="icon">mdi-slash-forward</v-icon>
          <span>10</span>
        </div>
      </div>
    </div>
    <div class="data actions">
      <div v-ripple class="btn" @click="$emit('member-edit', data)">
        <v-icon class="icon">mdi-pencil</v-icon>
        <tooltips class="tooltips" :name="'Edit data'" />
      </div>
      <div v-ripple class="btn" @click="$emit('data', data._id)">
        <v-icon class="icon">mdi-currency-usd</v-icon>
        <tooltips class="tooltips" :name="'Tambah transaksi'" />
      </div>
      <div v-ripple class="btn" @click="$emit('member-rewards', data)">
        <v-icon class="icon">mdi-license</v-icon>
        <tooltips class="tooltips" :name="'Rewards'" />
      </div>
      <div v-ripple class="btn delete" @click="$emit('delete-data', data._id)">
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
    &.progress {
      .bar-container {
        display: flex;
        position: relative;
        align-items: center;
        width: 100%;
        height: 1rem;
        border-radius: 1rem;
        background-color: $font-color;
        overflow: hidden;
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
    }
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
          font-size: 0.75rem;
        }
        &:hover {
          > .tooltips {
            transform: translateX(-50%) scale(1);
            opacity: 1;
            color: $background-light-color;
          }
        }
        &.delete {
          background-color: $error-color;
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
    width: 10%;
    justify-content: flex-end;
  }
  .transaction {
    width: 10%;
    justify-content: flex-end;
  }
  .progress {
    width: calc(30% - 7.5rem);
    justify-content: center;
  }
  .actions {
    width: 7.5rem;
    justify-content: flex-end;
  }
}
</style>

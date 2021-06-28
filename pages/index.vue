<template>
  <div class="home-page">
    <div
      :style="type === 2 ? 'justify-content: flex-end' : ''"
      class="query-header"
    >
      <div class="search-bar">
        <input
          v-model="searchModel"
          type="text"
          class="text-input"
          placeholder="Cari ID (KTP / Kartu Pelajar )"
        />
        <span
          class="icon-container"
          :style="!searchModel ? 'pointer-events: none' : ''"
          @click="searchModel = ''"
        >
          <v-icon class="icon">{{
            !searchModel ? 'mdi-magnify' : 'mdi-close'
          }}</v-icon>
        </span>
      </div>
      <div class="actions">
        <div class="applied-filters">
          <div
            v-ripple
            class="square-btn"
            style="margin: 0"
            @click="tambahMember = true"
            @tutup-popup="tambahMember = false"
          >
            <v-icon class="icon">mdi-plus</v-icon>
            <span class="text">Member</span>
          </div>
        </div>
      </div>
    </div>
    <div class="table-header">
      <div class="head number">
        <p>NIK</p>
      </div>
      <div class="head name">
        <p>Nama</p>
      </div>
      <div class="head rewards">
        <p>rewards</p>
      </div>
      <div class="head transaction">
        <p>transaction</p>
      </div>
      <div class="head actions">
        <p>Actions</p>
      </div>
    </div>
    <div class="badan">
      <div v-for="(data, i) in datas" :key="i" class="table-body">
        <div class="body number">
          <p>{{ data.NIK }}</p>
        </div>
        <div class="body name">
          <p>{{ data.name }}</p>
        </div>
        <div class="body rewards">
          <p>{{ data.rewards }}</p>
        </div>
        <div class="body transaction">
          <p>{{ data.transaction }}</p>
        </div>
        <div class="body actions">
          <div v-ripple class="button edit">
            <v-icon class="icon">mdi-pencil</v-icon>
          </div>
          <div v-ripple class="button transactions">
            <v-icon class="icon">mdi-currency-usd</v-icon>
          </div>
          <div v-ripple class="button delete">
            <v-icon class="icon">mdi-delete</v-icon>
          </div>
        </div>
      </div>
    </div>

    <new-member
      v-if="tambahMember"
      @tutup-popup="tambahMember = false"
      @tambah-member="tambah"
    />
  </div>
</template>

<script>
import NewMember from '../components/NewMember.vue'
export default {
  components: { NewMember },
  middleware: 'auth',
  data() {
    return {
      type: 1,
      // insialisasi object
      messageSelected: null,
      bukaPopup: false,
      bukaDaftar: false,
      bukaMasuk: false,
      tambahMember: false,
    }
  },

  computed: {
    datas() {
      return this.$store.getters[('members/members', { reset: true })]
    },
  },

  watch: {
    searchModel(val) {
      this.searchModel = val.trim()
      if (this.searchModel)
        this.searchModel = this.licenseModel = val
          .match(/[a-zA-Z]+|[0-9]+/g)
          .join(' ')
          .toUpperCase()
      else this.licenseModel = ''
    },
    queryFilter() {
      this.skip = 0
      this.$store.dispatch('members/load', {
        query: this.fullQuery,
        reset: true,
      })
      this.skip += 20
    },
  },

  mounted() {
    this.$store.dispatch('members/load')
  },

  methods: {
    daftar() {
      this.bukaDaftar = true
    },
    masuk() {
      this.bukaMasuk = true
    },
  },

  //   async tambah(member) {
  //     const { data } = await this.$axios.post(
  //       `http://localhost:8000/members/newmember`,
  //       member
  //     ) // script  input untuk masuk server.
  //     if (data.message === 'SUCCESS') {
  //       console.log(data)
  //       this.tambahMember = false
  //     }
  //   },
  // },
  // }
}
</script>

<style lang="scss" scoped>
.home-page {
  position: relative;
  width: calc(100% - 4rem);
  height: calc(100% - 6rem);
  margin: 0 2rem;
  background: $background-light-color;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  .query-header {
    position: relative;
    width: 100%;
    height: 2rem;
    margin-top: 1rem;
    padding: 0 1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-bar {
      position: relative;
      width: 10rem;
      height: 2rem;
      padding: 0.5rem;
      box-sizing: border-box;
      border-radius: 12px;
      background: $border-color;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      input.text-input {
        position: relative;
        width: calc(100% - 1rem);
        line-height: 1;
        font-size: 0.6rem;
        font-family: 'Quicksand';
        font-weight: 600;
        color: $font-color;
        display: flex;
        align-items: center;
        &::placeholder {
          line-height: 1;
          font-family: 'Quicksand';
          font-weight: 600;
          color: $subtext-color;
        }
        &:focus {
          outline: none;
        }
        &:focus ~ .icon {
          color: $font-color;
        }
      }
      span.icon-container {
        cursor: pointer;
        position: relative;
        width: 1rem;
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $font-color;
      }
    }
    .actions {
      position: relative;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .applied-filters {
        position: relative;
        height: 1.5rem;
        margin-right: 0.25rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .square-btn {
        cursor: pointer;
        position: relative;
        height: 2rem;
        border-radius: 12px;
        padding: 0 0.5rem;
        margin-right: 0.5rem;
        background: $border-color;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          color: $font-color;
        }
        span.text {
          position: relative;
          margin-left: 0.25rem;
          font-family: 'Quicksand';
          font-weight: 600;
          font-size: 0.6rem;
        }
        .loader {
          position: absolute;
          width: 100%;
          height: 100%;
          background: $border-color;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &.disabled {
          pointer-events: none;
          opacity: 0.5;
        }
        &:last-child {
          margin: 0;
        }
      }
    }
  }
  .table-header {
    position: relative;
    width: 100%;
    margin-top: 1rem;
    height: 2rem;
    background: $border-color;
    padding: 0 2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .head {
      cursor: pointer;
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      p {
        position: relative;
        font-weight: 600;
        font-family: 'Quicksand';
        font-size: 0.5rem;
        text-transform: uppercase;
        color: $font-color;
        user-select: none;
      }
    }
  }
  .badan {
    position: relative;
    width: 100%;
    height: calc(100% - 6rem);
    overflow-y: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .table-body {
      position: relative;
      width: calc(100% - 2rem);
      margin-top: 1rem;
      height: 4rem;
      padding: 0.5rem calc(1rem - 1px);
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 0.5rem;
      border: 1px solid $border-color;
      flex-shrink: 0;
      .body {
        cursor: pointer;
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
        &.actions {
          .button {
            cursor: pointer;
            position: relative;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 0.25rem;
            border: 1px solid $border-color;
            display: flex;
            margin-left: 0.5rem;
            justify-content: center;
            align-items: center;
            .icon {
              color: $font-color;
            }
          }
        }
        p {
          position: relative;
          font-weight: 600;
          font-family: 'Quicksand';
          font-size: 0.5rem;
          text-transform: uppercase;
          color: $font-color;
          user-select: none;
        }
      }
    }
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
</style>

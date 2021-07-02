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
        <p>Rewards</p>
      </div>
      <div class="head transaction">
        <p>Transaction</p>
      </div>
      <div class="head progress">
        <p>Progress</p>
      </div>
      <div class="head actions">
        <p>Actions</p>
      </div>
    </div>
    <div class="badan">
      <data-row
        v-for="(data, i) in datas"
        :key="i"
        v-intersect="dataIntersect"
        :data="data"
        @edit-data="editMember"
        @print-receipt="printReceipt"
        @print-invoice="printWeight"
        @delete-data="(a) => (deleteData = a)"
      />
      <div v-intersect="loadData" class="loader">
        <p v-if="limit" class="limit">Tidak ada lagi data untuk ditampilkan.</p>
        <v-progress-circular v-else indeterminate :size="20" :width="3" />
      </div>
    </div>
    <new-member
      v-if="tambahMember"
      @tutup-popup="tambahMember = false"
      @tambah-member="tambah"
    />
    <delete-data
      v-if="deleteData"
      :id="deleteData"
      @close-panel="closeDeletePanel"
    />
    <member-edit
      v-if="editMember"
      :member="editMember"
      @tutup-popup="closeEditMember"
    />
  </div>
</template>

<script>
import MemberEdit from '../components/MemberEdit.vue'
import NewMember from '../components/NewMember.vue'
export default {
  components: { NewMember, MemberEdit },
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
      deleteData: null,
      Handler: null,
      editMember: null,
      searchModel: '',
      skip: 0,
    }
  },
  computed: {
    limit() {
      //
      return !this.datas.length || this.datas.length % 20 !== 0
    },
    datas() {
      // mengambil data dari member dari store
      return this.$store.getters['members/members']
    },
    fullQuery() {
      return `?limit=20&skip=${this.skip}${this.queryFilter}`
    },
  },
  watch: {
    mounted() {
      this.$store.dispatch('members/load', {
        query: this.fullQuery,
        reset: true,
      })
      this.skip += 20
    },
    searchModel(val) {
      this.searchModel = val.trim()
      if (this.searchModel)
        this.searchModel = this.licenseModel = val
          .match(/[a-zA-Z]+|[0-9]+/g)
          .join(' ')
          .toUpperCase()
      else this.licenseModel = ''
    },
  },

  mounted() {
    this.$store.dispatch('members/load', { reset: true })
    this.skip += 20
  },

  methods: {
    closeDeletePanel() {
      this.deleteData = null
      this.skip = 0
      this.$store.dispatch('members/load', {
        query: this.fullQuery,
        reset: true,
      })
    },
    daftar() {
      this.bukaDaftar = true
    },
    masuk() {
      this.bukaMasuk = true
    },
    dataIntersect([entry]) {
      const { isIntersecting, target } = entry
      if (isIntersecting) target.style.visibility = 'visible'
      else target.style.visibility = 'hidden'
    },
    loadData([entry]) {
      const { isIntersecting } = entry
      const { limit, $store } = this
      if (isIntersecting && !limit) {
        $store.dispatch('members/load', {
          query: this.fullQuery,
        })
        this.skip += 20
      }
    },
    editData(data) {
      this.editMember = data
    },
    async tambah(member) {
      const { data } = await this.$axios.post(
        `http://localhost:8000/members/newmember`,
        member
      ) // script  input untuk masuk server.
      if (data.message === 'SUCCESS') {
        console.log(data)
        this.tambahMember = false
      }
    },
  },
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
      align-items: center;
      border-radius: 0.5rem;
      border: 1px solid $border-color;
      flex-shrink: 0;
      .body {
        cursor: pointer;
        position: relative;
        height: 100%;
        width: 15%;
        display: flex;
        align-items: flex-start;
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
              font-size: 0.75rem;
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
    }
  }
  .loader {
    position: relative;
    width: 100%;
    height: 2rem;
    margin-bottom: 0.5rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    p.limit {
      position: relative;
      font-family: 'Quicksand';
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
</style>

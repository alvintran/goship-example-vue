const Customer = {
  template: '<div :data-source="customers" class="col-md-12">\
    <nav aria-label="Page navigation">\
      <ul class="pagination pull-right">\
        <li>\
          <a @click="previusPage()" class="cursor-pointer" aria-label="Previous">\
            <span aria-hidden="true">&laquo;</span>\
          </a>\
        </li>\
        <li>\
          <a class="cursor-pointer" @click="nextPage()" aria-label="Next">\
            <span aria-hidden="true">&raquo;</span>\
          </a>\
        </li>\
      </ul>\
    </nav>\
    <table class="table table-striped goship-table">\
      <thead>\
        <tr>\
          <th>#</th>\
          <th>Tài khoản</th>\
          <th>Họ tên</th>\
          <th>Số điện thoại</th>\
          <th>Email</th>\
          <th>Địa chỉ</th>\
        </tr>\
      </thead>\
      <tbody>\
        <tr v-show="loading">\
          <td class="text-center" colspan="7">\
            <p>loading...</p>\
            <p class="text-danger">Không có dữ liệu</p>\
          </td>\
        </tr>\
        <tr v-if="customers.length" v-for="(customer, index) in customers" :key="index">\
          <td>{{index}}</td>\
          <td>\
            <p>{{customer.id}}</p>\
          </td>\
          <td>\
            <p>{{customer.name}}</p>\
          </td>\
          <td>\
            <p>{{customer.phone}}</p>\
          </td>\
          <td>\
            <p>{{customer.email}}</p>\
          </td>\
          <td>\
            <p v-if="customer.address" v-for="(add, index) in customer.address" :key="index">{{add.street}}</p>\
          </td>\
        </tr>\
      </tbody>\
    </table>\
  </div>',
  props: {
    dataSource: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      customers: [],
      loading: false,
      page: 1
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      axios.get('customers').then(res => {
        if (res.code === 200) {
          this.customers = res.data
          this.loading = false
        }
      })
    },
    previusPage () {
      if (this.page > 1) {
        this.page -= 1
        axios.get('customers', {params: {page: this.page}}).then(response => {
          if (response.code === 200) {
            if (response.data.length) {
              this.customers = response.data
            }
          }
        })
      }
    },
    nextPage () {
      this.page += 1
      axios.get('customers', {params: {page: this.page}}).then(response => {
        if (response.code === 200) {
          if (response.data.length) {
            this.customers = response.data
          } else {
            this.customers = []
          }
        }
      })
    }
  },
  mounted () {
    this.fetchData()
  }
}

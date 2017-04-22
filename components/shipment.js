const Shipment = {
  template: '<div :data-source="shipments" class="col-md-12">\
    <nav aria-label="Page navigation">\
      <ul class="pagination pull-left">\
        <li>\
          <router-link class="btn btn-primary" to="/shipments/create">Thêm mới</router-link>\
        </li>\
      </ul>\
      <ul class="pagination pull-right">\
        <li :class="{ disabled: page === 1 }">\
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
          <th>Vận đơn</th>\
          <th>HVC</th>\
          <th>Người gửi</th>\
          <th>Người nhận</th>\
          <th>Trạng thái</th>\
          <th>Tiền</th>\
        </tr>\
      </thead>\
      <tbody>\
        <tr v-show="loading">\
          <td class="text-center" colspan="7">\
            <p>loading...</p>\
            <p class="text-danger">Không có dữ liệu</p>\
          </td>\
        </tr>\
        <tr v-if="shipments.length" v-for="(shipment, index) in shipments" :key="index">\
          <td>{{index}}</td>\
          <td>\
            <p>{{shipment.id}}</p>\
            <p>{{shipment.code}}</p>\
            <p>{{shipment.service_name}}</p>\
            <p>{{shipment.created_at}}</p>\
          </td>\
          <td>\
            <p>{{shipment.carrier_name}}</p>\
          </td>\
          <td>\
            <p v-if="shipment.address_from">Họ tên: <span>{{shipment.address_from.name}}</span></p>\
            <p v-if="shipment.address_from">Số điện thoại: <span>{{shipment.address_from.phone}}</span></p>\
            <p v-if="shipment.address_from">Email: <span>{{shipment.address_from.email}}</span></p>\
            <p v-if="shipment.address_from">Địa chỉ: <span>{{shipment.address_from.street}}, {{shipment.address_from.district}}, {{shipment.address_from.city}}</span></p>\
          </td>\
          <td>\
            <p v-if="shipment.address_to">Họ tên: <span>{{shipment.address_to.name}}</span></p>\
            <p v-if="shipment.address_to">Số điện thoại: <span>{{shipment.address_to.phone}}</span></p>\
            <p v-if="shipment.address_to">Email: <span>{{shipment.address_to.email}}</span></p>\
            <p v-if="shipment.address_to">Địa chỉ: <span>{{shipment.address_to.street}}, {{shipment.address_to.district}}, {{shipment.address_to.city}}</span></p>\
          </td>\
          <td>\
            <p>{{shipment.status_text}}</p>\
            <p>{{shipment.status_desc}}</p>\
          </td>\
          <td>\
            <p>Phí COD: <span>{{shipment.cod_fee}}</span></p>\
            <p>Phí giao hàng: <span>{{shipment.delivery_fee}}</span></p>\
            <p>Tổng phí: <span>{{shipment.total_fee}}</span></p>\
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
      shipments: [],
      loading: false,
      page: 1
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      axios.get('shipments').then(res => {
        if (res.code === 200) {
          this.shipments = res.data
          this.loading = false
        }
      })
    },
    previusPage () {
      if (this.page > 1) {
        this.page -= 1
        axios.get('shipments', {params: {page: this.page}}).then(response => {
          if (response.code === 200) {
            if (response.data.length) {
              this.shipments = response.data
            }
          }
        })
      }
    },
    nextPage () {
      this.page += 1
      axios.get('shipments', {params: {page: this.page}}).then(response => {
        if (response.code === 200) {
          if (response.data.length) {
            this.shipments = response.data
          } else {
            this.shipments = []
          }
        }
      })
    }
  },
  mounted () {
    this.fetchData()
  }
}
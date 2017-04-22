const CreateShipment = {
  template: '<div class="col-md-12">\
    <div v-if="errors" class="alert alert-warning alert-dismissible shipment-alert" >\
      <button type="button" class="close" @click="closeAlert" ><span aria-hidden="true">&times;</span></button>\
      <p>{{errors}}</p>\
    </div>\
    <form @submit.prevent="createShipment">\
      <div class="row">\
        <div class="col-sm-6">\
          <h3>Thông tin người gửi</h3>\
          <div class="form-group">\
            <label>Họ và tên</label>\
            <input type="text" class="form-control" placeholder="Họ và tên" v-model="shipment.address_from.name" />\
          </div>\
          <div class="form-group">\
            <label>Số điện thoại</label>\
            <input type="number" class="form-control" placeholder="Số điện thoại" v-model="shipment.address_from.phone" />\
          </div>\
          <div class="form-group">\
            <label>Địa chỉ</label>\
            <input type="text" class="form-control" placeholder="Địa chỉ" v-model="shipment.address_from.street" />\
          </div>\
          <div class="form-group">\
            <label>Tỉnh thành</label>\
            <select class="form-control" v-model="shipment.address_from.city" @change="loadDistrictFrom">\
              <option value="">Chọn tỉnh thành</option>\
              <option v-for="(city, index) in cities" :key="index" :value="city.id">{{city.name}}</option>\
            </select>\
          </div>\
          <div class="form-group">\
            <label>Quận huyện</label>\
            <select :disabled="!shipment.address_from.city" class="form-control" v-model="shipment.address_from.district">\
              <option value="">Chọn quận huyện</option>\
              <option v-for="(district, index) in districts" :key="index" :value="district.id">{{district.name}}</option>\
            </select>\
          </div>\
        </div>\
        <div class="col-sm-6">\
          <h3>Thông tin người nhận</h3>\
          <div class="form-group">\
            <label>Họ và tên</label>\
            <input type="text" class="form-control" placeholder="Họ và tên" v-model="shipment.address_to.name" />\
          </div>\
          <div class="form-group">\
            <label>Số điện thoại</label>\
            <input type="number" class="form-control" placeholder="Số điện thoại" v-model="shipment.address_to.phone" />\
          </div>\
          <div class="form-group">\
            <label>Địa chỉ</label>\
            <input type="text" class="form-control" placeholder="Địa chỉ" v-model="shipment.address_to.street" />\
          </div>\
          <div class="form-group">\
            <label>Tỉnh thành</label>\
            <select class="form-control" v-model="shipment.address_to.city" @change="loadDistrictTo">\
              <option value="">Chọn tỉnh thành</option>\
              <option v-for="(city, index) in cities" :key="index" :value="city.id">{{city.name}}</option>\
            </select>\
          </div>\
          <div class="form-group">\
            <label>Quận huyện</label>\
            <select :disabled="!shipment.address_to.city" class="form-control" v-model="shipment.address_to.district">\
              <option  value="">Chọn quận huyện</option>\
              <option v-for="(district, index) in districts" :key="index" :value="district.id">{{district.name}}</option>\
            </select>\
          </div>\
        </div>\
        <div class="col-sm-4">\
          <h3>Thông tin hàng hóa</h3>\
          <div class="form-group">\
            <label>Tiền COD</label>\
            <div class="input-group">\
              <input type="number" class="form-control" @input="updateValue" placeholder="Tiền COD" v-model="shipment.parcel.cod" />\
              <span class="input-group-addon">đ</span>\
            </div>\
          </div>\
          <div class="form-group">\
            <label>Cân nặng</label>\
            <div class="input-group">\
              <input type="number" class="form-control" @input="updateValue" placeholder="Cân nặng" v-model="shipment.parcel.weight" />\
              <span class="input-group-addon">g</span>\
            </div>\
          </div>\
          <div class="form-group">\
            <label>Chiều dài</label>\
            <div class="input-group">\
              <input type="number" class="form-control" @input="updateValue" placeholder="Chiều dài" v-model="shipment.parcel.length" />\
              <span class="input-group-addon">cm</span>\
            </div>\
          </div>\
          <div class="form-group">\
            <label>Chiều rộng</label>\
            <div class="input-group">\
              <input type="number" class="form-control" @input="updateValue" placeholder="Chiều rộng" v-model="shipment.parcel.width" />\
              <span class="input-group-addon">cm</span>\
            </div>\
          </div>\
          <div class="form-group">\
            <label>Chiều cao</label>\
            <div class="input-group">\
              <input type="number" class="form-control" @input="updateValue" placeholder="Chiều cao" v-model="shipment.parcel.height" />\
              <span class="input-group-addon">cm</span>\
            </div>\
          </div>\
          <div class="form-group">\
            <label>Ghi chú</label>\
            <textarea type="text" class="form-control" placeholder="Ghi chú" v-model="shipment.parcel.metadata"></textarea>\
          </div>\
          <div class="form-group">\
            <button type="submit" class="btn btn-primary">Tạo đơn</button>\
          </div>\
        </div>\
        <div class="col-sm-8">\
          <h3>Chọn hãng vận chuyển</h3>\
          <table class="table table-striped table-condensed table-hover">\
            <thead>\
              <tr>\
                <th>#</th>\
                <th>HVC</th>\
                <th>Dịch vụ</th>\
                <th>Phí COD</th>\
                <th>Phí vận chuyển</th>\
              </tr>\
            </thead>\
            <tbody>\
              <tr class="cursor-pointer" v-for="(rate, index) in rates" :key="index" @click="selectFee(rate)">\
                <th><input type="radio" v-model="shipment.rate" name="rate" :value="rate.id" /></th>\
                <th>{{rate.carrier_name}}</th>\
                <th>{{rate.service}}</th>\
                <th>{{rate.cod_fee}}</th>\
                <th>{{rate.total_fee}}</th>\
              </tr>\
            </tbody>\
          </table>\
        </div>\
      </div>\
    </form>\
  </div>',
  data () {
    return {
      shipment: {
        rate: '',
        address_from: {
          name: '',
          phone: '',
          street: '',
          city: '',
          district: ''
        },
        address_to: {
          name: '',
          phone: '',
          street: '',
          city: '',
          district: ''
        },
        parcel: {
          cod: '',
          weight: '',
          length: '',
          width: '',
          height: '',
          metadata: ''
        }
      },
      cities: [],
      districts: [],
      rates: [],
      doGetFee: 1,
      errors: ''
    }
  },
  methods: {
    createShipment () {
      axios.post('shipments', {shipment: this.shipment}).then(response => {
        if (response.code === 200) {
          alert('Tạo vận đơn thành công!')
          this.$router.push({name: 'shipment'})
        }
        if (response.code === 422) {
          let er = response.data.errors
          let message = _.head(er[Object.keys(er)[0]])
          this.errors = message
        }
      })
      // console.log(this.shipment)
    },
    updateValue () {
      this.checkGetFee(1)
    },
    loadDistrictFrom () {
      this.checkGetFee(1)
      axios('cities/' + this.shipment.address_from.city + '/districts').then(response => {
        this.districts = response.data
      })
    },
    loadDistrictTo () {
      this.checkGetFee(1)
      axios('cities/' + this.shipment.address_to.city + '/districts').then(response => {
        this.districts = response.data
      })
    },
    getFee: _.debounce(function (e) {
      axios.post('rates', {shipment: this.shipment}).then(response => {
        if (response.code === 200) {
          this.rates = response.data
          this.doGetFee = 0
        }
      })
    }, 500),
    selectFee (rate) {
      this.shipment.rate = rate.id
    },
    checkGetFee (doGetFee) {
      this.doGetFee = doGetFee
    },
    closeAlert () {
      this.errors = ''
    }
  },
  watch: {
    shipment: {
      handler: function (value) {
        if (
          value.address_from.city &&
          value.address_from.district &&
          value.address_to.district &&
          value.address_to.city &&
          value.parcel.cod &&
          value.parcel.weight &&
          value.parcel.length &&
          value.parcel.width &&
          value.parcel.height &&
          this.doGetFee
        ) {
          this.getFee()
        }
      },
      deep: true
    }
  },
  mounted () {
    axios('cities').then(response => {
      this.cities = response.data
    })
  }
}
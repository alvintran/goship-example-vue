## Giới thiệu
Repo này sử dụng hệ thống API của Goship để build một ứng dụng SPA đơn giản. Giúp các developer tiếp cận code và hệ thống nhanh hơn và dễ dàng hơn. Bạn có thể sử dụng code trong Repo này ngay cho hệ thống có sẵn của bạn hoặc tham khảo để tự xây dựng 1 hệ thống ship riêng dựa trên Goship API.
### Phiên bản khác xem tại đây
- [react](https://github.com/alvintran/goship-example-react)
- [jquery](https://github.com/alvintran/goship-example-jquery)
## Tài liệu liên quan
- [Tài liệu api](https://goship.io/developers)
- [vue](https://vuejs.org/)
- [vue-router](https://router.vuejs.org/en/)
- [axios](https://github.com/mzabriskie/axios)
- [lodash](https://lodash.com/)
## Cài đặt project
bash
```
    $ git clone https://github.com/alvintran/goship-example-vue.git
    $ cd goship-example-vue
```
Tạo tài khoản goship lấy `client_key` & `client_secret` theo hướng dẫn [tại đây](https://goship.io/developers/24-authentication-api).
Copy `client_key` & `client_secret` của bạn vào file `/components/login.js`

```javascript
    data () {
        return {
          login: {
            username: '',
            password: '',
            client_id: {{your_client_key}},
            client_secret: {{your_client_secret}}
          },
          errors: ''
        }
    }
```
Authentication API
Hướng dẫn authentication API trên hệ thống Goship
## Liên hệ

alvintran/goship-example-vue
Contribute to goship-example-vue development by creating an account on GitHub.
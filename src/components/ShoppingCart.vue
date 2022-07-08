<template>
  <div class="cart">
    <h1>Your cart </h1>
    <hr><br>
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Categorie</th>
            <th>Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" v-bind:key="item.productId">
            <td>{{ item.productName }}</td>
            <td>{{ item.productCategorie }}</td>
            <td>${{ item.productPrice }}</td>
            <td>{{ item.productQ }}</td>
            <td>
              <fa icon="xmark" @click="removeCart(item)"></fa>
            </td>
          </tr>
        </tbody>
      </table><br>
      <div class="purchase">
        <div v-if="productsInCart == 0">
          <span>Coupon: <input type="text" name="coupon" id="coupon" v-model="coupon" disabled></span>
          <br><br>
          <button @click="applyCoupon(coupon)" disabled>Apply</button>
          <br><br>
          <span>Total price: ${{ totalPrice }}</span><br><br>
          <button @click="onPurchase()" disabled>Purchase</button>
        </div>
        <div v-else>
          <span>Coupon: <input type="text" name="coupon" id="coupon" v-model="coupon"></span>
          <br><br>
          <button @click="applyCoupon(coupon)">Apply</button>
          <br><br>
          <span>Total price: ${{ totalPrice }}</span><br><br>
          <button @click="onPurchase()">Purchase</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  props: {
    msg: String
  },
  data() {
    return {
      cart: [],
      coupons: [{ couponName: 'VUE20', couponDiscount: 0.20 }, { couponName: 'VUE30', couponDiscount: 0.30 }, { couponName: 'VUE50', couponDiscount: 0.50 }],
      coupon: '',
      isUsed: false,
      totalPrice: 0,
    }
  },
  created() {
    let products = localStorage.getItem("cart");
    if (products != null) {
      this.cart = JSON.parse(products);
    }
    let totalPrice = localStorage.getItem("totalPrice");
    this.totalPrice = JSON.parse(totalPrice);
  },
  computed: {
    productsInCart() {
      return this.cart.reduce((acc, item) => acc + item.productQ, 0);
    }
  },
  methods: {
    onPurchase() {
      this.$swal.fire('Thank You!!', 'Your purchase has been completed total: $' + this.totalPrice, 'success');
      this.cart = [];
      localStorage.removeItem('cart');
      localStorage.removeItem('totalPrice');
      this.totalPrice = 0;
    },
    removeCart(product) {
      let iProduct = 0;
      this.cart.forEach((item, i) =>
        item.productId == product.productId ? (iProduct = i) : null
      );
      this.cart.splice(iProduct, 1);
      this.$toast.error(`Product removed`, { position: 'top-right' });
      this.totalPrice = this.cart.reduce((acc, item) => acc + item.productQ * item.productPrice, 0)
      localStorage.setItem("cart", JSON.stringify(this.cart));
      localStorage.setItem("cartQ", this.cart.reduce((acc, item) => acc + item.productQ, 0));
      localStorage.setItem("totalPrice", this.cart.reduce((acc, item) => acc + item.productQ * item.productPrice, 0));
    },
    applyCoupon(coupon) {
      if ( !this.isUsed ) {
        const aCoupon = this.coupons.filter((c) => c.couponName == coupon)[0];
        if (aCoupon != undefined) {
          this.coupons.forEach(c => {
            if (c.couponName == coupon) {
              this.totalPrice -= this.totalPrice * c.couponDiscount;
              this.isUsed = true;
            }
          });
          this.$toast.success(`Coupon applied`, { position: 'top-right' });
        } else {
          this.$toast.error(`Invalid coupon`, { position: 'top-right' });
        }
      } else {
        this.$toast.error(`You only can applied one coupon at the time`, { position: 'top-right' });
      }
    }
  }
}
</script>

<style lang="scss" src="../assets/styles/cart.scss">
</style>
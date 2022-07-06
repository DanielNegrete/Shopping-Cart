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
            <td><fa icon="xmark" @click="removeCart(item)"></fa></td>
          </tr>
        </tbody>
      </table><br>
      <span>Coupon: <input type="text" name="" id=""></span>
      <button @click="coupon()">Apply</button>
      <br><br>
      <span>Total price: ${{ totalPrice }}</span><br><br>
      <button @click="onPurchase()">Purchase</button>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'ShoppingCart',
  props: {
    msg: String
  },
  data() {
    return {
      cart: []
    }
  },
  created() {
    let products = localStorage.getItem("cart");
    if (products != null) {
      this.cart = JSON.parse(products);
    }
  },
  computed: {
    productsInCart() {
      return this.cart.reduce((acc, item) => acc + item.productQ, 0);
    },
    totalPrice() {
      return this.cart.reduce((acc, item) => acc + item.productQ * item.productPrice, 0);
    }
  },
  methods: {
    onPurchase() {
      this.$swal.fire('Thank You!!', 'Your purchase has been completed', 'success');
      this.cart = [];
      localStorage.removeItem('cart');
    },
    removeCart(product){
      let iProduct = 0;
      this.cart.forEach((item, i) =>
        item.productId == product.productId ? (iProduct = i) : null
      );
      this.cart.splice(iProduct, 1);
      this.$toast.error(`Product removed`, { position: 'top-right'});
    }
  }
}
</script>

<style lang="scss" src="../assets/styles/cart.scss">
</style>
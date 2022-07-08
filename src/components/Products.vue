<template>
  <div class="products">
    <h1>List of products</h1><br>
    <hr>
    <div class="parent">
      <div class="product" v-for="item in items" v-bind:key="item.productId">
        <img v-bind:src="item.productImage" class="img-fluid" width="250px" v-bind:alt="item.productName">
        <p>Name:<a>{{ item.productName }}</a></p>
        <p>Categorie:<a>{{ item.productCategorie }}</a></p>
        <p>Price: <a>${{ item.productPrice }}</a></p>
        <button @click="addCart(item)">Add to cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import products from '../assets/products.json';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Products',
  props: {
    msg: String
  },
  created() {
    let products = localStorage.getItem("cart");
    if (products != null) {
      this.cart = JSON.parse(products);
    }
  },
  data() {
    return {
      cart: []
    }
  },
  computed: {
    items() {
      return products.map((item) => {
        return item;
      })
    },
    productsInCart() {
      return this.cart.reduce((acc, item) => acc + item.productQ, 0);
    },
    totalPrice() {
      return this.cart.reduce((acc, item) => acc + item.productQ * item.productPrice, 0);
    }
  },
  methods: {
    addCart(productCart) {
      const itemCart = this.cart.filter((itemC) => itemC.productId == productCart.productId)[0];
      if (itemCart != undefined) {
        itemCart.productQ++;
      } else {
        const itemCart = {
          productId: productCart.productId,
          productName: productCart.productName,
          productImage: productCart.productImage,
          productCategorie: productCart.productCategorie,
          productPrice: productCart.productPrice,
          productQ: 1
        };
        this.cart.push(itemCart);
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
      localStorage.setItem("cartQ", this.cart.reduce((acc, item) => acc + item.productQ, 0));
      localStorage.setItem("totalPrice", this.cart.reduce((acc, item) => acc + item.productQ * item.productPrice, 0));
      this.$toast.success(`Product added`, { position: 'top-right' });
    }
  }
}
</script>

<style lang="scss" src="../assets/styles/products.scss">
</style>
<template>
  <div>
    <h1>Your cart </h1>
    <div class="parent">
      <div class="product" v-for="item in cart" v-bind:key="item.productId">
        <img v-bind:src="item.productImage" class="img-fluid" width="250px" v-bind:alt="item.productName">
        <p>Name:<a>{{ item.productName }}</a></p>
        <p>Categorie:<a>{{ item.productCategorie }}</a></p>
        <p>Price: <a>${{ item.productPrice }}</a></p>
        <p>Quantitiy: <a>{{ item.productQ }}</a></p>
      </div>
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
  data(){
    return{
      cart: []
    }
  },
  created() {
    let products = localStorage.getItem("cart");
    if(products != null){
      this.cart = JSON.parse(products);
    }
  }
}
</script>
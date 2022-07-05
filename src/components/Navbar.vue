<template>
  <div>
    <nav class="nav_bar">
      <div>
        <span>Shopping Store</span>
        <a>
          <router-link to="/products">Products</router-link>
        </a>
        <a>
          <router-link to="/cart">
            <fa icon="cart-shopping"></fa>
            {{ productInCart }}
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
  },
  data(){
    return {
      productsInCart: 0
    }
  },
  computed:{
    productInCart(){
      let data = localStorage.getItem("cartQ");
      this.productsInCart = JSON.parse(data);
    }
  }
}
</script>

<style lang="scss" src="../assets/styles/navbar.scss">
</style>
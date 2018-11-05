<template>
    <div>
        <h1>Cart</h1>
        <hr>
        <!--<div>{{productsInCart}}</div>-->

        <table class="table table-bordered">

            <thead class="text-center">
            <tr>
                <th>Id:</th>
                <th>Title:</th>
                <th>Price:</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <ul class="list-group">
                        <li class="list-group-item"
                            v-for="(product, i) in productsInCart"
                            :key="i">
                            {{ product.id_product }}
                        </li>
                    </ul>
                </td>
                <td>
                    <ul class="list-group">
                        <li class="list-group-item"
                            v-for="(product, i) in productsInCart"
                            :key="i">
                            {{ product.title }}
                        </li>
                    </ul>
                </td>

                <td>
                    <ul class="list-group">
                        <li class="list-group-item"
                            v-for="(product, i) in productsInCart"
                            :key="i">
                            {{ product.price }}
                        </li>
                    </ul>
                </td>
            </tr>
            </tbody>

            <thead class="text-center">
            <tr>
                <th colspan="2">Items:</th>

                <th>Total:</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td colspan="2">
                    <ul class="list-group">
                        <li class="list-group-item">
                            {{ cartCnt }}
                        </li>
                    </ul>
                </td>
                <td>
                    <ul class="list-group">
                        <li class="list-group-item">
                            {{ cartSum }}
                        </li>
                    </ul>
                </td>
            </tr>
            </tbody>
        </table>
       <router-link :to="{name: 'checkout'}">
            <button class="btn btn-success">
                <span>Order Now!</span>
            </button>
        </router-link>

    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("cart", {
      productsInCart: "all",
      cartCnt: "cnt",
      cartSum: "totals"
    })
  },
  methods: {
    onBtn() {
      this.$store.dispatch("cart/clearCart").then(() => {
        this.$router.push({ name: "checkout" });
      });
    }
  }
};
</script>
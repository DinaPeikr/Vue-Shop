<template>
    <div>
        <header>
            <div class="container">
                <div class="row">
                    <div class="col-sm-9">
                        <h1>Shop on Vue</h1>
                    </div>
                    <div class="col-sm-3">

                        <div class="alert alert-default cart"
                             @click="showCart = !showCart">
                            <h4>In Cart: </h4>
                            <transition enter-active-class="animated fadeIn"
                                        leave-active-class="animated fadeOut"
                                        appear>
                            <table v-if="showCart" class="table table-bordered cartTable">
                                <thead>
                                <tr>
                                    <th>Items:</th>
                                    <th>Total:</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{{ cartCnt }}</td>
                                    <td>{{ cartSum }} $</td>
                                </tr>
                                </tbody>

                            </table>
                            </transition>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
        </header>
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 menu mb-4">
                        <ul class="list-group">
                            <router-link v-for="item in leftMenu"
                                         class="list-group-item"
                                         :key="item.route"
                                         :to="{name: item.route}"
                                         active-class="active"
                                         exact
                                         tag="li">
                                <a>{{ item.title }}</a>
                            </router-link>
                        </ul>
                    </div>
                    <div class="col-lg-9">
                        <transition name="icon" mode="out-in" appear>
                            <router-view></router-view>
                        </transition>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showCart: true
    };
  },
  computed: {
    ...mapGetters("cart", {
      cartCnt: "cnt",
      cartSum: "totals"
    }),
    ...mapGetters("menu", {
      leftMenu: "all"
    })
  }
};
</script>

<style>
.menu {
  border-right: 1px solid #ddd;
}

.list-group-item {
  transition: background 0.3s, color 0.3s;
}

.list-group-item a {
  text-decoration: none;
}

.list-group-item.active a {
  color: inherit;
}
.cart {
  cursor: pointer;
}
.cartTable {
  position: absolute;
  background: #007bff;
  color: #fff;
  z-index: 5;
}
</style>
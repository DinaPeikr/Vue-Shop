<template>
    <div>
        <h1>Products</h1>
        <div class="row">
            <div class="col-lg-4"
                 v-for="(product, id) in products"
                :key="id">
                <div class="card mb-3" >
                    <img class="card-img-top" :src="product.image" alt="">

                    <div class="card-body">
                        <h4 class="card-title">{{ product.title }}</h4>
                        <div class="card-text">
                            {{ product.price }} $
                        </div>
                        <router-link :to="{name: 'product', params: {
			    						id: id
			    				   }}">
                            Read More
                        </router-link>
                        <hr>
                        <transition name="btn"
                                    mode="out-in">
                            <button v-if="inCart(id)"
                                    class="btn btn-warning"
                                    :disabled="inProcess(id)"
                                    key="remove"
                                    @click="removeFromCart({id: id})">

                                <span v-if="inProcess(id)">
                                    <v-icon name="spinner" pulse class="loader"/>Please wait...
                                </span>
                                <span v-else>Remove from cart</span>

                            </button>
                            <button v-else
                                    class="btn btn-success"
                                    :disabled="inProcess(id)"
                                    key="add"
                                    @click="addToCart({id: id})">
                                <span v-if="inProcess(id)">
                                    <v-icon name="spinner" pulse class="loader"/>Please wait...
                                </span>
                                <span v-else>Add to cart</span>
                            </button>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Icon from 'vue-awesome/components/Icon'
    import 'vue-awesome/icons/spinner'

    export default {
        components: {
            'v-icon': Icon
        },
        computed: {
            ...mapGetters('products', {
                products: 'all'
            }),
            ...mapGetters('cart', {
                inCart: 'inCart',
                inProcess: 'inProcess'

            })
        },
        methods: {
            ...mapActions('cart', {
                addToCartProxy: 'add',
                removeFromCart: 'remove'
            }),
            addToCart(data){
                this.addToCartProxy(data).then(
                    (res) => {
                        console.log('added');
                    },
                    (err) => {
                        console.log('not added');
                    },
                );
            }
        }
    }
</script>

<style scoped>
    .loader {
        margin-right: 10px;
    }
</style>
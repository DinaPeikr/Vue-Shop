<template>
	<div>
	<router-link :to="{name: 'products'}">
		<div class="mb-3">Back to products</div>
	</router-link>
	<div class="card mb-3" v-if="productProxy(id)">
		<img class="card-img-top" :src="product.image" alt="">
		<div class="card-body">
			<h4 class="card-title">{{ product.title }}</h4>
			<div class="card-text">
				{{ product.price }} $
			</div>
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
	<h4 v-else>Product not found</h4>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex';
    import Icon from 'vue-awesome/components/Icon'
    import 'vue-awesome/icons/spinner'

	export default {
		props: ['id'],

		components: {
            'v-icon': Icon
        },
		computed: {
			...mapGetters('products', {
				productProxy: 'getId'
			}),
			product(){
				return this.productProxy(this.id);
			},
            ...mapGetters('cart', {
                inCart: 'inCart',
                inProcess: 'inProcess'
            })
		},
        methods: {
            ...mapActions('cart', {
                addToCart: 'add',
                removeFromCart: 'remove'
            })
        }
	}
</script>
<style scoped>
	.loader {
		margin-right: 10px;
	}
</style>
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import ProductsList from './components/ProductsList';
import Product from './components/Product';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import E404 from './components/E404';

const routes = [
	{
		name: 'home',
		path: '/',
		redirect: '/products'
	},
	{
		name: 'products',
		path: '/products',
		component: ProductsList
	},
	{
		name: 'product',
		path: '/products/:id',
		component: Product,
		props: true
	},
	{
		name: 'cart',
		path: '/cart',
		component: Cart
	},
	{
		name: 'checkout',
		path: '/checkout',
		component: Checkout
	},
	{
		path: '*',
		component: E404

	}
];

export default new VueRouter({
	mode: 'history',
	routes
});
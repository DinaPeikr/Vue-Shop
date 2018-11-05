import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import menu from './modules/menu';
import cart from './modules/cart';
import products from './modules/products';
import checkout from './modules/checkout';

export const store = new Vuex.Store({
	modules: {
		menu,
		cart,
		products,
		checkout
	},
	strict: process.env.NODE_ENV !== 'production'
});

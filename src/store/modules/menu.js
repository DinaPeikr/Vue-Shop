export default {
	namespaced: true,
	state: {
		items: [
			{
				route: 'products',
				title: 'Products'
			},
			{
				route: 'cart',
				title: 'Cart'
			},
			{
				route: 'checkout',
				title: 'Checkout'
			}
		]
	},
	getters: {
		all(state) {
			return state.items;
		}
	},
	mutations: {

	},
	actions: {

	}
};
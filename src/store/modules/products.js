export default {
	namespaced: true,
	state: {
		products: getProducts()
	},
	getters: {
		all(state) {
			return state.products;
		},
		getId: (state, getters) => (id) => {
			return state.products[id];
		}
	},
	mutations: {
		some(state, id) {
			// state.products[id]; // ....
		}
	},
	actions: {
		some(store) { }
	}
};


function getProducts() {
	return {
		1: {
			id_product: 1,
			title: 'Iphone 5',
			price: 50,
			image: 'https://picsum.photos/800/400/?image=816'
		},
		2: {
			id_product: 2,
			title: 'Iphone 6',
			price: 100,
			image: 'https://picsum.photos/800/400/?image=504'
		},
		5: {
			id_product: 5,
			title: 'Iphone 7',
			price: 300,
			image: 'https://picsum.photos/800/400/?image=366'
		},
		7: {
			id_product: 7,
			title: 'Iphone X',
			price: 500,
			image: 'https://picsum.photos/800/400/?image=1'
		},
		9: {
			id_product: 9,
			title: 'iPod touch',
			price: 400,
			image: 'https://picsum.photos/800/400/?image=455'
		},
		10: {
			id_product: 10,
			title: 'Notebook',
			price: 150,
			image: 'https://picsum.photos/800/400/?image=800'
		}
	}
}

/*
	[
		{
			id_product: 1,
			title: 'Iphone 5',
			price: 5000
		},
		{
			id_product: 2,
			title: 'Iphone 6',
			price: 10000
		},
		{
			id_product: 5,
			title: 'Iphone 7',
			price: 30000
		}
	];

	getters
	productIdMap
		{
			1: 0,
			2: 1,
			5: 2
		}

*/
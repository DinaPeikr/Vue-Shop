export default {
    namespaced: true,
    state: {
        orderInfo: [
            {
                name: 'Name',
                value: '',
                pattern: /^[a-zA-Z ]{2,30}$/,
                errorMessage: 'Please enter only Latin letters, min -  2, max - 30'
            },
            {
                name: 'Phone',
                value: '',
                pattern: /^[0-9]{7,14}$/,
                errorMessage: 'Please enter only digits, min - 7, max - 14'
            },
            {
                name: 'Email',
                value: '',
                pattern: /.+@.+/,
                errorMessage: 'Please enter a valid email address!'
            },
        ],
        formStatus: 'none'
    },
    getters: {
        orderInfo(state) {
            return state.orderInfo;
        },
        formSending(state) {
            return state.formStatus === 'pending';
        },
        formDone(state, rootState, getters, rootGetters) {
            if (rootGetters['cart/cnt'] <= 0) {
                return state.formStatus === 'done';
            }
        },
        cartAll(state, rootState, getters, rootGetters) {
            return rootGetters['cart/all'];
        }
    },
    mutations: {
        sendForm(state) {
            state.formStatus = 'pending';
        },
        doneForm(state) {
            state.formStatus = 'done';
        },
        changedValue(state, data) {
            let field = state.orderInfo[data.i];

            field.value = data.value;
        },
        resetForm(state) {
            state.orderInfo.forEach((item, i) => {
                item.value = '';
            });
        }
    },
    actions: {
        orders(store) {
            return new Promise((resolve, reject) => {
                store.commit('sendForm');

                setTimeout(() => {
                    store.dispatch('cart/clearCart', null, { root: true });
                    store.commit('resetForm');
                    store.commit('doneForm');
                }, 2000);
                resolve();
                reject();
            });
        }
    }
};
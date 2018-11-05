<template>
	<div>
		<!--<div>{{cartAll}}</div>-->

		<h3 class="mb-3">Order Now</h3>
		<transition enter-active-class="animated zoomIn"
					leave-active-class="animated zoomOut"
					mode="out-in"
					appear>
		<form v-if="!isDone" @submit.prevent="showModal" key="form">
			<app-input v-for="(field, i) in this.orderInfo"
					   :name="field.name"
					   :value="field.value.trim()"
					   :pattern="field.pattern"
					   :errormessage="field.errorMessage"
					   :key="i"
					   @changed="onChanged(i, $event)"
					   @validate="onValidate(i, $event)"
			></app-input>
			<button class="btn btn-success"
					:disabled="!formReady">
				<span>Order Now!</span>
			</button>
		</form>
			<div v-else class="alert output w-50" key="output">
				Thank you for buying!
			</div>
		</transition>

		<div class="modal-backdrop fade show" v-show="isSending"></div>
		<div ref="load" class="loading" v-show="isSending">
			<v-icon name="spinner" pulse/>
		</div>

		<!--Modal-->
		<b-modal v-model="modalShow"
				 @ok="onSubmit"
				 title="Check data!">
			<table class="table table-bordered">
				<tr v-for="(field, i) in orderInfo" :key="i">
					<td>{{ field.name }}</td>
					<td>{{ field.value }}</td>
				</tr>
				<tr>
					<td>Orders</td>
					<td>
						<ul class="list-group">
							<li class="list-group-item"
								v-for="(order, i) in cartAll" :key="i">id: {{ order.id_product }} title: {{ order.title }}
							</li>
						</ul>
					</td>
				</tr>
			</table>
		</b-modal>
		<!-- end Modal-->

	</div>
</template>

<script>
import AppInput from "./Input";
import { mapGetters, mapActions } from "vuex";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/spinner";

export default {
  components: {
    AppInput,
    "v-icon": Icon
  },
  created() {
    this.controls = this.orderInfo.map(function(item, i) {
      return {
        valid: false
      };
    });
  },
  data() {
    return {
      controls: [],
      modalShow: false
    };
  },
  computed: {
    ...mapGetters("checkout", {
      isSending: "formSending",
      isDone: "formDone",
      orderInfo: "orderInfo",
      cartAll: "cartAll"
    }),
    fieldsDone() {
      return this.controls.reduce((total, item) => {
        let valid = item.valid;
        return total + (valid ? 1 : 0);
      }, 0);
    },
    formReady() {
      return this.fieldsDone === this.controls.length;
    }
  },
  methods: {
    ...mapActions("cart", {
      clearCart: "clearCart"
    }),
    ...mapActions("checkout", {
      onSubmiting: "orders"
    }),
    onChanged(i, e) {
      this.$store.commit("checkout/changedValue", {
        i: i,
        value: e.value
      });
    },
    onValidate(ind, e) {
      let control = this.controls[ind];

      control.valid = e.valid;
    },
    showModal() {
      this.modalShow = true;
    },
    hideModal() {
      this.modalShow = false;
    },
    onSubmit() {
      this.onSubmiting().then(
        res => {
          console.log("submited");
        },
        error => {
          console.log("not submited");
        }
      );
    }
  }
};
</script>

<style scoped>
.loader {
  margin-right: 10px;
}
.output {
  text-align: center;
  font-size: 2rem;
  padding-top: 50px;
  padding-bottom: 50px;
  margin: 50px auto;
  background: aliceblue;
  color: #007bff;
  border-radius: 10px;
}
.loading {
  display: flex;
  z-index: 2;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
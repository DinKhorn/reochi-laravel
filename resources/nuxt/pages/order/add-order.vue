<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">Create Order</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<OrderForm :form="form" />
			</v-card-text>
			<v-btn @click.prevent="createOrder" class="blue mx-5 darken-2 mb-5 grey--text text--lighten-4">
				<v-icon>mdi-check</v-icon>Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
import Vue from "vue";

var numeral = require("numeral");

Vue.filter("formatMoney", function(value) {
	return numeral(value).format("0,0.00");
});

import OrderForm from "@/components/forms/OrderForm";

export default {
	name: "AddOrder",
	components: {
		OrderForm
	},

	data() {
		return {
			form: {
				items: []
			}
		};
	},

	methods: {
		createOrder() {
			this.$axios
				.$post(`api/order`, this.form)
				.then(res => {
					this.$router.push(`/order/order-list`);
				})
				.catch(err => {
					console.log(err.response);
				});
		}
	}
};
</script>
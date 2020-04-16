<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">Create Stock In</v-card-title>
			<v-divider></v-divider>
			<StockInForm :form="form" />
			<v-btn @click.prevent="createStockIn" class="blue mx-5 darken-2 mb-5 grey--text text--lighten-4">
				<v-icon>mdi-check</v-icon>Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
import StockInForm from "@/components/forms/StockInForm";
import Vue from "vue";
var numeral = require("numeral");

Vue.filter("formatMoney", function(value) {
	return numeral(value).format("0,0.00");
});

export default {
	name: "AddOrder",
	components: {
		StockInForm
	},

	data() {
		return {
			form: {
				items: []
			}
		};
	},

	methods: {
		discountedPrice(product) {
			return (
				(product.unit_price -
					(product.unit_price * product.discount) / 100) *
				product.quantity
			);
		},

		createStockIn() {
			this.$axios
				.$post(`api/stock-in`, this.form)
				.then(res => {
					// this.$set(this.$data, "stock_in", res.data);
					this.$router.push(`/stock-in/list`);
				})
				.catch(err => {
					console.log(err.response);
				});
		}
	}
};
</script>


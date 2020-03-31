<template>
	<v-app class="mx-5 my-5">
		<v-card id="printProduct">
			<v-card-title class="blue-grey lighten-4">Order Detail</v-card-title>
			<v-divider></v-divider>
			<div class="px-5 pt-5">
				<div>
					<label for class="font-weight-medium">Date:</label>
					<span class="productDetail--item">{{ purchase.created_at}}</span>
				</div>
				<div>
					<label for class="font-weight-medium">Reference No:</label>
					<span class="productDetail--item">{{ purchase.reference_no}}</span>
				</div>
				<div>
					<label for class="font-weight-medium">Supplier:</label>
					<span class="productDetail--item" v-if="purchase.supplier">{{ purchase.supplier.name}}</span>
				</div>
				<div>
					<table class="tablePurchase">
						<tr>
							<th class="tablePurchase--tr">#</th>
							<th class="tablePurchase--tr">Product</th>
							<th class="tablePurchase--tr">Qty</th>
							<th class="tablePurchase--tr">Cost</th>
							<th class="tablePurchase--tr">Sub Total</th>
						</tr>
						<tr v-if="purchase.products" v-for="product in purchase.products">
							<td class="tablePurchase--td">{{ purchase.id }}</td>
							<td class="tablePurchase--td">{{ product.name }}</td>
							<td class="tablePurchase--td">{{ product.pivot.quantity }}</td>
							<td class="tablePurchase--td">USD {{ product.pivot.unit_price | formatMoney }}</td>
							<td
								class="tablePurchase--td"
							>USD {{ product.pivot.unit_price * product.pivot.quantity | formatMoney }}</td>
						</tr>
						<tr>
							<th class="tablePurchase--td" colspan="4">Total</th>
							<td class="tablePurchase--td">USD {{ purchase.paid | formatMoney }}</td>
						</tr>
						<tr class="tablePurchase--td">
							<th class="tablePurchase--td">Shipping Charge</th>
							<td></td>
						</tr>
						<tr class="tablePurchase--td">
							<th class="tablePurchase--td" colspan="4">Grand Total</th>
							<td class="tablePurchase--td">10</td>
						</tr>
					</table>
				</div>
			</div>
			<v-btn @click="printProduct" class="mx-5 my-5 blue accent-3 white--text">
				<v-icon left>mdi-printer</v-icon>Print
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

	export default {
		name: "ViewPurchase",
		created() {
			this.fetchData();
		},

		data() {
			return {
				purchase: []
			};
		},

		methods: {
			fetchData() {
				this.$axios
					.$get(`api/purchase/` + this.$route.params.id)
					.then(res => {
						this.purchase = res[1];
						// console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			printProduct() {
				this.$htmlToPaper("printProduct");
			}
		}
	};
</script>

<style lang="scss">
	.tablePurchase {
		width: 100%;
		text-align: left;
		border-collapse: collapse;
		margin-top: 10px;
		&--tr {
			border: 1px solid #7c5cc4;
			padding: 10px 10px 10px 10px;
		}

		&--td {
			border: 1px solid #dee2e6;
			padding-right: 10px;
			padding: 10px 10px 10px 10px;
		}
	}
</style>
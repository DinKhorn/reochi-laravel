<template>
	<v-app class="mx-5 my-5">
		<v-card>
			<div id="printProduct">
				<v-card-title class="green darken-2 white--text">Return Purchase (Reference No: {{ returnpurchase.reference_no }})</v-card-title>
				<v-divider></v-divider>
				<div class="px-5 pt-5">
					<div>
						<label for="" class="font-weight-medium">Return Date: </label>
						<span class="productDetail--item">{{ returnpurchase.created_at }}</span>
					</div>
					
					<div>
						<label for="" class="font-weight-medium">Supplier: </label>
						<span class="productDetail--item" v-if="returnpurchase.supplier">{{ returnpurchase.supplier.name}}</span>
					</div>
					<div>
						<label for="" class="font-weight-medium">Business Location: </label>
						<span class="productDetail--item" v-if=" returnpurchase.branch">{{ returnpurchase.branch.address }}</span>
					</div>
					<div class="pt-5">
						<table class="tableReturn">
							<tr>
								<th class="tableReturn--tr">#</th>
								<th class="tableReturn--tr">Product</th>
								<th class="tableReturn--tr">Qty</th>
								<th class="tableReturn--tr">Cost (USD)</th>
								<th class="tableReturn--tr">Discount (%)</th>
								<th class="tableReturn--tr">SubTotal (USD)</th>
							</tr>
							<template v-if="returnpurchase.products">
								<tr v-for="product in returnpurchase.products">
									<td class="tableReturn--td">{{ product.id }}</td>
									<td class="tableReturn--td">{{ product.name }}</td>
									<td class="tableReturn--td">{{ product.pivot.quantity }}</td>
									<td class="tableReturn--td">{{ product.pivot.unit_price | formatMoney }}</td>
									<td class="tableReturn--td">{{ product.pivot.discount }}</td>
									<td class="tableReturn--td">{{ (product.pivot.unit_price - (product.pivot.unit_price * product.pivot.discount / 100)) * product.pivot.quantity | formatMoney }}</td>
								</tr>
							</template>
							<tr>
								<th class="tableReturn--td" colspan="2">Total</th>
								<td class="tableReturn--td">{{ returnpurchase.total_quantity }}</td>
								<td class="tableReturn--td">{{ returnpurchase.total_price | formatMoney }}</td>
								<td class="tableReturn--td">{{ returnpurchase.total_discount }}</td>
								<td class="tableReturn--td">{{ returnpurchase.sub_total | formatMoney }}</td>
							</tr>
							<tr class="tableReturn--td">
								<th class="tableReturn--td" colspan="5">Grand Total</th>
								<td class="tableReturn--td">{{ returnpurchase.sub_total | formatMoney }}</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<v-btn @click="printProduct" class="green darken-2 mx-5 my-5 white--text">
				<v-icon left>mdi-printer</v-icon>
				Print
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	import Vue from 'vue';
	var numeral = require('numeral');

	Vue.filter('formatMoney', function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		name: 'ViewReturnPurchase',
		created() {
			this.fetchData()
		},

		data() {
			return {
				returnpurchase: []
			}
		},

		methods: {
			fetchData() {
				this.$axios.$get(`api/return-purchase/` + this.$route.params.id)
				.then(res => {
					this.returnpurchase = res.returnpurchase;
					console.log(res);
				})
				.catch(err => {
					console.log(err.response);
				})
			},

			printProduct() {
				this.$htmlToPaper('printProduct')
			},
		}
	}
</script>

<style lang="scss">
	.tableReturn {
		width: 100%;
		text-align: left;
		border-collapse: collapse;
		margin-top: 10px;
		&--tr {
			border: 1px solid #fff;
			padding: 10px 10px 10px 10px;
			color: white;
			background-color: rgb(56, 142, 60);
		}

		&--td {
			border: 1px solid #dee2e6;
			padding-right: 10px;
			padding: 10px 10px 10px 10px;
		}
	}
</style>
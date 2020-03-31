<template>
	<v-app class="mx-5 my-5">
		<v-card>
			<div id="printProduct">
				<v-card-title class="green darken-2 white--text">Return Sale (Reference No: {{ returnsale.reference_no }})</v-card-title>
				<v-divider></v-divider>
				<div class="px-5 pt-5">
					<div>
						<label for="" class="font-weight-medium"> Return Date: </label>
						<span class="productDetail--item">{{ returnsale.created_at }}</span>
					</div>
					
					<div>
						<label for="" class="font-weight-medium">Customer: </label>
						<span class="productDetail--item" v-if="returnsale.member">{{ returnsale.member.name}}</span>
					</div>

                    <div>
						<label for="" class="font-weight-medium">Business Location: </label>
						<span class="productDetail--item" v-if=" returnsale.branch">{{ returnsale.branch.address }}</span>
					</div>
				    <v-spacer></v-spacer>
                    
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
							<template v-if="returnsale.products">
								<tr v-for="products in returnsale.products">
									<td class="tableReturn--td">{{ products.id }}</td>
									<td class="tableReturn--td">{{ products.name }}</td>
									<td class="tableReturn--td">{{ products.pivot.quantity }}</td>
									<td class="tableReturn--td">{{ products.pivot.unit_price | formatMoney }}</td>
									<td class="tableReturn--td">{{ products.pivot.discount }}</td>
									<td class="tableReturn--td">{{ (products.pivot.unit_price - (products.pivot.unit_price * products.pivot.discount / 100)) * products.pivot.quantity | formatMoney }}</td>
								</tr>
							</template>
							<tr>
								<th class="tableReturn--td" colspan="2">Total</th>
								<td class="tableReturn--td">{{ returnsale.total_quantity }}</td>
								<td class="tableReturn--td">{{ returnsale.total_price | formatMoney }}</td>
								<td class="tableReturn--td">{{ returnsale.total_discount }}</td>
								<td class="tableReturn--td">{{ returnsale.sub_total | formatMoney }}</td>
							</tr>
							<!-- <tr class="tableReturn--td">
								<th class="tableReturn--td" colspan="5">Discount</th>
								<td class="tableReturn--td">{{ returnsale.total_discount }}</td>
							</tr> -->
							<tr class="tableReturn--td">
								<th class="tableReturn--td" colspan="5">Grand Total</th>
								<td class="tableReturn--td">{{ returnsale.sub_total | formatMoney }}</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<v-btn @click="printProduct" class="mx-5 my-5 green darken-2 white--text">
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
		name: 'ViewReturn',
		created() {
			this.fetchData()
		},

		data() {
			return {
				returnsale: []
			}
		},

		methods: {
			fetchData() {
				this.$axios.$get(`api/return-sale/` + this.$route.params.id)
				.then(res => {
					this.returnsale = res.returnsale;
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
			background-color: rgb(5, 151, 61);
			// text-align: center;
		}

		&--td {
			border: 1px solid #dee2e6;
			padding-right: 10px;
			padding: 10px 10px 10px 10px;
		}
	}
</style>
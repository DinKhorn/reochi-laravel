<template>
	<v-app class="px-5 py-5">
		<v-card>
			<v-card-title class="px-5 teal dark-2 white--text">Sale Detail  
				<span class="font-weight-regular px-2">(Invoice No: {{ sale.reference_no }})</span>
			</v-card-title>
			<v-divider></v-divider>
			<v-row>
				<v-col md="6" cols="12">
					<div class="d-flex flex-column px-10 pt-5">
						<span class="font-weight-medium">Date: 
							<span class="font-weight-regular">{{ sale.created_at }}</span>
						</span>
						<span class="font-weight-medium">
							References: <span class="font-weight-regular">{{ sale.reference_no }} </span>
						</span>
						<span class="font-weight-medium" v-if="sale.branch">
							Warehouse: <span class="font-weight-regular">{{ sale.branch.name }}</span>
						</span>
						<span class="font-weight-medium">
							Payment Status: <span class="font-weight-regular">{{sale.payment_status }} </span>
						</span>
					</div>
				</v-col>
				<v-col md="6" cols="12">
					<div class="py-5 d-flex flex-column">
						<!-- <span>Customer: {{ sale.member.name }}</span>
						<span>Address: {{ sale.member.address }}</span> -->
					</div>
				</v-col>
				<v-col cols="12" class="px-10">
					<table class="tableSale">
						<tr>
							<th class="tableSale--header">#</th>
							<th class="tableSale--header">Product</th>
							<th class="tableSale--header">Qty</th>
							<th class="tableSale--header">Unit Price</th>
							<!-- <th class="tableSale--header">Tax</th> -->
							<th class="tableSale--header">Discount</th>
							<th class="tableSale--header">Sub Total</th>
						</tr>
						
						<template v-if="sale.products && sale.products.length > 0">
							<tr v-for="i in sale.products">
								<td class="tableSale--tr">{{ i.id }}</td>
								<td class="tableSale--tr">{{ i.name }}</td>
								<td class="tableSale--tr">{{ i.pivot.quantity  }}</td>
								<td class="tableSale--tr">USD {{ i.pivot.unit_price  | formatMoney }}</td>
								<!-- <td class="tableSale--tr">USD {{ i.tax | formatMoney }}</td> -->
								<td class="tableSale--tr">USD {{ i.discount | formatMoney }}</td>
								<td class="tableSale--tr">USD {{ (i.pivot.unit_price - (i.pivot.unit_price * i.pivot.discount / 100)) * i.pivot.quantity | formatMoney }} </td>
							</tr>
						</template>
						<template v-else>
							<tr>
								<td colspan="7" class="tableSale--noData">No Available in table</td>
							</tr>
						</template>
						
						<tr>
							<th class="tableSale--tr" colspan="2">Total</th>
							<td class="tableSale--tr">{{ sale.total_quantity }}</td>
							<td class="tableSale--tr">USD {{ sale.total_price | formatMoney }}</td>
							<td class="tableSale--tr">{{ sale.total_discount }}</td>
							<td class="tableSale--tr">USD {{ sale.sub_total | formatMoney }}</td>
						</tr>
						<!-- <tr>
							<th class="tableSale--tr" colspan="6">Order Tax:</th>
							<td class="tableSale--tr">0</td>
						</tr> -->
						<tr>
							<th class="tableSale--tr" colspan="5">Discount:</th>
							<td class="tableSale--tr">{{ sale.total_discount }}</td>
						</tr>
						<tr>
							<th class="tableSale--tr" colspan="5">Shipping Cost:</th>
							<td class="tableSale--tr">USD {{ sale.shipping_cost | formatMoney }}</td>
						</tr>
						<tr>
							<th class="tableSale--tr" colspan="5">Grand Total:</th>
							<td class="tableSale--tr">USD {{ sale.sub_total | formatMoney }}</td>
						</tr>
						<tr>
							<th class="tableSale--tr" colspan="5">Paid Amount:</th>
							<td class="tableSale--tr">USD {{ sale.paid | formatMoney }}</td>
						</tr>
						<tr>
							<th class="tableSale--tr" colspan="5">Due:</th>
							<td class="tableSale--tr">USD {{ sale.due_amount | formatMoney }}</td>
						</tr>
					</table>
				</v-col>
			</v-row>
		</v-card>
	</v-app>
</template>

<script>
	import Vue from 'vue';

	let numeral = require("numeral");

	Vue.filter('formatMoney', function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		name: 'idSale',
		created() {
			this.fetchSale();
		},

		data() {
			return {
				sale: [],
			}
		},

		methods: {
			fetchSale() {
				this.$axios.$get(`api/sale/` + this.$route.params.id)
				.then(res => {
					this.$set(this.$data, 'sale', res.sales);
					console.log(res);
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		}
	}
</script>

<style lang="scss">
	.tableSale {
		width: 100%;
		text-align: left;
		border-collapse:  collapse;
		&--header {
			border: 1px solid rgba(0,0,0,0.125);
			padding: 5px 10px 5px 10px;
		}

		&--body {
			border: 1px solid rgba(0,0,0,0.125);
			text-align: left;
			border-collapse: collapse;
		}

		&--tr {
			padding: 10px 10px 10px 10px;
			border: 1px solid rgba(0,0,0,0.125);
		}

		&--noData {
			text-align: center;
			padding: 10px;
			border: 2px solid #34ef95;
		}
	}
</style>
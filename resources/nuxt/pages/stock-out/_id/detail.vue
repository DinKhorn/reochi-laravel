<template>
	<v-app class="mx-5 my-5">
		<v-card id="printProduct">
			<v-card-title class="blue-grey lighten-4">Order Detail</v-card-title>
			<v-divider></v-divider>
			<div class="px-5 pt-5">
				<v-row>
					<div class="col-6">
						<div>
							<label for class="font-weight-medium">Date:</label>
							<span class="productDetail--item">{{ order.created_at }}</span>
						</div>
						<div>
							<label for class="font-weight-medium">Reference No:</label>
							<span class="productDetail--item">{{ order.reference_no}}</span>
						</div>
					</div>
					<div class="col-6">
						<div>
							<label for class="font-weight-medium">Outlet Name:</label>
							<span class="productDetail--item" v-if="order.outlet">{{ order.outlet.name}}</span>
						</div>
						<div>
							<label for class="font-weight-medium">Location:</label>
							<span class="productDetail--item" v-if="order.location">{{ order.location.name }}</span>
						</div>
					</div>
				</v-row>
				<div>
					<table class="tablePurchase">
						<tr>
							<th class="tablePurchase--tr">Code</th>
							<th class="tablePurchase--tr">Product</th>
							<th class="tablePurchase--tr">Qty</th>
							<th class="tablePurchase--tr">Cost</th>
							<th class="tablePurchase--tr">Discount (%)</th>
							<th class="tablePurchase--tr">Sub Total</th>
						</tr>
						<tr v-if="order.order_detail" v-for="order_detail in order.order_detail">
							<td class="tablePurchase--td">{{ order_detail.product.code }}</td>
							<td class="tablePurchase--td">{{ order_detail.product.name }}</td>
							<td class="tablePurchase--td">{{ order_detail.quantity }}</td>

							<td class="tablePurchase--td">USD {{ order_detail.unit_price }}</td>
							<td class="tablePurchase--td">{{ order_detail.discount }}%</td>
							<td class="tablePurchase--td">USD {{ order_detail.amount }}</td>
						</tr>
						<tr class="tablePurchase--td">
							<th class="tablePurchase--td" colspan="5">Grand Total</th>
							<td class="tablePurchase--td">USD {{ order.sub_total }}</td>
						</tr>
						<tr class="tablePurchase--td">
							<th class="tablePurchase--td" colspan="5">Due Amount</th>
							<td class="tablePurchase--td">USD {{ order.due_amount }}</td>
						</tr>
						<tr>
							<th class="tablePurchase--td" colspan="5">Total</th>
							<td class="tablePurchase--td">USD {{ order.total }}</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="d-flex flex-column ma-5">
				<label for>Note</label>
				<textarea cols="30" rows="7" class="textarea" v-model="order.note"></textarea>
			</div>
			<v-btn @click="printProduct" class="mx-5 my-5 blue accent-3 white--text">
				<v-icon left>mdi-printer</v-icon>Print
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		name: "ViewPurchase",
		created() {
			this.fetchData();
		},

		data() {
			return {
				order: [],
				order_detail: []
			};
		},
		computed: {
			calculateTotal() {
				return this.reduce((total, item) => {
					let s =
						(item.unit_price -
							(item.unit_price * item.discount) / 100) *
						item.quantity;
					return total + s;
				}, 0);
			}
		},
		methods: {
			fetchData() {
				this.$axios
					.$get(`api/order/` + this.$route.params.id)
					.then(res => {
						this.order = res[1];
						console.log(res[1].order_detail[0]);
					})
					.catch(err => {
						console.log(err.response);
					});

				this.$axios
					.$get(`api/order/` + this.$route.params.id)
					.then(res => {
						this.order = res[1];
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
	.textarea {
		border: 1px solid rgba(0, 0, 0, 0.125);
		outline: 1px solid #461577;
	}

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
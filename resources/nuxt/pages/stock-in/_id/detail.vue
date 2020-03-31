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
							<span class="productDetail--item">{{ stock_in.created_at }}</span>
						</div>
						<div>
							<label for class="font-weight-medium">Reference No:</label>
							<span class="productDetail--item">{{ stock_in.reference_no}}</span>
						</div>
					</div>
					<div class="col-6">
						<div>
							<label for class="font-weight-medium">Supplier Name:</label>
							<span class="productDetail--item" v-if="stock_in.supplier">{{ stock_in.supplier.name}}</span>
						</div>
					</div>
				</v-row>
				<div>
					<table class="tablePurchase">
						<tr>
							<th class="tablePurchase--tr">Code</th>
							<th class="tablePurchase--tr">Product</th>
							<th class="tablePurchase--tr">Qty</th>
							<th class="tablePurchase--tr">Unit Price</th>
							<th class="tablePurchase--tr">Sub Total</th>
						</tr>
						<tr v-if="stock_in.stock_in_detail" v-for="stock_in_detail in stock_in.stock_in_detail">
							<td class="tablePurchase--td">{{ stock_in_detail.product.code }}</td>
							<td class="tablePurchase--td">{{ stock_in_detail.product.name }}</td>
							<td class="tablePurchase--td">{{ stock_in_detail.quantity }}</td>

							<td class="tablePurchase--td">{{ stock_in_detail.unit_price }}</td>
							<td class="tablePurchase--td">calculateTotal</td>
						</tr>
						<tr class="tablePurchase--td">
							<th class="tablePurchase--td" colspan="4">Grand Total</th>
							<td class="tablePurchase--td">USD total</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="d-flex flex-column ma-5">
				<label for>Note</label>
				<textarea cols="30" rows="7" class="textarea" v-model="stock_in.note"></textarea>
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
				stock_in: [],
				stock_in_detail: []
			};
		},
		computed: {
			calculateTotal() {
				return this.reduce((total, item) => {
					let s = item.unit_price * item.quantity;
					return total + s;
				}, 0);
			}
		},
		methods: {
			fetchData() {
				this.$axios
					.$get(`api/stock-in/` + this.$route.params.id)
					.then(res => {
						this.stock_in = res[1];
						console.log(res);
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
<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="purple lighten-1">
				<v-card-title class="white--text">Edit Purchase</v-card-title>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<v-row>
					<v-col md="6" cols="12">
						<label for="reference_no" class="font-weight-bold">Reference No</label>
						<v-text-field solo outlined dense v-model="form.reference_no"></v-text-field>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Location*</label>
						<v-autocomplete
							item-value="name"
							item-text="name"
							solo
							outlined
							dense
							label="Business Location"
							return-object
							v-model="form.branch"
							:items="locations"
						></v-autocomplete>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Supplier</label>
						<v-autocomplete
							:items="suppliers"
							item-text="name"
							item-value="name"
							solo
							outlined
							dense
							return-object
							v-model="form.supplier"
							label="Please select Supplier"
						></v-autocomplete>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Purchase Status</label>
						<v-select
							solo
							outlined
							dense
							label="Received"
							:items="purchase_status"
							v-model="form.purchase_status"
						></v-select>
					</v-col>
					<v-col md="6" cols="12">
						<label for class="font-weight-bold">Shipping Cost</label>
						<v-text-field
							solo
							outlined
							dense
							type="number"
							v-model="form.shipping_cost"
							placeholder="0.00"
						></v-text-field>
					</v-col>
					<v-col md="6" cols="12">
						<label for class="font-weight-bold">Payment Status</label>
						<v-select solo outlined dense v-model="form.payment_status" :items="payment_status" required></v-select>
					</v-col>
					<v-col cols="12">
						<label class="font-weight-bold">Select Product</label>
						<div>
							<v-autocomplete
								:items="products"
								dense
								solo
								item-text="name"
								item-value="name"
								return-object
								@input="addTocart"
							></v-autocomplete>
						</div>
					</v-col>
				</v-row>
				<div>
					<label class="font-weight-bold mb-3">Product Table</label>
					<table class="tablePurchase">
						<thead>
							<tr class="tablePurchase--header">
								<td>Name</td>
								<td>Code</td>
								<td>Quantity</td>
								<td>Unit Price</td>
								<td>Discount</td>
								<td>Total</td>
								<td>Actions</td>
							</tr>
						</thead>
						<tbody>
							<tr class="tablePurchase--td" v-for="(item, index) in form.products" :key="index">
								<td>{{item.name}}</td>
								<td>{{item.code}}</td>
								<td>
									<input type="number" class="table-quantity" v-model="form.products[index].quantity" />
								</td>
								<td>
									<input
										type="number"
										class="table-quantity"
										v-model="form.products[index].unit_price"
										placeholder="0.00"
									/>
								</td>
								<td>
									<input
										type="number"
										class="table-quantity"
										v-model="form.products[index].discount"
										placeholder="0.00"
									/>
								</td>
								<td>USD {{ discountedPrice(item) | formatMoney }}</td>
								<td>
									<v-btn small color="red" outlined @click="removeItem(index)">
										<v-icon>mdi-delete</v-icon>
									</v-btn>
								</td>
							</tr>
							<tr>
								<td class="py-3" colspan="2">Total</td>
								<td colspan="3">{{ calculateQty }}</td>
								<td>USD {{ GrandTotal | formatMoney }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="d-flex flex-column mb-5">
					<label for>Note</label>
					<textarea cols="30" rows="7" class="textarea" v-model="form.description"></textarea>
				</div>
			</div>
			<v-btn
				@click.prevent="updatePurchase"
				class="blue mx-5 darken-2 mb-5 grey--text text--lighten-4"
			>
				<v-icon>mdi-check</v-icon>Update
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	import Vue from "vue";

	let numeral = require('numeral');

	Vue.filter('formatMoney', function(value) {
		return numeral(value).format('00,00.00')
	});

	export default {
		name: "EditPurchase",
		created() {
			this.fetchProduct();
			this.fetchPurchase();
			this.fetchSupplier();
			this.fetchLocation();

		},

		data() {
			return {
				form: {
					products: []
				},
				products: [],
				purchases: [],
				purchase_status: ["Received", "Partial", "Pending", "Ordered"],
				payment_status: ["Paid", "Due"],
				suppliers: [],
				locations: [],
			};
		},

		computed: {

			calculateQty() {
				return this.form.products.reduce((total, item) => {
					return total + Number(item.quantity);
				}, 0);
			},

			GrandTotal() {
				return this.form.products.reduce((total,item) => {
					let s = (item.unit_price - (item.unit_price * item.discount) / 100) * item.quantity
					return total + s;
					// console.log(total + s);
				}, 0)
			}	
		},

		methods: {
			discountedPrice(product) {
				return (
					(product.unit_price -
						(product.unit_price * product.discount) / 100) *
					product.quantity
				);
			},

			fetchPurchase() {
				this.$axios
					.$get(`api/purchase/` + this.$route.params.id)
					.then(res => {
						// this.form = res[1];
						this.$set(this.$data, 'form', res[1]);
						console.log(res);

						// Initial value = pivot
						for (let i in this.form.products) {
							Vue.set(this.form.products[i], 'quantity', this.form.products[i].pivot.quantity);
							Vue.set(this.form.products[i], 'unit_price', this.form.products[i].pivot.unit_price);
							Vue.set(this.form.products[i], 'discount', this.form.products[i].pivot.discount);
						}
					})
					.catch(err => {
						console.log(res.response);
					});
			},

			fetchLocation() {
				this.$axios
					.$get(`api/location`)
					.then(res => {
						// this.locations = res.locations.data;
						this.$set(this.$data, "locations", res.locations.data);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			fetchSupplier() {
				this.$axios
					.$get(`api/supplier`)
					.then(res => {
						// this.suppliers = res.suppliers.data;
						this.$set(this.$data, "suppliers", res.suppliers.data);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			fetchProduct() {
				this.$axios
					.$get(`/api/product`)
					.then(res => {
						// this.products = res.products.data;
						this.$set(this.$data, "products", res.products.data);
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});
			},

			updatePurchase() {
				this.$axios
					.$patch(`api/purchase/` + this.form.id, {
						payment_status: this.form.payment_status,
						purchase_status: this.form.purchase_status,
						description: this.form.description,
						shipping_cost: this.form.shipping_cost,
						branch: this.form.branch,
						products: this.form.products,
						supplier: this.form.supplier
					})
					.then(res => {
						// this.purchases = res.data;
						this.$set(this.$data, "purchases", res.data);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			addTocart(item) {
				if (this.form.products.includes(item)) {
					alert("already there");
				} else {
					// Vue.set(item, 'quantity', 1);
					this.form.products.push(item);
				}
				Vue.set(item, 'quantity', 1);
				Vue.set(item, 'discount', 1);
			},

			removeItem(index) {
				this.form.products.splice(index, 1);
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
		margin-top: 10px;
		border-collapse: collapse;
		&--header {
			font-weight: 500;
			text-align: left;
			border-bottom: 1px solid rgba(0, 0, 0, 0.125);
		}

		&--td {
			border-bottom: 1px solid rgba(0, 0, 0, 0.125);
		}
	}

	.table-quantity {
		border: 1px solid rgba(0, 0, 0, 0.125);
		padding: 5px 10px 5px 10px;
		margin-top: 5px;
		margin-bottom: 5px;
	}
</style>
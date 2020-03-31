<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">Create Order</v-card-title>
			<v-divider></v-divider>
			<p class="px-5 pt-3 font-italic grey--text">
				The field labels marked with
				<span class="red--text">*</span> are required input fields.
			</p>
			<div class="px-5">
				<v-row>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">
							Location
							<span class="red--text">*</span>
						</label>
						<v-autocomplete
							item-value="name"
							item-text="name"
							solo
							outlined
							dense
							label="Business Location"
							return-object
							v-model="form.location"
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
					<v-col md="4" cols="12">
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
					<v-col md="4" cols="12">
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
					<v-col md="4" cols="12">
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
					<label class="font-weight-bold mb-3">Order Table</label>
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
							<tr class="tablePurchase--td" v-for="(item, index) in form.items" :key="index">
								<td>{{item.name}}</td>
								<td>{{item.code}}</td>
								<td>
									<validation-provider rules="required" v-slot="{ errors }">
										<input
											type="number"
											class="table-quantity"
											name="form.items[index].quantity"
											v-model.number="form.items[index].quantity"
										/>
										<span>{{ errors[0] }}</span>
									</validation-provider>
								</td>
								<td>
									<input
										type="number"
										class="table-quantity"
										name="form.items[index].unit_price"
										v-model.number="form.items[index].unit_price"
										placeholder="0.00"
									/>
								</td>
								<td>
									<input
										type="number"
										class="table-quantity"
										name="form.items[index].discount"
										v-model.number="form.items[index].discount"
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
								<td>USD {{ calculateTotal | formatMoney }}</td>
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
				@click.prevent="createPurchase"
				class="blue mx-5 darken-2 mb-5 grey--text text--lighten-4"
			>
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

	export default {
		name: "AddPurchase",
		created() {
			this.fetchData();
			// this.fetchPurchase();
			this.fetchSupplier();
			this.fetchLocation();
		},

		data() {
			return {
				form: {
					items: []
				},
				products: [],
				purchases: [],
				purchase_status: ["Received", "Pending", "Ordered"],
				payment_status: ["Paid", "Due"],
				suppliers: [],
				locations: []
			};
		},

		computed: {
			calculateQty() {
				return this.form.items.reduce((total, item) => {
					return total + item.quantity;
				}, 0);
			},

			calculateTotal() {
				return this.form.items.reduce((total, item) => {
					let s =
						(item.unit_price -
							(item.unit_price * item.discount) / 100) *
						item.quantity;
					return total + s;
				}, 0);
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

			fetchData() {
				this.$axios
					.$get(`/api/product`)
					.then(res => {
						Vue.set(this.$data, "products", res.products.data);
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});
			},

			fetchSupplier() {
				this.$axios
					.$get(`api/supplier`)
					.then(res => {
						console.log(res);
						this.suppliers = res.suppliers.data;
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			fetchLocation() {
				this.$axios
					.$get(`api/location`)
					.then(res => {
						this.locations = res.locations.data;
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			createPurchase() {
				this.$axios
					.$post(`api/purchase`, this.form)
					.then(res => {
						// this.purchases = res.data;
						this.$set(this.$data, "purchases", res.data);
						this.$router.push(`/purchase/purchase-list`);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			addTocart(item) {
				if (this.form.items.includes(item)) {
					alert("already there");
				} else {
					this.form.items.push(item);
					console.log(item);
				}
				Vue.set(item, "quantity", 1);
				Vue.set(item, "discount", 0);
			},

			removeItem(index) {
				this.form.items.splice(index, 1);
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
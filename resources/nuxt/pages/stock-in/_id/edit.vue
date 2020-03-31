<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">Edit Order</v-card-title>
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
						<label class="font-weight-bold">
							Outlet Name
							<span class="red--text">*</span>
						</label>
						<v-autocomplete
							:items="outlets"
							item-text="name"
							item-value="id"
							solo
							outlined
							dense
							return-object
							v-model="form.outlet_name"
							label="Please select Outlet"
						></v-autocomplete>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Order Status</label>
						<v-select
							solo
							outlined
							dense
							label="Order Status"
							:items="order_status"
							v-model="form.order_status"
						></v-select>
					</v-col>
					<v-col md="6" cols="12">
						<label for class="font-weight-bold">Payment Status</label>
						<v-select
							solo
							outlined
							dense
							v-model="form.payment_status"
							:items="payment_status"
							label="Payment Status"
							required
						></v-select>
					</v-col>
					<v-col cols="12">
						<label class="font-weight-bold">
							Select Product
							<span class="red--text">*</span>
						</label>
						<div>
							<v-autocomplete
								:items="products"
								solo
								outlined
								dense
								item-text="name"
								item-value="name"
								return-object
								@input="addTocart"
								label="Select Product"
							></v-autocomplete>
						</div>
					</v-col>
				</v-row>
				<div>
					<label class="font-weight-bold mb-3">Order Table</label>
					<table class="tableOrder">
						<thead>
							<tr class="tableOrder--header">
								<td>Code</td>
								<td>Name</td>
								<td>Quantity</td>
								<td>Unit Price</td>
								<td>Discount</td>
								<td>Total</td>
								<td>Actions</td>
							</tr>
						</thead>
						<tbody>
							<tr class="tableOrder--td" v-for="(item, index) in form.items" :key="index">
								<td>{{item.code}}</td>
								<td>{{item.name}}</td>

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
								<td>USD {{ discountedPrice(item)}}</td>
								<td>
									<v-btn small color="red" outlined @click="removeItem(index)">
										<v-icon>mdi-delete</v-icon>
									</v-btn>
								</td>
							</tr>
							<tr>
								<td class="py-3" colspan="2">Total</td>
								<td colspan="3">{{ calculateQty }}</td>
								<td>USD {{ calculateTotal }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="d-flex flex-column mb-5">
					<label for>Note</label>
					<textarea cols="30" rows="7" class="textarea" v-model="form.description"></textarea>
				</div>
			</div>
			<v-btn @click.prevent="createOrder" class="blue mx-5 darken-2 mb-5 grey--text text--lighten-4">
				<v-icon>mdi-check</v-icon>Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		name: "EditOrder",
		created() {
			this.fetchData();
			this.fetchOutlet();
			this.fetchLocation();
			this.setData();
		},

		data() {
			return {
				form: {
					items: []
				},
				outlets: [],
				products: [],
				orders: [],
				order_status: ["New", "Accepted", "Pending", "Received", "Cancel"],
				payment_status: ["Paid", "Due"],
				locations: []
			};
		},

		computed: {
			calculateQty() {
				return this.form.items.reduce((total, item) => {
					return total + Number(item.quantity);
				}, 0);
			},
			calculateTotal() {
				return this.form.items.reduce((total, item) => {
					let s =
						(item.unit_price -
							(item.unit_price * item.discount) / 100) *
						item.quantity;
					return total + s;
					// console.log(total + s);
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
						// this.products = res.products.data;
						this.$set(this.$data, "products", res.products.data);
					})
					.catch(err => {
						console.log(err);
					});

				// this.$axios
				// 	.$get(`api/location`)
				// 	.then(res => {
				// 		// this.locations = res.locations.data;
				// 		this.$set(this.$data, "locations", res.locations.data);
				// 		console.log(res);
				// 	})
				// 	.catch(err => {
				// 		console.log(err.response);
				// 	});
			},

			fetchOutlet() {
				this.$axios
					.$get(`/api/outlets`)
					.then(res => {
						// this.outlets = res.outlets.data;
						this.$set(this.$data, "outlets", res.outlets.data);
						console.log(res.outlets.data);
					})
					.catch(err => {
						console.log(err);
					});
			},

			fetchLocation() {
				this.$axios
					.$get(`api/location`)
					.then(res => {
						this.locations = res.locations.data;
						// console.log(res);
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
					// console.log(this.form);
				}
				Vue.set(item, "quantity", 1);
				Vue.set(item, "discount", 0);
			},

			removeItem(index) {
				this.form.items.splice(index, 1);
			},

			setData() {
				this.$axios
					.$get(`api/order/` + this.$route.params.id)
					.then(res => {
						this.form = res[1];
						this.$set(this.$data, "form", res[1]);
						console.log(res[1]);
						// Initial value = pivot
						// for (let i in this.form.products) {
						// 	Vue.set(this.form.products[i], 'quantity', this.form.products[i].pivot.quantity);
						// 	Vue.set(this.form.products[i], 'unit_price', this.form.products[i].pivot.unit_price);
						// 	Vue.set(this.form.products[i], 'discount', this.form.products[i].pivot.discount);
						// }
					})
					.catch(err => {
						console.log(res.response);
					});
			},

			updateItem() {
				this.$axios
					.$patch(`api/order/` + this.form.id, {
						name: this.form.name,
						location: this.form.location,
						phone: this.form.phone,
						create_by: this.form.create_by,
						status: this.form.status
					})
					.then(res => {
						this.items = res.data;
						this.$toast.info("Succeessfully updated");
						this.$router.push("/order/order-list");
					})
					.catch(err => {
						this.$refs.form.validate(err.response.data.errors);
					});
			}
		}
	};
</script>

<style lang="scss">
	.textarea {
		border: 1px solid rgba(0, 0, 0, 0.125);
		outline: 1px solid #461577;
	}

	.tableOrder {
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

<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">Create Stock In</v-card-title>
			<v-divider></v-divider>
			<p class="px-5 pt-3 font-italic grey--text">
				The field labels marked with
				<span class="red--text">*</span> are required input fields.
			</p>
			<div class="px-5">
				<v-row>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="qty">
							Reference No.
							<span class="red--text">*</span>
						</label>
						<validation-provider name="Reference No." rules="required" v-slot="{ errors }">
							<v-text-field outlined solo dense label="Reference No." v-model="form.reference_no"></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="supplier">
							Supplier
							<span class="red--text">*</span>
						</label>
						<validation-provider name="Supplier" rules="required" v-slot="{ errors }">
							<v-autocomplete
								:items="suppliers"
								item-text="name"
								item-value="id"
								outlined
								solo
								dense
								label="Supplier Name"
								v-model="form.supplier_id"
							></v-autocomplete>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
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
								item-value="id"
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
							<tr class="tableOrder--td" v-for="(item, index) in form.items" :key="index">
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
			<v-btn @click.prevent="createStockIn" class="blue mx-5 darken-2 mb-5 grey--text text--lighten-4">
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
		name: "AddOrder",
		created() {
			this.fetchProduct();
			this.fetchSupplier();
		},

		data() {
			return {
				form: {
					items: []
				},
				products: [],
				suppliers: [],
				payment_status: ["Paid", "Due"],
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

			fetchProduct() {
				this.$axios
					.$get(`/api/product`)
					.then(res => {
						Vue.set(this.$data, "products", res.products.data);
					})
					.catch(err => {
						console.log(err);
					});
			},

			fetchSupplier() {
				this.$axios
					.$get(`api/supplier`)
					.then(res => {
						this.suppliers = res.suppliers.data;
					})
					.catch(err => {
						console.log(err.response);
					});
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
			},

			addTocart(item) {
				if (this.form.items.includes(item)) {
					alert("already there");
				} else {
					this.form.items.push(item);
					// console.log(item);
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

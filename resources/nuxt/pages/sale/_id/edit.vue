<template>
	<v-container>
		<v-card>
			<div class="indigo lighten-1 white--text">
				<v-card-title>Edit Sale</v-card-title>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<v-row>
					<v-col md="4" cols="12">
						<label class="font-weight-bold">Customer*</label>
						<v-autocomplete
							solo
							outlined
							dense
							label="Select Customer"
							:items="members"
							item-value="name"
							item-text="name"
							return-object
							v-model="form.member"
						></v-autocomplete>
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold">Warehouse*</label>
						<v-autocomplete
							solo
							outlined
							dense
							label="Select Warehouse"
							:items="locations"
							item-value="name"
							item-text="name"
							return-object
							v-model="form.branch"
						></v-autocomplete>
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold">Payment Method*</label>
						<v-select
							solo
							outlined
							dense
							:items="payment_method"
							label="Please Select"
							v-model="form.payment_method"
						></v-select>
					</v-col>
					<v-col md="12" cols="12">
						<label class="font-weight-bold">Select Product</label>
						<v-autocomplete
							solo
							outlined
							dense
							append-icon="mdi-barcode"
							:items="products"
							item-value="name"
							item-text="name"
							return-object
							@input="addTocart"
						></v-autocomplete>
					</v-col>
				</v-row>
				<div>
					<table class="saleTable">
						<thead>
							<tr>
								<th class="saleTable--th">Name</th>
								<th class="saleTable--th">Code</th>
								<th class="saleTable--th">Quantity</th>
								<th class="saleTable--th">Product Price</th>
								<!-- <th class="saleTable--th">Discount</th> -->
								<th class="saleTable--th">Total</th>
								<th class="saleTable--th">Action</th>
							</tr>
						</thead>
						<tbody>
							<tr class="saleTable--td" v-for="(item, index) in form.products" :key="index">
								<td>{{item.name}}</td>
								<td>{{item.code}}</td>
								<td>
									<input
										type="number"
										class="saleTable--input"
										v-model.number="form.products[index].quantity"
									/>
								</td>
								<td>
									<input
										type="number"
										class="saleTable--input"
										v-model.number="form.products[index].unit_price"
										placeholder="0.00"
									/>
								</td>
								<!-- <td>
									<input
										type="number"
										class="saleTable--input"
										v-model.number="form.products[index].discount"
										placeholder="0.00"
									/>
								</td>-->
								<td>USD {{ discountedPrice(item) | formatMoney }}</td>
								<td>
									<v-btn small color="red" outlined @click="removeItem(index)">
										<v-icon>mdi-delete</v-icon>
									</v-btn>
								</td>
							</tr>
							<tr class="saleTable--total">
								<th colspan="2">Total</th>
								<td colspan="2">{{ calculateQty }}</td>
								<td>USD {{ Total | formatMoney }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<v-row>
					<v-col md="4" cols="12">
						<label for class="font-weight-bold">Shipping Cost</label>
						<v-text-field
							solo
							outlined
							dense
							type="number"
							placeholder="0.0"
							v-model="form.shipping_cost"
						></v-text-field>
					</v-col>
					<v-col md="4" cols="12">
						<label for class="font-weight-bold">Paid</label>
						<v-text-field solo outlined dense type="number" placeholder="0.0" v-model="form.paid"></v-text-field>
					</v-col>
					<v-col md="4" cols="12">
						<label for="discount" class="font-weight-bold">Discount Percent</label>
						<v-text-field solo outlined dense v-model="form.discount"></v-text-field>
					</v-col>
				</v-row>

				<!-- Table Show Grand Total Price -->
				<div class="d-flex justify-space-between grandTotal px-5 py-2">
					<div class="granTotal--border">
						<span class="font-weight-medium">Item:</span>
						<span>{{ calculateQty }}</span>
					</div>
					<div>
						<span class="font-weight-medium">Total:</span>
						<span>USD {{ Total }}</span>
					</div>
					<div>
						<span class="font-weight-medium">Grand Total:</span>
						<span>USD {{ grandTotal }}</span>
					</div>
				</div>

				<div class="d-flex flex-column pt-5">
					<label for="note">Note</label>
					<textarea cols="30" rows="5" class="sale--textarea" v-model="form.description"></textarea>
				</div>
			</div>
			<v-btn class="blue mx-5 lighten-2 my-5" v-permission="'add sales'" @click="updateSale">
				<v-icon>mdi-check</v-icon>Submit
			</v-btn>
		</v-card>
	</v-container>
</template>

<script>
	import Vue from "vue";

	var numeral = require("numeral");

	Vue.filter("formatMoney", function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		name: "EditSale",
		created() {
			this.fetchProduct();
			this.fetchSale();
			this.fetchMember();
			this.fetchLocation();
		},

		data() {
			return {
				form: {
					products: [],
					discount: 0,
					paid: 0,
					shipping_cost: 0
				},
				items: [],
				payment_status: ["Paid", "Due"],
				payment_method: ["Cash", "Cheque"],
				sale_status: ["Completed", "Pending"],

				members: [],
				locations: [],
				products: [],
				sales: []
			};
		},

		computed: {
			calculateQty() {
				return this.form.products.reduce((total, item) => {
					return total + item.quantity;
				}, 0);
			},

			Total() {
				return this.form.products.reduce((total, item) => {
					let s = Number(item.unit_price * item.quantity);
					return total + s;
				}, 0);
			},

			grandTotal() {
				return this.form.products.reduce((total, item) => {
					let s =
						(item.unit_price -
							(item.unit_price * this.form.discount) / 100) *
						item.quantity;
					return total + s + Number(this.form.shipping_cost);
				}, 0);
			}
		},

		methods: {
			fetchSale() {
				this.$axios
					.$get(`api/sale/` + this.$route.params.id)
					.then(res => {
						this.$set(this.$data, "form", res.sales);

						for (let i in this.form.products) {
							Vue.set(
								this.form.products[i],
								"quantity",
								this.form.products[i].pivot.quantity
							);
							Vue.set(
								this.form.products[i],
								"unit_price",
								this.form.products[i].pivot.unit_price
							);
							Vue.set(
								this.form.products[i],
								"discount",
								this.form.products[i].pivot.discount
							);
						}

						console.log(res);
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

			fetchMember() {
				this.$axios
					.$get(`api/member`)
					.then(res => {
						this.members = res.members.data;
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			fetchProduct() {
				this.$axios
					.$get(`api/product`)
					.then(res => {
						this.$set(this.$data, "products", res.products.data);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			updateSale() {
				this.$axios
					.$patch(`api/sale/` + this.form.id, {
						paid: this.form.paid,
						payment_status: this.form.payment_status,
						payment_method: this.form.payment_method,
						branch: this.form.branch,
						member: this.form.member,
						products: this.form.products,
						discount: this.form.discount
					})
					.then(res => {
						// this.sales = res.data;
						this.$set(this.$data, "sales", res.data);
						console.log(res);
						this.$router.push(`/sale/sale-list`);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			addTocart(item) {
				if (this.form.products.includes(item)) {
					Vue.set(item, "quantity", (item.quantity += 1));
				} else {
					this.form.products.push(item);
					Vue.set(item, "unit_price", item.price);
					Vue.set(item, "quantity", 1);
					Vue.set(item, "discount", 0);
				}
				console.log(this.form.products);
				console.log(item);
			},

			removeItem(index) {
				this.form.products.splice(index, 1);
			},

			discountedPrice(product) {
				return product.unit_price * product.quantity;
			}
		}
	};
</script>

<style lang="scss">
	.sale--textarea {
		border: 1px solid #349feb;
		outline: none;
	}

	.saleTable {
		border-collapse: collapse;
		width: 100%;

		&--th {
			border-bottom: 1px solid rgba(0, 0, 0, 0.125);
			text-align: left;
			padding-bottom: 2px;
		}

		&--input {
			border: 1px solid rgba(0, 0, 0, 0.125);
			padding: 5px 5px 5px 5px;
			margin: 10px auto;
			outline: none;
		}

		&--total {
			font-weight: 400;
			text-align: left;
			padding-top: 10px;
		}

		&--td {
			border-bottom: 1px solid rgba(0, 0, 0, 0.125);
		}
	}

	.grandTotal {
		border: 1px solid rgba(27, 3, 3, 0.125);
		&--border {
			border-right: 1px solid rgba(27, 3, 3, 0.125);
		}
	}
</style>
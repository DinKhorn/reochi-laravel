<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="green darken-2">
				<v-card-title class="white--text">Edit​ Return Purchase</v-card-title>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<v-row>
					<!-- <v-col md="6" cols="12">
						<label for="reference_no" class="font-weight-bold">Reference No</label>
						<v-text-field solo outlined dense v-model="form.reference_no"></v-text-field>
					</v-col> -->
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="name">Reference No*</label>
						<validation-provider name="Name" rules="required" v-slot="{ errors }">
							<v-text-field outlined solo dense label="Reference_no" v-model="form.reference_no"></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Location*</label>
						<v-autocomplete
							item-value="address"
							item-text="address"
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
						<label class="font-weight-bold">Supplier*</label>
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
						<label class="font-weight-bold">Account*</label>
						<v-autocomplete
							:items="accounts"
							item-text="name"
							item-value="name"
							solo
							outlined
							dense
							return-object
							v-model="form.account"
							label="Please select Account"
						></v-autocomplete>
					</v-col>

					<v-col cols="12">
						<label class="font-weight-bold">Select Product</label>
						<div>
							<v-autocomplete
								dense
								solo
								item-text="name"
								item-value="name"
								return-object
								:items="products"
								@input="addTocart"
							></v-autocomplete>
						</div>
					</v-col>
				</v-row>
				<div>
					<label class="font-weight-bold mb-3">Product Table</label>
					<table class="tableReturn">
						<thead>
							<tr class="tableReturn--header">
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
							<tr class="tableReturn--td" v-for="(item, index) in form.products" :key="index">
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
								<td class="py-5" colspan="2">Total</td>
								<td colspan="3">{{ Qty }}</td>
								<td>USD {{ Total | formatMoney }}</td>
							</tr>
						</tbody>
					</table>
				</div>

				<v-row>
					<v-col md="6" cols="12">
						<div class="d-flex flex-column mb-5">
							<label for class="font-weight-bold">Return Note</label>
							<textarea cols="30" rows="5" class="textarea" v-model="form.return_des"></textarea>
						</div>
					</v-col>
					<v-col md="6" cols="12">
						<div class="d-flex flex-column mb-5">
							<label for class="font-weight-bold">Staff Note</label>
							<textarea cols="30" rows="5" class="textarea" v-model="form.staff_des"></textarea>
						</div>
					</v-col>
				</v-row>
			</div>
			<v-btn @click.prevent="updateReturn" class="green darken-2 mx-5 darken-2 mb-5 grey--text text--lighten-4">
				<v-icon>mdi-check</v-icon>Update
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	import Vue from "vue";

	let numeral = require("numeral");

	Vue.filter("formatMoney", function(value) {
		return numeral(value).format("00,00.00");
	});
	

	export default {
		name: "editReturn",

		created() {
			this.fetchReturn();
			this.fetchLocation();
			this.fetchSupplier();
			this.fetchAccount();
			this.fetchProduct();
		},

		data() {
			return {
				form: {
					products: []
				},
				suppliers: [],
				locations: [],
				products: [],
				returnpurchase: [],
				accounts: []
			};
		},

		computed: {
			Qty() {
				return this.form.products.reduce((total, item) => {
					return total + Number(item.quantity);
				}, 0);
			},

			Total() {
				return this.form.products.reduce((total, item) => {
					let subtotal =
						(item.unit_price -
							(item.unit_price * item.discount) / 100) *
						item.quantity;
					return total + subtotal;
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

			fetchLocation() {
				this.$axios
					.$get(`api/location`)
					.then(res => {
						this.locations = res.locations.data;
						// this.$set(this.$data, "locations", res.locations.data);
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
						this.suppliers = res.suppliers.data;
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			fetchAccount() {
				this.$axios
					.$get(`api/account`)
					.then(res => {
						this.accounts = res.account;
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
						this.products = res.products.data;
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});
			},

			fetchReturn() {
				this.$axios
					.$get(`api/return-purchase/` + this.$route.params.id)
					.then(res => {
						this.$set(this.$data, "form", res.returnpurchase);

						for (let i in this.form.products) {
							Vue.set(
								this.form.products[i],"quantity",
								this.form.products[i].pivot.quantity
							);
							Vue.set(
								this.form.products[i],"unit_price",
								this.form.products[i].pivot.unit_price
							);
							Vue.set(
								this.form.products[i],"discount",
								this.form.products[i].pivot.discount
							);
							console.log(this.form.products)
						}
						console.log(res)
					})
					
					.catch(err => {
						console.log(res.response);
					});
			},
			addTocart(item) {
				if (this.form.products.includes(item)) {
					alert("Item already there");
				} else {
					this.form.products.push(item);
				}
				Vue.set(item, "quantity", 1);
				Vue.set(item, "discount", 0);
			},

			updateReturn() {
				this.$axios
					.$patch(`api/return-purchase/` + this.form.id, {
						branch: this.form.branch,
						products: this.form.products,
						supplier: this.form.supplier,
						account: this.form.account,
						return_des: this.form.return_des,
						staff_des: this.form.staff_des,
						reference_no: this.form.reference_no
					})
					.then(res => {
						// this.returnpurchase = res.data;
						this.$set(this.$data, "returnpurchase", res.returnpurchase);
						this.$router.push(`/return/return-purchase/view`);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
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

	.tableReturn {
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
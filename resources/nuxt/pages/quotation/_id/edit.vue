<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="green darken-2">
				<v-card-title class="white--text">Edit​ Quotation</v-card-title>
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
						<label class="font-weight-bold">Customer*</label>
						<v-autocomplete
							:items="members"
							item-text="name"
							item-value="name"
							solo
							outlined
							dense
							return-object
							v-model="form.member"
							label="Please select Account"
						></v-autocomplete>
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold">Biller*</label>
						<v-autocomplete
							:items="billers"
							item-text="name"
							item-value="name"
							solo
							outlined
							dense
							return-object
							v-model="form.biller"
							label="Please select Account"
						></v-autocomplete>
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
						<label class="font-weight-bold">Status</label>
						<v-select
							solo
							outlined
							dense
							label="Pending"
							:items="status"
							v-model="form.status"
						></v-select>
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
									<input 
										type="number" 
										class="table-quantity" 
										v-model="form.products[index].quantity" 
									/>
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
					<v-col cols="12" class="d-flex flex-column">
						<label for="" class="font-weight-bold pt-1" >Attach Document</label>
						<v-spacer></v-spacer>
						<v-file-input 
						label="File input" 
						outlined 
						dense 
						small-chips multiple 
						show-size 
						counter
						v-model="file"
						></v-file-input>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12">
						<div class="d-flex flex-column mb-5">
							<label for class="font-weight-bold">Note</label>
							<textarea cols="30" rows="5" class="textarea" v-model="form.description"></textarea>
						</div>
					</v-col>
				</v-row>
			</div>
			<v-btn @click.prevent="update" class="green darken-2 mx-5 darken-2 mb-5 grey--text text--lighten-4">
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
		name: "editQuote",

		created() {
			this.fetchQuote();
			this.fetchLocation();
			this.fetchSupplier();
			this.fetchBiller();
			this.fetchMember();
			this.fetchProduct();
			this.fetchSearch();
		},

			watch: {
				search:{
					handler(){
						this.fetchSearch();
					}
				},
			},

		data() {
			return {
				form: {
					products: []
				},
				suppliers: [],
				locations: [],
				products: [],
				quotation: [],
				billers: [],
				status:["Pending", "Sent"],
				members:[],
				file:[],
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
			fetchSearch(){
				this.$axios.$get(`/api/quotation?search=${this.search}`)
				.then(res =>{
					this.items = res.quotation.data;
					console.log(res);
				})
				.catch(err =>{
					console.log(err.response);
				})
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
				this.$axios.$get(`api/supplier`)
				.then(res => {
					this.suppliers = res.suppliers.data;
					console.log(res);
				})
				.catch(err => {
					console.log(err.response);
				});
			},
			fetchBiller() {
				this.$axios.$get(`api/biller`)
				.then(res => {
					this.billers = res.billers.data;
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

			fetchQuote() {
				this.$axios.$get(`api/quotation/` + this.$route.params.id)
				.then(res => {
					this.$set(this.$data, "form", res.quotation);

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

			update() {
				this.$axios
					.$patch(`api/quotation/` + this.form.id, {
						branch: this.form.branch,
						products: this.form.products,
						supplier: this.form.supplier,
						member: this.form.member,
						biller: this.form.biller,
						description: this.form.description,
						shipping_cost: this.form.shipping_cost,
						status: this.form.status,
						file: this.form.file
					})
					.then(res => {
						// this.quotation = res.data;
						this.$set(this.$data, "quotation", res.quotation);
						this.$router.push(`/quotation/quotations`);
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
	.quotationCsv {
		border: 1px solid rgba(0,0,0,0.300);
		padding: 3px 0px 3px 10px;
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
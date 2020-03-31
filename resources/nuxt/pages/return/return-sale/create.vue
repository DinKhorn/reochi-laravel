<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="py-3 px-5 green darken-2" > 
				<h3 class="white--text">Add Return Sale</h3>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<v-row>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Reference No *</label>
						<validation-provider name="Name" rules="required" v-slot="{ errors }">
							<v-text-field 
							outlined 
							solo 
							dense 
							label="Reference no..." 
							v-model="form.reference_no"
							></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold" for="address">location*</label>
						<v-autocomplete 
							item-value="address" 
							item-text="address"  
							dense 
							solo 
							outlined 
							return-object
							v-model="form.location"
							:items="locations"
							label="Please type, product code and select..."
						></v-autocomplete >
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold" for="name">Customer*</label>
						<v-autocomplete 
							item-value="name" 
							item-text="name"  
							dense 
							solo 
							outlined 
							return-object
							:items="members"
							v-model="form.member"
							label="Please type, product code and select..."
						></v-autocomplete >
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold" for="name">Account*</label>
						<v-autocomplete 
							item-value="name" 
							item-text="name"
							solo 
							outlined 
							dense 
							return-object
							label="Select Account ..." 
							:items="accounts"
							v-model="form.account"
						></v-autocomplete>
						
					</v-col>
					<v-col cols="12">
						<label class="font-weight-bold">Select Product</label>
						<div>
							<v-autocomplete
								:items="products"
								label="Please type, select product..."
								dense
								solo
								return-object
								item-text="name"
								item-value="name"
								@input="addTocart"
							></v-autocomplete>
						</div>
					</v-col>
				</v-row>
				<div>
					<label class="font-weight-bold mb-3">Order Table</label>
					<table class="tableReturn">
						<thead>
							<tr class="tableReturn--header">
								<td>Name</td>
								<td>Code</td>
								<td>Quantity</td>
								<td>Unit Price</td>
								<td>Discount</td>
								<td>SubTotal</td>
								<td>Actions</td>
							</tr>
						</thead>
						<tbody>
							<tr class="tableReturn--td" v-for="(item, index) in form.items" :key="index">
								<td>{{item.name}}</td>
								<td>{{item.code}}</td>
								<td>
									<validation-provider rules="required" v-slot="{ errors }">
										<input
											type="number"
											class="table-order"
											name="form.items[index].quantity"
											v-model="form.items[index].quantity"
											placeholder="0.00"
										/>
										<span>{{ errors[0] }}</span>
									</validation-provider>
								</td>
								<td>
									<input
										type="number"
										class="table-order"
										v-model="form.items[index].unit_price"
										placeholder="0.00"
									/>
								</td>
								<td>
									<input
										type="number"
										class="table-order"
										name="form.items[index].discount"
										v-model="form.items[index].discount"
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
								<td class="py-5" colspan="2" >Total</td>
								<td colspan="3">{{ Qty }}</td>
								<td>USD {{ Total | formatMoney }}</td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
				<v-row>
					<!-- <v-col md="12" cols="12" class="d-flex flex-column mb-5">
						<label for="" class="font-weight-bold pt-1">Attach Document</label>
						<input type="file" @change="uploadFile($event)" class="attachDoc">
					</v-col> -->
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
			<v-btn 
				@click.prevent="createReturnSale"
				class="green darken-2 mx-5 darken-2 mb-5 grey--text text--lighten-4"
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
		name: "CreateReturnSale",
		
		created(){
			this.fetchLocation(),
			this.fetchMember(),
			this.fetchAccount(),
			this.fetchProduct()
			// this.fetchReturnSale()
		},

		data() {
			return {

				form: {
					items: []
				},
				returnsale: [],
				locations:[],
				members:[],
				accounts:[],
				products:[],
				itemsPerPage: 5,
			};
		},

		computed: {
			Qty() {
				return this.form.items.reduce((total, item) => {
					return total + Number(item.quantity);
				}, 0);
			},
		
			Total() {
				return this.form.items.reduce((total, item) => {
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

			fetchLocation(){
				this.$axios.$get(`api/location`)
				.then(res =>{
					this.locations = res.locations.data;
					console.log(res)
				})
				.catch(err => {
					consle.log(err.response);
				});
			},

			fetchMember(){
				this.$axios.$get(`api/member`)
				.then(res =>{
					this.members = res.members.data;
					console.log(res)
				})
				.catch(err => {
					console.log(err.response);
				});
			},

			fetchAccount(){
				this.$axios.$get(`api/account`)
				.then(res =>{
					this.accounts = res.account;
					console.log(res)
				})
				.catch(err => {
					console.log(err.response);
				});
			},

			fetchProduct(){
				this.$axios.$get(`api/product`)
				.then(res =>{
					this.products = res.products.data;
					console.log(res)
				})
				.catch(err =>{
					console.log(err.response);
				})
			},
			
			createReturnSale() {
		    	this.$axios.$post(`api/return-sale`, this.form)
				.then(res => {
					this.$set(this.$data, "returnsales" , res.data);
					this.$router.push(`/return/return-sale/view`);
					console.log(res);
				})
				.catch(err => {
					console.log(err.response);
					this.$toast.error("Pleases fill required field");
				});
			},
			
			addTocart(item) {
				if (this.form.items.includes(item)) {
					alert("already there");
				} 
				else {
					this.form.items.push(item);
					console.log(item);
				}
				Vue.set(item, 'quantity', 1);
				Vue.set(item, 'discount', 0);
			},

			removeItem(index) {
				this.form.items.splice(index, 1);
			},
		}
	};
</script>

<style lang="scss">
	.textarea {
		border: 1px solid rgba(0, 0, 0, 0.125);
		outline: 1px solid #461577;
	}

	.attachDoc {
		padding: 3px 10px 3px 10px;
		border: 1px solid rgba(0, 0, 0, 0.2);
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
	.table-order {
		border: 1px solid rgba(0, 0, 0, 0.125);
		padding: 5px 10px 5px 10px;
		margin-top: 5px;
		margin-bottom: 5px;
	}
</style>
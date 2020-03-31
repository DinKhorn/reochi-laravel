<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="py-3 px-5 green darken-2" >
				<h3 class="white--text">
					Add Quotation
				</h3>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<v-row>
					<v-col md="4" cols="12">
						<label class="font-weight-bold" for="name">Biller*</label>
						<v-autocomplete 
							item-value="name" 
							item-text="name"  
							dense 
							solo 
							outlined 
							return-object
							v-model="form.biller"
							:items="billers"
							label="Please type, select..."
						>
						</v-autocomplete >
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold" for="name">Supplier*</label>
						<v-autocomplete 
							item-value="name" 
							item-text="name"  
							dense 
							solo 
							outlined 
							return-object
							v-model="form.supplier"
							:items="suppliers"
							label="Please type, select..."
						>
						</v-autocomplete >
					</v-col>
					
					<v-col md="4" cols="12">
						<label class="font-weight-bold" for="name">Customer*</label>
						<v-autocomplete 
							item-value="name" 
							item-text="name"  
							dense 
							solo 
							outlined 
							return-object
							v-model="form.member"
							:items="members"
							label="Please type, select..."
						>
						</v-autocomplete >
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold" for="address">Warehouse*</label>
						<v-autocomplete 
							item-value="address" 
							item-text="address"  
							dense 
							solo 
							outlined 
							return-object
							v-model="form.location"
							:items="locations"
							label="Please type, select..."
						>
						</v-autocomplete >
					</v-col>
					<v-col md="4" cols="12">
						<label for="" class="font-weight-bold">Shipping Cost*</label>
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
						<label for="" class="font-weight-bold">Status*</label>
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
						<v-autocomplete
							solo
							outlined
							dense
							label="Please type product code and select"
							:items="products"
							item-text="name"
							item-value="name"
							return-object
							@input="addTocart"
						></v-autocomplete>
					</v-col>
				</v-row>
				<div>
					<label class="font-weight-bold mb-3">Order Table</label>
					<table class="quote">
						<thead>
							<tr class="quote--header">
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
							<tr class="quote--td" v-for="(item, index) in form.items" :key="index">
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
								<!-- <td>
									<input type="text" class="table-order" v-model=" form.items[index].unit_price">
								</td> -->
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
								<td class="py-3" colspan="2">Total</td>
								<td colspan="3">{{ calculateQty }}</td>
								<td>USD {{ calculateTotal | formatMoney }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- <v-row>
					<v-col cols="12" class="d-flex flex-column">
						<label for="" class="font-weight-bold pt-1">Attach Document</label>
						<input type="file" @change="uploadFile($event)" class="quotationCsv">
					</v-col>
				</v-row> -->
				<v-row>
					<v-col cols="12" class="d-flex flex-column">
						<label for="" class="font-weight-bold pt-4" >Attach Document</label>
						<v-spacer></v-spacer>
						<v-file-input 
						label="File input" 
						outlined 
						dense 
						small-chips multiple 
						show-size 
						counter
						type="file"
						></v-file-input>
					</v-col>
				</v-row>
				<div class="d-flex flex-column mb-5">
					<label for="" class="font-weight-bold ">Note</label>
					<textarea cols="30" rows="5" class="textarea"></textarea>
				</div>
				<v-btn 
					class="green darken-2 mb-5 white--text" 
					dark 
					@click.prevent="createQuotation"
					>
					<v-icon>mdi-check</v-icon>
					Submit
				</v-btn>
			</div>
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
		name: "addQuotation",

		created(){
			this.fetchBiller();
			this.fetchSupplier();
			this.fetchMember();
			this.fetchLocation();
			this.fetchProduct()
		},

		data() {
			return {
				form: {
					items: []
				},
				locations:[],
				suppliers:[],
				billers:[],
				members:[],
				products:[],
				status:["Pending", "Sent"],
				itemsPerPage: 5,
			}
		},
		computed: {
			calculateQty() {
				return this.form.items.reduce((total, item) => {
					return total + Number(item.quantity);
				}, 0);
			},

			calculateTotal() {
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
					console.log(err.response);
				});
			},

			fetchSupplier(){
				this.$axios.$get(`api/supplier`)
				.then(res =>{
					this.suppliers = res.suppliers.data;
					console.log(res)
				})
				.catch(err => {
					console.log(err.response);
				});
			},

			fetchBiller(){
				this.$axios.$get(`api/biller`)
				.then(res =>{
					this.billers = res.billers.data;
					console.log(res)
				})
				.catch(err => {
					console.log(err.response);
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
			createQuotation() {
		    	this.$axios.$post(`api/quotation`, this.form)
				.then(res => {
					this.$set(this.$data, "quotations" , res.data);
					this.$router.push(`/quotation/quotations`);
					this.$toast.success("Added Quotation Successfully");
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
				} else {
					this.form.items.push(item);
					console.log(item);
				}
				Vue.set(item, 'quantity', 1);
				Vue.set(item, 'discount', 0);
			},

			removeItem(index) {
				this.form.items.splice(index, 1);
			},
			uploadFile(event) {
				const url = 'http://127.0.0.1:3000/product/add_adjustment';
				let data = new FormData();
				data.append('file', event.target.files[0]);
				let config = {
					header: {
						'content-Type' : 'image/*, application/pdf'
					}
				}
				this.$axios.$post(url,data,config)
				.then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss">

	.textarea {
		border: 1px solid rgba(0,0,0,0.125);
		outline: 1px solid #461577;
	}
	
	.quotationCsv {
		border: 1px solid rgba(0,0,0,0.300);
		padding: 3px 0px 3px 10px;
	}
	.quote {
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
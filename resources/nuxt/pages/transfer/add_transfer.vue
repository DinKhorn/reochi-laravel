<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="blue ligthen-2">
				<v-card-title class="white--text px-5">
					Add Transfer
				</v-card-title>
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
						<label >Location(From)*</label>
						<validation-provider rules="required" v-slot="{ errors }">
							<v-autocomplete 
								:items="locations"
								solo
								outlined
								dense
								item-text="name"
								item-value="name"
								v-model="form.from_location"
							>
							</v-autocomplete>
							<span class="transfer--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col md="6" cols="12">
						<label >Location(To)*</label>
						<validation-provider rules="required" v-slot="{ errors }">
							<v-autocomplete 
								:items="locations"
								solo
								outlined
								dense
								item-text="name"
								item-value="name"
								v-model="form.to_location"
							>
							</v-autocomplete>
							<span class="transfer--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col md="6" cols="12">
						<label >Status</label>
						<validation-provider rules="required" v-slot="{ errors }">
							<v-select 
								dense
								outlined
								solo
								:items="status"
								v-model="form.status"
							>
							</v-select>
							<span class="transfer--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col md="6" cols="12">
						<label for="" >Shipping Cost</label>
						<validation-provider rules="required" v-slot="{ errors }" name="Shipping Cost">
							<v-text-field solo outlined dense v-model="form.shipping_charge"></v-text-field>
							<span class="transfer--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col cols="12">
						<label >Select Product</label>
						<validation-provider rules="required" v-slot="{ errors }">
							<v-autocomplete 
								:items="products"
							    dense
							    solo
							    item-text="name"
							    item-value="name"
							    return-object
							    @input="addTocart"
							></v-autocomplete>
							<span class="transfer--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
				</v-row>
				<div>
					<table class="tablePurchase">
						<thead>
							<tr  class="tablePurchase--header">
								<td>Name</td>
								<td>Code</td>
								<td>Quantity</td>
								<td>Unit Price</td>
								<td>Total</td>
								<td>Actions</td>
							</tr>
						</thead>
						<tbody>
							<tr class="transfer--add" v-for="(item, index) in form.products" :key="index">
								<td>{{item.name}}</td>
								<td>{{item.code}}</td>
								<td>
									<input type="number" class="table-qty" v-model="item.quantity">
								</td>
								<td>
									<input type="number" v-model="item.price" class="table-qty">
								</td>
								<td>USD {{ item.quantity * item.price | formatNumber }}</td>
								<td>
	                              	<v-btn icon color="red" outlined @click="removeItem(index)">
	                              		<v-icon small>mdi-delete</v-icon>
	                              	</v-btn>
	                           </td>
							</tr>
							<tr>
								<td class="py-3" colspan="2">Total</td>
								<td colspan="2">{{ totalQty }}</td>
								<td>USD {{ grandTotal | formatNumber }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				</div>
				<div class="d-flex px-5 flex-column mb-5">
					<label for="">Note</label>
					<textarea cols="30" rows="7" class="textarea" v-model="form.description"></textarea>
				</div>
			</div>
			<v-btn  @click="createTransfer" class="blue mx-5 mb-5 darken-2" dark v-permission="'add transfer'">
				<v-icon>mdi-check</v-icon>
				Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	import Vue from 'vue';
	var numeral = require("numeral");
	Vue.filter("formatNumber", function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		name: "AddTransfer",
		created() {
			this.fetchData()
			this.fetchProduct()
			this.fetchLocation()
		},

		data() {
			return {
				orders: [],
				locations: [],
				form: {
					products: [],
				},
				items: [],
				products: [],
				headers: [
					{
						text: 'Name',
						sortable: false,
					},
					{
						text: 'Code',
						sortable: false,
					},
					{
						text: 'Quantity',
						sortable: false,
					},
					{
						text: 'Net Unit Cost',
						sortable: false,
					},,
					{
						text: 'Tax',
						sortable: false,
					},
					{
						text: 'SubTotal',
						sortable: false,
					},
					{
						text: 'Action',
						sortable: false,
					},
				],
				status: ['Completed', 'Pending', 'Sent'],
			}
		},

		computed: {
			totalQty() {
				return this.form.products.reduce((total,item) => {
					return total + Number(item.quantity);
				}, 0);
			},

			grandTotal() {
				return this.form.products.reduce((total, item) => {
					return total + (item.quantity * item.price);
				}, 0);
			}
		},

		methods: {
			fetchLocation() {
				this.$axios.$get(`api/location`)
				.then(res => {
					this.locations = res.locations.data;
					console.log(res);
				})
				.catch(err => {
					console.log(err)
				})
			},

			fetchProduct() {
				this.$axios.$get(`api/product`)
				.then(res => {
					this.products = res.products.data;
					console.log(res);
				})
				.catch(err =>  {
					console.log(err.response);
				})
			},

			fetchData() {
				this.$axios.$get(`api/transfer`)
				.then(res => {
					this.items = res.transfer.data;
					console.log(res.transfer);
				}).catch(err => {
					console.log(err.response);
				})
			},

			createTransfer() {
				this.$axios.post(`api/transfer`, this.form)
				.then(res => {
					this.items = res.data;
					this.$router.push(`/transfer/transfers`)
					console.log(res);
				})
				.catch(err => {
					console.log(err.response)
				})
			},

			addTocart(item) {
				if(this.form.products.includes(item)) {
					Vue.set(item, 'quantity', 1);
				}else {
		          	this.form.products.push(item);
		        }

		        Vue.set(item, 'quantity', 1);
			},

			removeItem(index) {
				this.form.products.splice(index, 1)
			},
		}
	}
</script>

<style lang="scss">

	.textarea {
		border: 1px solid rgba(0,0,0,0.125);
		outline: 1px solid #60e688;
	}
	
	.quotationCsv {
		border: 1px solid rgba(0,0,0,0.300);
		padding: 3px 0px 3px 10px;
		border: 1px solid #60e688;
	}

	.transfer--input {
		border: 1px solid #60e688;
		width: 100%;
		padding: 5px 10px 5px 10px;
		outline: none;
		border-radius: 3px;
	}

	.transfer--text {
		color: red;
	}

	.tablePurchase {
		width: 100%;
		margin-top: 10px;
		border-collapse: collapse;
		&--header {
			font-weight: 500;
			text-align: left;
			border-bottom: 1px solid rgba(0,0,0,0.125);
		}
		
		&--td {
			border-bottom: 1px solid rgba(0,0,0,0.125);
		}
	}

	.table-qty {
		border: 1px solid rgba(0,0,0,0.125);
		padding: 5px;
		margin-top: 5px;
		outline: none;
	}

	.transfer--add {
		width: 100%;
		border-collapse: collapse;
	}
	
	.v-select .dropdown-toggle .clear {
	    display: none;
	}

</style>	
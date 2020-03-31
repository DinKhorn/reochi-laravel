<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="px-5 cyan darken-3 white--text">
				<v-card-title>
					Print Barcode
				</v-card-title>
			</div>
			<v-divider></v-divider>
			<div class="px-5 pt-5">
				<div class="d-flex flex-column">
					<label>Add Product *</label>
					<v-autocomplete
						solo
						outlined
						dense
						v-model="form.name"
						append-icon="mdi-barcode"
						label="Please type, product code and select..."
						:items="items"
						item-text="name"
						item-value="name"
						return-object
						@input="addToCart"
					>
					</v-autocomplete>
				</div>
				<div>
					<table class="tableBarcode">
						<thead>
							<tr class="tableBarcode--tr">
								<th>Name</th>
								<th>Code</th>
								<th>Quantity</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in orders" :key="index">
								<td>{{ item.name }}</td>
								<td>{{ item.code }}</td>
								<td>
									<input type="number" v-model="item.unit" class="tableBarcode--input">
								</td>
								<td>
									<v-btn @click="remove(index)" small outlined icon color="red">
										<v-icon small>mdi-delete</v-icon>
									</v-btn>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<v-row class="pl-5">
				<v-col sm="3" cols="6" class="d-flex align-center">
					<label for="">Print</label>
					<v-checkbox></v-checkbox>
				</v-col>
				<v-col sm="3" cols="6" class="d-flex align-center">
					<label for="">Product Name</label>
					<v-checkbox></v-checkbox>
				</v-col>
				<v-col sm="3" cols="6" class="d-flex align-center">
					<label for="">Price</label>
					<v-checkbox></v-checkbox>
				</v-col>
				<v-col sm="3" cols="6" class="d-flex align-center">
					<label for="">Promotion Price</label>
					<v-checkbox></v-checkbox>
				</v-col>
			</v-row>
			<v-btn class="blue mx-5 lighten-2 mb-5 grey--text text--lighten-4">
				<v-icon>mdi-check</v-icon>
				Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		name: 'ProductBarcode',
		created() {
			this.fetchData()
		},

		data() {
			return {
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
						text: 'Action',
						sortable: false,
					},
				],

				items: [],
				orders: [],
				form: {},
			}
		},

		methods: {
			fetchData() {
				this.$axios.$get(`api/product`)
				.then(res => {
					this.items = res.products.data;
					console.log(res);
				})
				.catch(err => {
					console.log(err.response);
				})
			},

			remove(index) {
				this.orders.splice(index, 1);
			},

			addToCart(item) {
				if(this.orders.includes(item)) {
		          	alert("already there");
		        }else {
		          	this.orders.push(item);
		        }

		        // item.unit = 1;
			}
		}
	}
</script>

<style lang="scss">
	.tableBarcode {
		width: 100%;
		text-align: left;
		border-collapse: collapse;
	
		&--tr {
			border-bottom: 1px solid rgba(0,0,0,0.125);
		}

		&--input {
			border: 1px solid rgba(0,0,0,0.125);
			padding: 5px 10px 5px 10px;
			outline: none;
		}
	}
</style>
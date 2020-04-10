<template>
	<div>
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
						<td>Subtotal</td>
						<td>Actions</td>
					</tr>
				</thead>
				<tbody>
					<tr class="tableOrder--td" v-for="(item, index) in form.items" :key="index">
						<td>{{item.product ? item.product.code : null}}</td>
						<td>{{item.product ? item.product.name : null}}</td>

						<td>
							<validation-provider rules="required" v-slot="{ errors }">
								<input
									type="number"
									class="table-quantity"
									name="item.quantity"
									v-model.number="item.quantity"
								/>
								<span>{{ errors[0] }}</span>
							</validation-provider>
						</td>
						<td>
							<input
								type="number"
								class="table-quantity"
								name="item.unit_price"
								v-model.number="item.unit_price"
								placeholder="0.00"
							/>
						</td>
						<td>{{ item.subtotal }}</td>
						<td>
							<v-btn small color="red" outlined @click="removeItem(index)">
								<v-icon>mdi-delete</v-icon>
							</v-btn>
						</td>
					</tr>
					<tr>
						<td class="py-3" colspan="2">Total</td>
						<td colspan="3">{{ calculateQty }}</td>
						<td>USD {{ form.total}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="d-flex flex-column mb-5">
			<label for>Note</label>
			<textarea cols="30" rows="7" class="textarea" v-model="form.description"></textarea>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		form: {
			required: true,
			type: Object,
			default: () => {
				return {
					items: []
				};
			}
		}
	},
	data() {
		return {
			outlets: [],
			products: [],
			orders: [],
			order_status: ["New", "Accepted", "Received", "Cancel"],
			payment_status: ["Paid", "Due"],
			locations: []
		};
	},

	watch: {
		"form.items": {
			handler() {
				var total = 0;
				var items = this.form.items;
				for (var i = 0; i < items.length; i++) {
					this.form.items[i].subtotal =
						items[i].quantity * items[i].unit_price;
					total += this.form.items[i].subtotal;
				}

				this.form.items = items;
				this.form.total = total;
			},
			immediate: true,
			deep: true
		}
	},

	methods: {
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
		},

		fetchOutlet() {
			this.$axios
				.$get(`api/outlets`)
				.then(res => {
					this.outlets = res.outlets.data;
					// console.log(res);
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
					// console.log(res);
				})
				.catch(err => {
					console.log(err.response);
				});
		},

		addTocart(item) {
			var items = this.form.items;

			for (var i = 0; i < items.length; i++) {
				if (items[i].product_id == item.id) {
					this.form.items[i].quantity += 1;
					return;
				}
			}

			this.form.items.push({
				product: item,
				product_id: item.id,
				quantity: 1,
				unit_price: item.price
			});
		},

		removeItem(index) {
			this.form.items.splice(index, 1);
		},

		discountedPrice(product) {
			return (
				(product.unit_price -
					(product.unit_price * product.discount) / 100) *
				product.quantity
			);
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
				let s =
					(item.unit_price -
						(item.unit_price * item.discount) / 100) *
					item.quantity;
				return total + s;
			}, 0);
		}
	},

	created() {
		this.fetchData();
		this.fetchOutlet();
		this.fetchLocation();
	}
};
</script>


<style lang="scss" >
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
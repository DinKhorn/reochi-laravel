<template>
	<v-app>
		<v-row>
			<v-col cols="12" md="7">
				<v-card class="px-5 pb-5">
					<!-- Dialog of Discount -->
					<v-dialog v-model="dialog" width="500">
						<v-card>
							<v-card-title primary-title>Discount</v-card-title>
							<v-divider></v-divider>
							<div class="discount">
								<label>Discount Percent:</label>
								<input type="number" class="discount-input" v-model="form.discount" placeholder="0" />
							</div>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="primary" @click="dialog = false">Save</v-btn>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-row>
						<!-- Product Calculate -->
						<v-col cols="12">
							<v-autocomplete
								:items="customers"
								dense
								solo
								outlined
								item-text="name"
								item-value="name"
								label="Select Customer"
								return-object
								v-model="form.member"
							></v-autocomplete>
						</v-col>
						<v-col cols="12">
							<div class="pos-product">
								<table class="tablePOS">
									<thead>
										<tr class="tablePOS--tr">
											<v-row>
												<v-col cols="2">
													<th>Product</th>
												</v-col>
												<v-col cols="2">
													<th>Quantity</th>
												</v-col>
												<v-col cols="3">
													<th>Price</th>
												</v-col>
												<v-col cols="3">
													<th>SubTotal</th>
												</v-col>
												<v-col cols="2">
													<th>Action</th>
												</v-col>
											</v-row>
										</tr>
									</thead>
									<tbody>
										<tr class="tablePOS--td" v-for="(item, index) in form.items" :key="index">
											<v-row>
												<v-col cols="2">
													<td>{{ item.name }}</td>
												</v-col>
												<v-col cols="2">
													<td>
														<!-- <input class="tablePOS--input" type="number" v-model="form.items[index].quantity" /> -->
														<span>
															<v-btn @click="minusItem(item)" small color="red" outlined icon>
																<v-icon small>mdi-minus</v-icon>
															</v-btn>
														</span>
														<span class="px-1">{{ form.items[index].quantity }}</span>
														<span>
															<v-btn @click="plusItem(item)" small color="primary" outlined icon>
																<v-icon small>mdi-plus</v-icon>
															</v-btn>
														</span>
													</td>
												</v-col>
												<v-col cols="3">
													<td>
														<input class="tablePOS--input" type="number" v-model="form.items[index].unit_price" />
													</td>
												</v-col>
												<v-col cols="3">
													<td>$ {{ subTotal(item) | formatMoney }}</td>
												</v-col>
												<v-col cols="2">
													<v-btn outlined color="red" small @click="removeProduct(index)">
														<v-icon small>mdi-delete</v-icon>
													</v-btn>
												</v-col>
											</v-row>
										</tr>
									</tbody>
								</table>
							</div>
						</v-col>

						<!-- Show Product -->
						<v-col cols="12">
							<v-card>
								<table class="pos-footer">
									<tr>
										<v-row>
											<v-col md="3" cols="12">
												<td class="d-flex flex-column">
													<span class="pos-footer--item">Item:</span>
													<span>{{ Qty }}</span>
												</td>
											</v-col>
											<v-col md="3" cols="12">
												<td class="d-flex flex-column">
													<span class="pos-footer--item">Shipping Cost:</span>
													<!-- <span>USD {{ formatMoney }}</span> -->
												</td>
											</v-col>
											<v-col md="3" cols="12">
												<td class="d-flex flex-column">
													<span class="pos-footer--item">Discount:</span>
													<span>
														$ {{ discount }}
														<v-btn class="mx-3" small outlined color="primary" @click="addDiscount">
															<v-icon small>mdi-pencil</v-icon>
														</v-btn>
													</span>
												</td>
											</v-col>
											<v-col md="3" cols="12">
												<div class="d-flex flex-column">
													<span class="pos-footer--item">Total:</span>
													<span>USD {{totalPrice - discount | formatMoney }}</span>
												</div>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12">
												<span class="pos-footer--item">Total Payable:</span>
												USD {{totalPrice | formatMoney }}
											</v-col>
										</v-row>
									</tr>
								</table>

								<!-- Dialog of Payment-->
								<div class="posPayment">
									<ValidationObserver ref="dialog">
										<v-row>
											<v-col cols="12">
												<v-dialog v-model="dialog2" max-width="900">
													<template v-slot:activator="{ on }">
														<button @click="openDialog" class="posPayment-cash" v-on="on">
															<v-icon dark>mdi-check</v-icon>Payment
														</button>
													</template>
													<v-card>
														<v-card-title class="headline green darken-1 white--text">Payment</v-card-title>
														<v-divider></v-divider>
														<v-card-text>
															<v-row>
																<v-col cols="9">
																	<v-row>
																		<v-col cols="12">
																			<label for="biller" class="font-weight-bold">Biller</label>
																			<v-autocomplete
																				item-text="name"
																				item-value="name"
																				solo
																				dense
																				return-object
																				outlined
																				:items="biller"
																				label="Select Biller"
																			></v-autocomplete>
																		</v-col>
																		<v-col cols="6" class="d-flex flex-column">
																			<label class="font-weight-bold">Amount</label>
																			<validation-provider name="Amount" rules="required" v-slot="{ errors }">
																				<v-text-field
																					solo
																					outlined
																					dense
																					type="number"
																					v-model="form.paid"
																					:value="totalPrice"
																				></v-text-field>
																				<span class="red--text">{{ errors[0] }}</span>
																			</validation-provider>
																		</v-col>
																		<v-col cols="6">
																			<label class="font-weight-bold">Payment Method</label>
																			<validation-provider name="Payment Method" rules="required" v-slot="{ errors }">
																				<v-select
																					:items="payment_method"
																					solo
																					outlined
																					dense
																					v-model="form.payment_method"
																				></v-select>
																				<span class="red--text">{{ errors[0] }}</span>
																			</validation-provider>
																		</v-col>
																		<v-col cols="12" class="d-flex flex-column">
																			<label class="font-weight-bold">Payment Note</label>
																			<textarea
																				cols="30"
																				rows="5"
																				class="payment-description"
																				v-model="form.description"
																			></textarea>
																		</v-col>
																		<v-col cols="12">
																			<button class="btn-row">Add Payment Row</button>
																		</v-col>
																	</v-row>
																</v-col>
																<v-col cols="3">
																	<v-card>
																		<div class="card">
																			<span class="card--name">Total Item</span>
																			<span class="card--item">{{ Qty }}</span>
																		</div>
																		<div class="card">
																			<span class="card--name">Total Payable</span>
																			<span class="card--item">$ {{ totalPrice | formatMoney }}</span>
																		</div>
																	</v-card>
																</v-col>
															</v-row>
														</v-card-text>
														<v-card-actions>
															<v-spacer></v-spacer>
															<v-btn color="green darken-1" text @click="dialog2 = false">Cancel</v-btn>
															<v-btn color="primary" @click="addPayment">Add Payment</v-btn>
														</v-card-actions>
													</v-card>
												</v-dialog>
											</v-col>
										</v-row>
									</ValidationObserver>
								</div>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-col>

			<v-col cols="12" md="5">
				<v-card>
					<v-row>
						<v-col cols="12" class="px-5">
							<v-autocomplete
								:items="products"
								dense
								solo
								outlined
								item-text="name"
								item-value="name"
								label="Search Product"
								@input="addToCart"
								return-object
								v-model="form.products"
							></v-autocomplete>
						</v-col>
					</v-row>
					<v-row class="px-5">
						<v-col v-for="(item, index) in products" :key="index" cols="3">
							<v-card @click="addPos(item)" class="posCard">
								<div>
									<img class="posCard--pos-img" :src="baseURL + 'image/' + item.image" />
								</div>
								<div class="posCard--title">
									<span>{{ item.name }}</span>
								</div>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>

		<!-- Notification -->
		<div>
			<notifications class="notification" group="all" />
			<notifications class="notification" group="addedSale" />
		</div>
	</v-app>
</template>
<script>
	import Vue from "vue";

	let numeral = require("numeral");

	Vue.filter("formatMoney", function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		layout: "pos",
		name: "PosShop",
		created() {
			this.fetchProduct();
			this.fetchCustomer();
			this.fetchBiller();
		},
		data() {
			return {
				customers: [],
				dialog: false,
				dialog2: false,
				form: {
					discount: 10,
					items: []
				},
				products: [],
				dialog: false,
				biller: [],
				payment_method: ["Cash", "Credit Card"],
				baseURL: process.env.APP_URL
			};
		},

		computed: {
			Qty() {
				return this.form.items.reduce((total, item) => {
					return total + Number(item.quantity);
				}, 0);
			},

			discount() {
				// console.log(this.form.discount)
				return this.form.items.reduce((total, item) => {
					return (total =
						(item.unit_price * item.quantity * this.form.discount) /
						100);
					console.log(total);
				}, 0);
			},

			totalPrice() {
				return this.form.items.reduce((total, item) => {
					let s = item.unit_price * item.quantity;
					return total + s;
				}, 0);
			}
		},

		methods: {
			// Add POS
			addPayment() {
				this.$axios
					.post(`api/sale`, this.form)
					.then(res => {
						this.dialog2 = false;
						console.log(res);
						this.$notify({
							group: "addedSale",
							text: "Sale created successfully!!!",
							type: "success"
						});
						// this.$router.push(`/sale/pos/`);
					})
					.catch(err => {
						console.log(err.response);
						this.$refs.dialog.validate(err.response.data.errors);
					});
			},

			// Dialog of Payment
			openDialog() {
				if (this.form.items.length === 0) {
					this.$notify({
						group: "all",
						text: "There is no Product in Cart!!!",
						type: "warning"
					});
				}

				this.dialog2 = false;
			},

			fetchBiller() {
				this.$axios
					.$get(`api/biller`)
					.then(res => {
						Vue.set(this.$data, "biller", res.billers.data);
						console.log(res);
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
						//
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			fetchCustomer() {
				this.$axios
					.$get(`api/member`)
					.then(res => {
						this.$set(this.$data, "customers", res.members.data);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			addDiscount() {
				this.dialog = true;
			},

			// Add Product to Cart
			addPos(item) {
				if (this.form.items.includes(item)) {
					Vue.set(item, "quantity", (item.quantity += 1));
				} else {
					this.form.items.push(item);
					Vue.set(item, "quantity", 1);
					Vue.set(item, "unit_price", item.price);
				}
			},

			// Add Product to Card
			addToCart(item) {
				if (this.form.items.includes(item)) {
					Vue.set(item, "quantity", (item.quantity += 1));
				} else {
					this.form.items.push(item);
					Vue.set(item, "quantity", 1);
					Vue.set(item, "unit_price", item.price);
				}
			},

			// Remove Prouct from Cart
			removeProduct(index) {
				this.form.items.splice(index, 1);
			},

			// Add More Quantity
			plusItem(item) {
				if (this.form.items.includes(item)) {
					Vue.set(item, "quantity", (item.quantity += 1));
				}
				console.log(item);
			},

			// Minus Quantity of item
			minusItem(item) {
				Vue.set(item, "quantity", (item.quantity -= 1));
			},

			// Sum Price of Each Product in Cart
			subTotal(product) {
				return product.unit_price * product.quantity;
			}
		}
	};
</script>

<style lang="scss">
	.tablePOS {
		border-collapse: collapse;
		width: 100%;
		text-align: left;

		&--tr {
			font-weight: 400;
			border-bottom: 1px solid rgba(0, 0, 0, 0.125);
		}

		&--input {
			border: 1px solid rgba(0, 0, 0, 0.125);
			width: 100%;
			padding-left: 10px;
		}
	}

	.posCard {
		border: #000;
		display: flex;
		flex-direction: column;
		width: 100%;
		&--pos-img {
			height: auto;
			object-fit: inherit;
			display: block;
			margin-left: auto;
			margin-right: auto;
			overflow: hidden;
		}

		&--title {
			text-align: center;
			background: #efefef;
			padding-top: 5px;
			padding-bottom: 5px;
		}
	}

	.posCard:hover {
		outline: 1px solid #535561;
	}

	.pos-product {
		min-height: 40vh;
		max-height: 40vh;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.pos-footer {
		padding: 10px 10px 10px 10px;
		width: 100%;
		&--item {
			font-weight: 600;
		}
		border-bottom: 1px solid rgba(0, 0, 0, 0.125);
	}

	.discount {
		padding: 10px 20px 10px 20px;
		&-input {
			width: 100%;
			border: 1px solid #30b4a3;
			outline: none;
			padding: 5px 10px 5px 10px;
		}
	}

	.posPayment {
		&-cash {
			padding: 20px 50px 20px 50px;
			background: #008d4c;
			color: #ffffff;
		}
		&-cash:hover {
			background: #449d44;
		}
	}

	.notification {
		margin: 20px 10px;
		opacity: 0.8;
		.notification-content {
			padding: 10px 5px 10px 5px;
			// Style for content
			font-size: 15px;
		}

		&.warn {
			border-radius: 5px;
			background: #dba91f;
			border-left-color: #f48a06;
		}
	}

	.notification:hover {
		opacity: 1;
	}

	.payment-description {
		border: 1px solid rgba(0, 0, 0, 0.125);
		outline: none;
	}

	.btn-row {
		padding: 10px;
		background: #2b81d6;
		color: #fff;
	}

	.card {
		display: flex;
		flex-direction: column;
		padding: 10px 20px 20px 20px;
		// margin-bottom: 10px;

		&--name {
			padding-bottom: 10px;
		}

		&--item {
			border-bottom: 1px solid rgba(0, 0, 0, 0.125);
			font-size: 18px;
			padding-bottom: 10px;
		}
	}
</style>
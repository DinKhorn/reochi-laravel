<template>
	<v-app class="pa-5">
		<v-card>
			<v-card-title class="blue-grey lighten-4">Edit Outlet</v-card-title>
			<v-divider></v-divider>
			<p class="px-5 pt-3 font-italic grey--text">
				The field labels marked with
				<span class="red--text">*</span> are required input fields.
			</p>
			<div class="px-5">
				<v-row class="px-5">
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="name">
							Name
							<span class="red--text">*</span>
						</label>
						<validation-provider rules="required" v-slot="{ errors }">
							<v-text-field outlined solo dense label="Delivery Name" type="text" v-model="form.name"></v-text-field>
							<span class="text--error">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="email">
							Email
							<span class="red--text">*</span>
						</label>
						<validation-provider name="Email" rules="required|email" v-slot="{ errors }">
							<v-text-field outlined solo dense label="Email" v-model="form.email" required></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="phone">
							Phone Number
							<span class="red--text">*</span>
						</label>
						<validation-provider name="Phone Number" rules="required" v-slot="{ errors }">
							<v-text-field outlined solo dense label="Phone Number" v-model="form.phone" required></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="address">Address</label>
						<v-text-field outlined solo dense label="Address" v-model="form.address"></v-text-field>
					</v-col>
				</v-row>
				<v-btn class="mx-5 mb-5 mt-2" @click="update" color="primary" v-permission="'add users'">
					<v-icon left>mdi-check</v-icon>Update
				</v-btn>
			</div>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		name: "EditSale",
		created() {
			this.fetchData();
		},

		data() {
			return {
				form: {
					products: [],
					discount: 0,
					paid: 0,
					shipping_cost: 0
				},
				items: []
			};
		},
		methods: {
			fetchData() {
				this.$axios
					.$get(`api/delivery-man/` + this.$route.params.id)
					.then(res => {
						this.$set(this.$data, "form", res.deliveryman);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			update() {
				this.$axios
					.$patch(`api/delivery-man/` + this.form.id, {
						name: this.form.name,
						email: this.form.email,
						phone: this.form.phone,
						address: this.form.address
					})
					.then(res => {
						// this.sales = res.data;
						// this.$set(this.$data, "deliveryman", res.data);
						console.log(res);
						this.$router.push(`/delivery-man/list`);
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
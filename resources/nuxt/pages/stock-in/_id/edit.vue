<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">Edit Stock In</v-card-title>
			<v-divider></v-divider>

			<StockInForm :form="form" />
			<v-btn @click.prevent="createOrder" class="blue mx-5 darken-2 mb-5 grey--text text--lighten-4">
				<v-icon>mdi-check</v-icon>Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
import StockInForm from "@/components/forms/StockInForm";
export default {
	name: "EditOrder",
	components: {
		StockInForm
	},
	created() {
		this.fetchData();
		this.fetchOutlet();
		this.fetchLocation();
		this.setData();
	},

	data() {
		return {
			form: {
				items: []
			},
			outlets: [],
			products: [],
			orders: [],
			order_status: ["New", "Accepted", "Pending", "Received", "Cancel"],
			payment_status: ["Paid", "Due"],
			locations: []
		};
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
				// console.log(total + s);
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

			// this.$axios
			// 	.$get(`api/location`)
			// 	.then(res => {
			// 		// this.locations = res.locations.data;
			// 		this.$set(this.$data, "locations", res.locations.data);
			// 		console.log(res);
			// 	})
			// 	.catch(err => {
			// 		console.log(err.response);
			// 	});
		},

		fetchOutlet() {
			this.$axios
				.$get(`/api/outlets`)
				.then(res => {
					// this.outlets = res.outlets.data;
					this.$set(this.$data, "outlets", res.outlets.data);
					console.log(res.outlets.data);
				})
				.catch(err => {
					console.log(err);
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
			if (this.form.items.includes(item)) {
				alert("already there");
			} else {
				this.form.items.push(item);
				// console.log(this.form);
			}
			Vue.set(item, "quantity", 1);
			Vue.set(item, "discount", 0);
		},

		removeItem(index) {
			this.form.items.splice(index, 1);
		},

		setData() {
			this.$axios
				.$get(`api/order/` + this.$route.params.id)
				.then(res => {
					this.form = res[1];
					this.$set(this.$data, "form", res[1]);
					console.log(res[1]);
					// Initial value = pivot
					// for (let i in this.form.products) {
					// 	Vue.set(this.form.products[i], 'quantity', this.form.products[i].pivot.quantity);
					// 	Vue.set(this.form.products[i], 'unit_price', this.form.products[i].pivot.unit_price);
					// 	Vue.set(this.form.products[i], 'discount', this.form.products[i].pivot.discount);
					// }
				})
				.catch(err => {
					console.log(res.response);
				});
		},

		updateItem() {
			this.$axios
				.$patch(`api/order/` + this.form.id, {
					name: this.form.name,
					location: this.form.location,
					phone: this.form.phone,
					create_by: this.form.create_by,
					status: this.form.status
				})
				.then(res => {
					this.items = res.data;
					this.$toast.info("Succeessfully updated");
					this.$router.push("/order/order-list");
				})
				.catch(err => {
					this.$refs.form.validate(err.response.data.errors);
				});
		}
	}
};
</script>

<style lang="scss">
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

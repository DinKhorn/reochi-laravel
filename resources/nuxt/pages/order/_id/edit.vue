<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">Edit Order</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<p class="px-5 pt-3 font-italic grey--text">
					The field labels marked with
					<span class="red--text">*</span> are required input fields.
				</p>
				<OrderForm :form="form" />
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-btn @click.prevent="updateItem" class="blue mx-5 darken-2 mb-5 grey--text text--lighten-4">
					<v-icon left>mdi-content-save</v-icon>Save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-app>
</template>

<script>
import OrderForm from "@/components/forms/OrderForm";
export default {
	name: "EditOrder",

	components: {
		OrderForm
	},
	created() {
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
			order_status: ["Pending", "Accepted", "Cancel"],
			payment_status: ["Paid", "Due"],
			locations: []
		};
	},

	methods: {
		setData() {
			this.$axios
				.$get(`api/order/` + this.$route.params.id)
				.then(res => {
					this.form = res[1];
					// for (let i in this.form.items) {
					// 	console.log(this.form.items[i].product.name);
					// 	return false;
					// 	// console.log(this.form.items[i].product_id);
					// 	// Vue.set(
					// 	// 	this.form.items[i],
					// 	// 	"id",
					// 	// 	this.form.items[i].product_id
					// 	// );
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
					outlet:this.form.outlet,
					phone: this.form.phone,
					create_by: this.form.create_by,
					status: this.form.status,
					items : this.form.items,
					note : this.form.note,
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

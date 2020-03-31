<template>
	<v-app class="pa-5">
		<v-card class="card" id="printProduct">
			<v-card-title class="blue-grey lighten-4">Outlet Detail</v-card-title>
			<v-divider></v-divider>
			<v-row class="pa-5">
				<v-col md="3" cols="6">
					<label class="productDetail--type">Outlet Name:</label>
				</v-col>
				<v-col md="3" cols="6">{{ outlet.name }}</v-col>

				<v-col md="3" cols="6">
					<label class="productDetail--type">Location:</label>
				</v-col>
				<v-col md="3" cols="6">{{ outlet.location }}</v-col>

				<v-col md="3" cols="6">
					<label for class="productDetail--type">Phone:</label>
				</v-col>
				<v-col md="3" cols="6">{{ outlet.phone }}</v-col>
				<v-col md="3" cols="6">
					<label for class="productDetail--type">Create By:</label>
				</v-col>
				<v-col md="3" cols="6">{{ outlet.create_by }}</v-col>
				<v-col md="3" cols="6">
					<label for class="productDetail--type">Status:</label>
				</v-col>
				<v-col md="3" cols="6">
					<span :class="outlet.status === 'Enable' ? 'enable' : 'disable'">{{ outlet.status }}</span>
				</v-col>
			</v-row>
			<!-- <v-btn @click="printProduct" class="mx-5 my-5 blue accent-3 white--text">
				<v-icon left>mdi-printer</v-icon>Print
			</v-btn>-->
		</v-card>
	</v-app>
</template>

<script>
	import Vue from "vue";
	var numeral = require("numeral");

	export default {
		created() {
			this.fetchData();
		},

		data() {
			return {
				outlet: []
			};
		},

		methods: {
			fetchData() {
				this.$axios
					.$get(`api/outlets/` + this.$route.params.id)
					.then(res => {
						this.outlet = res.outlet;
						// console.log(this.outlet);
					})
					.catch(err => {
						console.log(err.response);
					});
			}

			// printProduct() {
			// 	this.$htmlToPaper("printProduct");
			// }
		}
	};
</script>

<style lang="scss">
	.productDetail {
		display: flex;
		flex-direction: column;
		&--type {
			font-weight: 500;
		}
		&--item {
			font-size: 15px;
		}
	}
	.enable {
		background-color: #36d160;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
	}

	.disable {
		background-color: #e0355a;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
		color: #fff;
	}
</style>
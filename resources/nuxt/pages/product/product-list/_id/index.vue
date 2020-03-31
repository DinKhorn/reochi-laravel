<template>
	<v-app class="mx-5 my-5">
		<v-card id="printProduct">
			<v-card-title class="teal darken-1 white--text">Product Detail</v-card-title>
			<v-divider></v-divider>
			<v-row class="px-5">
				<v-col cols="12" class="text-center">
					<img v-if="products.image" width="300" :src="'http://127.0.0.1:8000/' + products.image" :alt="products.image">
				</v-col>
				<v-col md="4" cols="12" class="productDetail">
					<label for="" class="productDetail--type">Code</label>
					<span class="productDetail--item">{{ products.code }}</span>
				</v-col>
				<v-col md="4" cols="12" class="productDetail">
					<label for="" class="productDetail--type">Type</label>
					<span class="productDetail--item">{{ products.type }}</span>
				</v-col> 
				<v-col md="4" cols="12" class="productDetail">
					<label for="" class="productDetail--type">Name</label>
					<span class="productDetail--item">{{ products.name }}</span>
				</v-col>
				<v-col md="4" cols="12" class="productDetail">
					<label for="" class="productDetail--type">Brand</label>
					<span class="productDetail--item" v-if="products.brand">{{ products.brand.name }}</span>
				</v-col>
				<v-col md="4" cols="12" class="productDetail">
					<label for="" class="productDetail--type">Quantity</label>
					<span class="productDetail--item">{{ products.unit }}</span>
				</v-col>
				<v-col md="4" cols="12" class="productDetail">
					<label for="" class="productDetail--type">Price</label>
					<span class="productDetail--item">USD {{ products.price | formatMoney }}</span>
				</v-col>
			</v-row>
			<v-btn @click="printProduct" class="mx-5 my-5 blue accent-3 white--text">
				<v-icon left>mdi-printer</v-icon>
				Print
			</v-btn>
		</v-card>
		
	</v-app>
</template>

<script>
	import Vue from 'vue';
	var numeral = require('numeral');

	Vue.filter('formatMoney', function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		created() {
			this.fetchData()
		},

		data() {
			return {
				products: []
			}
		},

		methods: {
			fetchData() {
				this.$axios.$get(`api/product/` + this.$route.params.id)
				.then(res => {
					this.products = res.product;
					console.log(res);
				})
				.catch(err => {
					console.log(err.response);
				})
			},

			printProduct() {
				this.$htmlToPaper('printProduct')
			},
		}
	}
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
</style>
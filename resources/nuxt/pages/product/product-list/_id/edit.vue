<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<v-card-title class="headline teal darken-2 white--text">Edit PRODUCT</v-card-title>
			<v-divider></v-divider>
			<p class="px-5 pt-3">The field labels marked with * are required input fields.</p>
			<ValidationObserver ref="form">
				<v-row class="px-5">
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="name">Product Name*</label>
						<validation-provider name="Name" rules="required" v-slot="{ errors }">
							<v-text-field 
							outlined 
							solo 
							dense 
							label="Product Name" 
							v-model="form.name">
							</v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="cat_name">Category*</label>
						<v-autocomplete
							item-value="cat_name" 
							item-text="cat_name"  
							dense 
							solo 
							outlined 
							return-object
							v-model="form.category"
							:items="categories"
							label="Please type, select..."
						></v-autocomplete>
					</v-col>
				</v-row>
				<v-row class="px-5">
					<v-col sm="6" cols="12">
						<label class="font-weight-bold">Product Unit*</label>
						<validation-provider rules="required" name="Product Unit" v-slot="{ errors }">
							<v-text-field 
							outlined 
							solo 
							dense 
							label="Product Unit" 
							v-model="form.unit" 
							type="number">
							</v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold">Product Price*</label>
						<validation-provider rules="required" name="Product Price" v-slot="{ errors }">
							<v-text-field 
							outlined 
							solo 
							dense 
							label="Product Price" 
							v-model="form.price" 
							type="number">
							</v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="12" cols="12">
						<label class="font-weight-bold" for>Product Code*</label>
						<validation-provider name="Product Code" rules="required" v-slot="{ errors }">
							<div class="d-flex">
								<v-text-field 
								outlined 
								solo 
								dense 
								label="Product Code" 
								v-model="form.code">
								</v-text-field>
								<v-btn class="mx-1 mt-1" color="primary" dark @click="randomNumber">Generate</v-btn>
							</div>
							<span class="red--text">{{errors[0]}}</span>
						</validation-provider>
					</v-col>
					<v-col sm="12" cols="12">
						<label class="font-weight-bold" for="image">Product Image</label>
						<div v-if="url">
							<img :src="form.image" class="img-responsive" height="300" />
						</div>
						<input type="file" @change="uploadImage($event)" class="product--image" />
					</v-col>
					<v-col md="12" sm="12" cols="12">
						<label class="font-weight-bold" for>Product Details</label>
						<vue-editor v-model="form.description"></vue-editor>
					</v-col>
				</v-row>
			</ValidationObserver>
			<v-card-actions class="px-5">
				<v-btn color="primary" @click.prevent="updateItem">
					<v-icon>mdi-check</v-icon>Create
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-app>
</template>

<script>
	import moment from "moment";
	export default {
		name: "EditProduct",
		created() {
			this.fetchData();
			this.fetchCategory();
		},

		data() {
			return {
				form: {
					code: "",
					name: "",
					unit:"",
					price:"",
					category:""
				},
				items: [],
				url: null,
				itemsPerPage: 5,
				categories:[],
			};
		},

		methods: {
			randomNumber() {
				return (this.form.code = Math.floor(
					1000000 + Math.random() * 90000000
				));
			},

			fetchCategory() {
				this.$axios.$get(`api/category`).then(res => {
					// this.categories = res.categories.data;
					this.$set(this.$data, "categories", res.categories.data);
					console.log(res);
				})
				.catch(err => {
					console.log(err.response);
				});
			},

			fetchData() {
				this.$axios
					.$get(`api/product/` + this.$route.params.id)
					.then(res => {
						// this.form = res.products.data;
						this.$set(this.$data, "form", res.product);
						console.log(this.$route.params.id);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			updateItem() {
				this.$axios
					.$patch(`api/product/` + this.form.id, {
						name: this.form.name,
						code: this.form.code,
						unit: this.form.unit,
						price: this.form.price,
						cat_name: this.form.cat_name,
						image: this.form.image
					})
					.then(res => {
						this.items = res.data;
						this.$toast.info("Succeessfully created");
						this.$router.push("/product/product-list");
					})
					.catch(err => {
						console.log(err.response);
						this.$refs.form.validate(err.response.data.errors);
					});
			},

			uploadImage(e) {
				const images = e.target.files[0];
				const reader = new FileReader();

				reader.readAsDataURL(images);
				reader.onload = e => {
					this.form.image = e.target.result;
					console.log(this.form);
				};

				this.url = URL.createObjectURL(images);
			}
		}
	};
</script>

<style lang="scss">
	.product--image {
		border: 1px solid rgba(0, 0, 0, 0.125);
		padding: 5px 5px 5px 5px;
		width: 100%;
	}

	.img-responsive {
		border: 1px solid seagreen;
	}
</style> 
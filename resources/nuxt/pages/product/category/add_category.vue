<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">Create Category</v-card-title>
			<p class="px-5 pt-3 font-italic grey--text">
				The field labels marked with
				<span class="red--text">*</span> are required input fields.
			</p>
			<v-row class="px-5">
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="name">
						Category
						<span class="red--text">*</span>
					</label>
					<validation-provider name="Category" rules="required" v-slot="{ errors }">
						<v-text-field 
                        outlined 
                        solo 
                        dense 
                        label="Category..." 
                        v-model="form.cat_name" 
                        required></v-text-field>
						<span class="red--text">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="description">
						Description
						<span class="red--text">*</span>
					</label>
					<validation-provider name="Description" rules="required" v-slot="{ errors }">
						<v-text-field 
						outlined 
						solo 
						dense 
						label="Description..." 
						v-model="form.description" 
						required>
						</v-text-field>
						<span class="red--text">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				
			</v-row>
			<v-btn class="mx-5 mb-5 mt-2" @click="createCategory" color="primary" v-permission="'add users'">
				<v-icon left>mdi-check</v-icon>Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				items: [],
				form: {},
				url: null
			};
		},

		methods: {
			uploadImage(e) {
				const images = e.target.files[0];
				const reader = new FileReader();

				reader.readAsDataURL(images);
				reader.onload = e => {
					this.form.image = e.target.result;
					console.log(this.form);
				};

				this.url = URL.createObjectURL(images);
			},

			createCategory() {
				this.$axios
					.$post(`api/category`, this.form)
					.then(res => {
						this.$router.push(`/product/category`);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			}
		}
	};
</script>

<style>
	.supplier--form {
		padding: 7px 5px 7px 5px;
		border: 1px solid #3a99c2;
		width: 100%;
		outline: none;
	}

	.text--error {
		color: red;
	}

	.product--image {
		border: 1px solid rgba(0, 0, 0, 0.125);
		padding: 5px 5px 5px 5px;
		width: 100%;
	}

	.preview--image {
		text-align: center;
	}
</style>
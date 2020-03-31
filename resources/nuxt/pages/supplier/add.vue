<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">Create Supplier</v-card-title>
			<p class="px-5 pt-3 font-italic grey--text">
				The field labels marked with
				<span class="red--text">*</span> are required input fields.
			</p>
			<v-row class="px-5">
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="name">
						Supplier Name
						<span class="red--text">*</span>
					</label>
					<validation-provider name="Supplier Name" rules="required|min:3" v-slot="{ errors }">
						<v-text-field outlined solo dense label="Supplier Name" v-model="form.name" required></v-text-field>
						<span class="red--text">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="company_name">
						Company Name
						<span class="red--text">*</span>
					</label>
					<validation-provider name="Company Name" rules="required" v-slot="{ errors }">
						<v-text-field 
						outlined 
						solo 
						dense 
						label="Company Name" 
						v-model="form.company_name" 
						required>
						</v-text-field>
						<span class="red--text">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<!-- <v-col sm="6" cols="12">
					<label class="font-weight-bold" for="vat_number">
						VAT Number
						<span class="caption">(Optional)</span>
					</label>
					<validation-provider name="VAT Number" rules="required" v-slot="{ errors }">
						<v-text-field
							outlined
							solo
							dense
							label="VAT Number"
							type="number"
							v-model="form.vat_number"
							required
						></v-text-field>
						<span class="red--text">{{ errors[0] }}</span>
					</validation-provider>
				</v-col> -->
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
				<v-col sm="12" cols="12">
					<label class="font-weight-bold" >
						Address
					</label>
					<validation-provider rules="required" v-slot="{ errors }">
						<v-text-field 
						outlined 
						solo 
						dense 
						label="Please type..." 
						v-model="form.address" 
						required
						></v-text-field>
						<span class="red--text">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>

				<!-- <v-col sm="6" cols="12">
					<label class="font-weight-bold" for="past_code">
						Post Code
						<span class="caption">(Optional)</span>
					</label>
					<validation-provider name="Post Code" rules="required" v-slot="{ errors }">
						<v-text-field outlined solo dense label="Post Code" v-model="form.past_code" required></v-text-field>
						<span class="red--text">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="12" cols="12">
					<label class="font-weight-bold" for="image">Product Image</label>
					<div v-if="url" class="preview--image">
						<img :src="form.image" class="img-responsive" height="300" />
					</div>
					<input type="file" @change="uploadImage($event)" class="product--image" />
				</v-col> -->
			</v-row>
			<v-btn class="mx-5 mb-5 mt-2" @click="createSupplier" color="primary" v-permission="'add users'">
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

			createSupplier() {
				this.$axios
					.$post(`api/supplier`, this.form)
					.then(res => {
						this.$router.push(`/supplier/`);
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
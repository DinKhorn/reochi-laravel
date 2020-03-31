<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="blue lighten-1" dark>
				<v-card-title class="white--text">Edit Biller</v-card-title>
			</div>
			<v-divider></v-divider>
			<ValidationObserver ref="form">
				<v-row class="px-5">
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="name">Name*</label>
						<validation-provider name="Name" rules="required|min:3" v-slot="{ errors }">
							<input type="text" class="biller-image" required v-model="form.name" />
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12" class="d-flex flex-column">
						<label class="font-weight-bold" for="image">Image*</label>
						<input type="file" accept="image/*" @change="uploadImage($event)" class="biller-image" />
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for>Company Name*</label>
						<ValidationProvider name="Company Name" rules="required" v-slot="{ errors }">
							<input type="text" class="biller-image" required v-model="form.company_name" />
							<span class="red--text">{{ errors[0] }}</span>
						</ValidationProvider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for>
							VAT Number
							<span class="font-weight-light">(Optional)</span>
						</label>
						<input type="text" class="biller-image" required v-model="form.vat_number" />
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for>Email</label>
						<validation-provider name="Email" rules="required|email" v-slot="{ errors }">
							<input type="text" class="biller-image" required v-model="form.email" />
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for>Phone Number</label>
						<ValidationProvider rules="required" v-slot="{ errors }">
							<input type="text" class="biller-image" required v-model="form.phone" />
							<span class="red--text">{{ errors[0] }}</span>
						</ValidationProvider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for>Address</label>
						<ValidationProvider rules="required" v-slot="{ errors }">
							<input type="text" class="biller-image" required v-model="form.address" />
							<span class="red--text">{{ errors[0] }}</span>
						</ValidationProvider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for>
							City
							<span class="font-weight-light">(Optional)</span>
						</label>
						<input type="text" class="biller-image" required v-model="form.city" />
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for>
							Country
							<span class="font-weight-light">(Optional)</span>
						</label>
						<input type="text" class="biller-image" required v-model="form.country" />
					</v-col>
				</v-row>
			</ValidationObserver>
			<div class="pb-5 pt-3 px-5">
				<v-btn color="primary" v-permission="'add users'" @click="createBiller">
					<v-icon left>mdi-check</v-icon>Submit
				</v-btn>
			</div>
		</v-card>
	</v-app>
</template>

<script>
	import { ValidationProvider, ValidationObserver } from 'vee-validate';
	export default {
		components: {
			ValidationProvider, ValidationObserver
		},
		
		name: "EditBiller",	
		data() {
			return {
				form: {},
			}
		},

		created() {
			this.$axios.$get('api/biller/' + this.$route.params.id)
			.then(res => {
				this.form = res.biller;
				console.log(res)
			})
		},

		methods: {
			createBiller() {
				this.$axios.$post(`api/biller/` + this.form.id, {
					'name': this.form.name,
					'company_name': this.form.company_name,
					'email': this.form.email,
					'vat_number': this.form.vat_number,
					'phone': this.form.phone,
					'address': this.form.address,
					'city': this.form.city,
					'country': this.form.country,
					_method: 'patch',
				})
				.then(res => {
					this.items = res.data;
					this.$router.push('/people/biller');
				})
				.catch(err => {
					console.log(err.response.data)
					this.$refs.form.validate(
						err.response.data.errors
					);
				})
			},

			uploadImage(event) { 
			    let data = new FormData();
			    data.append('name', 'image');
			    data.append('file', event.target.files[0]); 
					    
			    this.$axios.$post(
			      `api/biller`, 
			      	data,
			    ).then(
			      response => {
			        console.log('image upload response > ', response)
			      }
		    	)
 			}
		},	
	}
</script>

<style lang="scss">
	.biller-image {
		border: 1px solid #46c457;
		padding: 5px 10px 5px 10px;
		width: 100%;
		outline: none;
	}
</style>
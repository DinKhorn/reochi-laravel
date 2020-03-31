<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="cyan darken-2 px-5">
				<v-card-title class="white--text">
					 EDIT SUPPLIER
				</v-card-title>
			</div>
			<v-divider></v-divider>
			<v-row class="px-5">
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="name">Name*</label>
					<validation-provider rules="required" v-slot="{ errors }">
                        <v-text-field 
						outlined 
						solo 
						dense 
						label="Name..." 
						type="text" 
                        v-model="form.name"
                        >
						</v-text-field>
						<span class="text--error">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Company Name*</label>
					<validation-provider rules="required" v-slot="{ errors }">
						<v-text-field 
						outlined 
						solo 
						dense 
						label="Company Name..." 
						type="text" 
                        v-model="form.company_name"
						>
						</v-text-field>
						<span class="text--error">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Email</label>
					<validation-provider rules="required|email" v-slot="{ errors }">
						<v-text-field 
						outlined 
						solo 
						dense 
						label="Email..." 
						type="text" 
                        v-model="form.email"
						>
						</v-text-field>
						<span class="text--error">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Phone Number</label>
					<validation-provider rules="required" v-slot="{ errors }">
						<v-text-field 
						outlined 
						solo 
						dense 
						label="Phone..." 
						type="text" 
                        v-model="form.phone"
						>
						</v-text-field>
						<span class="text--error">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="12" cols="12">
					<label class="font-weight-bold" for="">Address</label>
					<validation-provider rules="required" v-slot="{ errors }">
						<v-text-field 
						outlined 
						solo 
						dense 
						label="Address..." 
						type="text" 
                        v-model="form.address">
						</v-text-field>
						<span class="text--error">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
			</v-row>
			<v-btn class="mx-5 mb-5 mt-2" @click="editSupplier" color="primary" v-permission="'add users'">
				<v-icon left>mdi-check</v-icon>
				Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		name: "eSupplier",
		data() {
			return {
				form: {}
			}
		},

		created() {
			this.$axios.$get('api/supplier/' + this.$route.params.id)
			.then(res => {
				this.form = res.supplier;
				console.log(res);
			})
			.catch(err => {
				console.log(err.response);
			})
		},

		methods: {
			editSupplier() {
				this.$axios
				.$patch(`api/supplier/` + this.form.id, {
					'name': this.form.name,
					'company_name': this.form.company_name,
					'email': this.form.email,
					'phone': this.form.phone,
					'address': this.form.address,
					// 'city': this.form.city,
					// 'country': this.form.country,
					// 'vat_number': this.form.vat_number,
				})
				.then(res => {
					this.$router.push(`/supplier/`)
					console.log(res);
				})
				.catch(err => {
					console.log(err.response)
				})
			},
		}
	}
</script>

<style>
	.supplier--form {
		padding: 7px 5px 7px 5px;
		border: 1px solid #3a99c2;
		width: 100%;
		outline:  none;
	}

	.text--error {
		color:  red;
	}
</style>
<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="teal lighten-2" dark>
				<v-card-title class="white--text">
					Edit Member
				</v-card-title >
			</div>
			<v-divider></v-divider>
			<v-row class="px-5">
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="name">Name*</label>
					<ValidationProvider rules="min:3" v-slot="{ errors }">
						<input type="text" class="member--form" required v-model="form.name">
				      	<span class="red--text">{{ errors[0] }}</span>
				    </ValidationProvider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Company Name*</label>
					<ValidationProvider rules="required|alpha" v-slot="{ errors }">
						<input type="text" class="member--form" required v-model="form.company_name">
						<span class="red--text">{{ errors[0] }}</span>
					</ValidationProvider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Email</label>
					<validation-provider rules="email" v-slot="{ errors }">
						<input type="text" class="member--form" required v-model="form.email">
						<span class="red--text">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Phone Number</label>
					<ValidationProvider rules="required" v-slot="{ errors }">
						<input type="text" class="member--form" required v-model="form.phone">
						<span class="red--text">{{ errors[0] }}</span>
					</ValidationProvider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Address</label>
					<ValidationProvider rules="required|alpha" v-slot="{ errors }">
						<input type="text" class="member--form" required v-model="form.address">
						<span class="red--text">{{ errors[0] }}</span>
					</ValidationProvider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">
						Tax <span class="font-weight-light">(Optional)</span>
					</label>
					<input type="text" class="member--form" required v-model="form.tax">
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">
						Post Code <span class="font-weight-light">(Optional)</span>
					</label>
					<ValidationProvider rules="required|alpha" v-slot="{ errors }">
						<input type="text" class="member--form" required v-model="form.post_code">
						<span class="red--text">{{ errors[0] }}</span>
					</ValidationProvider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">
						City<span class="font-weight-light">(Optional)</span>
					</label>
					<input type="text" class="member--form" required v-model="form.city">
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">
						Country<span class="font-weight-light">(Optional)</span>
					</label>
					<input type="text" class="member--form" required v-model="form.country">
				</v-col>
			</v-row>
			<div class="pb-5 pt-3 px-5">
				<v-btn color="primary" v-permission="'add users'" @click="createBiller">
					<v-icon left>mdi-check</v-icon>
					Submit
				</v-btn>
			</div>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		name: "EditBiller",	
		data() {
			return {
				form: {},
			}
		},

		created() {
			this.$axios.$get('api/member/' + this.$route.params.id)
			.then(res => {
				this.form = res.members;
				console.log(res)
			})
		},

		methods: {
			createBiller() {
				this.$axios.$post(`api/member/` + this.form.id, {
					'name': this.form.name,
					'company_name': this.form.company_name,
					'email': this.form.email,
					'phone': this.form.phone,
					'address': this.form.address,
					'tax': this.form.tax,
					'city': this.form.city,
					'country': this.form.country,
					_method: 'patch',
				})
				.then(res => {
					this.items = res.data;
					this.$router.push('/people/member');
				})
				.catch(err => {
					console.log(err.response.data)
				})
			},
		},	
	}
</script>

<style lang="scss">
	.member--form {
		border: 1px solid #22cde0;
		padding: 5px 10px 5px 10px;
		width: 100%;
		outline: none;
	}
</style>
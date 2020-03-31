<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="blue lighten-1" dark>
				<v-card-title class="white--text">
					Add Member
				</v-card-title>
			</div>
			<v-divider></v-divider>
			<v-row class="px-5">
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Name</label>
					<v-text-field 
						outlined solo dense
						label="Name"
						v-model="form.name"
					></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Email</label>
					<v-text-field outlined solo dense label="email@email.com" v-model="form.email"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Company Name</label>
					<v-text-field outlined solo dense label="Company Name" v-model="form.company_name"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Phone Number</label>
					<v-text-field outlined solo dense label="Phone Number" v-model="form.phone"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">
					Tax Number<span class="font-weight-light">(Optional)</span>
				</label>
					<v-text-field outlined solo dense label="Tax Number" v-model="form.tax"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Address</label>
					<v-text-field outlined solo dense label="Address" v-model="form.address"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">
						City<span class="font-weight-light">(Optional)</span>
					</label>
					<v-text-field outlined solo dense label="City" v-model="form.city"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">
						Post Code<span class="font-weight-light">(Optional)</span>
					</label>
					<v-text-field outlined solo dense label="Post Code" v-model="form.post_code"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">
						Country<span class="font-weight-light">(Optional)</span>
					</label>
					<v-text-field outlined solo dense label="Country" v-model="form.country"></v-text-field>
				</v-col>
			</v-row>
			<div class="pb-5 px-5">
				<v-btn @click="createMember" color="primary">
					<v-icon left>mdi-check</v-icon>
					Submit
				</v-btn>
			</div>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		name: "AddMember",
		data() {
			return {
				form: {},
				items: []
			}
		},

		methods: {
			createMember() {
				this.$axios.$post(`api/member`, this.form)
				.then(res => {
					this.items = res.data;
					console.log(res)
					this.$router.push('/people/member');
					this.$toast.info('Succeessfully Created');
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		},
	}
</script>
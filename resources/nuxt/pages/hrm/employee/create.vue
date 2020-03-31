<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<h3 class="px-5 py-2 blue lighten-1 grey--text text--lighten-4">Add Employee</h3>
			<v-divider></v-divider>
			<div class="px-5">
				<v-row>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Name</label>
						<v-text-field
							solo
							outlined
							dense
							label="Name"
							v-model="form.name"
						></v-text-field>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Gender</label>
						<v-select
							solo
							outlined
							dense
							label="Gender"
							:items="genders"
							v-model="form.gender"
						></v-select>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Department</label>
						<v-select
							solo
							outlined
							dense
							:items="items"
							item-text="name"
							label="Please Select"
							v-model="form.department"
						>
						</v-select>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Phone Number</label>
						<v-text-field
							solo
							outlined
							dense
							label="Phone Number"
							v-model="form.phone"
						></v-text-field>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Address</label>
						<v-text-field
							solo
							outlined
							dense
							label="Address"
							v-model="form.address"
						></v-text-field>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">City</label>
						<v-text-field
							solo
							outlined
							dense
							label="City"
							v-model="form.city"
						></v-text-field>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Country</label>
						<v-text-field
							solo
							outlined
							dense
							label="Country"
							v-model="form.country"
						></v-text-field>
					</v-col>
				</v-row>
			</div>
			<v-btn 
				v-permission="'add employee'"
				class="purple darken-1 mx-5 mb-5" dark
				@click="createItem"
			>	
				Submit
			</v-btn>
		</v-card>
	</v-app>
</template>


<script>
	export default {
		created() {
			this.fetchData()
		},

		data() {
			return {
				checkbox: true,
				form: {},
				items: [],
				genders: ['Male', 'Female'],
			}
		},

		methods: {
			fetchData() {
				this.$axios.$get(`api/hr-department`)
				.then(res => {
					this.items = res;
				})
				.catch(err => {
					console.log(err.response)
				})
			},

			createItem() {
				this.$axios.$post(`api/employee`, this.form)
				.then(res => {
					this.$router.push('/hrm/employee');
				})
			}
		}
	}
</script>
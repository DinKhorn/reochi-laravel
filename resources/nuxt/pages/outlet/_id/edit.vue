<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">Edit Outlet</v-card-title>
			<v-divider></v-divider>
			<p class="px-5 pt-3 font-italic grey--text">
				The field labels marked with
				<span class="red--text">*</span> are required input fields.
			</p>
			<ValidationObserver ref="form">
				<v-row class="px-5">
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="name">
							Outlet Name
							<span class="red--text">*</span>
						</label>
						<validation-provider name="Name" rules="required" v-slot="{ errors }">
							<v-text-field outlined solo dense label="Outlet Name" v-model="form.name"></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="location">
							Location
							<span class="red--text">*</span>
						</label>
						<validation-provider name="Location" rules="required" v-slot="{ errors }">
							<!-- <v-text-field outlined solo dense label="Location" v-model="form.location"></v-text-field> -->
							<v-autocomplete
								item-value="name"
								item-text="name"
								solo
								outlined
								dense
								label="Business Location"
								return-object
								v-model="form.location"
								:items="locations"
							></v-autocomplete>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="phone">
							Phone
							<span class="red--text">*</span>
						</label>
						<validation-provider name="Phone" rules="required" v-slot="{ errors }">
							<v-text-field outlined solo dense label="Phone" v-model="form.phone"></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="status">
							Status
							<span class="red--text">*</span>
						</label>
						<validation-provider name="Status" rules="required" v-slot="{ errors }">
							<v-select outlined solo dense label="Status" v-model="form.status" :items="status"></v-select>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
				</v-row>
			</ValidationObserver>
			<v-card-actions class="px-5">
				<v-btn color="primary" @click.prevent="updateItem">
					<v-icon>mdi-check</v-icon>Update
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-app>
</template>

<script>
	import moment from "moment";
	export default {
		name: "EditOutlet",
		created() {
			this.fetchLocation();
			this.setData();
		},

		data() {
			return {
				locations: [],
				form: {},
				items: [],
				itemsPerPage: 5,
				status: ["Enable", "Disable"]
			};
		},

		methods: {
			fetchLocation() {
				this.$axios
					.$get(`api/location`)
					.then(res => {
						this.locations = res.locations.data;
						// console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			setData() {
				this.$axios
					.$get(`api/outlets/` + this.$route.params.id)
					.then(res => {
						this.$set(this.$data, "form", res.outlet);
						console.log(this.$data);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			updateItem() {
				this.$axios
					.$patch(`api/outlets/` + this.form.id, {
						name: this.form.name,
						location: this.form.location,
						phone: this.form.phone,
						create_by: this.form.create_by,
						status: this.form.status
					})
					.then(res => {
						this.items = res.data;
						this.$toast.info("Succeessfully updated");
						this.$router.push("/outlet/outlet-list");
					})
					.catch(err => {
						this.$refs.form.validate(err.response.data.errors);
					});
			}
		}
	};
</script>
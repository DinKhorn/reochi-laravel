<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">
				User
				<span class="caption grey--text mt-2">&nbsp;Edit</span>
			</v-card-title>
			<v-divider></v-divider>
			<p class="px-5 pt-3 font-italic grey--text">
				The field labels marked with
				<span class="red--text">*</span> are required input fields.
			</p>
			<ValidationObserver ref="form">
				<v-row class="px-5">
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="name">
							Name
							<span class="red--text">*</span>
						</label>
						<validation-provider name="Name" rules="required" v-slot="{ errors }">
							<v-text-field outlined solo dense label="Name" v-model="form.name"></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="email">
							Email
							<span class="red--text">*</span>
						</label>
						<validation-provider name="Email" rules="required|email" v-slot="{ errors }">
							<v-text-field outlined solo dense label="Email" v-model="form.email"></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="password">
							Password
							<span class="red--text">*</span>
						</label>
						<validation-provider name="Password" rules="required|min:6" v-slot="{ errors }">
							<v-text-field
								outlined
								solo
								dense
								label="Password"
								v-model="form.password"
								:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
								:type="show ? 'text' : 'password'"
								@click:append="show = !show"
							></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="Role">
							Role
							<span class="red--text">*</span>
						</label>
						<validation-provider name="Role" rules="required" v-slot="{ errors }" readonly>
							<!-- <v-autocomplete
								item-value="id"
								item-text="name"
								solo
								outlined
								dense
								label="Select Role"
								return-object
								v-model="form.role"
								:items="roles"
								required
							></v-autocomplete> -->
							<v-text-field outlined solo dense label="Role" v-model="form.role_id"></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
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
	export default {
		name: "AddUser",
		data() {
			return {
				form: {},
				items: [],
				roles: [],
				show: false,
				url: null,
				password: "Password",
				itemsPerPage: 5
			};
		},
		created() {
			// this.fetchRole();
			this.fetchData();
		},
		methods: {
			// fetchRole() {
			// 	this.$axios
			// 		.$get(`/api/roles`)
			// 		.then(res => {
			// 			this.roles = res.role;
			// 			// console.log(res.role);
			// 		})
			// 		.catch(err => {
			// 			console.log(err.response);
			// 		});
			// },
			fetchData() {
				this.$axios
					.$get(`api/user/` + this.$route.params.id)
					.then(res => {
						this.$set(this.$data, "form", res.user);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			updateItem() {
				this.$axios
					.$patch(`api/user/` + this.form.id, {
						name: this.form.name,
						email: this.form.email,
						password: this.form.password
					})
					.then(res => {
						this.items = res.data;
						this.$toast.info("Succeessfully updated");
						this.$router.push("/user/user-list");
					})
					.catch(err => {
						this.$refs.form.validate(err.response.data.errors);
					});
			}
			// }
		}
	};
</script>

<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">Create User</v-card-title>
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
							<v-text-field outlined solo dense label="Name" v-model="form.name" required></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="email">Email</label>
						<validation-provider name="Email" v-slot="{ errors }">
							<v-text-field outlined solo dense label="Email" v-model="form.email"></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="password">
							Password
							<span class="red--text">*</span>
						</label>
						<validation-provider name="Password" rules="required" v-slot="{ errors }">
							<v-text-field
								outlined
								solo
								dense
								label="Password"
								v-model="form.password"
								type="password"
								required
							></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col sm="6" cols="12">
						<label class="font-weight-bold" for="Role">
							Role
							<span class="red--text">*</span>
						</label>
						<validation-provider name="Role" rules="required" v-slot="{ errors }">
							<!-- <v-select :items="roles" v-model="form.role" outlined solo dense label="Select Role"></v-select> -->
							<v-autocomplete
								item-value="name"
								item-text="name"
								solo
								outlined
								dense
								label="Select Role"
								return-object
								v-model="form.role"
								:items="roles"
								required
							></v-autocomplete>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
				</v-row>
			</ValidationObserver>
			<v-card-actions class="px-5">
				<v-btn color="primary" @click.prevent="createItem">
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
				url: null,
				itemsPerPage: 5
			};
		},
		created() {
			this.fetchRole();
		},
		methods: {
			fetchRole() {
				this.$axios
					.$get(`/api/roles`)
					.then(res => {
						this.roles = res.role;
						console.log(res.role);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			createItem() {
				this.$axios
					.$post(`/api/user`, this.form)
					.then(res => {
						alert("hi");
						this.form = res;
						this.getItems();
						this.$toast.info("Succeessfully Created");
						this.closeDialog();
					})
					.catch(err => {
						console.log(err.response.data.errors);
					});
			}
		}
	};
</script>

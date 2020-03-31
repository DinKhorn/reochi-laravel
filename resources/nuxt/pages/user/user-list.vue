<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">
				User
				<span class="caption grey--text mt-2">&nbsp;List</span>
				<v-spacer></v-spacer>
				<v-dialog v-model="dialog" max-width="600px">
					<template v-slot:activator="{ on }">
						<v-btn v-permission="'add users'" v-on="on" class="primary white--text">
							<v-icon left>mdi-plus-circle</v-icon>Add
						</v-btn>
					</template>
					<v-card>
						<v-card-title>Add User</v-card-title>
						<v-divider></v-divider>
						<v-card-text>
							<ValidationObserver ref="nameOfObserver">
								<div class="AddUserForm">
									<label class="font-weight-bold" for="name">Name</label>
									<validation-provider name="Name" rules="required" v-slot="{ errors }">
										<input type="text" class="AddUserForm--input" v-model="form.name" />
										<span class="red--text">{{ errors[0] }}</span>
									</validation-provider>
								</div>
								<div class="AddUserForm">
									<validation-provider name="Email" rules="required|email" v-slot="{ errors }">
										<label class="font-weight-bold" for="email">Email</label>
										<input type="email" class="AddUserForm--input" v-model="form.email" />
										<span class="red--text">{{ errors[0] }}</span>
									</validation-provider>
								</div>
								<div class="AddUserForm">
									<validation-provider name="Role" rules="required" v-slot="{ errors }">
										<label class="font-weight-bold" for="role">Role</label>
										<v-autocomplete
											:items="roles"
											item-value="id"
											item-text="name"
											outlined
											solo
											dense
											label="Role"
											v-model="form.role"
										></v-autocomplete>
										<span class="red--text">{{ errors[0] }}</span>
									</validation-provider>
								</div>
								<div class="AddUserForm">
									<label class="font-weight-bold" for="password">Password</label>
									<validation-provider name="Password" rules="required" v-slot="{ errors }">
										<input type="password" class="AddUserForm--input" v-model="form.password" />
										<span class="red--text">{{ errors[0] }}</span>
									</validation-provider>
								</div>
							</ValidationObserver>
						</v-card-text>
						<v-divider></v-divider>

						<v-card-actions class="text-center">
							<v-spacer>
								<v-btn color="primary" @click="closeDialog" text>
									<v-icon left>mdi-close</v-icon>Close
								</v-btn>
								<v-btn color="green" dark @click.prevent="addUser">
									<v-icon left>mdi-content-save</v-icon>Save
								</v-btn>
							</v-spacer>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-card-title>
			<div class="pa-4">
				<div class="d-flex justify-space-between">
					<div>
						<v-text-field outlined dense solo v-model="term" label="Search"></v-text-field>
					</div>
					<div>
						<v-btn class="red darken-1">
							<a :href="baseURL + '/api/user/export-pdf'" class="btn-link">PDF</a>
						</v-btn>
						<v-btn class="lime lighten-1">
							<a :href="baseURL + '/api/user/export-csv'" class="btn-link">CSV</a>
						</v-btn>
						<v-btn class="blue lighten-1" @click.native="print">Print</v-btn>
					</div>
				</div>
				<v-data-table :headers="headers" :items="items" v-permission="'view users'" id="print">
					<template v-slot:item.action="{item}">
						<v-tooltip top v-permission="'edit users'">
							<template v-slot:activator="{ on }">
								<v-btn small icon @click="editItem(item)" color="primary" outlined v-on="on">
									<v-icon small>mdi-pencil</v-icon>
								</v-btn>
							</template>
							<span>Edit</span>
						</v-tooltip>
						<v-tooltip top v-permission="'delete users'">
							<template v-slot:activator="{ on }">
								<v-btn small icon @click="deleteItem(item)" color="red" outlined v-on="on">
									<v-icon small>mdi-delete</v-icon>
								</v-btn>
							</template>
							<span>Delete</span>
						</v-tooltip>
					</template>
				</v-data-table>
			</div>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		name: "UserField",
		watch: {
			name: {
				handler() {
					this.getItems();
				}
			},

			email: {
				handler() {
					this.getItems();
				}
			},

			term: {
				handler() {
					this.searchItems();
				}
			},
			immediate: true
		},

		data() {
			return {
				baseURL: process.env.APP_URL,
				dialog: false,
				items: [],
				roles: [],
				form: {},
				name: "",
				email: "",
				term: "",
				headers: [
					{
						text: "Name",
						value: "name"
					},
					{
						text: "Email",
						value: "email"
					},
					{
						text: "Role",
						value: "role.name"
					},
					{
						text: "Action",
						value: "action",
						sortable: false
					}
				],
				role: ["saleman", "administator"]
			};
		},

		methods: {
			getItems() {
				this.$axios
					.$get(`/api/roles`)
					.then(res => {
						this.roles = res.role;
						// console.log(res.role.data);
					})
					.catch(err => {
						console.log(err.response);
					});

				this.$axios
					.$get(`/api/user?name=${this.name}&email=${this.email}`)
					.then(res => {
						this.items = res.users.data;
						console.log(res.users.data);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			searchItems() {
				this.$axios
					.$get(`/api/user?term=${this.term}`)
					.then(res => {
						this.items = res.users.data;
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			editItem(item) {
				this.editedIndex = this.items.indexOf(item);
				this.form = Object.assign({}, item);
				this.dialog = true;
			},

			addUser() {
				if (this.editedIndex > -1) {
					this.$axios
						.$patch(`/api/user/` + this.form.id, {
							name: this.form.name,
							email: this.form.email,
							password: this.form.password
						})
						.then(res => {
							this.getItems();
							this.closeDialog();
							this.$toast.info("Succeessfully Updated");
						})
						.catch(err => {
							this.$refs.nameOfObserver.validate(
								err.response.data.errors
							);
						});
				} else {
					this.$axios
						.$post(`/api/user`, this.form)
						.then(res => {
							this.form = res;
							this.getItems();
							this.$toast.info("Succeessfully Created");
							this.closeDialog();
						})
						.catch(err => {
							this.$refs.nameOfObserver.validate(
								err.response.data.errors
							);
							console.log(err.response.data.errors);
						});
				}
			},

			print() {
				var prtContent = document.getElementById("print");
				var tr = document.getElementsByTagName("tr");
				var th = document.getElementsByTagName("th");

				if (th.length > 0) {
					for (var i = 0; i < tr.length; i++) {
						tr[i].cells[th.length - 1].style.visibility = "hidden";
					}
					var newWin = window.open();
					newWin.document.write(prtContent.children[0].outerHTML);
					for (var i = 0; i < tr.length; i++) {
						tr[i].cells[th.length - 1].style.visibility = "visible";
					}
				} else {
					var newWin = window.open();
					newWin.document.write("No Data aviable");
				}
				newWin.print();
				newWin.close();
			},

			closeDialog() {
				this.dialog = false;
				this.editedIndex = -1;
				this.form = {};
			},

			deleteItem(item) {
				if (confirm("Are u sure to delete it?")) {
					this.$axios
						.$delete(`/api/user/` + item.id)
						.then(res => {
							this.getItems();
						})
						.catch(err => {
							console.log(err.response);
						});
				}
			}
		},

		created() {
			this.getItems();
		}
	};
</script>

<style lang="scss">
	.AddUserForm {
		padding-top: 10px;
		&--input {
			border: 1px solid #bdbdbd;
			padding: 5px 10px 5px 10px;
			width: 100%;
			outline: none;
			border-radius: 3px;
		}
	}
	.btn-link {
		text-decoration: none;
	}
</style>
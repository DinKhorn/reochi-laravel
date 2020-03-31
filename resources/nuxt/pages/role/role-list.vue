<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">
				Role
				<span class="caption grey--text mt-2">&nbsp;List</span>
				<v-spacer></v-spacer>
				<v-dialog v-model="dialog" max-width="700px" v-permission="'add role'" persistent>
					<template v-slot:activator="{ on }">
						<v-btn class="primary white--text" dark v-on="on">
							<v-icon left>mdi-plus-circle</v-icon>Add
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">Create Role</v-card-title>
						<v-divider></v-divider>
						<v-col sm="12" cols="12" class="px-5">
							<label class="font-weight-bold" for="name">
								Role Name
								<span class="red--text">*</span>
							</label>
							<validation-provider name="Role Name" rules="required" v-slot="{ errors }">
								<v-text-field outlined solo dense label="Role Name" v-model="form.name"></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>
						</v-col>
						<v-card-actions class="px-5 pb-5">
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
							<v-btn color="primary" @click="createItem">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-card-title>
			<div class="pa-4">
				<v-data-table :headers="headers" :items="items" v-permission="'view users'">
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

		data() {
			return {
				dialog: false,
				items: [],
				form: {
					name: ""
				},
				headers: [
					{
						text: "ID",
						value: "id"
					},
					{
						text: "Role Name",
						value: "name"
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
						this.items = res.role;
						console.log(res.role);
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

			createItem() {
				if (this.editedIndex > -1) {
					this.$axios
						.$patch(`/api/roles/` + this.form.id, {
							name: this.form.name
						})
						.then(res => {
							this.getItems();
							this.closeDialog();
							this.$toast.info("Succeessfully Updated");
						})
						.catch(err => {
							// this.$refs.nameOfObserver.validate(
							err.response.data.errors;
							// );
						});
				} else {
					this.$axios
						.$post(`/api/roles`, this.form)
						.then(res => {
							this.form = res;
							this.getItems();
							this.$toast.info("Succeessfully Created");
							this.closeDialog();
						})
						.catch(err => {
							// this.$refs.nameOfObserver.validate(
							err.response.data.errors;
							// );
							// console.log(err.response.data.errors);
						});
				}
			},

			closeDialog() {
				this.dialog = false;
				this.editedIndex = -1;
				this.form = {};
			},

			deleteItem(item) {
				if (confirm("Are u sure to delete it?")) {
					this.$axios
						.$delete(`/api/roles/` + item.id)
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
			border: 1px solid #1232dd;
			padding: 5px 10px 5px 10px;
			width: 100%;
			outline: none;
			border-radius: 3px;
		}
	}
</style>
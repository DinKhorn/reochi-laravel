<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3">
				<v-dialog v-model="dialog" max-width="600px" v-permission="'add expense'" persistent>
					<template v-slot:activator="{ on }">
						<v-btn class="teal darken-1" dark v-on="on">
							<v-icon left>mdi-plus-circle</v-icon>Add Expense Category
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">ADD EXPENSE CATEGORY</v-card-title>
						<v-divider></v-divider>
						<v-col cols="12">
							<label for="code">Code</label>
							<div class="d-flex">
								<v-text-field
									solo
									outlined
									dense
									label="Click Generate to Generate Code"
									v-model="form.code"
								></v-text-field>
								<v-btn color="primary" @click="randomNumber">Generate</v-btn>
							</div>
						</v-col>
						<v-col cols="12">
							<label for>Name</label>
							<v-text-field outlined solo dense label="Type expense category name" v-model="form.name"></v-text-field>
						</v-col>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
							<v-btn color="primary" @click="createItem">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</div>
			<div class="pb-5">
				<v-dialog v-model="dialog2" max-width="700px" v-permission="'add expense'" persistent>
					<template v-slot:activator="{ on }">
						<v-btn class="purple darken-1" dark v-on="on">
							<v-icon left>mdi-file</v-icon>Import Expense Category
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">IMPORT EXPENSE CATEGORY</v-card-title>
						<v-divider></v-divider>
						<v-col cols="12">
							<p
								class="mt-5"
							>The correct column order is (name*, parent_category) and you must follow this.</p>
						</v-col>
						<v-row class="px-4">
							<v-col cols="12" sm="6">
								<label class="font-weight-bold">Upload CSV File</label>
								<input type="file" @change="uploadCsv($event)" class="uploadCsv" />
							</v-col>
							<v-col cols="12" sm="6" class="d-flex flex-column">
								<label class="font-weight-bold">Sample File</label>
								<v-btn class="teal darken-2 grey--text text--lighten-2">
									<v-icon left>mdi-download</v-icon>Download
								</v-btn>
							</v-col>
						</v-row>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
							<v-btn color="primary">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</div>
		</div>
		<div class="d-flex justify-space-between">
			<div>
				<v-text-field label="Search" v-model="search" solo outlined dense></v-text-field>
			</div>
			<div>
				<v-btn class="red darken-1">PDF</v-btn>
				<v-btn class="lime lighten-1">CSV</v-btn>
				<v-btn class="blue lighten-1">Print</v-btn>
			</div>
		</div>
		<v-card>
			<v-data-table :headers="headers" :items="items" :items-per-page="itemsPerPage">
				<template v-slot:item.action="{item}">
					<v-tooltip top v-permission="'edit expense'">
						<template v-slot:activator="{ on }">
							<v-btn icon @click="editItem(item)" color="primary" outlined v-on="on">
								<v-icon small>mdi-pencil</v-icon>
							</v-btn>
						</template>
						<span>Edit</span>
					</v-tooltip>
					<v-tooltip top v-permission="'delete expense'">
						<template v-slot:activator="{ on }">
							<v-btn icon @click="deleteItem(item)" color="red" outlined v-on="on">
								<v-icon small>mdi-delete</v-icon>
							</v-btn>
						</template>
						<span>Delete</span>
					</v-tooltip>
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>


<script>
	export default {
		name: "Menu",
		created() {
			this.fetchData();
		},

		data() {
			return {
				items: [],
				search: "",
				form: {
					code: ""
				},
				total: 0,
				options: {},
				itemsPerPage: 5,
				editedIndex: -1,
				created: true,
				dialog: false,
				dialog2: false,
				headers: [
					{
						text: "Code",
						sortable: false,
						value: "code"
					},
					{
						text: "Name",
						sortable: false,
						value: "name"
					},
					{
						text: "Actions",
						sortable: false,
						value: "action"
					}
				]
			};
		},

		watch: {
			search: {
				handler() {
					this.fetchData();
				}
			}
		},

		methods: {
			randomNumber() {
				return (this.form.code = Math.floor(
					1000000 + Math.random() * 90000000
				));
			},

			fetchData() {
				this.$axios
					.$get(`api/expense-category?search=${this.search}`)
					.then(res => {
						this.items = res;
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

			closeDialog() {
				this.dialog = false;
				this.editedIndex = -1;
				this.form = {};
			},

			deleteItem(item) {
				if (confirm("Are u sure to delete it?")) {
					this.$axios
						.$delete(`/api/expense-category/` + item.id)
						.then(res => {
							this.fetchData();
							this.$toast.info("Succeessfully Delete");
						})
						.catch(err => {
							console.log(err.response);
						});
				}
			},

			createItem() {
				if (this.editedIndex > -1) {
					this.$axios
						.$patch(`/api/expense-category/` + this.form.id, {
							code: this.form.code,
							name: this.form.name
						})
						.then(res => {
							this.fetchData();
							this.closeDialog();
							this.$toast.info("Succeessfully Updated");
						});
				} else {
					this.$axios
						.$post(`/api/expense-category`, this.form)
						.then(res => {
							this.form = res;
							this.fetchData();
							this.$toast.info("Succeessfully Created");
							this.closeDialog();
						})
						.catch(err => {
							console.log(err.response);
						});
				}
			},

			uploadCsv(image) {
				const URL = "http://127.0.0.1:3000/product/category";

				let data = new FormData();
				data.append("name", "my-csv");
				data.append("file", event.target.files[0]);

				let config = {
					header: {
						"Content-Type": "csv"
					}
				};

				this.$axios.$put(URL, data, config).then(response => {
					console.log("Csv upload response > ", response);
				});
			}
		}
	};
</script>

<style>
	.uploadCsv {
		border: 1px solid #161616;
		padding: 3px 0px 3px 10px;
	}
</style>
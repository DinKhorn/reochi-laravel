<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">
				Supplier
				<span class="caption grey--text mt-2">&nbsp;List</span>
				<v-spacer></v-spacer>
				<v-btn v-permission="'add supplier'" class="primary white--text" to="/supplier/add">
					<v-icon left>mdi-plus-circle</v-icon>Add
				</v-btn>
			</v-card-title>
			<div class="pa-4">
				<div class="d-flex justify-space-between">
					<div>
						<v-text-field label="Search" solo outlined dense></v-text-field>
					</div>
					<div>
						<v-btn class="red darken-1">PDF</v-btn>
						<v-btn class="lime lighten-1">CSV</v-btn>
						<v-btn class="blue lighten-1">Print</v-btn>
					</div>
				</div>
				<v-data-table :headers="headers" :items="items" :items-per-page="itemsPerPage">
					<template v-slot:item.action="{ item }">
						<v-tooltip bottom v-permission="'edit supplier'">
							<template v-slot:activator="{ on }">
								<!-- Edit Item -->
								<v-btn @click="editItem(item.id)" left small outlined icon color="primary" v-on="on">
									<v-icon small>mdi-pencil</v-icon>
								</v-btn>
							</template>
							<span>Edit Supplier</span>
						</v-tooltip>
						<v-tooltip bottom v-permission="'delete supplier'">
							<template v-slot:activator="{ on }">
								<!-- Delete Item -->
								<v-btn @click="deleteItem(item.id)" left small outlined icon color="red" v-on="on">
									<v-icon small>mdi-delete</v-icon>
								</v-btn>
							</template>
							<span>Delete Supplier</span>
						</v-tooltip>
					</template>
				</v-data-table>
			</div>
		</v-card>
	</v-app>
</template>


<script>
	export default {
		name: "viewSupplier",
		created() {
			this.fetchData();
		},

		data() {
			return {
				items: [],
				search: "",
				form: {},
				total: 0,
				options: {},
				itemsPerPage: 5,
				editedIndex: -1,
				created: true,
				dialog: false,
				headers: [
					// {
					// 	text: "Image",
					// 	sortable: false
					// },
					{
						text: "Name",
						sortable: false,
						value: "name"
					},
					{
						text: "Company",
						sortable: false,
						value: "company_name"
					},
					// {
					// 	text: "VAT Number",
					// 	sortable: false,
					// 	value: "vat_number"
					// },
					{
						text: "Email",
						sortable: false,
						value: "email"
					},
					{
						text: "Phone",
						sortable: false,
						value: "phone"
					},
					{
						text: "Address",
						sortable: false,
						value: "address"
					},
					{
						text: "Actions",
						sortable: false,
						value: "action"
					}
				]
			};
		},

		methods: {
			fetchData() {
				this.$axios
					.$get(`api/supplier`)
					.then(res => {
						this.items = res.suppliers.data;
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			editItem(id) {
				this.$router.push(`/supplier/${id}/edit`);
			},

			deleteItem(id) {
				if (confirm("Are u sure to delete it?")) {
					this.$axios
						.$delete(`/api/supplier/` + id)
						.then(res => {
							this.fetchData();
							this.$toast.info("Succeessfully Delete");
						})
						.catch(err => {
							console.log(err.response);
							this.$toast.error("Error!! Unable to Delete");
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
						"Content-Type": "text/csv"
					}
				};

				this.$axios.$put(URL, data, config).then(response => {
					console.log("Csv upload response > ", response);
				});
			}
		}
	};
</script>
<style lang="scss">
	.nuxt--link {
		display: block;
		text-decoration: none;
	}

	.supplier-csv {
		border: 1px solid #161616;
		padding: 3px 10px 3px 10px;
	}
</style>

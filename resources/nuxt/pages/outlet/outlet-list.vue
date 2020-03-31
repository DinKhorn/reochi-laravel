<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">
				Outlet
				<span class="caption grey--text mt-2">&nbsp;List</span>
				<v-spacer></v-spacer>
				<v-btn v-permission="'add outlet'" class="primary white--text" to="/outlet/add-outlet">
					<v-icon left>mdi-plus-circle</v-icon>Add
				</v-btn>
			</v-card-title>
			<div class="pa-4">
				<div class="d-flex justify-space-between">
					<div>
						<v-text-field label="Search" solo outlined dense v-model="search"></v-text-field>
					</div>
					<div>
						<v-btn class="red darken-1">
							<a :href="baseURL + '/api/outlet/export-pdf'" class="nuxt--link">PDF</a>
						</v-btn>
						<v-btn class="lime lighten-1">
							<a :href="baseURL + '/api/outlet/export-csv'" class="nuxt--link">CSV</a>
						</v-btn>
						<v-btn class="blue lighten-1" @click.native="print">Print</v-btn>
					</div>
				</div>
				<v-data-table :headers="headers" :items="items" :items-per-page="itemsPerPage" id="print">
					<template v-slot:item="{ item }">
						<tr>
							<td>{{ item.name }}</td>
							<td>{{ item.location }}</td>
							<td>{{ item.phone }}</td>
							<td>{{ item.create_by }}</td>
							<td>
								<span :class="item.status === 'Enable' ? 'enable' : 'disable'">{{ item.status }}</span>
							</td>
							<td>
								<v-tooltip top v-permission="'edit outlet'">
									<template v-slot:activator="{ on }">
										<v-btn icon small @click="viewItem(item.id)" color="cyan" outlined v-on="on">
											<v-icon small>mdi-eye</v-icon>
										</v-btn>
									</template>
									<span>View</span>
								</v-tooltip>
								<v-tooltip top v-permission="'edit outlet'">
									<template v-slot:activator="{ on }">
										<v-btn icon small @click="editItem(item.id)" color="primary" outlined v-on="on">
											<v-icon small>mdi-pencil</v-icon>
										</v-btn>
									</template>
									<span>Edit</span>
								</v-tooltip>
								<v-tooltip top v-permission="'delete outlet'">
									<template v-slot:activator="{ on }">
										<v-btn icon small @click="deleteItem(item)" color="red" outlined v-on="on">
											<v-icon small>mdi-delete</v-icon>
										</v-btn>
									</template>
									<span>Delete</span>
								</v-tooltip>
							</td>
						</tr>
					</template>
				</v-data-table>
			</div>
		</v-card>
	</v-app>
</template>


<script>
	import Vue from "vue";

	export default {
		name: "Outlet",

		created() {
			this.fetchData();
		},

		watch: {
			options: {
				handler() {
					this.fetchData();
				}
			},
			search: {
				handler() {
					this.searchItems();
				}
			}
		},

		data() {
			return {
				baseURL: process.env.APP_URL,
				items: [],
				search: "",
				name: "",
				location: "",
				phone: "",
				create_by: "",
				status: "",
				form: {},
				page: 1,
				options: {},
				itemsPerPage: 5,
				editedIndex: -1,
				created: true,
				dialog: false,
				dialog2: false,
				headers: [
					{
						text: "Name",
						value: "name"
					},
					{
						text: "Location",
						value: "location"
					},
					{
						text: "Contact",
						value: "phone"
					},
					{
						text: "Create By",
						value: "create_by"
					},
					{
						text: "Status",
						value: "status"
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
					.$get(
						`/api/outlets?name=${this.name}&location=${this.location}&phone=${this.phone}&create_by=${this.create_by}&status=${this.status}`
					)
					.then(res => {
						this.items = res.outlets.data;
						console.log(res.outlets);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			searchItems() {
				this.$axios
					.$get(`/api/outlets?search=${this.search}`)
					.then(res => {
						this.items = res.outlets.data;
						// console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			editItem(id) {
				this.$router.push(`/outlet/${id}/edit`);
			},

			viewItem(id) {
				this.$router.push(`/outlet/${id}/detail`);
			},

			deleteItem(item) {
				if (confirm("Are u sure to delete it?")) {
					this.$axios
						.$delete(`api/outlets/` + item.id)
						.then(res => {
							this.fetchData();
						})
						.catch(err => {
							console.log(err.response);
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
			}
		}
	};
</script>
<style lang="scss">
	.menu-list {
		background-color: #34495e;
		color: #fff;
	}

	.nuxt--link {
		display: block;
		text-decoration: none;
	}

	.form-control {
		width: 100%;
		padding-bottom: 5px;
		padding-top: 5px;
		padding-right: 10px;
		padding-left: 10px;
		outline: none;
		border-radius: 5px;
		border: 1px solid #616161;
	}

	.enable {
		background-color: #36d160;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
	}

	.disable {
		background-color: #e0355a;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
		color: #fff;
	}
</style>

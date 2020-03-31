<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">
				Salesman
				<span class="caption grey--text mt-2">&nbsp;List</span>
				<v-spacer></v-spacer>
				<v-btn v-permission="'add salesman'" class="primary white--text" to="/salesman/add">
					<v-icon left>mdi-plus-circle</v-icon>Add
				</v-btn>
			</v-card-title>
			<div class="pa-4">
				<div class="d-flex justify-space-between">
					<div>
						<v-text-field label="Search" v-model="search" solo outlined dense></v-text-field>
					</div>
					<div>
						<v-btn class="red darken-1">
							<a :href="baseURL + '/api/salesman/export-pdf'" class="nuxt--link">PDF</a>
						</v-btn>
						<v-btn class="lime lighten-1">
							<a :href="baseURL + '/api/salesman/export-csv'" class="nuxt--link">CSV</a>
						</v-btn>
						<v-btn class="blue lighten-1" @click.native="print">Print</v-btn>
					</div>
				</div>
				<v-data-table
					:headers="headers"
					:items="items"
					:items-per-page="itemsPerPage"
					:options.sync="options"
					id="print"
				>
					<template v-slot:item="{ item }">
						<tr class="sale-tr">
							<td>{{ item.name }}</td>
							<td>{{ item.email }}</td>
							<td>{{ item.phone }}</td>
							<td>{{ item.address }}</td>
							<td>
								<!-- <v-btn @click="viewItem(item.id)" small outlined icon color="teal">
									<v-icon small text>mdi-eye</v-icon>
								</v-btn>-->
								<v-btn
									v-permission="'edit salesman'"
									@click="editItem(item.id)"
									small
									outlined
									icon
									color="primary"
								>
									<v-icon small text>mdi-pencil</v-icon>
								</v-btn>
								<v-btn
									v-permission="'delete salesman'"
									@click="removeItem(item.id)"
									small
									outlined
									icon
									color="red"
								>
									<v-icon small>mdi-delete</v-icon>
								</v-btn>
							</td>
						</tr>
					</template>
				</v-data-table>
			</div>
		</v-card>
	</v-app>
</template>


<script>
	export default {
		created() {
			this.fetchData();
		},
		watch: {
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
				form: {},
				options: {},
				itemsPerPage: 5,
				editedIndex: -1,
				headers: [
					{
						text: "Salesman Name"
					},
					{
						text: "Email"
					},
					{
						text: "Phone"
					},
					{
						text: "address"
					},
					{
						text: "Action",
						sortable: false
					}
				]
			};
		},

		methods: {
			fetchData() {
				this.$axios
					.$get(`api/salesman`)
					.then(res => {
						// this.$set(this.$data, "items", res.sales.data);
						// this.total = res.sales.total;
						this.items = res.salesman.data;
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			searchItems() {
				this.$axios
					.$get(`/api/salesman?search=${this.search}`)
					.then(res => {
						this.items = res.salesman.data;
						// console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			close() {
				this.dialog = false;
				this.editedIndex = -1;
				this.form = {};
			},

			editItem(id) {
				this.$router.push(`/salesman/${id}/edit`);
			},

			// viewInfo(id) {
			// 	this.$router.push(`/salesman/${id}/show`);
			// }

			removeItem(id) {
				if (confirm("Are u sure to delete it?")) {
					this.$axios
						.$delete(`/api/salesman/` + id)
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
	.nuxt--link {
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

	.paid {
		background-color: #36d160;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
	}

	.due {
		background-color: #e0355a;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
		color: #fff;
	}

	.completed {
		background-color: #433ac1;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
		color: #fff;
	}

	.sale-tr {
		cursor: pointer;
	}
</style>

<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">
				Stock Out
				<span class="caption grey--text mt-2">&nbsp;List</span>
				<v-spacer></v-spacer>
				<v-btn v-permission="'add stock-out'" class="primary white--text" to="/stock-out/add">
					<v-icon left>mdi-plus-circle</v-icon>Add
				</v-btn>
			</v-card-title>
			<div class="pa-4">
				<div class="d-flex justify-space-between">
					<div class="col-7 py-0">
						<div class="row">
							<v-text-field label="Search" solo outlined dense style="width: 100px !important;"></v-text-field>
							<v-select
								label="Filter by"
								solo
								outlined
								dense
								v-model="filter_by"
								:items="filter_by"
								style="width: 60px !important;padding-left:10px;"
							></v-select>
							<v-autocomplete
								label="Filter by location"
								solo
								outlined
								dense
								:items="filter_by_location"
								v-model="filter_by_location"
								item-value="name"
								item-text="name"
								style="width: 60px !important;padding-left:10px;"
							></v-autocomplete>
						</div>
						<div class="row">
							<v-menu
								v-model="menu1"
								:close-on-content-click="false"
								:nudge-right="40"
								transition="scale-transition"
								offset-y
								min-width="290px"
							>
								<template v-slot:activator="{ on }">
									<v-text-field
										v-model="date"
										readonly
										v-on="on"
										outlined
										solo
										dense
										label="Date From"
										class="pr-2"
									></v-text-field>
								</template>
								<v-date-picker v-model="date" @input="menu1 = false"></v-date-picker>
							</v-menu>
							<v-menu
								v-model="menu2"
								:close-on-content-click="false"
								:nudge-right="40"
								transition="scale-transition"
								offset-y
								min-width="290px"
							>
								<template v-slot:activator="{ on }">
									<v-text-field
										v-model="date"
										class="pl-2"
										readonly
										outlined
										solo
										dense
										v-on="on"
										label="Date To"
									></v-text-field>
								</template>
								<v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
							</v-menu>
						</div>
					</div>
					<div>
						<v-btn class="red darken-1">PDF</v-btn>
						<v-btn class="lime lighten-1">CSV</v-btn>
						<v-btn class="blue lighten-1">Print</v-btn>
					</div>
				</div>
				<v-data-table :headers="headers" :items="items" v-permission="'view stock-out'">
					<template v-slot:item.action="{item}">
						<v-tooltip top v-permission="'edit stock-out'">
							<template v-slot:activator="{ on }">
								<v-btn icon @click="editItem(item)" color="primary" outlined v-on="on">
									<v-icon small>mdi-pencil</v-icon>
								</v-btn>
							</template>
							<span>Edit</span>
						</v-tooltip>
						<v-tooltip top v-permission="'delete stock-out'">
							<template v-slot:activator="{ on }">
								<v-btn icon @click="deleteItem(item)" color="red" outlined v-on="on">
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
		name: "StockOut",
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
				date: new Date().toISOString().substr(0, 10),
				menu1: false,
				modal: false,
				menu2: false,
				dialog: false,
				filter_by: "",
				items: [],
				form: {},
				headers: [
					{
						text: "Date",
						value: "created_at"
					},
					{
						text: "Reference No.",
						value: "reference_no"
					},
					{
						text: "Deliver Name",
						value: "deliver_name"
					},
					{
						text: "Total",
						value: "total"
					},
					{
						text: "Action",
						value: "action",
						sortable: false
					}
				],
				filter_by: ["Outlet", "Seller"],
				filter_by_location: [],
				role: ["saleman", "administator"]
			};
		},
		created() {
			this.fetchData();
		},
		methods: {
			fetchData() {
				this.$axios
					.$get(`api/stock-out`)
					.then(res => {
						// console.log(res.stock_out.data);
						this.items = res.stock_out.data;
					})
					.catch(err => {
						console.log(err.response);
					});
			}

			// searchItems() {
			// 	this.$axios
			// 		.$get(`/api/outlets?search=${this.search}`)
			// 		.then(res => {
			// 			this.items = res.outlets.data;
			// 			// console.log(res);
			// 		})
			// 		.catch(err => {
			// 			console.log(err.response);
			// 		});
			// },

			// editItem(id) {
			// 	this.$router.push(`/outlet/${id}/edit`);
			// },

			// viewItem(id) {
			// 	this.$router.push(`/outlet/${id}/detail`);
			// },

			// deleteItem(item) {
			// 	this.$axios
			// 		.$delete(`api/outlets/` + item.id)
			// 		.then(res => {
			// 			this.fetchData();
			// 		})
			// 		.catch(err => {
			// 			console.log(err.response);
			// 		});
			// },

			// print() {
			// 	var prtContent = document.getElementById("print");
			// 	var tr = document.getElementsByTagName("tr");
			// 	var th = document.getElementsByTagName("th");

			// 	if (th.length > 0) {
			// 		for (var i = 0; i < tr.length; i++) {
			// 			tr[i].cells[th.length - 1].style.visibility = "hidden";
			// 		}
			// 		var newWin = window.open();
			// 		newWin.document.write(prtContent.children[0].outerHTML);
			// 		for (var i = 0; i < tr.length; i++) {
			// 			tr[i].cells[th.length - 1].style.visibility = "visible";
			// 		}
			// 	} else {
			// 		var newWin = window.open();
			// 		newWin.document.write("No Data aviable");
			// 	}
			// 	newWin.print();
			// 	newWin.close();
			// }
		}
	};
</script>

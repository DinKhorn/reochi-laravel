<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">
				Stock In
				<span class="caption grey--text mt-2">&nbsp;List</span>
				<v-spacer></v-spacer>
				<v-btn class="primary white--text" to="/stock-in/add">
					<v-icon left>mdi-plus-circle</v-icon>Add
				</v-btn>
			</v-card-title>
			<div class="pa-4">
				<div class="d-flex justify-space-between">
					<div class="col-7 py-0">
						<div class="row">
							<v-text-field
								label="Search"
								v-model="search"
								solo
								outlined
								dense
								style="width: 120px !important;"
							></v-text-field>
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
										style="width: 60px !important; margin:0 15px"
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
										style="width: 60px !important;"
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
						<v-btn class="red darken-1">
							<a :href="baseURL + '/api/salesman/export-pdf'" class="nuxt--link">PDF</a>
						</v-btn>
						<v-btn class="lime lighten-1">
							<a :href="baseURL + '/api/salesman/export-csv'" class="nuxt--link">CSV</a>
						</v-btn>
						<v-btn class="blue lighten-1" @click.native="print">Print</v-btn>
					</div>
				</div>
				<v-data-table :headers="headers" :items="items" v-permission="'view stock-in'" id="print">
					<template v-slot:item="{item}">
						<tr>
							<td>{{ item.created_at }}</td>
							<td>{{ item.reference_no }}</td>
							<td>{{ item.supplier.name }}</td>
							<td>{{ item.created_by.name }}</td>
							<td>
								<v-tooltip top v-permission="'view stock-in'">
									<template v-slot:activator="{ on }">
										<v-btn icon small @click="viewItem(item.id)" color="cyan" outlined v-on="on">
											<v-icon small>mdi-eye</v-icon>
										</v-btn>
									</template>
									<span>View</span>
								</v-tooltip>
								<v-tooltip top v-permission="'edit stock-in'">
									<template v-slot:activator="{ on }">
										<v-btn small icon @click="editItem(item.id)" color="primary" outlined v-on="on">
											<v-icon small>mdi-pencil</v-icon>
										</v-btn>
									</template>
									<span>Edit</span>
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
	export default {
		name: "StockIn",
		watch: {
			search: {
				handler() {
					this.searchItems();
				}
			},
			immediate: true
		},

		data() {
			return {
				date: new Date().toISOString().substr(0, 10),
				baseURL: process.env.APP_URL,
				menu1: false,
				modal: false,
				menu2: false,
				dialog: false,
				search: "",
				items: [],
				filter_by_location: [],
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
						text: "Supplier",
						value: "supplier_id"
					},
					{
						text: "Create By",
						value: "created_by"
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
		created() {
			this.fetchData();
		},
		methods: {
			fetchData() {
				this.$axios
					.$get(`api/stock-in`)
					.then(res => {
						// console.log(res.stock_in.data[0]);
						this.items = res.stock_in.data;
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			searchItems() {
				this.$axios
					.$get(`/api/stock-in?search=${this.search}`)
					.then(res => {
						this.items = res.stock_in.data;
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			editItem(id) {
				this.$router.push(`/stock-in/${id}/edit`);
			},

			viewItem(id) {
				this.$router.push(`/stock-in/${id}/detail`);
			},

			// 	deleteItem(item) {
			// 		this.$axios
			// 			.$delete(`api/outlets/` + item.id)
			// 			.then(res => {
			// 				this.fetchData();
			// 			})
			// 			.catch(err => {
			// 				console.log(err.response);
			// 			});
			// 	},

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

<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3" v-permission="'view quotation'">
				<nuxt-link class="nuxt--link" to="/quotation/add">
					<v-btn class="green darken-2" dark>
						<v-icon left>mdi-plus-circle</v-icon>
						Add Quotation
					</v-btn>
				</nuxt-link>
			</div>
		</div>
		
		<v-card>
			<div class="d-flex justify-space-between pt-6 px-5">
				<div>
					<v-text-field 
						label="Search" 
						solo 
						outlined 
						dense
						v-model="search"
					></v-text-field>
				</div>
				<div>
					<v-btn class="red darken-1">PDF</v-btn>
					<v-btn class="lime lighten-1">CSV</v-btn>
					<v-btn class="blue lighten-1">Print</v-btn>
				</div>
			</div>
			<v-divider></v-divider>
			<v-data-table
				:headers="headers"
				:items="items"
				:items-per-page="itemsPerPage"
				:options.sync="options"
				:server-items-length="total"
			>
				<template v-slot:item="{ item }">
					<tr class="viewQuotation">
						<td @click="viewQuotation(item.id)">{{ item.created_at }}</td>
						<td @click="viewQuotation(item.id)">{{ item.reference_no }}</td>
						<td @click="viewQuotation(item.id)">{{ item.biller.name }}</td>
						<td @click="viewQuotation(item.id)">{{ item.member.name}}</td>
						<td @click="viewQuotation(item.id)">{{ item.supplier.name}}</td>
						<td @click="viewQuotation(item.id)">
							<span :class="item.status === 'Pending' ? 'pending' : 'sent'">
								{{ item.status }}
							</span>
						</td>
						<td @click="viewQuotation(item.id)"> {{ item.grand_total | formatMoney }}</td>
						
						<td class="text-center">
							<div class="row"> 
								<v-tooltip top v-permission="'view sales'">
									<template v-slot:activator="{ on }">
										<v-btn small icon @click="viewQuotation(item.id)" color="teal" outlined v-on="on">
											<v-icon small>mdi-eye</v-icon>
										</v-btn>
									</template>
									<span>View</span>
								</v-tooltip>
								<v-tooltip top v-permission="'edit sales'">
									<template v-slot:activator="{ on }">
										<v-btn small icon @click="editItem(item.id)" color="primary" outlined v-on="on">
											<v-icon small>mdi-pencil</v-icon>
										</v-btn>
									</template>
									<span>Edit</span>
								</v-tooltip>
								<v-tooltip top v-permission="'delete sales'">
									<template v-slot:activator="{ on }">
										<v-btn small icon @click="deleteItem(item.id)" color="red" outlined v-on="on">
											<v-icon small>mdi-delete</v-icon>
										</v-btn>
									</template>
									<span>Delete</span>
								</v-tooltip>
							</div>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>


<script>

	import Vue from 'vue';

	var numeral = require("numeral");
	Vue.filter("formatMoney", function (value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		created() {
			this.fetchData();
		},
		
		watch: {
			options: {
				handler() {
					this.fetchData();
				}
			},
			search:{
			handler(){
				this.fetchSearch();
			}
		},
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
					{
						text: "Date",
						sortable: false,
					},
					{
						text: "Reference No",
						sortable: false,
					},
					{
						text: "Biller",
						sortable: false,
					},
					{
						text: "Customer",
						sortable: false,
					},
					{
						text: "Supplier",
						sortable: false,
					},
					{
						text: "Status",
						sortable: false,
					},
					{
						text: "Grand Total",
						sortable: false,
					},
					{
						text: "Action",
						sortable: false,
					}
				],
			};
		},

		methods: {
			fetchData() {
				this.$axios.$get(`/api/quotation/?temsPerPage=${this.options.itemsPerPage}&page=${this.options.page}`)
				.then(res => {
					this.items = res.quotation.data;
					this.total = res.total;
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				})
			},
			fetchSearch(){
			this.$axios.$get(`/api/quotation?search=${this.search}`)
			.then(res =>{
				this.items = res.quotation.data;
				console.log(res)
			})
			.catch(err =>{
				console.log(err.response);
			})
		},
			viewQuotation(id) {
      		this.$router.push(`/quotation/${id}`);
			},

			editItem(id) {
				this.$router.push(`/quotation/${id}/edit`);
			},

			deleteItem(id) {
				if(confirm('Do you want to Delete it?')) {
					this.$axios.$delete(`api/quotation/` + id)
					.then(res => {
						this.fetchData();
						console.log(res);
						this.$toast.success("Deleted Successfully");
					})
					.catch(err => {
						console.log(err.response);
					})
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
			},
		}
	};
</script>
<style lang="scss">
	.nuxt--link {
		display: block;
		text-decoration: none;
	}
	.sent {
		background: #28a745;
		padding: 5px 10px 5px 10px;
		border-radius: 3px;
		color: #fff;
	}

	.pending {
		background: red;
		padding: 5px 10px 5px 10px;
		border-radius: 3px;
		color: #fff;
	}
	.viewQuotation {
		cursor: pointer;
	}
</style>
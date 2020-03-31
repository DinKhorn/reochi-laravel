<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3" v-permission="'return sales'">
				<nuxt-link class="nuxt--link" to="/return/return-sale/create">
					<v-btn class="green darken-2" dark>
						<v-icon left>mdi-plus-circle</v-icon>
						Add Return Sale
					</v-btn>
				</nuxt-link>
			</div>
		</div>
		<v-card>
			<div class="d-flex justify-space-between pt-6 px-5">
				<div>
					<v-text-field
						label="Search..."
						solo 
						outlined
						dense
						v-model="search"
					></v-text-field>
				</div>
				<div>
					<v-btn class="red darken-1">PDF</v-btn>
					<v-btn class="lime lighten-1">CSV</v-btn>
					<v-btn @click="print" class="blue lighten-1">Print</v-btn>
				</div>
			</div>
			<v-divider></v-divider>
			<v-data-table
				:headers="headers"
				:items="items"
				:items-per-page="itemsPerPage"
				:options.sync="options"
				:server-items-length="total"
				id="print"	
			>
				<template v-slot:item="{ item }">
					<tr class="viewReturnSale">
						<td @click="viewReturnSale(item.id)">{{ item.created_at }}</td>
						<td @click="viewReturnSale(item.id)">{{ item.reference_no }}</td>
						<td @click="viewReturnSale(item.id)">{{ item.branch.address }}</td>
						<td @click="viewReturnSale(item.id)">{{ item.member.name }}</td>
						<td @click="viewReturnSale(item.id)">{{ item.account.name }}</td>
						<td @click="viewReturnSale(item.id)">{{ item.sub_total | Menoy }}</td>
						
						<td class="text-center">
							<div class="row"> 
								<v-tooltip top v-permission="'view sales'">
									<template v-slot:activator="{ on }">
										<v-btn small icon @click="viewReturnSale(item.id)" color="teal" outlined v-on="on">
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
	Vue.filter("Menoy", function (value) {
		return numeral(value).format("0,0.00");
	});
	

export default {

	created() {
		this.fetchReturn();
		this.fetchSearch();
	},

	watch: {
		options: {
			handler() {
				this.fetchReturn();
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
			form: {},
			total: 0,
			search: '',
			options: {},
			itemsPerPage: 5,
			headers: [{
					text: 'Date',
					sortable: false,
					
				}, {
					text: 'Reference',
					sortable: false,
					value: 'reference_no'
					
				}, {
					text: 'Warehouse',
					sortable: false,
					
				}, {
					text: 'Customer',
					sortable: false,
					
				}, {
					text: 'Account',
					sortable: false,
					
				},{
					text: 'Grand Total (USD)',
					sortable: false,
					
				},{
					text: 'Action',
					sortable: false,
				},
			],
		}
	},
	// computed: {
	// 	tableItems () {
	// 	if (!this.search) {
	// 		return this.items;
	// 	}

	// 	return this.items.filter(item => item.members.indexOf(this.search) > -1)
	// 	}
	// },

	methods: {

		fetchReturn() {
			this.$axios.$get(`/api/return-sale?temsPerPage=${this.options.itemsPerPage}&page=${this.options.page}`)
			.then(res => {
				this.items = res.returnsale.data;
				this.total = res.total;
				console.log(res)
			})
			.catch(err => {
				console.log(err);
			})
		},

		fetchSearch(){
			this.$axios.$get(`/api/return-sale?search=${this.search}`)
			.then(res =>{
				this.items = res.returnsale.data;
				console.log(res)
			})
			.catch(err =>{
				console.log(err.response);
			})
		},

		viewReturnSale(id){
			this.$router.push(`/return/return-sale/${id}`)
		},

		editItem(id) {
			this.$router.push(`/return/return-sale/${id}/edit`);
		},

		deleteItem(id) {
			if(confirm('Do you want to delete it?')) {
				this.$axios.$delete(`api/return-sale/` + id)
				.then(res => {
					this.fetchReturn();
					this.$toast.info('Succeessfully Delete');
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		  },
		print() {
			this.$htmlToPaper('print')
		},
	}
}

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
.viewReturnSale{
	cursor: pointer;
}

</style>
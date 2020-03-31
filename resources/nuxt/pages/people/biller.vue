<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="py-5 pr-5" v-permission="'add users'">
				<nuxt-link 
					to="/people/add_biller" 
					class="nuxt--link grey--text text--lighten-4"
				>
					<v-btn class="teal darken-1" dark >
						<v-icon left>mdi-plus-circle</v-icon>
							Add Biller
					</v-btn>
				</nuxt-link>
			</div>
			<div class="py-5">
				<v-dialog v-model="dialog" max-width="700px" v-permission="'add users'">
					<template v-slot:activator="{ on }">
						<v-btn class="purple darken-1" dark v-on="on">
							<v-icon left>mdi-file</v-icon>
							Import Biller
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							IMPORT BILLER
						</v-card-title>
						<v-divider></v-divider>
						<v-col cols="12">
							<p class="mt-5">The correct column order is (name*, parent_category) and you must follow this.</p>
						</v-col>
						<v-row class="px-4">
							<v-col cols="12" sm="6">
								<label class="font-weight-bold">Upload CSV File</label>
								<input type="file" class="form-control" @change="uploadCsv($event)">
							</v-col>
							<v-col cols="12" sm="6" class="d-flex flex-column">
								<label class="font-weight-bold">Sample File</label>
								<v-btn class="teal darken-2 grey--text text--lighten-2">
									<v-icon left>mdi-download</v-icon>
									Download
								</v-btn>
							</v-col>
						</v-row>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text>Close</v-btn>
							<v-btn color="primary">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</div>
		</div>
		<div class="d-flex justify-space-between pb-5">
			<input type="text" placeholder="Search" class="biller--search" v-model="search">
			<div>
				<v-btn class="red darken-1">PDF</v-btn>
				<v-btn class="lime lighten-1">CSV</v-btn>
				<v-btn class="blue lighten-1">Print</v-btn>
			</div>
		</div>
		<v-card>
			<v-data-table :headers="headers" :items="items" :items-per-page="itemsPerPage" :options.sync="options">
				<template v-slot:item="{item}">
					<tr @click="editBiller(item.id)" class="biller--tr">
						<td></td>
						<td>{{item.name}}</td>
						<td>{{item.name}}</td>
						<td>{{item.vat_number}}</td>
						<td>{{item.email}}</td>
						<td>{{item.phone}}</td>
						<td>{{item.address}}</td>
						<td>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<!-- Edit Item -->
									<v-btn small left color="primary" icon outlined v-on="on">
										<v-icon small>
											mdi-pencil
										</v-icon>
									</v-btn>
								</template>
								<span>Edit Biller</span>
							</v-tooltip>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<!-- Delete Item -->
									<v-btn @click="deleteItem(item)" small left color="red" icon outlined v-on="on">
										<v-icon small>
											mdi-delete
										</v-icon>
									</v-btn>
								</template>
								<span>Delete Biller</span>
							</v-tooltip>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>


<script>


export default {
	created() {
		this.fetchData()
	},

	watch: {
		options: {
			handler() {
				this.fetchData()
			}
		},

		search: {
			handler() {
				this.fetchData();
			}
		},

		immediate: true,
	},

	data() {
		return {
			items: [],
			search: '',
			form: {},
			total: 0,
			options: {},
			itemsPerPage: 5,
			editedIndex: -1,
			created: true,
			dialog: false,
			headers: [
				{
					text: 'Image',
					sortable: false,
					value: 'image',
				}, {
					text: 'Name',
					sortable: false,
					value: 'name',
				}, {
					text: 'Company Name',
					sortable: false,
					value: 'company_name'
				}, {
					text: 'VAT Number',
					sortable: false,
					value: 'vat_number',
				}, {
					text: 'Email',
					sortable: false,
					value: 'email',
				}, {
					text: 'Phone Number',
					sortable: false,
					value: 'phone',
				}, {
					text: 'Address',
					sortable: false,
					value: 'address',
				},{
					text: 'Actions',
					sortable: false,
					value: 'action',
				},
			],
		}
	},

	methods: {
		fetchData() {
			this.$axios.$get(`api/biller?itemsPerPage=${this.options.itemsPerPage}&page=${this.options.page}&search=${this.search}`)
			.then(res => {
				this.items = res.billers.data;
				console.log(res);
			})
			.catch(err => {
				console.log(err.response)
			})
		},

		editBiller(id) {
			this.$router.push(`/people/biller/${id}/edit`)
		},

      	closeDialog() {
      		this.dialog = false;
      		this.editedIndex = -1;
      		this.form = {};
      	},

      	deleteItem(item) {
			if(confirm('Are u sure to delete it?')) {
				this.$axios.$delete(`/api/biller/` + item.id)
				.then(res => {
					this.fetchData();
					this.$toast.info('Succeessfully Delete');
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		},

		uploadCsv(image) {
			const URL = 'http://127.0.0.1:3000/product/category'

			let data = new FormData();
		    data.append('name', 'my-csv');
		    data.append('file', event.target.files[0]); 

		    let config = {
		      header : {
		        'Content-Type' : 'text/csv'
		      }
		    }

		    this.$axios.$put(
		      URL, 
		      data,
		      config
		    ).then(
		      response => {
		        console.log('Csv upload response > ', response)
		      }
		    )
		}
	}
}

</script>
<style lang="scss">

.nuxt--link {
	display: block;
	text-decoration: none;
}

.biller--tr {
	cursor: pointer;
}

.biller--search {
	padding: 5px 10px 5px 10px;
	border: 1px solid #6ab743;
	width: 40%;
	outline: none;
}

</style>

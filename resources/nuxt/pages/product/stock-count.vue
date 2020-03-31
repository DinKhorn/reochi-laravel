<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3">
				<v-dialog v-model="dialog1" max-width="600px" v-permission="'add sales'">
					<template v-slot:activator="{ on }">
						<v-btn class="teal darken-1" dark v-on="on">
							<v-icon left>mdi-plus-circle</v-icon>
							Count Stock
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							Count Stock
						</v-card-title>
						<v-divider></v-divider>
						<v-col cols="12">
							<label for="name">Warehouse</label>
							<v-select
								solo
								outlined
								dense
								label="Select Warehouse"
								:items="warehouse"
							></v-select>
						</v-col>
						<v-col cols="12">
							<label for="">Type</label>
							<v-select
								outlined
								solo
								dense
								label="Full"
								:items="types"
							></v-select>
						</v-col>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text>Close</v-btn>
							<v-btn color="primary">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</div>
		</div>
		<div class="d-flex justify-space-between">
			<div>
				<v-text-field
					label="Search"
					solo 
					outlined
					dense
				></v-text-field>
			</div>
			<div>
				<v-btn class="red darken-1">PDF</v-btn>
				<v-btn class="lime lighten-1">CSV</v-btn>
				<v-btn class="blue lighten-1">Print</v-btn>
			</div>
		</div>
		<v-card>
			<v-data-table :headers="headers" :items="items" :items-per-page="itemsPerPage" :options.sync="options" :server-items-length="total">
				<template v-slot:item.action="{ item }">
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<!-- Edit Item -->
							<v-icon left fab color="primary" v-on="on">
								mdi-pencil
							</v-icon>
						</template>
						<span>Edit Supplier</span>
					</v-tooltip>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">

							<!-- Delete Item -->
							<v-icon left fab color="primary" v-on="on">
								mdi-delete
							</v-icon>
						</template>
						<span>Delete Supplier</span>
					</v-tooltip>
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>


<script>
export default {
	name: 'Menu',
	created() {
		// this.fetchData()
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
			dialog1: false,
			dialog2: false,
			headers: [
				{
					text: 'Date',
					sortable: false,
				}, {
					text: 'Reference',
					sortable: false,
				}, {
					text: 'Warehouse',
					sortable: false,
				}, {
					text: 'Category',
					sortable: false,
				}, {
					text: 'Brand',
					sortable: false,
				},{
					text: 'Type',
					sortable: false,
				},{
					text: 'Intial File',
					sortable: false,
				},{
					text: 'Final File',
					sortable: false,
				},{
					text: 'Action',
					sortable: false,
				},
			],
			warehouse: 
			[
				'warehouse1', 'warehouse2', 			
			],
			types: ['Full', 'Partial'],
		}
	},

	methods: {
		uploadCsv(image) {
			const URL = 'http://127.0.0.1:3000/product/category'

			let data = new FormData();
		    data.append('name', 'my-csv');
		    data.append('file', event.target.files[0]); 

		    let config = {
		      header : {
		        'Content-Type' : 'csv'
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
.menu-list {
	background-color: #34495e;
	color: #fff;
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

</style>

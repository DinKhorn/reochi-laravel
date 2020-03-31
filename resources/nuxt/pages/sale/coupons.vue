<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3">
				<v-dialog v-model="dialog1" max-width="600px" v-permission="'add sales'">
					<template v-slot:activator="{ on }">
						<v-btn class="teal darken-1" dark v-on="on">
							<v-icon left>mdi-plus-circle</v-icon>
							Add Coupons
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							ADD COUPONS
						</v-card-title>
						<v-divider></v-divider>
						<v-col cols="12">
							<label>Coupon Code</label>
							<div class="d-flex">
								<v-text-field
									solo
									outlined
									dense
									label="Click Generate To Generate Code"
								></v-text-field>
								<v-btn>Generate</v-btn>
							</div>
						</v-col>
						<v-col cols="12">
							<label for="">Type</label>
							<v-select
								outlined
								solo
								dense
								label="Please Select"
								:items="type"
							></v-select>
						</v-col>
						<v-col cols="12">
							<label for="">Amount</label>
							<v-text-field
								outlined
								solo
								dense
								label="Amount"
								append-icon="mdi-percent"
							></v-text-field>
						</v-col>
						<v-col cols="12">
							<label for="">Quantity</label>
							<v-text-field
								outlined
								solo
								dense
								label="Quantity"
							></v-text-field>
						</v-col>
						<v-col cols="12">
							<label for="">Expired Date</label>
							<v-menu
					          v-model="menu1"
					          :close-on-content-click="false"
					          max-width="290"
					        >
					          <template v-slot:activator="{ on }">
					            <v-text-field
					              :value="computedDateFormattedMomentjs"
					              clearable
					              readonly
					              v-on="on"
					              dense
					              solo
					              outlined
					              @click:clear="date = null"
					            ></v-text-field>
					          </template>
					          <v-date-picker
					            v-model="date"
					            @change="menu1 = false"
					          ></v-date-picker>
					        </v-menu>
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

import moment from 'moment';

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
			headers: [{
					text: 'Coupon Code',
					sortable: false,
				}, {
					text: 'Type',
					sortable: false,
				}, {
					text: 'Amount',
					sortable: false,
				}, {
					text: 'Minimum Amount',
					sortable: false,
				}, {
					text: 'Qty',
					sortable: false,
				},{
					text: 'Available',
					sortable: false,
				},{
					text: 'Expired Date',
					sortable: false,
				},{
					text: 'Created By',
					sortable: false,
				},{
					text: 'Actions',
					sortable: false,
				},
			],
			type: ['Percentage', 'Fixed Amount'],
			date: new Date().toISOString().substr(0, 10),
			menu1: false,
		}
	},

	methods: {
	},

	computed: {
	    computedDateFormattedMomentjs () {
	        return this.date ? moment(this.date).format('DD-MM-YYYY') : ''
	    },
    },
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

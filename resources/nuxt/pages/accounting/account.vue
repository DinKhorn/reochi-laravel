<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pr-5 py-5">
				<v-dialog 
					v-model="dialog" max-width="600px" v-permission="'add account'"
					persistent
				>
					<template v-slot:activator="{ on }">
						<v-btn class="teal darken-1" dark v-on="on">
							<v-icon left>mdi-plus-circle</v-icon>
							Add Account
						</v-btn>
					</template>
			
					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							ADD Account
						</v-card-title>
						<v-divider></v-divider>
						<v-col cols="12">
							<label class="font-weight-bold" for="no">Account No</label>
							<v-text-field
								solo
								dense
								outlined
								label="Account No"
								v-model="form.code"
							></v-text-field>
						</v-col>
						<v-col cols="12">
							<label class="font-weight-bold" for="name">Name</label>
							<v-text-field
								outlined
								solo
								dense
								label="Name"
								v-model="form.name"
							></v-text-field>
						</v-col>
						<v-col cols="12">
							<label class="font-weight-bold" for="balance">Initial Balance</label>
							<v-text-field
								outlined
								solo
								dense
								type="number"
								label="Balance"
								v-model.number="form.balance"
							></v-text-field>
						</v-col>
						<v-col cols="12">
							<div class="d-flex flex-column">
								<label class="font-weight-bold" for="balance">Note</label>
								<textarea 
									v-model="form.description" 
									cols="20" rows="5" 
									class="account_note"
								></textarea>
							</div>
						</v-col>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
							<v-btn color="primary" @click="createItem">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</div>

			<div class="py-5">
				<v-dialog v-model="dialog2" max-width="600px" v-permission="'add account'">
					<template v-slot:activator="{ on }">
						<v-btn class="blue darken-1" dark v-on="on">
							<v-icon left>mdi-plus-circle</v-icon>
							Add Account Statement
						</v-btn>
					</template>
			
					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							ADD Account
						</v-card-title>
						<v-divider></v-divider>
						<v-col cols="12">
							<label class="font-weight-bold">Account</label>
							<v-select
								solo
								dense
								outlined
							></v-select>
						</v-col>
						<v-col cols="12">
							<label class="font-weight-bold">Type</label>
							<v-text-field
								outlined
								solo
								dense
								label="Name"
							></v-text-field>
						</v-col>
						<v-col cols="12">
							<label class="font-weight-bold" for="balance">Choose Your Date</label>
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
					              solo
					              outlined
					              dense
					              v-on="on"
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
							<v-btn color="blue darken-1" text >Close</v-btn>
							<v-btn color="primary">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</div>
		</div>
		<div class="d-flex justify-space-between pr-5">
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
			<v-data-table 
				:headers="headers" 
				:items="items" 
				:items-per-page="itemsPerPage" 
			>
				<template v-slot:item="{ item }">
					<tr>
						<td>{{ item.code }}</td>
						<td>{{ item.name }}</td>
						<td>USD {{ item.balance | formatNumber }}</td>
						<td></td>
						<td>{{ item.description }}</td>
						<td>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<!-- Edit Item -->
									<v-btn  
										@click="editItem(item)" 
										small color="primary" v-on="on" icon outlined
									>
										<v-icon small>
											mdi-pencil
										</v-icon>
									</v-btn>
								</template>
								<span>Edit Account</span>
							</v-tooltip>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">

									<!-- Delete Item -->
									<v-btn @click="deleteItem(item)" small icon outlined color="red" v-on="on">
										<v-icon small>
											mdi-delete
										</v-icon>
									</v-btn>
								</template>
								<span>Delete Account</span>
							</v-tooltip>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>


<script>

import Vue from 'vue';
import moment from 'moment';	

var numeral = require("numeral");

Vue.filter("formatNumber", function (value) {
    return numeral(value).format("0,0.00");
});

export default {
	
	created() {
		this.fetchData()
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
			dialog2: false,
			headers: [
				{
					text: 'Account No',
					sortable: false,
					value: 'code',
				}, {
					text: 'Name',
					sortable: false,
					value: 'name'
				}, {
					text: 'Initial Balance',
					sortable: false,
					value: 'balance'
				}, {
					text: 'Default',
					sortable: false,
				}, {
					text: 'Note', 
					sortable: false,
					value: 'description'
				},{
					text: 'Actions',
					sortable: false,
					value: 'action',
				},
			],
			menu1: false,
			date: new Date().toISOString().substr(0, 10),
		}
	},

	methods: {
		fetchData() {
			this.$axios.$get(`api/account`)
			.then(res => {
				this.items = res.account;
				console.log(res);
			})
			.catch(err => {
				console.log(err.response);
			})
		},

		editItem (item) {
	        this.editedIndex = this.items.indexOf(item);
	        this.form = Object.assign({}, item);
	        this.dialog = true
      	},

      	closeDialog() {
      		this.dialog = false;
      		this.editedIndex = -1;
      		this.form = {};
      	},

		createItem() {
			if(this.editedIndex > -1) {
				this.$axios.$patch(`/api/account/` + this.form.id, {
					'code': this.form.code,
					'name': this.form.name,
					'balance': this.form.balance,
					'description': this.form.description,
				})
				.then(res => {
					this.fetchData();
					this.closeDialog();
					this.$toast.info('Succeessfully Updated');
				})
			}
			else {
				this.$axios.$post(`/api/account`, this.form)
				.then(res => {
					this.items = res.data;
					this.fetchData();
					this.$toast.info('Succeessfully Created');
					this.closeDialog();
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		},

		
      	deleteItem(item) {
			if(confirm('Are u sure to delete it?')) {
				this.$axios.$delete(`/api/account/` + item.id)
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
	},

	computed: {
	    computedDateFormattedMomentjs () {
	        return this.date ? moment(this.date).format('DD-MM-YYYY') : ''
	    },
    },
}

</script>
<style lang="scss">

.account_note {
	border: 1px solid #2b90bf;
}

</style>

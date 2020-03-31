<template>
	<v-app class="mx-5 my-5">
		<div>
			<div class="py-5">
				<v-dialog v-model="dialog" max-width="700px" v-permission="'add employee'" persistent>
					<template v-slot:activator="{ on }">
						<v-btn class="blue darken-1" dark v-on="on">
							<v-icon left>mdi-plus-circle</v-icon>
							Add PayRoll
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							Add PayRoll
						</v-card-title>
						<v-divider></v-divider>
						<v-row class="px-5">
							<v-col cols="12" sm="6">
								<label for="name" class="font-weight-bold">Employee</label>
								<v-select
									solo
									outlined
									dense
									label="Select employee"
									:items="employees"
									v-model="form.employee_name"
									item-text="name"
									item-value="name"
								>
									<template v-slot:item="{ item }">
										{{ item.name }}
									</template>
								</v-select>
							</v-col>
							<v-col cols="12" sm="6">
								<label for="name" class="font-weight-bold">Account</label>
								<v-select
									solo
									outlined
									dense
									label="Select Account"
									:items="accounts"
									item-text="name"
									item-value="name"
									v-model="form.account_name"
								>
									<template v-slot:item="{ item }">
										{{ item.name }}
									</template>
								</v-select>
							</v-col>
							<v-col cols="12" sm="6">
								<label for="name" class="font-weight-bold">Amount</label>
								<v-text-field
									solo
									outlined
									dense
									label="Amount"
									v-model.number="form.amount"
									type="number"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6">
								<label for="name" class="font-weight-bold">Method</label>
								<v-select
									solo
									outlined
									dense
									label="Method"
									:items="methods"
									v-model="form.method"
								></v-select>
							</v-col>
							<v-col sm="12" cols="12" class="d-flex flex-column">
								<label for="note">Note</label>	
								<textarea  
									cols="30" 
									rows="5" 
									class="payroll_note"
									v-model="form.description"
								></textarea>
							</v-col>
						</v-row>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
							<v-btn color="primary" @click="createItem">Save</v-btn>
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
			<v-data-table 
				:headers="headers" 
				:items="items" 
				:items-per-page="itemsPerPage"
			>	
				<template v-slot:item="{ item }">
					<tr>
						<td>{{ item.created_at }}</td>
						<td></td>
						<td>{{ item.employee_name }}</td>
						<td>{{ item.account.name }}</td>
						<td>USD {{ item.amount | formatNumber }}</td>
						<td>{{ item.method }}</td>
						<td>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<!-- Edit Item -->
									<v-btn @click="editItem(item)" icon outlined color="primary" v-on="on">
										<v-icon small>
											mdi-pencil
										</v-icon>
									</v-btn>
								</template>
								<span>Edit Payroll</span>
							</v-tooltip>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<!-- Delete Item -->
									<v-btn @click="deleteItem(item)" icon outlined color="red" v-on="on">
										<v-icon small>
											mdi-delete
										</v-icon>
									</v-btn>
								</template>
								<span>Delete Payroll</span>
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
var numeral = require("numeral");

Vue.filter("formatNumber", function (value) {
    return numeral(value).format("0,0.00"); 
});

export default {
	name: "PayRoll",
	created() {
		this.fetchData()
		this.fetchEmployee()
		this.fetchAccount()
	},

	data() {
		return {
			items: [],
			employees: [],
			accounts: [],
			search: '',
			form: {},
			total: 0,
			options: {},
			itemsPerPage: 5,
			editedIndex: -1,
			created: true,
			dialog: false,
			methods: ['Cash', 'Cheque', 'Credit Card'],
			headers: [
				{
					text: 'Date',
					sortable: false,
					value: 'date',
				}, {
					text: 'Reference',
					sortable: false,
				}, {
					text: 'Employee',
					sortable: false,
					value: 'employee_name',
				}, {
					text: 'Account',
					sortable: false,
				}, {
					text: 'Amount',
					sortable: false,
				}, {
					text: 'Method',
					sortable: false,
				}, {
					text: 'Action',
					sortable: false,
				}, 
			],
		}
	},

	methods: {
		fetchAccount() {
			this.$axios.$get(`api/account`)
			.then(res => {
				this.accounts = res.account;
				console.log(res);
			})
			.catch(err => {
				console.log(err.response);
			})
		},

		fetchEmployee() {
			this.$axios.$get(`api/employee`)
			.then(res => {
				this.employees = res.data;
				console.log(res);
			})
			.catch(err => {
				console.log(err.response)
			})
		},

		fetchData() {
			this.$axios.$get(`api/payroll`)
			.then(res => {
				this.items = res.payrolls;
				console.log(res);
			})
			.catch(err => {
				console.log(err.response)
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
				this.$axios.$patch(`/api/payroll/` + this.form.id, {
					'employee_name': this.form.employee_name,
					'description': this.form.description,
					'amount': this.form.amount,
					'method': this.form.method,
					'account_name': this.form.account_name,
				})
				.then(res => {
					this.fetchData();
					this.closeDialog();
					this.$toast.info('Succeessfully Updated');
				})
			}
			else {
				this.$axios.$post(`/api/payroll`, this.form)
				.then(res => {
					this.items = res.parolls;
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
				this.$axios.$delete(`/api/payroll/` + item.id)
				.then(res => {
					this.fetchData();
					this.$toast.info('Succeessfully Delete');
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		},
	}
}

</script>
<style lang="scss">

.nuxt--link {
	display: block;
	text-decoration: none;
}

.payroll_note {
	// border: 1px solid rgba(0,0,0,0.125);
	border: 1px solid #27c6a4;
}

</style>

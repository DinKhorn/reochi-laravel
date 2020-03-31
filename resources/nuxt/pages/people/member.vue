<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pr-5 py-5">
				<nuxt-link 
					to="/people/add_member" 
					class="nuxt--link grey--text text--lighten-4"
				>
					<v-btn class="teal darken-1" dark  v-permission="'add users'">
						<v-icon left>mdi-plus-circle</v-icon>
							Add Member
					</v-btn>
				</nuxt-link>
			</div>
			<div class="py-5" v-permission="'add users'">
				<v-dialog v-model="dialog" max-width="700px">
					<template v-slot:activator="{ on }">
						<v-btn class="purple darken-1" dark v-on="on">
							<v-icon left>mdi-file</v-icon>
							Import Member
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							IMPORT Member
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
			<div class="py-5" v-permission="'add users'">
				<v-dialog v-model="dialog2" max-width="600px">
					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							Add Deposit
						</v-card-title>
						<v-divider></v-divider>
						<v-row class="px-4">
							<v-col cols="12">
								<label class="font-weight-bold">Amount</label>
								<v-text-field
									solo
									outlined
									dense
									label="Amount"
									type="number"
									v-model="form.amount"
								>
								</v-text-field>
							</v-col>
							<v-col cols="12" class="d-flex flex-column">
								<label class="font-weight-bold">Note</label>
								<textarea cols="30" rows="5" class="deposit-note"></textarea>
							</v-col>
						</v-row>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text>Close</v-btn>
							<v-btn color="primary" @click="createDeposit">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</div>

			<div v-permission="'add users'">
				<v-dialog v-model="dialog3" max-width="700px">
					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							View Deposit
						</v-card-title>
						<v-divider></v-divider>
						<v-data-table :headers="viewDeposits" :items="items" :server-items-length="total">
							<template v-slot:item="{ item }">
								<tr>
									<td>{{ item.created_at }}</td>
									<template v-for="i in item.deposits">
										<td>USD {{ i.amount | formatNumber}} </td>
									</template>
									<td>{{ item.description }}</td>
									<td></td>
									<td>
										<v-btn icon @click="editItem(item)" color="primary" outlined>
											<v-icon small>mdi-pencil</v-icon>
										</v-btn>
										<v-btn icon @click="deleteItem(item.id)" color="red" outlined>
											<v-icon small>mdi-delete</v-icon>
										</v-btn>
									</td>
								</tr>
							</template>
						</v-data-table>
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
				:headers="headers" :items="items" :items-per-page="itemsPerPage"
				:options.sync="options"
			>
				<template v-slot:item="{ item }">
					<tr class="member--tr">
						<td @click="gotoMember(item.id)">{{ item.name }}</td>
						<td @click="gotoMember(item.id)">{{ item.company_name }}</td>
						<td @click="gotoMember(item.id)">{{ item.email }}</td>
						<td @click="gotoMember(item.id)">{{ item.phone }}</td>
						<td @click="gotoMember(item.id)">{{ item.address }}</td>
						<td @click="gotoMember(item.id)">USD {{ item.deposit_amount | formatNumber }}</td>
						<td>
							<v-menu>
						      <template v-slot:activator="{ on: menu }">
						        <v-tooltip bottom>
						          <template v-slot:activator="{ on: tooltip }">
						            <v-btn
						              color="primary"
						              dark
						              v-on="{ ...tooltip, ...menu }"
						              smallF
						            >Action</v-btn>
						          </template>
						          <span>Action</span>
						        </v-tooltip>
						      </template>
						      <v-list>
						        <v-list-item
						          	v-for="(menu, index) in menus"
						          	:key="index"
						          	dense
						          	@click="menu.action(item.id)"
						          	class="cyan darken-3"
						        >
						          	<v-list-item-title class="white--text">
						          		<v-icon left dark>{{menu.icon}}</v-icon>
						          		{{ menu.title }}
						          	</v-list-item-title>
						        </v-list-item>
						      </v-list>
						    </v-menu>	
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
	name: "Member",

	watch: {
		options: {
			handler() {
				this.fetchData();
				this.fetchDeposit();
			}
		},	
		immediate: true,
	},

	data() {
		return {
			deposits: [],
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
			dialog3: false,
			headers: [
				{
					text: 'Name',
					sortable: false,
					value: 'name',
				}, {
					text: 'Company Name',
					sortable: false,
					value: 'company_name',
				}, {
					text: 'Email',
					sortable: false,
					value: 'email',
				}, {
					text: 'Phone Number',
					sortable: false,
					value: 'phone',
				}, 
				{
					text: 'Address',
					sortable: false,
					value: 'address',
				}, {
					text: 'Balance',
					sortable: false,
					value: 'balance'
				},{
					text: 'Actions',
					sortable: false,
					value: 'action',
				},
			],
			menus: [
				{title: 'Edit', icon: 'mdi-pencil', action: this.edit},
				{title: 'Delete', icon: 'mdi-delete', action: this.deleteItem},
				{title: 'Add Deposit', icon: 'mdi-plus-circle', action: this.depositDialog},
				{title: 'View Deposit', icon: 'mdi-cash', action: this.viewDeposit},
			],

			viewDeposits: [
				{ text: 'Date', sortable: false, },
				{ text: 'Amount', sortable: false, },
				{ text: 'Note', sortable: false, },
				{ text: 'Created By', sortable: false, },
				{ text: 'Actions', sortable: false, },
			],
		}
	},

	methods: {
		fetchData() {
			this.$axios.$get(`api/member`)
			.then(res => {
				this.items = res.members.data;
				this.total = res.total;
				console.log(res);
			})
			.catch(err => {
				console.log(err.response);
			})
		},

		depositDialog(id) {
			this.$router.push(`/people/${id}/add_member`);
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


      	edit(id) {
      		this.$router.push(`/people/${id}/`);
      	},	

      	gotoMember(id) {
      		this.$router.push(`/people/${id}/`);
      	},

      	deleteItem(id) {
			if(confirm('Are u sure to delete it?')) {
				this.$axios.$delete(`/api/member/` + id)
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
		},

		fetchDeposit() {
			this.$axios.$get(`api/deposit-account`)
			.then(res => {
				this.deposits = res.deposits.data;
				console.log(res)
			})
			.catch(err => {
				console.log(res.response)
			})
		},

		createDeposit() {
			this.$axios.$post(`api/deposit-account`, this.form)
			.then(res => {
				this.items = res.data;
				this.fetchDeposit()
				this.fetchData()
				this.dialog2 = false;
				this.form  = {}
			})
			.catch(err => {
				console.log(err.response)
			})
		},

		viewDeposit() {
			this.dialog3 = true;
		}
	}
}

</script>
<style lang="scss">
.menu-list {
	background-color: #34495e;
	color: #fff;
}

.nuxt--link {
	display: block;
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

.display {
	display: none;
}

.deposit-note {
	border:  1px solid #25babc;
}

.member--tr {
	cursor: pointer;
}

</style>

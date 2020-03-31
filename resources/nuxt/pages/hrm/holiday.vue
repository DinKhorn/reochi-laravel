<template>
	<v-app class="mx-5 my-5">
		<div>
			<div class="py-5">
				<v-dialog 
					v-model="dialog" max-width="700px"
					v-permission="'add employee'"
				>
					<template v-slot:activator="{ on }">
						<v-btn class="blue darken-1" dark v-on="on">
							<v-icon left>mdi-plus-circle</v-icon>
							Add Holiday
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							Add Holiday
						</v-card-title>
						<v-divider></v-divider>
						<v-row class="px-5">
							<v-col cols="12" sm="6">
								<label for="name" class="font-weight-bold">From</label>
								<v-menu
						          v-model="menu1"
						          :close-on-content-click="false"
						          max-width="290"
						        >
						          <template v-slot:activator="{ on }">
						            <v-text-field
						              :value="computedDateFormattedMomentjs"
						              clearable
						              solo
						              outlined
						              dense
						              readonly
						              v-on="on"
						              @click:clear="date = null"
						              label="Select date"
						              v-model="form.from_date"
						            ></v-text-field>
						          </template>
						          <v-date-picker
						            v-model="form.from_date"
						            @change="menu1 = false"
						          ></v-date-picker>
						        </v-menu>
							</v-col>
							<v-col cols="12" sm="6">
								<label for="name" class="font-weight-bold">From</label>
								<v-menu
						          v-model="menu2"
						          :close-on-content-click="false"
						          max-width="290"
						        >
						          <template v-slot:activator="{ on }">
						            <v-text-field
						              :value="computedDateFormattedMomentjs"
						              clearable
						              solo
						              outlined
						              dense
						              readonly
						              v-on="on"
						              @click:clear="date = null"
						              label="Select date"
						              v-model="form.to_date"
						            ></v-text-field>
						          </template>
						          <v-date-picker
						            v-model="form.to_date"
						            @change="menu2 = false"
						          ></v-date-picker>
						        </v-menu>
							</v-col>
							<v-col sm="12" cols="12" class="d-flex flex-column">
								<label for="note" class="font-weight-bold">Note</label>	
								<textarea v-model="form.description" cols="30" rows="5" class="payroll_note"></textarea>
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
			<v-data-table :headers="headers" :items="items">
				<template v-slot:item="{ item }">
					<tr>
						<td>{{ item.created_at }}</td>
						<td>{{ item.employee.department.user.name }}</td>
						<td>{{ item.from_date }}</td>
						<td>{{ item.to_date }}</td>
						<td>{{ item.description }}</td>
						<td>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<!-- Edit Item -->
									<v-btn @click="editItem(item)" left small outlined icon color="primary" v-on="on">
										<v-icon small>
											mdi-pencil
										</v-icon>
									</v-btn>
								</template>
								<span>Edit Holiday</span>
							</v-tooltip>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<!-- Delete Item -->
									<v-btn @click="deleteItem(item)" left small outlined icon color="red" v-on="on">
										<v-icon small>
											mdi-delete
										</v-icon>
									</v-btn>
								</template>
								<span>Delete Holiday</span>
							</v-tooltip>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>


<script>

import moment from 'moment';
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
			headers: [{
					text: 'Date',
					sortable: false,
				}, {
					text: 'Employee',
					sortable: false,
				}, {
					text: 'From',
					sortable: false,
				}, {
					text: 'To',
					sortable: false,
				}, {
					text: 'Note',
					sortable: false,
				}, {
					text: 'Action',
					sortable: false,
				}, 
			],

			date: new Date().toISOString().substr(0, 10),
      		menu1: false,
      		menu2: false,
		}
	},

	methods: {
		fetchData() {
			this.$axios.$get(`api/holiday`)
			.then(res => {
				this.items = res.holidays.data;
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
				this.$axios.$patch(`/api/holiday/` + this.form.id, {
					'from_date': this.form.from_date,
					'to_date': this.form.to_date,
				})
				.then(res => {
					this.fetchData();
					this.closeDialog();
					this.$toast.info('Succeessfully Updated');
				})
			}
			else {
				this.$axios.$post(`/api/holiday`, this.form)
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
				this.$axios.$delete(`/api/holiday/` + item.id)
				.then(res => {
					this.fetchData();
					this.$toast.info('Succeessfully Delete');
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		},
	},

	computed: {
	  computedDateFormattedMomentjs () {
	    return this.date ? moment(this.date).format('DD-MM-YYYY') : ''
	  },
	},
}

</script>
<style lang="scss">

.nuxt--link {
	display: block;
	text-decoration: none;
}

.payroll_note {
	border: 1px solid rgba(0,0,0,0.125);
}

</style>

<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3">
				<v-dialog 
					v-model="dialog" max-width="700px" persistent
					v-permission="'add employee'"
				>
					<template v-slot:activator="{ on }">
						<v-btn class="blue darken-1" dark v-on="on">
							<v-icon left>mdi-plus-circle</v-icon>
							Add Attendance
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							ADD ATTENDANCE
						</v-card-title>
						<v-divider></v-divider>
						<v-row class="px-5">
							<v-col sm="6" cols="12">
								<label class="font-weight-bold" for="name">Employee</label>
								<v-select
									solo
									outlined
									dense
									:items="items"
									item-text="employee.name"
									label="Please Select"
									v-model="form.employee_name"
								>
									<template v-slot:item="{ item }">
										{{ item.employee.name }}
									</template>
								</v-select>
							</v-col>
							<v-col sm="6" cols="12">
								<label class="font-weight-bold" for="">Date</label>
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
						              label="Pickup Date"
						              dense
						              solo 
						              outlined
						              v-on="on"
						              @click:clear="date = null"
						              v-model="form.date"
						            ></v-text-field>
						          </template>
						          <v-date-picker
						            v-model="form.date"
						            @change="menu1 = false"
						          ></v-date-picker>
						        </v-menu>
							</v-col>
							<v-col sm="6" cols="12">
								<label class="font-weight-bold" for="">Check In</label>
								<v-menu
							        ref="menu"
							        v-model="menu2"
							        :close-on-content-click="false"
							        :nudge-right="40"
							        :return-value.sync="time"
							        transition="scale-transition"
							        offset-y
							        max-width="290px"
							        min-width="290px"
							      >
							        <template v-slot:activator="{ on }">
							          <v-text-field
							            v-model="form.checkin"
							            label="Pickup Time"
							            readonly
							            v-on="on"
							            solo
							            outlined
							            dense
							          ></v-text-field>
							        </template>
							        <v-time-picker
							          v-if="menu2"
							          v-model="form.checkin"
							          full-width
							          @click:minute="$refs.menu.save(time)"
							          ampm-in-title
							        ></v-time-picker>
							      </v-menu>
							</v-col>
							<v-col sm="6" cols="12">
								<label class="font-weight-bold" for="">Check Out</label>
								<v-menu
							        ref="menu"
							        v-model="menu3"
							        :close-on-content-click="false"
							        :nudge-right="40"
							        :return-value.sync="time"
							        transition="scale-transition"
							        offset-y
							        max-width="290px"
							        min-width="290px"
							      >
							        <template v-slot:activator="{ on }">
							          <v-text-field
							            v-model="form.checkout"
							            label="Pickup Time"
							            readonly
							            solo
							            outlined
							            dense
							            v-on="on"
							          ></v-text-field>
							        </template>
							        <v-time-picker
							          v-if="menu3"
							          v-model="form.checkout"
							          full-width
							          @click:minute="$refs.menu.save(time)"
							          ampm-in-title
							        ></v-time-picker>
							      </v-menu>
							</v-col>
							<v-col cols="12">
								<label class="font-weight-bold">Status</label>
								<v-select 
									dense
									solo
									outlined
									label="Selece One"
									v-model="form.status"
									item-text="status"
									:items="status"
								></v-select>
							</v-col>
							<v-col cols="12" class="d-flex flex-column">
								<label class="font-weight-bold" for="Note">Note</label>
								<textarea 
									cols="30" 
									rows="7" 
									class="attendance_note"
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
			>	
				<template v-slot:item="{ item }">
					<tr>
						<td>{{ item.date }}</td>
						<td>{{ item.employee_name }}</td>
						<td>{{ item.checkin }}</td>
						<td>{{ item.checkout }}</td>
						<td>
							<span :class="item.status === 'Present' ? 'present' : 'absent'">
								{{ item.status }}
							</span>
						</td>
						<td></td>
						<td>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn @click="editItem(item)" v-on="on" left icon small outlined color="primary" >
										<v-icon small>
											mdi-pencil
										</v-icon>
									</v-btn>
								</template>
								<span>Edit Attendance</span>
							</v-tooltip>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn @click="deleteItem(item)" v-on="on" left icon small outlined color="red">
										<v-icon small >
											mdi-delete
										</v-icon>
									</v-btn>
								</template>
								<span>Delete Attendance</span>
							</v-tooltip>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>


<script>
import moment from 'moment'
export default {
	name: 'Menu',
	created() {
		this.fetchData()
	},

	data() {
		return {
			date: new Date().toISOString().substr(0, 10),
	      	menu1: false,	
			items: [],
			time: null,
			menu2: false,
			menu3: false,
			search: '',
			form: {},
			total: 0,
			options: {},
			itemsPerPage: 5,
			editedIndex: -1,
			created: true,
			dialog: false,
			status: ['Absent', 'Present'],
			headers: [
				{
					text: 'Date',
					sortable: false,
				}, {
					text: 'Employee',
					sortable: false,
				}, {
					text: 'Check In',
					sortable: false,
				}, {
					text: 'Check Out',
					sortable: false,
				}, {
					text: 'Status',
					sortable: false,
				},{
					text: 'Created By',
					sortable: false,
				},{
					text: 'Actions',
					sortable: false,
				},
			],
		}
	},

	methods: {
		fetchData() {
			this.$axios.$get(`/api/attendance`)
			.then(res => {
				this.items = res;
				console.log(res)
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
				this.$axios.$patch(`/api/attendance/` + this.form.id, {
					'date': this.form.date,
					'employee_name': this.form.employee_name,
					'checkin': this.form.checkin,
					'checkout': this.form.checkout,
					'status': this.form.status,
				})
				.then(res => {
					this.fetchData();
					this.closeDialog();
					this.$toast.info('Succeessfully Updated');
				})
			}
			else {
				this.$axios.$post(`/api/attendance`, this.form)
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
				this.$axios.$delete(`/api/attendance/` + item.id)
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
.menu-list {
	background-color: #34495e;
	color: #fff;
}

.attendance_note {
	border: 1px solid rgba(0,0,0,0.125);
}

.present {
	background: blue;
	padding: 5px 10px 5px 10px;
	border-radius: 3px;
	color: #fff;
}

.absent {
	background: red;
	padding: 5px 10px 5px 10px;
	border-radius: 3px;
	color: #fff;	
}

</style>

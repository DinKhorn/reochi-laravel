<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3" v-permission="'add employee'">
				<nuxt-link class="nuxt--link" to="/hrm/employee/create">
					<v-btn class="teal darken-1" dark>
						<v-icon left>mdi-plus-circle</v-icon>
						Add Employee
					</v-btn>
				</nuxt-link>
			</div>
		</div>
		<div>
			<v-dialog 
				v-model="dialog" max-width="700px" persistent
				v-permission="'add expense'"
				persistent
			>
				<!-- Form Modal -->
				<v-card>
					<v-card-title class="headline font-weight-light">
						Edit Employee
					</v-card-title>
					<v-divider></v-divider>
					<v-row class="px-5">
						<v-col cols="12" sm="6">
							<label for="">Name</label>
							<v-text-field
								solo
								outlined
								dense
								label="Please Select Name"
								v-model="form.name"
							>
							</v-text-field>
						</v-col>
						<v-col cols="12" sm="6">
							<label for="">Phone Number</label>
							<v-text-field
								solo
								outlined
								dense
								label="Phone Number"
								v-model="form.phone"
							>
							</v-text-field>
						</v-col>
						<v-col cols="12" sm="6">
							<label for="">Department</label>
							<v-select
								solo
								outlined
								dense
								label="Department"
								item-text="name"
								:items="departments"
								v-model="form.department_name"
							>
								<template v-slot:item="{ item }">
									{{ item.name }}
								</template>
							</v-select>
						</v-col>
						<v-col cols="12" sm="6">
							<label for="">Gender</label>
							<v-select
								solo
								outlined
								dense
								label="Gender"
								:items="genders"
								v-model="form.gender"
							>
							</v-select>
						</v-col>
						<v-col cols="12" sm="6">
							<label for="">City</label>
							<v-text-field
								solo
								outlined
								dense
								label="City"
								v-model="form.city"
							>
							</v-text-field>
						</v-col>
						<v-col cols="12" sm="6">
							<label for="">Address</label>
							<v-text-field
								solo
								outlined
								dense
								label="Address"
								v-model="form.address"
							>
							</v-text-field>
						</v-col>
						<v-col cols="12" sm="12">
							<label for="">Country</label>
							<v-text-field
								solo
								outlined
								dense
								label="Country"
								v-model="form.country"
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
						<v-btn color="primary" @click="updateItem">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
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
			<v-data-table :headers="headers" :items="items" :items-per-page="itemsPerPage">
				<template v-slot:item="{ item }">
					<tr>
						<td>{{ item.name }}</td>
						<td>{{ item.phone }}</td>
						<td>{{ item.department_name }}</td>
						<td>{{ item.address }}</td>
						<td>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<!-- Edit Item -->
									<v-btn icon @click="editItem(item)" color="primary" v-on="on" outlined>
										<v-icon small>
											mdi-pencil
										</v-icon>
									</v-btn>
								</template>
								<span>Edit Employee</span>
							</v-tooltip>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<!-- Delete Item -->
									<v-btn @click="deleteItem(item)" icon outlined color="red" left v-on="on">
										<v-icon small>
											mdi-delete
										</v-icon>
									</v-btn>
								</template>
								<span>Delete Employee</span>
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
		this.fetchDepartment()
	},

	data() {
		return {
			departments: [],
			items: [],
			search: '',
			form: {},
			total: 0,
			options: {},
			itemsPerPage: 5,
			editedIndex: -1,
			created: true,
			dialog: false,
			genders: ['Female', 'Male'],
			headers: [
				{
					text: 'Name',
					sortable: false,
					value: 'name',
				},{
					text: 'Phone Number',
					sortable: false,
					value: 'phone',
				}, {
					text: 'Department',
					sortable: false,
					value: 'department',
				}, {
					text: 'Address',
					sortable: false,
					value: 'address',
				},{
					text: 'Action',
					sortable: false,
					value: 'action',
				},
			],
		}
	},

	methods: {
		fetchDepartment() {
			this.$axios.$get(`api/hr-department`)
			.then(res => {
				this.departments = res;
				console.log(res);
			})
			.catch(err => {
				console.log(err.response);
			})
		},

		fetchData() {
			this.$axios.$get(`api/employee`)
			.then(res => {
				this.items = res.employee.data;
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

      	deleteItem(item) {
			if(confirm('Are u sure to delete it?')) {
				this.$axios.$delete(`/api/employee/` + item.id)
				.then(res => {
					this.fetchData();
					this.$toast.info('Succeessfully Delete');
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		},

		updateItem() {
			if(this.editedIndex > -1) {
				this.$axios.$patch(`/api/employee/` + this.form.id, {
					'name': this.form.name,
					'city': this.form.city,
					'department_name': this.form.department_name,
					'gender': this.form.gender,
					'phone': this.form.phone,
					'address': this.form.address,
					'country': this.form.country,
				})
				.then(res => {
					this.fetchData();
					this.closeDialog();
					this.$toast.info('Succeessfully Updated');
				})
			}
		},
	}
}

</script>

<style lang="scss">

.nuxt--link {
	text-decoration: none; 
}


</style>

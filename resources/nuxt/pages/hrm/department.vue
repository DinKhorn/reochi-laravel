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
							Add Department
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							Add Department
						</v-card-title>
						<v-divider></v-divider>
						<v-col cols="12">
							<label for="name" class="font-weight-bold">Name</label>
							<v-text-field
								solo
								outlined
								dense
								label="Type department name"
								v-model="form.name"
							></v-text-field>
						</v-col>
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
				<template v-slot:item.action="{ item }">
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<!-- Edit Item -->
							<v-btn icon @click="editItem(item)" color="primary" v-on="on" outlined>
								<v-icon small>mdi-pencil</v-icon>
							</v-btn>
						</template>
						<span>Edit Supplier</span>
					</v-tooltip>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<!-- Delete Item -->
							<v-btn icon @click="deleteItem(item)" v-on="on" color="red" outlined>
								<v-icon small>mdi-delete</v-icon>
							</v-btn>
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
					text: 'Department',
					sortable: false,
					value: 'name',
				}, {
					text: 'Action',
					sortable: false,
					value: 'action',
				}, 
			],
		}
	},

	methods: {
		fetchData() {
			this.$axios.$get(`/api/hr-department`)
			.then(res => {
				this.items = res;
				thi.total = res.total;
				console.log(res)
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
				this.$axios.$delete(`/api/hr-department/` + item.id)
				.then(res => {
					this.fetchData();
					this.$toast.info('Succeessfully Delete');
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		},

		createItem() {
			if(this.editedIndex > -1) {
				this.$axios.$patch(`/api/hr-department/` + this.form.id, {
					'name': this.form.name,
				})
				.then(res => {
					this.fetchData();
					this.closeDialog();
					this.$toast.info('Succeessfully Updated');
				})
			}
			else {
				this.$axios.$post(`/api/hr-department`, this.form)
				.then(res => {
					this.form = res.data;
					this.fetchData();
					this.$toast.info('Succeessfully Created');
					this.closeDialog();
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



</style>

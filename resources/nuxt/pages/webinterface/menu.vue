<template>
	<v-app class="mx-5 my-5">
		<v-card>
			<div>
				<h3 class="py-3 px-5 d-flex align-center teal lighten-1 grey--text text--lighten-3">
					<v-icon class="grey--text text--lighten-3" left>mdi-view-list</v-icon>
					MENU LIST
				</h3>
			</div>
			<v-card-title>
				<v-text-field label="Search" v-model="search" solo dense class="mt-3">
				</v-text-field>
				<v-spacer></v-spacer>
				<v-dialog v-model="dialog" max-width="600px" persistent v-permission="'view website'">
					<template v-slot:activator="{ on }">
						<v-btn color="primary" dark v-on="on" >
							<v-icon left>mdi-plus-circle</v-icon>
							Add New Menu
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							ADD NEW MENU
						</v-card-title>
						<v-divider></v-divider>
						<v-container>
							<v-col cols="12">
								<label for="name">Menu Name</label>
								<v-text-field 
									label="Menu Name" 
									required 
									v-model="form.name"
									solo
									outlined
									dense
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<label for="title">Menu Title</label>
								<v-text-field 
									label="Menu Title" 
									required 
									v-model="form.title"
									solo
									outlined
									dense
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<label class="mb-1">Page Content:</label>
								<client-only>
									<vue-editor v-model="form.content"></vue-editor>
								</client-only>
							</v-col>
						</v-container>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text small @click="close">Close</v-btn>
							<v-btn color="primary" small @click="createItem">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-card-title>

			<v-divider></v-divider>

			<v-data-table :headers="headers" :items="items" :items-per-page="itemsPerPage" :options.sync="options" :server-items-length="total">
				<template v-slot:item.action="{ item }">
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<!-- Edit Item -->
							<v-icon left fab color="primary" @click="editItem(item)" v-on="on">
								mdi-pencil
							</v-icon>
						</template>
						<span>Edit Supplier</span>
					</v-tooltip>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">

							<!-- Delete Item -->
							<v-icon left fab color="primary" @click="deleteItem(item)" v-on="on">
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
import axios from 'axios';

export default {
	name: 'Menu',
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
			headers: [{
					text: 'Serial',
					sortable: false,
					value: 'serial',
				}, {
					text: 'Name',
					sortable: false,
					value: 'product_name',
				}, {
					text: 'Title',
					sortable: false,
					value: 'created_at',
				},
				{
					text: 'Description',
					sortable: false,
					value: 'created_at',
				}, {
					text: 'Actions',
					value: 'action',
					sortable: false,
				}
			]
		}
	},

	methods: {
		fetchData() {
			let vm = this;
			this.$axios.$get(`product?itemsPerPage=${this.options.itemsPerPage}&page=${this.options.page}&search=${this.search}`)
				.then(res => {
					vm.items = res.data;
					vm.total = res.meta.total;
					console.log(res)
				})
				.catch(err => {
					console.log(err);
				})
		},

		createItem() {
			let vm = this;
			if (this.editedIndex > -1) {
				this.$axios.$patch(`product/` + this.form.id, {
						
					})
					.then(res => {
						vm.fetchData();
						this.$toast.info('Succeessfully Updated');
					})
					.catch(err => {
						console.log(err.response);
					})
			} else {
				this.$axios.$post(`product`, this.form)
					.then(res => {
						vm.items = res.data.data;
						vm.fetchData();
						this.$toast.info('Succeessfully Created Supplier');
					})
					.catch(err => {
						console.log(err.response);
					})
			}
			this.close();
		},

		editItem(item) {
			this.editedIndex = this.items.indexOf(item)
			this.form = Object.assign({}, item)
			this.dialog = true
		},

		// Close and clear form
		close() {
			this.dialog = false;
			this.editedIndex = -1;
			this.form = {};
		},

		deleteItem(item) {
			if (confirm('Are u sure to delete it?')) {
				this.$axios.$delete(`product/` + item.id)
				.then(res => {
					this.fetchData();
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		}
	}
}

</script>


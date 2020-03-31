<template>
	<v-app class="px-5">
		<h2 class="py-5 font-weight-regular">Brand <span class="font-weight-light body-2">Manage your Brand</span></h2>
		<v-card>
			<div class="d-flex justify-space-between align-center">
				<v-card-title>All Your Brand</v-card-title>
				<v-dialog v-model="dialog" max-width="600px">
					<template v-slot:activator="{ on }">
						<v-btn color="primary" class="mx-5" v-on="on">
							<v-icon left>mdi-plus-circle</v-icon>Add
						</v-btn>
					</template>
					<v-card>
						<v-card-title class="blue darken-1 white--text">Add Brand</v-card-title>
						<v-divider></v-divider>
						<div class="px-5 pt-5">
							<label for="brand">Brand</label>
							<v-text-field solo dense outlined label="Brand Name" v-model="form.name"></v-text-field>
						</div>
						<div class="px-5 py-5">
							<label for="description">Note</label>
							<v-text-field solo dense outlined label="Note" v-model="form.description"></v-text-field>
						</div>
						<v-divider></v-divider>
						<v-card-actions>
							<v-btn color="primary" text @click="closeDialog">Close</v-btn>
	         				 <v-btn color="blue darken-1" dark @click="createBrand">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</div>
			<v-divider></v-divider>
			<div class="brand--search">
				<label for="search">Search</label>
				<v-text-field solo outlined dense v-model="search"></v-text-field>
			</div>
			<v-divider></v-divider>
			<div>
				<v-data-table :headers="headers" :items="items">
					<template v-slot:item="{ item }">
						<tr>
							<td>{{ item.name }}</td>
							<td>{{ item.description }}</td>
							<td>
								<v-tooltip bottom>
								    <template v-slot:activator="{ on }">
								        <v-btn @click="editItem(item)" small icon outlined color="primary" dark v-on="on">
											<v-icon small>mdi-pencil</v-icon>
								        </v-btn>
								    </template>
							      <span>Edit Brand</span>
							    </v-tooltip>
								<v-tooltip bottom>
								    <template v-slot:activator="{ on }">
								        <v-btn @click="deleteItem(item.id)" small icon outlined color="red" dark v-on="on">
											<v-icon small>mdi-delete</v-icon>
								        </v-btn>
								    </template>
							      <span>Delete Brand</span>
							    </v-tooltip>
							</td>
						</tr>
					</template>
				</v-data-table>
			</div>
		</v-card>
	</v-app>
</template>	

<script>
	export default {
		name: 'Brand',

		created() {
			this.fetchData()
		},

		data() {
			return {
				items: [],
				dialog: false,
				editedIndex: -1,
				search: '',
				form: {},
				headers: [
					{ text: 'Brand', sortable: false },
					{ text: 'Note', sortable: false },
					{ text: 'Action', sortable: false },
				]
			}
		},

		watch: {
			search: {
				handler() {
					this.fetchData();
				} 
			},
			deep: true,
		},

		methods: {
			fetchData() {
				this.$axios.$get(`api/brand?search=${this.search}`)
				.then(res => {
					this.items = res.brands.data;
					console.log(res);
				})
				.catch(err => {
					console.log(err.response);
				})
			},

			editItem(item) {
		        this.editedIndex = this.items.indexOf(item)
		        this.form = Object.assign({}, item)
		        this.dialog = true
			},

			deleteItem(id) {
				this.$axios.$delete(`api/brand/` + id)
				.then(res => {
					this.fetchData()
					this.$toast.success('Delete Successfully')
				})
				.catch(err => {
					console.log(err.response);
				})
			},

			closeDialog() {
				this.dialog = false;
				this.form = {}
			},

			createBrand() {
				if(this.editedIndex > -1) {
					this.$axios.$patch(`api/brand/` + this.form.id, {
						'name': this.form.name,
						'description': this.form.description,
					})
					.then(res => {
						this.fetchData()
						this.closeDialog()
						this.$toast.success('Updated Successfully');
					})
					.catch(err => {
						console.log(err.response)
						this.$toast.error('Error while Update');
					})
				} 
				else {
					this.$axios.$post(`api/brand`, this.form)
					.then(res => {
						this.items = res.data;
						this.fetchData()
						this.closeDialog()
						this.$toast.success('Created Successfully');
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					})
				}
			}

		}
	}
</script>

<style>
	.brand--search {
		width: 50%;
		padding: 10px 15px 0 15px
	}
</style>
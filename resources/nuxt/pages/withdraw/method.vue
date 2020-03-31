<template>
	<v-app class="mx-5 my-5">
		<div class="py-5 d-flex justify-space-between align-center">
			<h3 class="grey--text text--darken-3">ADD PAYMENT METHOD</h3>
			<v-dialog v-model="dialog" max-width="600px" v-permission="'add withdraw method'">
				<template v-slot:activator="{ on }">
					<v-btn color="primary" dark v-on="on">
						<v-icon left>mdi-plus-circle</v-icon>
						Add New
					</v-btn>
				</template>
				<!-- Form Modal -->
				<v-card>
					<v-card-title class="headline font-weight-light">
						ADD NEW
					</v-card-title>
					<v-divider></v-divider>
					<v-container>
						<v-col cols="12">
							<label for="method">Payment Method Image</label>
							<input type="file" accept="image/*" @change="uploadImage($event)" 
							id="file-input" class="form-control">
						</v-col>
						<v-col cols="12">
							<label for="name">Payment Method Name</label>
							<input type="text" class="form-control" placeholder="Method Name">
						</v-col>
						<v-col cols="12">
							<label for="title">Minimum Amount For Withdraw</label>
							<div class="form-group">
								<input type="text" class="form-control" placeholder="Minimum Amount">
								<v-icon cols="12" class="form-icon">mdi-currency-usd</v-icon>
							</div>
						</v-col>
						<v-col cols="12">
							<label for="title">Maximum Amount For Withdraw</label>
							<div class="form-group">
								<input type="text" class="form-control" placeholder="Maximum Amount">
								<v-icon cols="12" class="form-icon">mdi-currency-usd</v-icon>
							</div>
						</v-col>
						<v-col cols="12">
							<label for="title">Fixed Charge For With Draw</label>
							<div class="form-group">
								<input type="text" class="form-control" placeholder="Charge">
								<v-icon cols="12" class="form-icon">mdi-currency-usd</v-icon>
							</div>
						</v-col>
						<v-col cols="12">
							<label for="title">Charge Percentage</label>
							<div class="form-group">
								<input type="text" class="form-control" placeholder="Charge Percentage">
								<v-icon cols="12" class="icon-percent">mdi-percent</v-icon>
							</div>
						</v-col>
						<v-col cols="12">
							<label for="title">Rate for 1 Method Currency</label>
							<div class="form-group">
								<input type="text" class="form-control" placeholder="Rate">
								<v-icon cols="12" class="icon-percent">mdi-percent</v-icon>
							</div>
						</v-col>
						<v-col cols="12">
							<label for="title">Method Currency</label>
							<input type="text" class="form-control" placeholder="Currency">
						</v-col>
						<v-col cols="12">
							<label for="title">Payback Days</label>
							<input type="text" class="form-control" placeholder="Day">
						</v-col>
					</v-container>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text small>Close</v-btn>
						<v-btn color="primary" small>Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
		<v-card>
			<div>
				<h3 class="py-2 px-5 d-flex align-center menu-list">
					PAYMENT GATEWAYS
				</h3>
				<v-divider></v-divider>
			</div>
			<v-card-title>
				<v-spacer></v-spacer>
			</v-card-title>
			<v-divider></v-divider>
			<v-data-table 
				v-permission="'add withdraw method'" 
				:headers="headers" 
				:items="items" 
				:items-per-page="itemsPerPage" 
				:options.sync="options" :server-items-length="total">
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
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>
<script>
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
			dialog: false,
			headers: [{
				text: 'Method Name',
				sortable: false,
			}, {
				text: 'Method Logo',
				sortable: false,
			}, {
				text: 'Min Amount',
				sortable: false,
			}, {
				text: 'Max Amount',
				sortable: false,
			}, {
				text: 'Fix Charge',
				sortable: false,
			}, {
				text: 'Percent of Charge',
				sortable: false,
			}, {
				text: 'Rate',
				sortable: false,
			}, {
				text: 'Processing Day',
				sortable: false,
			}, {
				text: 'Status',
				sortable: false,
			}, {
				text: 'Actions',
				sortable: false,
			}, ]
		}
	},

	methods: {
		uploadImage(event) {
			const URL = 'http://127.0.0.1:3000/withdraw/method/';

			let data = new FormData();
			data.append('name', 'my-picture');
			data.append('file', event.target.files[0]);

			let config = {
				header: {
					'Content-Type': 'image/png'
				}
			}

			this.$axios.$put(URL, data, config)
			.then(res => {
				console.log(res);
			})
		}
	}
}

</script>
<style lang="scss">
.menu-list {
	background-color: #34495e;
	color: #fff;
	font-size: 16px;
}

.form-control {
	width: 100%;
	padding-bottom: 5px;
	padding-top: 5px;
	padding-right: 10px;
	padding-left: 10px;
	outline: none;
	border-radius: 5px;
	border: 1px solid #1cddc7;
}

.form-group {
	display: flex;
	flex-direction: row;
}

.form-icon {
	background: #ddd;
	border: 1px solid #1cddc7;
	border-radius: 5px;
	padding: 5px 10px 5px 10px;
}

.icon-percent {
	background: #ddd;
	border: 1px solid #1cddc7;
	border-radius: 5px;
	padding: 5px 10px 5px 10px;
}

</style>

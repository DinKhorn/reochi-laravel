<template>
	<v-app class="mx-5 my-5">
		<div class="pb-5 pr-3">
			<nuxt-link 
				to="/product/add_adjustment" 
				class="nuxt--link grey--text text--lighten-4"
			>
				<v-btn class="teal darken-1" dark v-permission="'add sales'">
					<v-icon left>mdi-plus-circle</v-icon>
						Add Adjustment
				</v-btn>
			</nuxt-link>
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
			<v-data-table :headers="headers" :items="items" :items-per-page="itemsPerPage" :options.sync="options" :server-items-length="total">
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
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<!-- Delete Item -->
							<v-icon left fab color="primary" v-on="on">
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
export default {
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
					text: 'Team Member Image',
					sortable: false,
				}, {
					text: '	Full Name',
					sortable: false,
				}, {
					text: 'Designation',
					sortable: false,
				}, {
					text: 'FaceBook Profile Link',
					sortable: false,
				}, {
					text: 'Twiter Profile Link',
					sortable: false,
				},{
					text: 'Actions',
					sortable: false,
				},
			],
		}
	},

	methods: {
		
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

</style>

</template>
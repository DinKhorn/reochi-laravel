<template>
	<v-app class="mx-5 my-5">
		<v-card>
			<div  class="py-3 px-5 d-flex align-center menu-list">
				<h3>
					<v-icon style="color: #fff">mdi-facebook</v-icon>
					SOCIAL
				</h3>
				<button class="fontawesome">
					<a  target="_blank" href="https://fontawesome.com/icons?d=gallery" class="fontawesome--link">Want more Font Awesome Click Here</a>
				</button>
			</div>
			<v-divider></v-divider>
			<v-card-title>
				<v-dialog v-model="dialog" max-width="600px" v-permission="'view website'">
					<template v-slot:activator="{ on }">
						<v-btn color="primary" dark v-on="on" small>
							<v-icon>mdi-plus-circle</v-icon>
							Add New
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							ADD NEW SOCIAL ACCOUNT
						</v-card-title>
						<v-divider></v-divider>
						<v-container>
							<v-col cols="12">
								<label for="name">Social Icon Pick</label>
								<input type="text" class="form-control" placeholder="fa fa-facebook">
							</v-col>
							<v-col cols="12">
								<label for="title">Link</label>
								<input type="text" class="form-control" placeholder="Link">
							</v-col>
						</v-container>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text small>Close</v-btn>
							<v-btn color="primary" small>Save</v-btn>
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
					text: 'Icon',
					sortable: false,
				}, {
					text: 'Link',
					sortable: false,
				}, {
					text: 'Actions',
					sortable: false,
				}, 
			]
		}
	},

	methods: {
		onChange(image) {
			console.log('New picture selected!')
			if (image) {
				console.log('Picture loaded.')
				this.image = image
			} else {
				console.log('FileReader API not supported: use the <form>, Luke!')
			}
		}
	}
}

</script>
<style lang="scss">

.fontawesome .fontawesome--link {
	color: #2d2b2c;	
	padding-left: 10px;
	padding-right: 10px;
	padding-top: 5px;
	padding-bottom: 5px;
	margin-right: 10px;
	margin-left: 10px;
	cursor: pointer;
	text-decoration: none;
	background-color: #c650e0;
	border-radius: 5px;
}

.menu-list {
	background-color: #34495e;
	color: #fff;
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

</style>

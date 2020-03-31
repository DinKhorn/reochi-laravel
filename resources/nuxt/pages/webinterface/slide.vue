<template>
	<v-app class="mx-5 my-5">
		<v-card>
			<div>
				<h3 class="py-3 px-5 d-flex align-center menu-list">
					<v-icon left class="grey--text text--lighten-4">mdi-settings</v-icon>
					SLIDE SETTINGS
				</h3>
				<v-divider></v-divider>
			</div>
			<v-card-title>
				<v-dialog v-model="dialog" max-width="600px" v-permission="'view website'">
					<template v-slot:activator="{ on }">
						<v-btn color="primary" dark v-on="on">
							<v-icon left>mdi-plus-circle</v-icon>
							Add New Slide
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							ADD NEW SLIDE
						</v-card-title>
						<v-divider></v-divider>
						<v-container>
							<v-col cols="12" d-flex>
								<client-only>
									<picture-input ref="pictureInput" 
										width="300" 
										height="100" 
										margin="16" 
										accept="image/jpeg,image/png" size="1" 
										button-class="v-btn" 
										:custom-strings="{
									        upload: '<h1>Bummer!</h1>',
									        drag: 'Drag a 😺 image here'
							      		}" 
							      		@change="onChange">
									</picture-input>
								</client-only>
							</v-col>
							<v-col cols="12">
								<label for="name">Header Text</label>
								<v-text-field 
									label="Header" 
									required 
									solo
									outlined
									dense
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<label for="title">Small Text (Description Type)</label>
								<v-text-field 
									label="Small Detail" 
									required 
									solo
									outlined
									dense
								></v-text-field>
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
import axios from 'axios';

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
					text: 'Slide Image',
					sortable: false,
				}, {
					text: 'Slide Head',
					sortable: false,
				}, {
					text: 'Slide Detail',
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
.menu-list {
	background-color: #34495e;
	color: #fff;
}

</style>

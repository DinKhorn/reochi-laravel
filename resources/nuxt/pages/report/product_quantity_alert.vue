<template>
	<v-app>
		<v-card class="my-5 mx-5">
			<div class="text-center">
				<h2>Product Quantity Alert</h2>
				<v-divider></v-divider>
			</div>
			<div class="my-5 mx-5">
				<div class="d-flex justify-space-between">
					<div>
						<v-text-field 
							solo
							outlined
							dense
							label="Search"
						></v-text-field>
					</div>
					<div>
						<v-btn class="red lighten-1" dark>PDF</v-btn>
						<v-btn class="lime lighten-1" dark>CSV</v-btn>
						<v-btn class="blue lighten-1" dark>Print</v-btn>
					</div>
				</div>
				<v-data-table :headers="headers"></v-data-table>
			</div>
		</v-card>
	</v-app>
</template>

<script>
	import moment from 'moment';
	export default {
		data() {
			return {
                headers: [
                	{
                		text: 'Image',
                		sortable: false,
                	},
                	{
                		text: 'Product Name',
                		sortable: false,
                	},
                	{
                		text: 'Product Code',
                		sortable: false,
                	},
                	{
                		text: 'Quantity',
                		sortable: false,
                	},
                	{
                		text: 'Alert Quantity',
                		sortable: false,
                	},
                ],
			}
		}
	}
</script>
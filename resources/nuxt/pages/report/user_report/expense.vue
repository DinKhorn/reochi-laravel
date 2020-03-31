<template>
	<v-app>
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
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
                headers: [
                	{
                		text: 'Date',
                		sortable: false,
                	},
                	{
                		text: 'Reference',
                		sortable: false,
                	},
                	{
                		text: 'Warehouse',
                		sortable: false,
                	},
                	{
                		text: 'Category',
                		sortable: false,
                	},
                    {
                        text: 'Amount',
                        sortable: false,
                    },
                	{
                		text: 'Note',
                		sortable: false,
                	},
                ],
			}
		}
	}
</script>
<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="blue dark-3 px-5 py-1">
				<h3 class="grey--text text--lighten-4">
					<v-icon class="grey--text text--lighten-4">mdi-view-list</v-icon>
					All Tickets List
				</h3>
			</div>
			<v-divider></v-divider>
			<v-data-table :headers="headers"></v-data-table>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				headers: [
					{
						text: 'Ticket ID',
						sortable: false,
					},
					{
						text: 'Customer Name',
						sortable: false,
					},
					{
						text: 'Subject',
						sortable: false,
					},
					{
						text: 'Raised Time',
						sortable: false,
					},
					{
						text: 'Status',
						sortable: false,
					},
					{
						text: 'Actions',
						sortable: false,
					},
				],	
			}
		}
	}
</script>
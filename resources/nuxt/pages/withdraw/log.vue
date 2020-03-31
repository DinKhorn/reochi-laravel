<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="px-5 py-2  purple lighten-2">
				<h3 class="white--text">WITHDRAW LOG</h3>
			</div>
			<v-divider></v-divider>
			<div class="d-flex align-center justify-space-between pb-2">
				<input type="text" placeholder="Search" class="search">
				<div class="px-5 pt-5" v-permission="'add withdraw method'">
					<v-btn class="grey--text text--lighten-5 indigo accent-2">Print</v-btn>
					<v-btn class="grey--text text--lighten-5 red darken-2">PDF</v-btn>
					<v-btn class="grey--text text--lighten-5 cyan lighten-1">CSV</v-btn>
				</div>
			</div>
			<v-data-table v-permission="'add withdraw method'" :headers="headers"></v-data-table>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				headers: [
					{ 
						text: 'Wd Id', 
						sortable: true,
					},
					{ 
						text: 'User', 
						sortable: true,
					},
					{ 
						text: 'Amount', 
						sortable: true,
					},
					{ 
						text: 'Charge', 
						sortable: true,
					},
					{ 
						text: 'Method', 
						sortable: true,
					},
					{ 
						text: 'Details', 
						sortable: true,
					},
					{ 
						text: 'Requested On', 
						sortable: true,
					},
				]
			}
		}
	}
</script>

<style lang="scss">
	.search {
		width: 40%;
		outline: none;
		border: 1px solid #161650;
		margin-top: 20px;
		margin-left: 15px;
		padding-top: 7px;
		padding-bottom: 7px;
		padding-left: 20px;
		border-radius: 5px;
	}
</style>
<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="card-header">
				<h3>WITHDRAW REQUESTS</h3>
			</div>
			<v-divider></v-divider>
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
						text: 'Withdraw Id',
						sortable: false,
					},
					{ 
						text: 'Member Name',
						sortable: false,
					},
					{ 
						text: 'Amount Of Withdraw',
						sortable: false,
					},
					{ 
						text: 'Method',
						sortable: false,
					},
					{ 
						text: 'Amount In Method',
						sortable: false,
					},
					{ 
						text: 'Status',
						sortable: false,
					},
					{ 
						text: 'Action',
						sortable: false,
					}
				]
			}
		}
	}
</script>

<style lang="scss">
.card-header {
	padding: 7px 20px 7px 20px;
	background: #2f353b;
	color: #fff;
}
</style>


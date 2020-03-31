<template>
	<v-app class="mx-5 my-5">
		<v-card class="px-5 py-5">
			<div class="text-center mb-5">
				<h3>Balance Sheet</h3>
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
					<nuxt-link to="/api/v1/transaction/export">
						<v-btn class="lime lighten-1">CSV</v-btn>
					</nuxt-link>
					<v-btn class="blue lighten-1">Print</v-btn>
				</div>
			</div>
			<v-data-table :headers="headers" :items="items">
				<template v-slot:item="{ item }"> 
					<tr>
						<td>{{ item.account.name }}</td>
						<td>{{ item.account.code }}</td>
						<td>USD {{ item.credit | formatNumber }}</td>
						<td>USD {{ item.debit | formatNumber }}</td>
						<td>USD {{ columnTotal | formatNumber }}</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>

<script>
	import Vue from 'vue';

	let numeral = require('numeral')
	Vue.filter("formatNumber", function(value) {
		return numeral(value).format("0,0.00");
	})

	export default {
		created() {
			this.fetchData();
		},

		data() {
			return {
				items: [],
				headers: [
					{
						text: 'Name',
						sortable: false,
					},
					{
						text: 'Account No',
						sortable: false,
					},
					{
						text: 'Credit',
						sortable: false,
					},
					{
						text: 'Debit',
						sortable: false,
					},
					{
						text: 'Balance',
						sortable: false,
					},
				]
			}
		},

		computed: {
			columnTotal() {
				return this.items.reduce((total, item) => {
					return total + item.credit;
				}, 0);
			}
		},

		methods: {
			fetchData() {
				this.$axios.$get(`api/transaction`)
				.then(res => {
					this.items = res.transactions;
					console.log(res);
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		}
	}
</script>
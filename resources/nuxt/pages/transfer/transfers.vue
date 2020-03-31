<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3" v-permission="'add transfer'">
				<nuxt-link to="/transfer/add_transfer" class="nuxt--link grey--text text--lighten-4">
					<v-btn class="teal darken-1" dark>
						<v-icon left>mdi-plus-circle</v-icon>Add Transfer
					</v-btn>
				</nuxt-link>
			</div>
			<!-- <div class="pb-5 pr-3">
				<nuxt-link
					to="/transfer/import_transfer"
					class="nuxt--link grey--text text--lighten-4"
				>
					<v-btn
						class="purple darken-1"
						dark
					>
						<v-icon left>mdi-file</v-icon>Import Transfer
					</v-btn>
				</nuxt-link>
			</div> -->
		</div>
		<div class="d-flex justify-space-between pb-5">
			<div>
				<input type="text" placeholder="Search..." class="transfer--search" v-model="search" />
			</div>
			<div>
				<v-btn class="red darken-1">PDF</v-btn>
				<v-btn class="lime lighten-1">CSV</v-btn>
				<v-btn class="blue lighten-1">Print</v-btn>
			</div>
		</div>
		<v-card>
			<v-data-table :headers="headers" :items="items" :items-per-page="itemsPerPage">
				<template v-slot:item="{ item }">
					<tr>
						<td>{{ item.created_at }}</td>
						<td>{{ item.reference_no }}</td>
						<td>{{ item.from_location }}</td>
						<td>{{ item.to_location }}</td>
						<td>USD {{ item.shipping_charge | formatNumber }}</td>
						<td>{{ item | formatNumber }}</td>
						<td>
							<span
								:class="item.status === 'Completed' ? 'completed' : (item.status === 'Pending' ? 'pending' : 'sent')"
							>{{ item.status }}</span>
						</td>
						<td>
							<v-tooltip bottom v-permission="'edit transfer'">
								<template v-slot:activator="{ on }">
									<!-- Edit Item -->
									<v-btn left small outlined icon color="primary" v-on="on">
										<v-icon small>mdi-pencil</v-icon>
									</v-btn>
								</template>
								<span>Edit Transfer</span>
							</v-tooltip>
							<v-tooltip bottom v-permission="'delete transfer'">
								<template v-slot:activator="{ on }">
									<!-- Delete Item -->
									<v-btn @click="deleteTransfer(item.id)" left small outlined icon color="red" v-on="on">
										<v-icon small>mdi-delete</v-icon>
									</v-btn>
								</template>
								<span>Delete Transfer</span>
							</v-tooltip>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>


<script>
	import Vue from "vue";

	var numeral = require("numeral");

	Vue.filter("formatNumber", function(value) {
		return numeral(value).format("0,0.00"); // displaying other groupings/separators is possible, look at the docs
	});

	export default {
		created() {
			this.fetchData();
		},

		data() {
			return {
				items: [],
				search: "",
				form: {},
				total: 0,
				options: {},
				itemsPerPage: 5,
				editedIndex: -1,
				created: true,
				dialog: false,
				search: "",
				headers: [
					{
						text: "Date",
						sortable: false
					},
					{
						text: "Reference No",
						sortable: false
					},
					{
						text: "Location(From)",
						sortable: false
					},
					{
						text: "Location(To)",
						sortable: false
					},
					{
						text: "Shipping Charge",
						sortable: false
					},
					{
						text: "Grand Total",
						sortable: false
					},
					{
						text: "Status",
						sortable: false
					},
					{
						text: "Actions",
						sortable: false
					}
				]
			};
		},

		watch: {
			search: {
				handler() {
					this.fetchData();
				}
			},

			immediate: true
		},

		methods: {
			fetchData() {
				this.$axios
					.$get(`api/transfer?search=${this.search}`)
					.then(res => {
						this.items = res.transfer.data;
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			deleteTransfer(id) {
				this.$axios
					.$delete(`api/transfer/` + id)
					.then(res => {
						this.fetchData();
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			}
		}
	};
</script>
<style lang="scss">
	.nuxt--link {
		display: block;
		text-decoration: none;
	}

	.completed {
		background: blue;
		padding: 5px 10px 5px 10px;
		color: #fff;
		border-radius: 3px;
	}

	.pending {
		background: red;
		padding: 5px 10px 5px 10px;
		color: #fff;
		border-radius: 3px;
	}

	.sent {
		background: #f0dd11;
		padding: 5px 10px 5px 10px;
		border-radius: 3px;
	}

	.transfer--search {
		width: 150%;
		padding: 7px 10px 7px 10px;
		border: 1px solid #5d88cf;
		outline: none;
		border-radius: 5px;
	}
</style>

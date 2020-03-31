<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 d-flex">
				<nuxt-link
					class="nuxt--link"
					to="/sale/add_sale"
				>
					<v-btn
						class="teal darken-1"
						dark
						v-permission="'add sales'"
					>
						<v-icon left>mdi-plus-circle</v-icon>Add Sale
					</v-btn>
				</nuxt-link>
				<nuxt-link
					class="nuxt--link px-3"
					to="/sale/import_sale"
				>
					<v-btn
						class="purple darken-1"
						dark
						v-permission="'add sales'"
					>
						<v-icon left>mdi-file</v-icon>Import Sale
					</v-btn>
				</nuxt-link>
			</div>
		</div>
		<div class="d-flex justify-space-between">
			<div>
				<v-text-field
					label="Search"
					v-model="search"
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
			<v-data-table
				:headers="headers"
				:items="items"
				:items-per-page="itemsPerPage"
				:server-items-length="total"
				:options.sync="options"
			>
				<template v-slot:item="{ item }">
					<tr class="sale-tr">
						<td>{{ item.created_at }}</td>
						<td>{{ item.user.name }}</td>
						<td>{{ item.reference_no }}</td>
						<td>{{ item.member.name }}</td>
						<td>
							<span :class="item.payment_status === 'Paid' ? 'paid' : 'due'">{{ item.payment_status }}</span>
						</td>
						<td>USD {{ item.grand_total | formatNumber }}</td>
						<td>USD {{ item.paid | formatNumber }}</td>
						<td>USD {{ item.due_amount | formatNumber }}</td>
						<td>
							<v-btn
								@click="viewInfo(item.id)"
								small
								outlined
								icon
								color="teal"
							>
								<v-icon
									small
									text
								>mdi-eye</v-icon>
							</v-btn>
							<v-btn
								@click="editSale(item.id)"
								small
								outlined
								icon
								color="primary"
							>
								<v-icon
									small
									text
								>mdi-pencil</v-icon>
							</v-btn>
							<v-btn
								@click="removeSale(item.id)"
								small
								outlined
								icon
								color="red"
							>
								<v-icon small>mdi-delete</v-icon>
							</v-btn>
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
		return numeral(value).format("0,0.00");
	});

	export default {
		created() {
			this.fetchData();
		},

		data() {
			return {
				completed: true,
				items: [],
				search: "",
				form: {},
				total: 0,
				options: {},
				itemsPerPage: 5,
				editedIndex: -1,
				headers: [
					{
						text: "Date",
						sortable: false,
						value: "date"
					},
					{
						text: "Seller",
						sortable: false
					},
					{
						text: "Invoice No",
						sortable: false
					},
					,
					{
						text: "Customer",
						sortable: false
					},
					{
						text: "Payment Status",
						sortable: false,
						value: "payment_status"
					},
					{
						text: "Grand Total",
						sortable: false,
						value: "total"
					},
					{
						text: "Paid",
						sortable: false,
						value: "paid"
					},
					{
						text: "Due",
						sortable: false,
						value: "due"
					},
					{
						text: "Actions",
						sortable: false,
						value: "action"
					}
				],
				total: 0
			};
		},

		watch: {
			search: {
				handler() {
					this.fetchData();
				}
			},
			options: {
				handler() {
					this.fetchData();
				}
			},

			immediate: true
		},

		methods: {
			fetchData() {
				this.$axios
					.$get(
						`api/sale?search=${this.search}&itemsPerPage=${this.options.itemsPerPage}&page=${this.options.page}`
					)
					.then(res => {
						this.$set(this.$data, "items", res.sales.data);
						this.total = res.sales.total;
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			close() {
				this.dialog = false;
				this.editedIndex = -1;
				this.form = {};
			},

			editSale(id) {
				this.$router.push(`/sale/${id}/edit`);
			},

			removeSale(id) {
				this.$axios
					.$delete(`api/sale/` + id)
					.then(res => {
						this.fetchData();
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			viewInfo(id) {
				this.$router.push(`/sale/${id}`);
			}
		}
	};
</script>

<style lang="scss">
	.nuxt--link {
		text-decoration: none;
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

	.paid {
		background-color: #36d160;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
	}

	.due {
		background-color: #e0355a;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
		color: #fff;
	}

	.completed {
		background-color: #433ac1;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
		color: #fff;
	}

	.sale-tr {
		cursor: pointer;
	}
</style>

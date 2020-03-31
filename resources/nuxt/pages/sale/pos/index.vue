<template>
	<v-container>
		<v-card>
			<div class="posheader">
				<span class="posheader--header">POS</span>
				<span class="posheader--search">
					<input type="text" class="posheader--input" placeholder="Search...." v-model="search" />
				</span>
			</div>
			<v-divider></v-divider>
			<v-data-table
				:headers="headers"
				:items="pos"
				:options.sync="options"
				:server-items-length="total"
			>
				<template v-slot:item="{ item }">
					<tr>
						<td>{{ item.created_at }}</td>
						<td>{{ item.reference_no }}</td>
						<td>{{ item.member.name }}</td>
						<td>
							<span :class="item.payment_status === 'Paid' ? 'paid' : 'due'">{{ item.payment_status }}</span>
						</td>
						<td>{{ item.payment_method }}</td>
						<td>$ {{ item.grand_total | formatMoney }}</td>
						<td>$ {{ item.paid | formatMoney }}</td>
						<td>
							<v-btn small icon outlined @click="viewPos(item.id)">
								<v-icon small color="teal">mdi-eye</v-icon>
							</v-btn>
							<v-btn small icon outlined>
								<v-icon small color="primary">mdi-pencil</v-icon>
							</v-btn>
							<v-btn small icon outlined @click="deletePos(item.id)">
								<v-icon small color="red">mdi-delete</v-icon>
							</v-btn>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
		<v-content>
			<notifications group="delete" class="deleted" />
		</v-content>
	</v-container>
</template>

<script>
	import Vue from "vue";

	let numeral = require("numeral");

	Vue.filter("formatMoney", function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		name: "PosList",

		created() {
			this.fetchSale();
		},

		watch: {
			search: {
				handler() {
					this.fetchSale();
				}
			},
			options: {
				handler() {
					this.fetchSale();
				}
			},
			immediate: true
		},

		data() {
			return {
				pos: [],
				search: "",
				headers: [
					{ text: "Date", sortable: false },
					{ text: "Invoice Number", sortable: false },
					{ text: "Customer", sortable: false },
					{ text: "Payment Status", sortable: false },
					{ text: "Payment Method", sortable: false },
					{ text: "Total Amount", sortable: false },
					{ text: "Total Paid", sortable: false },
					{ text: "Actions", sortable: false }
				],
				options: {},
				total: 0
			};
		},

		methods: {
			fetchSale() {
				this.$axios
					.$get(
						`api/sale?itemsPerPage=${this.options.itemsPerPage}&search=${this.search}&page=${this.options.page}`
					)
					.then(res => {
						Vue.set(this.$data, "pos", res.sales.data);
						this.total = res.sales.total;
						console.log(res);
						console.log(this.options);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			deletePos(id) {
				if (confirm("Are u sure to delete it??")) {
					this.$axios
						.delete(`api/sale/` + id)
						.then(res => {
							console.log(res);
							this.fetchSale();
						})
						.catch(err => err.response);
				}
				Vue.notify({
					group: "delete",
					text: "Deleted Successfully!!"
				});
			},

			viewPos(id) {
				this.$router.push(`/sale/pos/${id}`);
			}
		}
	};
</script>

<style lang="scss">
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

	.posheader {
		padding: 10px 15px 10px 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		&--search {
			width: 50%;
		}
		&--input {
			border: 1px solid olivedrab;
			outline: none;
			padding: 7px 15px 7px 15px;
			font-size: 15px;
			width: 100%;
			border-radius: 3px;
		}
	}

	.deleted {
		.notification-content {
			color: #fff;
		}
	}
</style>
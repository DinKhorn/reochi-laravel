<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">
				Order
				<span class="caption grey--text mt-2">&nbsp;List</span>
				<v-spacer></v-spacer>
				<v-btn class="primary white--text" to="/order/add-order">
					<v-icon left>mdi-plus-circle</v-icon>Add
				</v-btn>
			</v-card-title>
			<div class="pa-5">
				<div class="d-flex justify-space-between">
					<div class="col-8 py-0">
						<div class="row">
							<v-text-field label="Search" solo outlined dense style="width: 100px !important;"></v-text-field>
							<v-select
								label="Filter by"
								solo
								outlined
								dense
								v-model="filter_by"
								:items="filter_by"
								style="width: 60px !important;padding-left:10px;"
							></v-select>
							<v-menu
								v-model="menu1"
								:close-on-content-click="false"
								:nudge-right="40"
								transition="scale-transition"
								offset-y
								min-width="290px"
							>
								<template v-slot:activator="{ on }">
									<v-text-field
										v-model="date"
										readonly
										v-on="on"
										outlined
										solo
										dense
										label="Date From"
										style="width: 40px !important; margin:0 10px"
									></v-text-field>
								</template>
								<v-date-picker v-model="date" @input="menu1 = false"></v-date-picker>
							</v-menu>
							<v-menu
								v-model="menu2"
								:close-on-content-click="false"
								:nudge-right="40"
								transition="scale-transition"
								offset-y
								min-width="290px"
							>
								<template v-slot:activator="{ on }">
									<v-text-field
										v-model="date"
										style="width: 40px !important;"
										readonly
										outlined
										solo
										dense
										v-on="on"
										label="Date To"
									></v-text-field>
								</template>
								<v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
							</v-menu>
						</div>
					</div>
					<div>
						<v-btn class="red darken-1">PDF</v-btn>
						<v-btn class="lime lighten-1">CSV</v-btn>
						<v-btn class="blue lighten-1">Print</v-btn>
					</div>
				</div>
				<v-data-table :headers="headers" :items="items" v-permission="'view order'">
					<template v-slot:item="{item}">
						<tr>
							<td>{{ item.created_at }}</td>
							<td>{{ item.reference_no }}</td>
							<td>{{ item.outlet.name }}</td>
							<td>{{ item.location.name }}</td>
							<!-- <td>{{ item.order_status }}</td> -->
							<td v-if="item.order_status === 'New'">
								<span class="new">{{ item.order_status }}</span>
							</td>
							<td v-else-if="item.order_status === 'Pending'">
								<span class="pending">{{ item.order_status }}</span>
							</td>
							<td v-else-if="item.order_status === 'Accepted'">
								<span class="accepted">{{ item.order_status }}</span>
							</td>
							<td v-else-if="item.order_status === 'Received'">
								<span class="received">{{ item.order_status }}</span>
							</td>
							<td v-else>
								<span class="cancel">{{ item.order_status }}</span>
							</td>
							<td>
								<span :class="item.payment_status === 'Paid' ? 'paid' : 'due'">{{ item.payment_status }}</span>
							</td>
							<td>USD {{ item.total }}</td>
							<td>USD {{ item.due_amount }}</td>
							<td>{{ item.order_by.name }}</td>
							<td>
								<v-tooltip top v-permission="'view order'">
									<template v-slot:activator="{ on }">
										<v-btn icon small @click="viewItem(item.id)" color="cyan" outlined v-on="on">
											<v-icon small>mdi-eye</v-icon>
										</v-btn>
									</template>
									<span>View</span>
								</v-tooltip>
								<v-tooltip top v-permission="'edit order'">
									<template v-slot:activator="{ on }">
										<v-btn small icon @click="editItem(item.id)" color="primary" outlined v-on="on">
											<v-icon small>mdi-pencil</v-icon>
										</v-btn>
									</template>
									<span>Edit</span>
								</v-tooltip>
								<!-- <v-tooltip top v-permission="'delete order'">
									<template v-slot:activator="{ on }">
										<v-btn icon @click="deleteItem(item)" color="red" outlined v-on="on">
											<v-icon small>mdi-delete</v-icon>
										</v-btn>
									</template>
									<span>Delete</span>
								</v-tooltip>-->
							</td>
						</tr>
					</template>
				</v-data-table>
			</div>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		name: "OrderList",
		watch: {
			name: {
				handler() {
					this.getItems();
				}
			},

			email: {
				handler() {
					this.getItems();
				}
			},

			term: {
				handler() {
					this.searchItems();
				}
			},
			immediate: true
		},
		created() {
			this.fetchData();
		},

		data() {
			return {
				date: new Date().toISOString().substr(0, 10),
				menu1: false,
				modal: false,
				menu2: false,
				filter_by: ["Salesman", "Admin"],
				dialog: false,
				items: [],
				form: {},
				headers: [
					{
						text: "Date",
						value: "created_at"
					},
					{
						text: "Reference No.",
						value: "reference_no"
					},
					{
						text: "Outlet Name",
						value: "outlet.name"
					},
					{
						text: "Location",
						value: "location"
					},
					{
						text: "Order Status",
						value: "order_status"
					},
					{
						text: "Payment Status",
						value: "payment_status"
					},
					{
						text: "Total",
						value: "total"
					},
					{
						text: "Payment Due",
						value: "due_amount"
					},
					{
						text: "Order By",
						value: "order_by.name"
					},
					{
						text: "Action",
						value: "action",
						sortable: false
					}
				],
				role: ["saleman", "administator"]
			};
		},
		methods: {
			fetchData() {
				this.$axios
					.$get(`/api/order`)
					.then(res => {
						this.items = res.orders.data;
						console.log(this.items);
					})
					.catch(err => {
						console.log(err.response);
					});
			},
			editItem(id) {
				this.$router.push(`/order/${id}/edit`);
			},

			viewItem(id) {
				this.$router.push(`/order/${id}/detail`);
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

	.new {
		background-color: #da5521;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
	}

	.pending {
		background-color: #4635e0;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
		color: #fff;
	}

	.accepted {
		background-color: #d5e035;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
	}

	.received {
		background-color: #3bd136;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
		color: #fff;
	}
	.cancel {
		background-color: #d42b2b;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
		color: #fff;
	}
</style>

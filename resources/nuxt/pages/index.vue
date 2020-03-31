<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">Dashboard</v-card-title>
			<div class="pa-4">
				<v-row>
					<template v-for="(card, key) in cards">
						<v-col md="3" sm="6" cols="12">
							<v-card :color="card.color">
								<v-card-text class="d-flex align-start justify-space-between">
									<v-icon
										class="card--icon"
										style="padding-top:7px; font-size: 40px; color: #ffffff"
									>{{ card.icon }}</v-icon>
									<div class="d-flex flex-column align-end mt-7">
										<div class="card--amount">{{ card.amount }}</div>
										<div class="card--text">{{ card.text }}</div>
									</div>
								</v-card-text>
							</v-card>
						</v-col>
					</template>
				</v-row>
			</div>
		</v-card>
		<!-- <div class="my-5 d-flex align-center">
			<h1 class="font-weight-light headline">Admin Dashboard</h1>
			<span class="mt-1 px-2">dashboard & statistics</span>
		</div>-->
		<!-- User Card -->
		<!-- <v-card class="card">
			<div class="card--title">
				<v-card-text class="font-weight-bold card--header">
					<v-icon color="grey lighten-5" class="mb-1">mdi-account</v-icon>USER PANEL
				</v-card-text>
				<v-divider></v-divider>
			</div>
			<div class="px-4">
				<v-row>
					<template v-for="(card, key) in users">
						<v-col md="3" sm="6" cols="12">
							<v-card :color="card.color">
								<v-card-text class="d-flex align-start justify-space-between">
									<v-icon class="card--icon" style="font-size: 40px; color: #ffffff">{{ card.icon }}</v-icon>
									<div class="d-flex flex-column align-end mt-7">
										<div class="card--amount">{{ card.amount }}</div>
										<div class="card--text">{{ card.text }}</div>
									</div>
								</v-card-text>
							</v-card>
						</v-col>
					</template>
				</v-row>
			</div>
		</v-card>-->

		<!-- Fund Card -->
		<!-- <v-card class="card my-5">
			<div class="card--title">
				<v-card-text class="font-weight-bold card--header">
					<v-icon color="grey lighten-5" class="mb-1">mdi-filter</v-icon>FUND PANEL
				</v-card-text>
				<v-divider></v-divider>
			</div>
			<div class="px-4">
				<v-row>
					<template v-for="(card, key) in funds">
						<v-col md="3" sm="6" cols="12">
							<v-card :color="card.color">
								<v-card-text class="d-flex align-start justify-space-between">
									<v-icon class="card--icon" style="font-size: 40px; color: #ffffff">{{ card.icon }}</v-icon>
									<div class="d-flex flex-column align-end mt-7">
										<div class="card--amount">{{ card.amount }} $</div>
										<div class="card--text">{{ card.text }}</div>
									</div>
								</v-card-text>
							</v-card>
						</v-col>
					</template>
				</v-row>
			</div>
		</v-card>-->

		<!-- Admin Card -->
		<!-- <v-card class="card mb-5">
			<div class="card--title">
				<v-card-text class="font-weight-bold card--header">
					<v-icon color="grey lighten-5" class="mb-1">mdi-account-cash</v-icon>ADMIN INCOME PANEL
				</v-card-text>
				<v-divider></v-divider>
			</div>
			<div class="px-4">
				<v-row>
					<template v-for="(card, key) in admins">
						<v-col md="3" sm="6" cols="12">
							<v-card :color="card.color">
								<v-card-text class="d-flex align-start justify-space-between">
									<v-icon class="card--icon" style="font-size: 40px; color: #ffffff">{{ card.icon }}</v-icon>
									<div class="d-flex flex-column align-end mt-7">
										<div class="card--amount">{{ card.amount }} $</div>
										<div class="card--text">{{ card.text }}</div>
									</div>
								</v-card-text>
							</v-card>
						</v-col>
					</template>
				</v-row>
			</div>
		</v-card>-->
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				cards: [
					{
						text: "Today Sale (Pcs)",
						icon: "mdi-cube",
						color: "light-blue darken-1",
						amount: 678
					},
					{
						text: "Monthly Sale (Pcs)",
						icon: "mdi-cube",
						color: "red darken-1",
						amount: 678
					},
					{
						text: "Total Order",
						icon: "mdi-cart-arrow-down",
						color: "orange darken-1",
						amount: 678
					},
					{
						text: "Total Outlet",
						icon: "mdi-storefront",
						color: "purple darken-1",
						amount: 678
					}
					// {
					// 	text: "Total Purchase",
					// 	icon: "mdi-account-group",
					// 	color: "blue-grey darken-1",
					// 	amount: 678
					// },
				]

				// funds: [
				// 	{
				// 		text: "All Users Balance",
				// 		icon: "mdi-cash",
				// 		color: "purple lighten-1",
				// 		amount: 678
				// 	},
				// 	{
				// 		text: "Total Add Fund",
				// 		color: "orange darken-1",
				// 		icon: "mdi-credit-card",
				// 		amount: 678
				// 	},
				// 	{
				// 		text: "Total Withdraw",
				// 		icon: "mdi-twitter-retweet",
				// 		amount: 678,
				// 		color: "red lighten-2"
				// 	},
				// 	{
				// 		text: "Admin Generated",
				// 		icon: "mdi-lock-open-variant",
				// 		amount: 678,
				// 		color: "blue-grey darken-3"
				// 	},
				// 	{
				// 		text: "Admin Substract",
				// 		icon: "mdi-lock",
				// 		color: "red lighten-1",
				// 		amount: 678
				// 	},
				// 	{
				// 		text: "Total Binary Amount",
				// 		color: "blue-grey darken-4",
				// 		icon: "mdi-timer",
				// 		amount: 678
				// 	},
				// 	{
				// 		text: "Total Referral Amount",
				// 		icon: "mdi-link",
				// 		amount: 678,
				// 		color: "cyan darken-2"
				// 	},
				// 	{
				// 		text: "Withdraw Requests",
				// 		icon: "mdi-rotate-right",
				// 		amount: 678,
				// 		color: "red darken-3"
				// 	}
				// ],

				// admins: [
				// 	{
				// 		text: "Total Withdraw Charge",
				// 		icon: "mdi-cash",
				// 		color: "blue-grey darken-3",
				// 		amount: 678
				// 	},
				// 	{
				// 		text: "Total Transfer Charge",
				// 		icon: "mdi-swap-horizontal",
				// 		color: "light-blue darken-1",
				// 		amount: 678
				// 	},
				// 	{
				// 		text: "Total Upgrade Charge",
				// 		icon: "mdi-cloud-upload",
				// 		color: "cyan darken-2",
				// 		amount: 678
				// 	},
				// 	{
				// 		text: "Total Fund Charge",
				// 		icon: "mdi-plus-box",
				// 		color: "grey darken-2",
				// 		amount: 678
				// 	}
				// ]
			};
		}
	};
</script>

<style lang="scss">
	.card {
		// border: 1px solid rgba(0,0,0,0.125);
		&--title {
			background: #2f353b;
		}
		&--header {
			color: #ffffff;
		}

		&--icon {
			position: relative;
			bottom: 13px;
		}

		&--amount {
			color: #fff;
			font-size: 35px;
			font-weight: 300;
		}

		&--text {
			color: #fff;
			font-size: 16px;
			font-weight: 350;
			margin-top: 10px;
		}

		&--item {
			width: 100%;
		}
	}
</style>

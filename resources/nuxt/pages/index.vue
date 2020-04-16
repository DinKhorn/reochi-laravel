<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">Dashboard</v-card-title>
			<div class="pa-4">
				<v-row>
					<template v-for="(card, key) in cards">
						<v-col md="3" sm="6" cols="12" :key="key">
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
			]
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

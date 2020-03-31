<template>
	<v-app>
		<v-card class="my-5 mx-5">
			<v-card-title class="blue accent-1">
				<v-icon left>mdi-settings</v-icon>
				Commission Settings
			</v-card-title>
			<v-divider></v-divider>
			<div class="px-7 pb-5">
				<v-row>
					<v-col md="6" xs="12" cols="12">
						<label class="font-weight-bold">Transfer Charge User To User:</label>
						<v-text-field
							outlined
							solod
							dense
							append-icon="mdi-percent"
						></v-text-field>
						<!-- <v-icon class="form-icon" style="font-size: 30px;">mdi-percent</v-icon> -->
					</v-col>
					<v-col md="6" xs="12" cols="12">
						<label class="font-weight-bold">Withdraw Charge:</label>
						<v-text-field
							outlined
							solod
							dense
							append-icon="mdi-percent"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col md="4" xs="12" cols="12">
						<label class="font-weight-bold">UPGRADE Charge:</label>
						<v-text-field
							outlined
							solod
							dense
							append-icon="mdi-currency-usd"
						></v-text-field>
					</v-col>
					<v-col md="4" xs="12" cols="12">
						<label class="font-weight-bold">UPGRADE Commision To TREE:</label>
						<v-text-field
							outlined
							solod
							dense
							append-icon="mdi-currency-usd"
						></v-text-field>
					</v-col>
					<v-col md="4" xs="12" cols="12">
						<label class="font-weight-bold">UPGRADE Commision To Sponsor:</label>
						<v-text-field
							outlined
							solod
							dense
							append-icon="mdi-currency-usd"
						></v-text-field>
					</v-col>
				</v-row>
			</div>
			<v-divider></v-divider>
			<div class="pt-5 px-5 pb-5">
				<p class="font-weight-bold">UPGRADE To Premium Text:</p>
				<client-only>
					<vue-editor v-model="content"></vue-editor>
				</client-only>
			</div>
			<button class="px-4 py-1 mx-5 mb-5 charge--btn" v-permission="'charge commission'">
				<v-icon color="grey lighten-3">mdi-check</v-icon>
				Update
			</button>
		</v-card>
	</v-app>
</template>

<script>
export default {
  	data() {
  		return {
  			content: "<p>Some initial content</p>"
  		}
  	}
};
</script>

<style lang="scss">
	.charge--btn {
		background-color: #3598dc;
		border-radius: 2px;
		color: #fff;
	}
</style>
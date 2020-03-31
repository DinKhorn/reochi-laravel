<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<h3 class="px-5 py-3 card-header">CONTACT PAGE CONTENT</h3>
			<v-divider></v-divider>
			<v-row class="px-5">
				<v-col md="6">
					<label for="address" class="form-label">Address:</label>
					<input type="text" value="cambodia" class="form-control">
				</v-col>
				<v-col md="6">
					<label for="email" class="form-label">Email:</label>
					<input type="email" value="angkordev@angkordev.com" class="form-control">
				</v-col>
				<v-col md="12">
					<label for="map" class="form-label">
						Google Map Address Link (Embed Map < iframe>):
					</label>
					<input type="text" value="http://angkordev.com" class="form-control">
				</v-col>
			</v-row>
			<v-btn class="mx-5 mb-5 white--text" color="blue darken-1" v-permission="'view website'">
				<v-icon left>mdi-check</v-icon>
				update
			</v-btn>
		</v-card>
	</v-app>
</template>
<style lang="scss">
.form-control {
	padding-left: 10px;
	padding-right: 10px;
	padding-top: 5px;
	padding-bottom: 5px;
	width: 100%;
	border: 1px solid rgba(0, 0, 0, 0.125);
	outline: none;
	border-radius: 5px;
}

.form-label {
	font-weight: 500;
}

.card-header {
	background: #36c6d3;
	color: #ffffff;
	font-size: 17px;
}

</style>

<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">
				User Profile
				<!-- <span class="caption grey--text mt-2">&nbsp;List</span> -->
				<v-spacer></v-spacer>
				<!-- <v-btn class="primary white--text" to="/user/add-user">
					<v-icon left>mdi-plus-circle</v-icon>Add
				</v-btn>-->
			</v-card-title>
			<div class="pa-5">
				<div class="row">
					<div class="col-8 pb-0">
						<div class="row">
							<div class="col-4 font-weight-bold">Name:</div>
							<div class="col-8">Administator</div>
						</div>
						<div class="row">
							<div class="col-4 font-weight-bold">Date of Birth:</div>
							<div class="col-8">10-12-1993</div>
						</div>
						<div class="row">
							<div class="col-4 font-weight-bold">Phone Number:</div>
							<div class="col-8">+855 345 234/ +855 345 234</div>
						</div>
						<div class="row">
							<div class="col-4 font-weight-bold">E-mail:</div>
							<div class="col-8">administator@mail.com</div>
						</div>
						<div class="row pt-0">
							<div class="col-4 font-weight-bold">Address:</div>
							<div
								class="col-8"
							>No. 33-34, George Dimitrov (St. 114), Sangkat Monorom, Khan 7 Makara, 12251, Phnom Penh</div>
						</div>

						<div class="row">
							<div class="col-4 font-weight-bold">About me:</div>
							<div class="col-8">
								Where can I get some?
								There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
							</div>
						</div>
						<div class="row">
							<div class="col-4 font-weight-bold">Social:</div>
							<div class="col-8 pt-0">
								<v-btn icon color="primary">
									<v-icon large>mdi-facebook</v-icon>
								</v-btn>
								<v-btn icon color="blue lighten-2">
									<v-icon large>mdi-twitter</v-icon>
								</v-btn>
								<v-btn icon color="red">
									<v-icon large>mdi-pinterest</v-icon>
								</v-btn>
								<v-btn icon color="blue darken-1">
									<v-icon large>mdi-linkedin</v-icon>
								</v-btn>
							</div>
						</div>
					</div>
					<div class="col-4 pb-0">
						<div class="preview--image">
							<img src="@/assets/img/profile.jpg" height="230" />
							<!-- <img src="@/assets/img/profile.jpg" alt="Example" height="230" /> -->
						</div>
					</div>
				</div>
			</div>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		name: "UserField",
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

		data() {
			return {
				dialog: false,
				items: [],
				form: {},
				name: "",
				email: "",
				term: "",
				headers: [
					{
						text: "ID",
						value: "id",
						sortable: false
					},
					{
						text: "Name",
						value: "name",
						sortable: false
					},
					{
						text: "Email",
						value: "email",
						sortable: false
					},
					{
						text: "Phone",
						sortable: false,
						value: "phone"
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

		methods: {}
	};
</script>

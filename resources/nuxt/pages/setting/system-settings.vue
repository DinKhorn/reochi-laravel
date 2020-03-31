<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">
				Setting
				<v-spacer></v-spacer>
			</v-card-title>
			<div class="pa-6">
				<div class="row">
					<div class="col-6 pb-0">
						<div class="row">
							<div class="col-6 font-weight-bold">Company Name:</div>
							<div class="col-6">Reochi</div>
						</div>
						<div class="row">
							<div class="col-6 font-weight-bold">Phone Number:</div>
							<div class="col-6">+855 345 234/ +855 345 234</div>
						</div>
						<div class="row">
							<div class="col-6 font-weight-bold">E-mail:</div>
							<div class="col-6">reo-chi@mail.com</div>
						</div>
						<div class="row">
							<div class="col-6 font-weight-bold">Website:</div>
							<div class="col-6">https://www.reochi.com/</div>
						</div>
						<div class="row pt-0">
							<div class="col-6 font-weight-bold">Address:</div>
							<div
								class="col-6"
							>No. 33-34, George Dimitrov (St. 114), Sangkat Monorom, Khan 7 Makara, 12251, Phnom Penh</div>
						</div>
					</div>
					<div class="col-6 pb-0">
						<div class="preview--image">
							<img src="@/assets/img/logo.jpg" height="230" />
							<!-- <img src class="img-responsive" height="180" /> -->
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-3 font-weight-bold">Company Description:</div>
					<div class="col-9">
						REO CHI - Green Tea is a product containing four essential
						ingredients that are full of vitamins, nutrients,
						as well as health for us of all ages to experience
						the best green tea flavor with the production and Consult
						by Japanese team as standard of Japanese quality.
						So let's all support and choose the products that are best for our health:
						1- Oranges are the king of vitamin C.
						2-The only plant that Japanese people use/drink regularly.
						3- Honey is the king of over 1,000 medicinal herbs.
						4- Date Palm fruits are good for health.
						Thanks and don't forget to support this product.
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
		</v-card>
	</v-app>
</template>

<script>
	export default {
		name: "SystemSetting",

		data() {
			return {
				dialog: false,
				url: "",
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

		methods: {
			uploadImage(e) {
				const images = e.target.files[0];
				const reader = new FileReader();

				reader.readAsDataURL(images);
				reader.onload = e => {
					this.form.image = e.target.result;
					console.log(this.form);
				};

				this.url = URL.createObjectURL(images);
			}
		}
	};
</script>

<style lang="scss">
	.product--image {
		border: 1px solid rgba(0, 0, 0, 0.125);
		padding: 5px 5px 5px 5px;
		width: 45%;
	}

	.preview--image {
		text-align: center;
	}
</style> 
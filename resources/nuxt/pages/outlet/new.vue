<template>
	<div>
		<v-container fluid>
			<v-card class="card">
				<v-card-title class="blue-grey lighten-4">Create Outlet</v-card-title>
				<v-divider></v-divider>
				<v-card-text>
					<p class="px-5 pt-3 font-italic grey--text">
						The field labels marked with
						<span class="red--text">*</span> are required input fields.
					</p>
					<OutletForm :form="form" />
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions class="px-5 pb-5">
					<v-spacer></v-spacer>
					<v-btn color="primary" @click.prevent="createItem">
						<v-icon left>mdi-content-save</v-icon>Create
					</v-btn>
					<v-spacer></v-spacer>
				</v-card-actions>
			</v-card>
		</v-container>
	</div>
</template>

<script>
import OutletForm from "@/components/forms/OutletForm";
export default {
	name: "AddOutlet",
	components: {
		OutletForm
	},
	data() {
		return {
			form: {},
			items: [],
			locations: [],
			url: null,
			itemsPerPage: 5,
			status: ["Enable", "Disable"]
		};
	},
	created() {
		this.fetchLocation();
	},
	methods: {
		fetchLocation() {
			this.$axios
				.$get(`api/location`)
				.then(res => {
					this.locations = res.locations.data;
					// console.log(res);
				})
				.catch(err => {
					console.log(err.response);
				});
		},

		createItem() {
			this.$axios
				.$post(`api/outlets`, this.form)
				.then(res => {
					this.items = res.data;
					this.$toast.info("Succeessfully created");
					this.$router.push("/outlet");
				})
				.catch(err => {
					console.log(err.response);
					this.$refs.form.validate(err.response.data.errors);
				});
		},
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

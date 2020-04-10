<template>
	<v-app class="pa-5">
		<v-card class="card">
			<v-card-title class="blue-grey lighten-4">Edit Outlet</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<p class="px-5 pt-3 font-italic grey--text">
					The field labels marked with
					<span class="red--text">*</span> are required input fields.
				</p>
				<OutletForm :form="form" />
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions class="px-5">
				<v-spacer></v-spacer>
				<v-btn :loading="saving" color="primary" @click.prevent="updateItem">
					<v-icon left>mdi-content-save</v-icon>Save
				</v-btn>
				<v-spacer></v-spacer>
			</v-card-actions>
		</v-card>
	</v-app>
</template>

<script>
import OutletForm from "@/components/forms/OutletForm";
import moment from "moment";
export default {
	name: "EditOutlet",
	components: {
		OutletForm
	},
	created() {
		this.setData();
	},

	data() {
		return {
			saving: false,
			locations: [],
			form: {},
			items: [],
			itemsPerPage: 5,
			status: ["Enable", "Disable"],
			url: ""
		};
	},

	methods: {
		// fetchLocation() {
		// 	this.$axios
		// 		.$get(`api/location`)
		// 		.then(res => {
		// 			this.locations = res.locations.data;
		// 			// console.log(res);
		// 		})
		// 		.catch(err => {
		// 			console.log(err.response);
		// 		});
		// },

		setData() {
			this.$axios
				.$get(`api/outlets/` + this.$route.params.id)
				.then(res => {
					this.$set(this.$data, "form", res.outlet);
					console.log(this.$data);
				})
				.catch(err => {
					console.log(err.response);
				});
		},

		updateItem() {
			this.saving = true;
			this.$axios
				.$patch(`api/outlets/` + this.form.id, this.form)
				.then(res => {
					this.items = res.data;
					this.$toast.info("Succeessfully updated");
					this.$router.push("/outlet");
					this.saving = false;
				})
				.catch(err => {
					this.saving = false;
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
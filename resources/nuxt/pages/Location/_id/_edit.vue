<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<v-card-title class="blue lighten-1 white--text">Edit Location(Branch)</v-card-title>
			<v-divider></v-divider>
			<v-row class="pt-5 mx-5">
				<v-col md="6" cols="12">
					<label for="">Name</label>
					<validation-provider rules="required" v-slot="{errors}">
						<v-text-field 
							outlined 
							solo 
							type="text"
							dense 
							label="Name..." 
							v-model="form.name"
						></v-text-field>
						<span class="location--validate">{{errors[0]}}</span>
					</validation-provider>
				</v-col>
				<v-col md="6" cols="12">
					<label for="">Address</label>
					<validation-provider rules="required" v-slot="{errors}">
						<v-text-field 
							outlined 
							solo 
							type="text"
							dense 
							label="Addres..." 
							v-model="form.address"
						></v-text-field>
						<span class="location--validate">{{errors[0]}}</span>
					</validation-provider>
				</v-col>
				<v-col md="6" cols="12">
					<label for="">City</label>
					<validation-provider rules="required" v-slot="{errors}">
						<v-text-field 
							outlined 
							solo 
							type="text"
							dense 
							label="City..." 
							v-model="form.city"
						></v-text-field>
						<span class="location--validate">{{errors[0]}}</span>
					</validation-provider>
				</v-col>
				<v-col md="6" cols="12">
					<label for="">Country</label>
					<v-autocomplete
						outlined
						solo
						dense
						:items="province"
						item-text="country"
						item-value="country"
						label="Select Provine"
						v-model="form.country"
						return-object
					></v-autocomplete>
				</v-col>
				<v-col cols="12">
					<label for="">Note</label>
					<textarea cols="30" rows="5" v-model="form.description" class="form--location"></textarea>
				</v-col>
			</v-row>
			<v-btn color="primary" class="mx-7 mb-5" @click="createItem">
				<v-icon>mdi-check</v-icon>
				Update
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		created() {
			this.$axios.$get(`api/location/` + this.$route.params.id)
			.then(res  => {
				this.form = res.location;
			})
			.catch(err => {
				console.log(err.response);
			})
		},

		data() {
			return {
				form: {},
				province: [
					"Takeo",
					"Phnom Penh",
					"Kompong Thom",
				]
			}
		},

		methods: {
			createItem() {
				this.$axios
				.$patch(`api/location/` + this.form.id, {
					name: this.form.name,
					city: this.form.city,
					address: this.form.address,
					country: this.form.country,
				})
				.then(res => {
					this.location = res.data;
					this.$router.push(`/location/`);
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		},

	}
</script> 

<style lang="scss">
	.form--location {
		border: 1px solid #000000;
		padding: 5px 10px 5px 10px;
		width: 100%;
		outline: none;
	}

	.location--validate {
		color: red;
	}
</style>


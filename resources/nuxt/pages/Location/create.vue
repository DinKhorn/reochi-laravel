<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<v-card-title class="green darken-3 white--text">Add Location(Branch)</v-card-title>
			<v-divider></v-divider>
			<v-row class="pt-5 mx-5">
				<v-col md="6" cols="12">
					<label for="">Name</label>
					<validation-provider rules="required|min:3" v-slot="{errors}">
						<v-text-field 
							outlined 
							solo 
							type="text"
							dense 
							label="Reference no..." 
							v-model="form.name"
						></v-text-field>
						<span class="location--validate">{{errors[0]}}</span>
					</validation-provider>
				</v-col>
				<v-col md="6" cols="12">
					<label for="">Commune</label>
					<validation-provider rules="required|min:3" v-slot="{errors}">
						<v-text-field 
							outlined 
							solo 
							type="text"
							dense 
							label="Reference no..." 
							v-model="form.address"
						></v-text-field>
						<span class="location--validate">{{errors[0]}}</span>
					</validation-provider>
				</v-col>
				<v-col md="6" cols="12">
					<label for="">District</label>
					<validation-provider rules="required|min:3" v-slot="{errors}">
						<v-text-field 
							outlined 
							solo 
							type="text"
							dense 
							label="Reference no..." 
							v-model="form.city"
						></v-text-field>
						<span class="location--validate">{{errors[0]}}</span>
					</validation-provider>
				</v-col>
				<v-col md="6" cols="12">
					<label for="">Province</label>
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
				Create
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
				items: [],
				province: [
					"Takeo",
					"Phnom Penh",
					"Kompong Thom",
				]
			}
		},

		methods: {
			createItem() {
				this.$axios.$post(`api/location`, this.form)
				.then(res => {
					this.items = res.data;
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
<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<v-card-title class="green darken-3 white--text">Add Tracking</v-card-title>
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
						<span class="tracking--validate">{{errors[0]}}</span>
					</validation-provider>
				</v-col>
				<v-col md="6" cols="12">
					<label for="">Latitude</label>
					<validation-provider rules="required|min:3" v-slot="{errors}">
						<v-text-field 
							outlined 
							solo 
							type="text"
							dense 
							label="latitude..." 
							v-model="form.latitude"
						></v-text-field>
						<span class="tracking--validate">{{errors[0]}}</span>
					</validation-provider>
				</v-col>
				<v-col md="6" cols="12">
					<label for="">Logitude</label>
					<validation-provider rules="required|min:3" v-slot="{errors}">
						<v-text-field 
							outlined 
							solo 
							type="text"
							dense 
							label="logitude..." 
							v-model="form.logitude"
						></v-text-field>
						<span class="tracking--validate">{{errors[0]}}</span>
					</validation-provider>
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
			}
		},

		methods: {
			createItem() {
				this.$axios.$post(`api/tracking`, this.form)
				.then(res => {
					this.items = res.data;
					this.$router.push(`/tracking/`);
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		},

	}
</script> 

<style lang="scss">
	.form--tracking {
		border: 1px solid #000000;
		padding: 5px 10px 5px 10px;
		width: 100%;
		outline: none;
	}

	.tracking--validate {
		color: red;
	}
</style>
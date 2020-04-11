<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<v-card-title class="blue lighten-1 white--text">Edit Tracking</v-card-title>
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
						<span class="tracking--validate">{{errors[0]}}</span>
					</validation-provider>
				</v-col>
				<v-col md="6" cols="12">
					<label for="">Latitude</label>
					<validation-provider rules="required" v-slot="{errors}">
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
					<validation-provider rules="required" v-slot="{errors}">
						<v-text-field 
							outlined 
							solo 
							type="text"
							dense 
							label="Logitude..." 
							v-model="form.logitude"
						></v-text-field>
						<span class="tracking--validate">{{errors[0]}}</span>
					</validation-provider>
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
			this.$axios.$get(`api/tracking/` + this.$route.params.id)
			.then(res  => {
				this.form = res.tracking;
			})
			.catch(err => {
				console.log(err.response);
			})
		},

		data() {
			return {
				form: {},
			}
		},

		methods: {
			createItem() {
				this.$axios
				.$patch(`api/tracking/` + this.form.id, {
					name: this.form.name,
					logitude: this.form.logitude,
					latitude: this.form.latitude,
				})
				.then(res => {
					this.tracking = res.data;
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


<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="cyan darken-2 px-5">
				<v-card-title class="white--text">
					EDIT CATEGORY
				</v-card-title>
			</div>
			<v-divider></v-divider> 
			<v-row class="px-5">
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="cat_name">Category*</label>
					<validation-provider rules="required" v-slot="{ errors }">
                        <v-text-field 
							outlined 
							solo 
							type="text"
							dense 
							label="Category..." 
							v-model="form.cat_name"
                        >
						</v-text-field>
						<span class="text--error">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Description*</label>
					<validation-provider rules="required" v-slot="{ errors }">
						<v-text-field 
						outlined 
						solo 
						dense 
						label="Description..." 
						type="text" 
                        v-model="form.description"
						>
						</v-text-field>
						<span class="text--error">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				
			</v-row>
			<v-btn class="mx-5 mb-5 mt-2" @click="editCategory" color="primary" v-permission="'add users'">
				<v-icon left>mdi-check</v-icon>
				Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		name: "EditCategory",
		data() {
			return {
				form: {}
			}
		},

		created() {
			this.$axios.$get('api/category/' + this.$route.params.id)
			.then(res => {
				// this.form = res.category;
				this.$set(this.$data, "form", res.categories);
				console.log(res);
			})
			.catch(err => {
				console.log(err.response);
			})
		},

		methods: {
			editCategory() {
				this.$axios
				.$patch(`api/category/` + this.form.id, {
					'cat_name': this.form.cat_name,
					'description': this.form.description,
				})
				.then(res => {
					this.$router.push(`/product/category/`)
					console.log(res);
				})
				.catch(err => {
					console.log(err.response)
				})
			},
		}
	}
</script>

<style>
	.supplier--form {
		padding: 7px 5px 7px 5px;
		border: 1px solid #3a99c2;
		width: 100%;
		outline:  none;
	}

	.text--error {
		color:  red;
	}
</style>
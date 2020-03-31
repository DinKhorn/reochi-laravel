<template>
	<v-container>
		<ValidationObserver ref="form">
			<v-card>
				<div class="blue-grey lighten-4">
					<v-card-title>Create Delivery Man</v-card-title>
				</div>
				<v-divider></v-divider>
				<div class="px-5">
					<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
					<v-row class="px-5">
						<v-col sm="6" cols="12">
							<label class="font-weight-bold" for="name">
								Name
								<span class="red--text">*</span>
							</label>
							<validation-provider name="Name" rules="required|min:3" v-slot="{ errors }">
								<v-text-field outlined solo dense label="Delivery Name" v-model="form.name" required></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>
						</v-col>
						<v-col sm="6" cols="12">
							<label class="font-weight-bold" for="email">
								Email
								<span class="red--text">*</span>
							</label>
							<validation-provider name="Email" rules="required|email" v-slot="{ errors }">
								<v-text-field outlined solo dense label="Email" v-model="form.email" required></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>
						</v-col>
						<v-col sm="6" cols="12">
							<label class="font-weight-bold" for="phone">
								Phone Number
								<span class="red--text">*</span>
							</label>
							<validation-provider name="Phone Number" rules="required" v-slot="{ errors }">
								<v-text-field outlined solo dense label="Phone Number" v-model="form.phone" required></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>
						</v-col>
						<v-col sm="6" cols="12">
							<label class="font-weight-bold" for="address">Address</label>
							<v-text-field outlined solo dense label="Address" v-model="form.address"></v-text-field>
						</v-col>
					</v-row>
					<v-btn class="mx-5 mb-5 mt-2" @click="create" color="primary" v-permission="'add users'">
						<v-icon left>mdi-check</v-icon>Submit
					</v-btn>
				</div>
			</v-card>
		</ValidationObserver>
	</v-container>
</template>

<script>
	export default {
		name: "AddDeliveryMan",
		created() {},

		data() {
			return {
				form: {}
			};
		},
		methods: {
			create() {
				this.$axios
					.$post(`api/delivery-man`, this.form)
					.then(res => {
						this.$router.push(`/delivery-man/list`);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			}
		}
	};
</script>

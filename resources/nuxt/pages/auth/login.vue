<template>
	<v-app id="inspire">
		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="4">
						<v-card class="elevation-12">
							<v-toolbar color="primary" dark flat>
								<v-toolbar-title>Login form</v-toolbar-title>
								<v-spacer />
							</v-toolbar>
							<v-card-text>
								<v-form @submit="login()">
									<v-text-field
										label="Login"
										v-model="auth.username"
										prepend-icon="mdi-account"
										type="text"
									/>

									<v-text-field
										id="password"
										label="Password"
										v-model="auth.password"
										prepend-icon="mdi-lock"
										type="password"
									/>
								</v-form>
							</v-card-text>
							<v-divider></v-divider>
							<v-card-actions>
								<v-spacer />
								<v-btn color="primary" @click="login()" :loading="loading">
									<v-icon left>mdi-login</v-icon>Login
								</v-btn>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
	import { async } from "q";
	export default {
		layout: "auth",
		data() {
			return {
				loading: false,
				auth: {
					username: "administrator@mail.com",
					password: "secret"
				}
			};
		},

		methods: {
			async login() {
				this.loading = true;
				try {
					await this.$auth
						.loginWith("password_grant", {
							data: {
								grant_type: "password",
								client_id: process.env.PASSPORT_PASSWORD_GRANT_ID,
								client_secret:
									process.env.PASSPORT_PASSWORD_GRANT_SECRET,
								scope: "*",
								username: this.auth.username,
								password: this.auth.password
							}
						})
						.then(async () => {
							const { data: permissions } = await this.$axios.get(
								"/api/auth/permissions"
							);
							const { data: roles } = await this.$axios.get(
								"/api/auth/roles"
							);

							this.$laravel.setPermissions(permissions);
							this.$laravel.setRoles(roles);
							this.loading = false;

							// console.log(roles)
						});
				} catch (e) {
					this.loading = false;
					this.$toast.error(e.message);
				}
			}
		}
	};
</script>
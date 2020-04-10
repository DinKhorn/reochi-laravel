<template>
	<v-app>
		<v-app-bar color="green darken-3" app fixed clipped dense dark>
			<v-app-bar-nav-icon @click.stop="toggle = !toggle"></v-app-bar-nav-icon>
			<v-toolbar-title>REOCHI</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<!-- <nuxt-link v-permission="'pos'" style="color: #fff" class="posLink" to="/sale/pos/create">
					<v-btn text dark class="posLink--title">
						<v-icon left>mdi-cart</v-icon>POS
					</v-btn>
				</nuxt-link>-->

				<v-btn text dark>
					<a href="/user/profile" class="nuxt--link">{{ user.user ? user.user.name : null }}</a>
				</v-btn>
				<v-btn text dark @click="logout()">
					<v-icon>mdi-logout</v-icon>
				</v-btn>

				<!-- <v-list-group>
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title>{{ user.user ? user.user.name : null }}</v-list-item-title>
						</v-list-item-content>
					</template>
					<v-list-item style="background-color:white;">
						<v-list-item-content>
							<v-list-item-title class="red--text">Profile</v-list-item-title>
						</v-list-item-content>
						<v-list-item-content>
							<v-list-item-title>
								<v-btn text dark @click="logout()">
									<v-icon class="red--text">mdi-logout</v-icon>
								</v-btn>
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-group>-->
			</v-toolbar-items>
		</v-app-bar>

		<v-navigation-drawer app clipped-left class="color" dense v-model="toggle">
			<v-list-item class="text-center font-weight-bold">
				<v-list-item-content style="padding:0px;">
					<v-img :src="require('@/assets/img/logo2.png')" height="48" />
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list dense rounded>
				<div v-for="(item, i) in menus" :key="i" router exact>
					<div v-if="$laravel.hasPermission(item.permission)">
						<template v-if="!item.children">
							<v-list-item :key="i" :to="item.to">
								<v-list-item-content>
									<v-list-item-title>
										<v-icon left>{{ item.icon }}</v-icon>
										{{ item.name }}
									</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</template>
						<template v-else>
							<v-list-group :key="i.name" :value="false">
								<template v-slot:activator>
									<v-list-item-content>
										<v-list-item-title>
											<v-icon left>{{ item.icon }}</v-icon>
											{{ item.name }}
										</v-list-item-title>
									</v-list-item-content>
								</template>
								<template v-for="(subMenu, i) in item.children">
									<v-list-item :to="subMenu.to" :key="i" exact class="subMenu">
										<v-list-item-content>
											<v-list-item-title>
												<v-icon left>{{ subMenu.icon }}</v-icon>
												{{ subMenu.name }}
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</template>
							</v-list-group>
						</template>
					</div>
				</div>
			</v-list>
		</v-navigation-drawer>

		<v-content>
			<nuxt />
		</v-content>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			toggle: true,
			menus: [
				{
					name: "Dashboard",
					icon: "mdi-view-dashboard",
					to: "/",
					permission: "view dashboard"
				},
				{
					name: "User Management",
					to: "/user/user-list",
					icon: "mdi-account-group",
					permission: "view users",
					children: [
						{
							name: "User",
							to: "/user/user-list",
							icon: "mdi-account",
							permission: "view users"
						},
						{
							name: "Salesman",
							to: "/salesman/list",
							icon: "mdi-account-tie",
							permission: "view salesman"
						},

						// {
						// 	name: "Delivery Man",
						// 	to: "/delivery-man/list",
						// 	icon: "mdi-account-multiple",
						// 	permission: "view supplier"
						// },
						{
							name: "Role",
							icon: "mdi-account-cog",
							to: "/role/role-list",
							permission: "view role"
						}
					]
				},
				{
					name: "Outlet",
					to: "/outlet",
					icon: "mdi-storefront",
					permission: "view outlet"
					// children: [
					// 	{
					// 		name: "Outlet List",
					// 		to: "/outlet/outlet-list",
					// 		icon: "mdi-view-list",
					// 		permission: "view outlet"
					// 	},
					// 	{
					// 		name: "Add Outlet",
					// 		to: "/outlet/add-outlet",
					// 		icon: "mdi-plus-circle",
					// 		permission: "add outlet"
					// 	}
					// ]
				},
				{
					name: "Product",
					to: "/product/product-list",
					icon: "mdi-cube",
					permission: "view product",
					children: [
						{
							name: "Product List",
							to: "/product/product-list",
							icon: "mdi-view-list",
							permission: "view product"
						},
						// {
						// 	name: "Add Product",
						// 	to: "/product/add-product",
						// 	icon: "mdi-plus-circle",
						// 	permission: "add product"
						// },
						{
							name: "Product Category",
							to: "/product/category/",
							icon: "mdi-apps",
							permission: "view category"
						}
						// {
						// 	name: "Add Category",
						// 	to: "/product/category/add_category",
						// 	icon: "mdi-plus-circle",
						// 	permission: "view product"
						// }
					]
				},

				{
					name: "Order",
					to: "/order/order-list",
					icon: "mdi-cart-arrow-down",
					permission: "view order"
				},
				{
					name: "Stock Management",
					// to: "/stock-in/list",
					icon: "mdi-clipboard-arrow-down-outline",
					permission: "view stock-in",
					children: [
						{
							name: "Stock In",
							to: "/stock-in/list",
							icon: "mdi-clipboard-arrow-down-outline",
							permission: "view stock-in"
						},
						{
							name: "Stock-out",
							to: "/stock-out/list",
							icon: "mdi-clipboard-arrow-up-outline",
							permission: "view stock-out"
							
						}
					]
				},

				{
					name: "Transfer",
					to: "/transfer/transfers",
					icon: "mdi-transfer-right",
					permission: "view transfer"
					
				},
				{
					name: " Seller Location",
					to: "/location/",
					icon: "mdi-google-maps",
					permission: "view location"
					
				},
				{
					name: "Reward",
					icon: "mdi-gift",
					to: "/reward",
					permission: "view reward"
				},
				{
					name: "Supplier",
					to: "/supplier/",
					icon: "mdi-account-multiple",
					permission: "view supplier"
				},
				{
					name: "System Settings",
					icon: "mdi-cogs",
					to: "/setting/system-settings",
					permission: "view setting"
				}
			]
		};
	},

	methods: {
		logout() {
			this.$auth.logout();
		}
	},

	computed: {
		user() {
			return this.$store.state.auth ? this.$store.state.auth.user : {};
		}
	},

	// async created() {
	// 	const { data: permissions } = await this.$axios.get(
	// 		"/api/auth/permissions"
	// 	);
	// 	const { data: roles } = await this.$axios.get("/api/auth/roles");

	// 	this.$laravel.setPermissions(permissions);
	// 	this.$laravel.setRoles(roles);
	// 	console.log(roles, permissions);
	// }

	created() {
		if (this.user.role[0] === "superAdmin") {
			this.$laravel.setPermissions([
				"view administrator",
				"add administrator",
				"edit administrator",
				"delete administrator",
				"view reward",
				"add reward",
				"edit reward",
				"delete reward",
				"view dashboard",
				"view users",
				"add users",
				"edit users",
				"delete users",
				"view product",
				"add product",
				"edit product",
				"delete product",
				"import product",
				"view transfer",
				"add transfer",
				"edit transfer",
				"view supplier",
				"add supplier",
				"edit supplier",
				"delete supplier",
				"import supplier",
				"view saleman",
				"add saleman",
				"import saleman",
				"edit saleman",
				"delete saleman",
				"view stock-in",
				"add stock-in",
				"edit stock-in",
				"delete stock-in",
				"view stock-out",
				"add stock-out",
				"edit stock-out",
				"delete stock-out",
				"view order",
				"add order",
				"edit order",
				"delete order",
				"view location",
				"add location",
				"edit location",
				"delete location",
				"import location",
				"view role",
				"add role",
				"edit role",
				"delete role",
				"import role",
				"view setting",
				"add setting",
				"edit setting",
				"delete setting",
				"view outlet",
				"add outlet",
				"edit outlet",
				"delete outlet",
				"import outlet",
				"view finance",
				"add finance",
				"edit finance",
				"delete finance",
				"view salemanager",
				"add salemanager",
				"edit salemanager",
				"delete salemanager",
				"view salesupervisor",
				"add salesupervisor",
				"edit salesupervisor",
				"delete salesupervisor"
			]);
		}
		if (this.user.role[0] === "administrator") {
			this.$laravel.setPermissions([
				"view dashboard",
				"view users",
				"add users",
				"edit users",
				"delete users",
				"view saleman",
				"add saleman",
				"import saleman",
				"edit saleman",
				"delete saleman",
				"view product",
				"add product",
				"edit product",
				"delete product",
				"import product",
				"view location",
				"add location",
				"edit location",
				"delete location",
				"import location",
				"view outlet",
				"add outlet",
				"edit outlet",
				"delete outlet",
				"import outlet",
				"view order",
				"add order",
				"edit order",
				"delete order",
				"view transfer",
				"add transfer",
				"edit transfer",
				"view role",
				"add role",
				"edit role",
				"delete role",
				"view stock-in",
				"add stock-in",
				"edit stock-in",
				"delete stock-in",
				"view stock-out",
				"add stock-out",
				"edit stock-out",
				"delete stock-out",
				"view reward",
				"add reward",
				"edit reward",
				"delete reward",
				"view setting",
				"add setting",
				"edit setting",
				"delete setting",
				"view supplier",
				"add supplier",
				"edit supplier",
				"delete supplier",
				"import supplier",
				"view finance",
				"add finance",
				"edit finance",
				"delete finance",
				"view salemanager",
				"add salemanager",
				"edit salemanager",
				"delete salemanager",
				"view salesupervisor",
				"add salesupervisor",
				"edit salesupervisor",
				"delete salesupervisor"
			]);
		}

		if (this.user.role[0] === "saleman") {
			this.$laravel.setPermissions([
				"view dashboard",
				"view saleman",
				"add saleman",
				"edit saleman",
				"delete saleman",
				"import saleman",
				"view outlet",
				"add outlet",
				"edit outlet",
				"delete outlet",
				"import outlet",
				"view order",
				"add order",
				"edit order",
				"delete order",
				"view product",
				"add product",
				"edit product",
				"delete product",
				"import product"
			]);
		}

		if (this.user.role[0] === "finance") {
			this.$laravel.setPermissions([
				"view stock-in",
				"add stock-in",
				"edit stock-in",
				"delete stock-in",
				"view stock-out",
				"add stock-out",
				"edit stock-out",
				"delete stock-out",
				"view order",
				"add order",
				"edit order",
				"delete order",
				"view product",
				"add product",
				"edit product",
				"delete product",
				"import product"
			]);
		}

		if (this.user.role[0] === "stockmanager") {
			this.$laravel.setPermissions([
				"view dashboard",
				"view stock-in",
				"add stock-in",
				"edit stock-in",
				"delete stock-in",
				"view stock-out",
				"add stock-out",
				"edit stock-out",
				"delete stock-out",
				"view product",
				"add product",
				"edit product",
				"delete product",
				"import product"
			]);
		}
		if (this.user.role[0] === "salemanager") {
			this.$laravel.setPermissions([
				"view stock-in",
				"add stock-in",
				"edit stock-in",
				"delete stock-in",
				"view stock-out",
				"add stock-out",
				"edit stock-out",
				"delete stock-out",
				"view order",
				"add order",
				"edit order",
				"delete order",
				"view product",
				"add product",
				"edit product",
				"delete product",
				"import product"
			]);
		}
		if (this.user.role[0] === "salesupervisor") {
			this.$laravel.setPermissions([
				"view order",
				"add order",
				"edit order",
				"delete order",
				"view product",
				"add product",
				"edit product",
				"delete product",
				"import product"
			]);
		}
	}
};
</script>


<style lang="scss">
.color {
	background: #34495e;
	&--item {
		background: #455a64;
	}
}

.subMenu {
	padding-left: 2em;
}

.posLink {
	display: block;
	text-decoration: none;
	padding-top: 7px;
}
.nuxt--link {
	display: block;
	text-decoration: none;
	color: #fff !important;
}
</style>
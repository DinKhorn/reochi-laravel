<template>
	<v-app class="mx-5 my-5">
		<div class="pb-5" v-permission="'add location'">
			<nuxt-link to="/location/create">
				<v-btn color="primary">
					<v-icon left>mdi-plus-circle</v-icon>Add Branch
				</v-btn>
			</nuxt-link>
		</div>
		<v-card>
			<v-data-table :headers="headers" :items="items">
				<template v-slot:item="{ item }">
					<tr>
						<td>{{ item.name }}</td>
						<td>{{ item.address }}</td>
						<td>{{ item.city }}</td>
						<td>{{ item.country }}</td>
						<td>{{ item.description }}</td>
						<td>
							<v-tooltip bottom v-permission="'edit location'">
								<template v-slot:activator="{ on }">
									<v-btn @click="editItem(item.id)" small outlined color="primary" icon v-on="on">
										<v-icon small>mdi-pencil</v-icon>
									</v-btn>
								</template>
								<span>Edit Location</span>
							</v-tooltip>
							<v-tooltip bottom v-permission="'delete location'">
								<template v-slot:activator="{ on }">
									<v-btn @click="deleteItem(item.id)" small outlined color="red" icon v-on="on">
										<v-icon small>mdi-delete</v-icon>
									</v-btn>
								</template>
								<span>Edit Location</span>
							</v-tooltip>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		created() {
			this.fetchData();
		},

		data() {
			return {
				items: [],
				headers: [
					{ text: "Name" },
					{ text: "Address" },
					{ text: "City" },
					{ text: "Country" },
					{ text: "Note" },
					{ text: "Action" }
				]
			};
		},

		methods: {
			fetchData() {
				this.$axios
					.$get(`api/location`)
					.then(res => {
						this.items = res.locations.data;
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			editItem(id) {
				this.$router.push(`/location/${id}/edit`);
			},

			deleteItem(id) {
				if (confirm("Are u sure to delete it?")) {
					this.$axios
						.$delete(`api/location/` + id)
						.then(res => {
							this.fetchData();
							this.$toast.success("Deleted Successfully");
						})
						.catch(err => {
							console.log(err.response);
						});
				}
			}
		}
	};
</script>
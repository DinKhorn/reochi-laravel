<template>
	<v-app class="mx-5 my-5">
		<div class="pb-5" v-permission="'add reward'">
			<nuxt-link to="/reward/create">
				<v-btn color="primary">
					<v-icon left>mdi-plus-circle</v-icon>Add reward
				</v-btn>
			</nuxt-link>
		</div>
		<v-card>
			<v-data-table :headers="headers" :items="items">
				<template v-slot:item="{ item }">
					<tr>
						<td>{{ item.code }}</td>
						<td>{{ item.reward }}</td>
						<td>{{ item.description }}</td>
						<td>{{ item.status }}</td>
						<td>{{ item.exchnaged }}</td>
						<td>
							<v-tooltip bottom v-permission="'edit reward'">
								<template v-slot:activator="{ on }">
									<v-btn @click="editItem(item.id)" small outlined color="primary" icon v-on="on">
										<v-icon small>mdi-pencil</v-icon>
									</v-btn>
								</template>
								<span>Edit reward</span>
							</v-tooltip>
							<v-tooltip bottom v-permission="'delete reward'">
								<template v-slot:activator="{ on }">
									<v-btn @click="deleteItem(item.id)" small outlined color="red" icon v-on="on">
										<v-icon small>mdi-delete</v-icon>
									</v-btn>
								</template>
								<span>Edit reward</span>
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
				{ text: "Code" },
				{ text: "Reward" },
				{ text: "Description" },
				{ text: "Status" },
				{ text: "Exchnaged" },
				{ text: "Created At", value: "created_at" },
				{ text: "Action" }
			]
		};
	},

	methods: {
		fetchData() {
			this.$axios
				.$get(`api/reward`)
				.then(res => {
					this.items = res.data;
					console.log(res);
				})
				.catch(err => {
					console.log(err.response);
				});
		},

		editItem(id) {
			this.$router.push(`/reward/${id}/edit`);
		},

		deleteItem(id) {
			if (confirm("Are u sure to delete it?")) {
				this.$axios
					.$delete(`api/reward/` + id)
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
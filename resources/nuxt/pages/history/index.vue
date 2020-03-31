<template>
	<v-container>
		<v-card>
			<div class="d-flex align-center justify-space-between">
				<v-card-title class="display-1">History Log</v-card-title>
				<input
					type="text"
					class="history-search"
					placeholder="Search"
					v-model="search"
				>
			</div>
			<v-divider></v-divider>
			<v-data-table
				:headers="headers"
				:items="activities"
			>
				<template v-slot:item="{ item }">
					<!-- For Product history -->
					<tr v-if="item.subject_type === 'App\\Product'">
						<td>{{ getMoment(item.created_at) }}</td>
						<td>
							{{ item.properties.attributes.type }}
							<span class="font-weight-medium">"{{item.properties.attributes.name }}"</span>
							was {{ item.description }}
						</td>
						<td> {{ item.properties.attributes.user_name }} </td>
					</tr>

					<!-- For Sale history -->
					<tr v-if="item.subject_type === 'App\\Sale'">
						<td>{{ getMoment(item.created_at) }}</td>
						<td>
							{{ item.description }}
						</td>
						<td> {{ item.properties.attributes.user_name }} </td>
					</tr>

				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script>
	import moment from "moment";
	export default {
		name: "HistoryLog",
		data() {
			return {
				activities: [],
				search: "",
				headers: [
					{ text: "Time", sortable: false },
					{ text: "Description", sortable: false },
					{ text: "User", sortable: false }
				]
			};
		},

		created() {
			this.getActivities();

			this.getMoment();
		},

		watch: {
			search: {
				handler() {
					this.getActivities();
				}
			},

			immediate: true
		},

		methods: {
			getMoment(date) {
				return moment(date).fromNow();
			},

			getActivities() {
				this.$axios
					.$get(`api/activity?search=${this.search}`)
					.then(res => {
						this.$set(this.$data, "activities", res.activities.data);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			}
		}
	};
</script>

<style lang="scss">
	.historyTable {
		width: 100%;
		text-align: left;
		border-collapse: collapse;

		&--tr {
			border-bottom: 1px solid rgba(0, 0, 0, 0.125);
		}
	}

	.history-search {
		padding: 7px 10px 7px 10px;
		width: 50%;
		margin-right: 10px;
		border: 1px solid #92de28;
		outline: none;
		border-radius: 5px;
	}
</style>
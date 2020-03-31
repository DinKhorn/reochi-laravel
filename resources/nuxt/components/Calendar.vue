<template>
	<div>
		<v-dialog
			v-model="dialog"
			width="500"
			persistent
		>
			<template v-slot:activator="{ on }">
				<v-btn
					color="primary"
					dark
					v-on="on"
				>
					New Event
				</v-btn>
			</template>

			<v-card>
				<v-card-title
					class="headline grey lighten-2"
					primary-title
				>
					Add New Event
				</v-card-title>

				<v-card-text>
					<ValidationObserver ref="form">
						<form>
							<validation-provider
								rules="required"
								v-slot="{ errors }"
								name="Event Name"
							>
								<v-text-field
									type="text"
									label="Event Name"
									v-model="form.title"
								></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>

							<v-text-field
								type="text"
								label="Detail"
								v-model="form.description"
							></v-text-field>

							<validation-provider
								name="Start Date"
								rules="required"
								v-slot="{ errors }"
							>
								<v-text-field
									type="date"
									label="Start"
									v-model="form.start"
								></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>

							<validation-provider
								name="End Date"
								rules="required"
								v-slot="{ errors }"
							>
								<v-text-field
									type="date"
									label="End"
									v-model="form.end"
								></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>

							<validation-provider
								rules="required"
								v-slot="{ errors }"
								name="Color"
							>
								<v-text-field
									type="color"
									label="Color"
									v-model="form.color"
								></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>
						</form>
					</ValidationObserver>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>

					<!-- Add Event -->
					<v-btn
						outlined
						color="primary"
						text
						@click="createCalendar"
						v-if="updateMode === false"
					>
						Save
					</v-btn>

					<!-- Update Event-->
					<v-btn
						outlined
						color="primary"
						text
						@click="updateEvent"
						v-if="updateMode === true"
					>
						<v-icon>mdi-calendar-check</v-icon>Update
					</v-btn>

					<!-- Delete Event -->
					<v-btn
						outlined
						color="red"
						text
						@click="deleteEvent"
						v-if="updateMode === true"
					>
						<v-icon>mdi-delete</v-icon> Delete
					</v-btn>

					<!-- Cancel -->
					<v-btn
						color="red"
						text
						@click="closeDialog"
					>
						<v-icon>mdi-cancel</v-icon> Cancel
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<FullCalendar
			@eventClick="showEvent"
			defaultView="dayGridMonth"
			:plugins="calendarPlugins"
			:events="events"
			@select="selectEvent"
			:header="{
				left: 'prev,next',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
			}"
			:selectable="true"
			ref="fullCalendar"
			:droppable="updateEvent"
			:editable="true"
		/>
	</div>
</template>

<script>
	import { Calendar, compareByFieldSpecs } from "@fullcalendar/core";
	import FullCalendar from "@fullcalendar/vue";
	import dayGridPlugin from "@fullcalendar/daygrid";
	import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

	export default {
		name: "Calendar",
		components: {
			FullCalendar // make the <FullCalendar> tag available
		},

		created() {
			this.fetchCalendar();
		},

		data() {
			return {
				calendarPlugins: [dayGridPlugin, interactionPlugin],
				events: [],
				form: {
					color: "#34eb6e"
				},
				dialog: false,
				getColor: "#34eb6e",
				updateMode: false
			};
		},
		methods: {
			selectEvent(arg) {
				this.updateMode = false;
				const start = new Date(arg.start).toISOString().substr(0, 10);
				const end = new Date(arg.end).toISOString().substr(0, 10);
				this.form = Object.assign({}, { start, end });
				this.dialog = true;
				console.log(arg);
			},

			showEvent(arg) {
				this.updateMode = true;
				const { title, start, end, color } = this.events.find(
					event => event.id === +arg.event.id
				);
				this.form = Object.assign({}, { title, start, end, color });
				this.form.id = arg.event.id;
				this.dialog = true;
			},

			updateEvent() {
				this.$axios
					.$patch(`api/calendar/` + this.form.id, {
						title: this.form.title,
						start: this.form.start,
						end: this.form.end,
						color: this.form.color
					})
					.then(res => {
						this.updateMode = true;
						this.fetchCalendar();
						this.closeDialog();
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			closeDialog() {
				this.dialog = false;
				this.updateMode = false;
				this.form = {
					color: "#3788d8"
				};
			},

			fetchCalendar() {
				this.$axios
					.$get(`api/calendar`)
					.then(res => {
						this.$set(this.$data, "events", res.calendars);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			createCalendar() {
				this.$axios
					.$post(`api/calendar`, {
						title: this.form.title,
						start: this.form.start,
						end: this.form.end,
						color: this.form.color
					})
					.then(res => {
						this.updateMode = false;
						this.fetchCalendar();
						this.closeDialog();
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
						this.$refs.form.validate(err.response.data.errors);
					});
			},

			deleteEvent() {
				if (confirm("Are u sure to delete it??")) {
					this.$axios
						.$delete(`api/calendar/` + this.form.id)
						.then(res => {
							this.fetchCalendar();
							this.closeDialog();
							console.log(res);
						})
						.catch(err => {
							console.log(err.response);
						});
				}
			}
		}
	};
</script>

<style lang="scss">
	@import "@fullcalendar/core/main.css";
	@import "@fullcalendar/daygrid/main.css";
	// @import "@fullcalendar/timegrid/main.css";

	.fc-content {
		color: #fff;
	}
</style>
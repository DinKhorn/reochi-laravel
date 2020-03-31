<template>
	<v-app>
		<div class="mx-5 my-5">
			<v-dialog v-model="dialog" max-width="600px" v-permission="'add sales'">
				<template v-slot:activator="{ on }">
					<v-btn dark v-on="on" class="purple darken-3">
						<v-icon left>mdi-plus-circle</v-icon>
						Add Gift
					</v-btn>
				</template>
				<v-card>
					<h3 class="py-3 px-5">Add Gift Certificate</h3>
					<v-divider></v-divider>
					<div class="px-5 py-5">
						<p class="font-caption font-italic">
							Field tags marked with * are required input fields.
						</p>
						<div>
							<label for="">No Card</label>
							<div class="d-flex">
								<v-text-field
									solo
									outlined
									dense
								></v-text-field>
								<v-btn>Generate</v-btn>
							</div>
						</div>
						<div>
							<label for="">Amount</label>
							<div class="d-flex">
								<v-text-field
									solo
									outlined
									dense
								></v-text-field>
							</div>
						</div>
						<div class="d-flex align-center">
							<label for="">User List</label>
							<v-checkbox v-model="selected"></v-checkbox>
						</div>
						<div>
							<label for="">Client*</label>
							<v-select
								solo
								outlined
								dense
								v-model="selected"
							></v-select>
						</div>
						<div v-if="selected">
							<label for="">From User*</label>
							<v-select
								solo
								outlined
								dense
								v-model="selected"
							></v-select>
						</div>
						<div>
							<label for="">Expired Date*</label>
							<v-menu
					          v-model="menu1"
					          :close-on-content-click="false"
					          max-width="290"
					        >
					          <template v-slot:activator="{ on }">
					            <v-text-field
					              :value="computedDateFormattedMomentjs"
					              clearable
					              readonly
					              v-on="on"
					              solo
					              outlined
					              dense
					              @click:clear="date = null"
					            ></v-text-field>
					          </template>
					          <v-date-picker
					            v-model="date"
					            @change="menu1 = false"
					          ></v-date-picker>
					        </v-menu>
						</div>
					</div>
				</v-card>
			</v-dialog>
			<div class="pt-5">
				<div class="d-flex pb-5 justify-space-between">
					<input type="text" placeholder="Search" class="gift_search">
					<div>
						<v-btn dark class="lime darken-3">Print</v-btn>
						<v-btn dark class="red darken-3">PDF</v-btn>
						<v-btn dark class="blue darken-3">CSV</v-btn>
					</div>
				</div>
				<v-data-table :headers="headers"></v-data-table>
			</div>

		</div>
	</v-app>
</template>

<script>
	import moment from 'moment';
	export default {
		name: 'Gift',
		data() {
			return {
				selected: false,
				dialog: false,
				menu1: false,
				date: new Date().toISOString().substr(0, 10),
				headers: [
					{ 
						text: 'Card No',
						sortable: false,
					},
					{ 
						text: 'Customer',
						sortable: false,
					},
					{ 
						text: 'Amount',
						sortable: false,
					},
					{ 
						text: 'Expense',
						sortable: false,
					},
					{ 
						text: 'Balance',
						sortable: false,
					},
					{ 
						text: 'Created By',
						sortable: false,
					},
					{ 
						text: 'Expired Date',
						sortable: false,
					},
					{ 
						text: 'Actions',
						sortable: false,
					},
				],
			}
		},
		computed: {
		    computedDateFormattedMomentjs () {
		        return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
		    },
		},
	}
</script>

<style>
	.gift_search {
		width: 50%;
		border: 1px solid #1bdeee;
		border-radius: 5px;
		padding: 0 10px 0 10px;
		outline: none;
	}
</style>
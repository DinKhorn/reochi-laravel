<template>
	<v-app class="px-5">
		<div class="text-center py-5">
			<h2 class="pb-5">Summary Report</h2>
			<div>
				<label for="" class="font-weight-bold">Select Date:</label>
				<client-only>
					<date-range-picker
			            ref="picker"
			            :locale-data="{ firstDay: 1, format: 'DD-MM-YYYY HH:mm:ss' }"
			            :opens="opens"
			            v-model="dateRange"
			    	>
				        <div slot="input" slot-scope="picker" style="min-width: 350px;">
				            {{ picker.startDate | date }} - {{ picker.endDate | date }}
				        </div>
				    </date-range-picker>
				</client-only>
			</div>
		</div>
		<v-row>
			<template v-for="(card, index) in cards">
				<v-col md="3" sm="6" cols="12">
					<v-card >
						<v-card-text class="px-5 blue lighten-1 grey--text text--lighten-4">
							<h3 >{{ card.header }}</h3>
						</v-card-text>
						<v-divider></v-divider>
						<div class="px-5" v-for="row in card.text">
							<div class="py-2 d-flex justify-space-between">
								<span>{{ row.name }}</span>
								<span>{{ row.price  }}</span>
							</div>
						</div>
					</v-card>
				</v-col>
			</template>
			<template v-for="(card, index) in profits">
				<v-col md="4" sm="6" cols="12">
					<v-card >
						<v-card-text class="px-5 red lighten-1 grey--text text--lighten-4">
							<h3>{{ card.header }}</h3>
						</v-card-text>
						<v-divider></v-divider>
						<div class="px-5" v-for="row in card.text">
							<div class="py-2 d-flex justify-space-between">
								<span>{{ row.name }}</span>
								<span>{{ row.price  }}</span>
							</div>
						</div>
					</v-card>
				</v-col>
			</template>
			<template v-for="(card, index) in payments">
				<v-col md="3" sm="6" cols="12">
					<v-card >
						<v-card-text class="px-5 purple lighten-1 grey--text text--lighten-4">
							<h3>{{ card.header }}</h3>
						</v-card-text>
						<v-divider></v-divider>
						<div class="px-5" v-for="row in card.text">
							<div class="py-2 d-flex justify-space-between">
								<span>{{ row.name }}</span>
								<span>{{ row.price  }}</span>
							</div>
						</div>
					</v-card>
				</v-col>
			</template>
		</v-row>
	</v-app>
</template>

<script>
	import moment from 'moment';
	export default {
		filters: {
            date (value) {
                let options = {year: 'numeric', month: 'long', day: 'numeric'};
                return Intl.DateTimeFormat('en-US', options).format(value);
            }
        },
		data() {
			return {
				cards: [
					{
						header: 'Purchase',
						text: [
						 	{ name: 'Amount', price: '200.22' },
						 	{ name: 'Purchase', price: '200.22' },
						 	{ name: 'Paid', price: '200.22' },
						 	{ name: 'Tax', price: '200.22' },
						],
					},
					{
						header: 'Sale',
						text: [
						 	{ name: 'Amount', price: '200.22' },
						 	{ name: 'Purchase', price: '200.22' },
						 	{ name: 'Paid', price: '200.22' },
						 	{ name: 'Tax', price: '200.22' },
						],
					},
					{
						header: 'Sale Return',
						text: [
						 	{ name: 'Amount', price: '200.22' },
						 	{ name: 'Purchase', price: '200.22' },
						 	{ name: 'Paid', price: '200.22' },
						 	{ name: 'Tax', price: '200.22' },
						],
					},
					{
						header: 'Purchase Return',
						text: [
						 	{ name: 'Amount', price: '200.22' },
						 	{ name: 'Purchase', price: '200.22' },
						 	{ name: 'Paid', price: '200.22' },
						 	{ name: 'Tax', price: '200.22' },
						],
					},
				],
				profits: [
					{
						header: 'Profit/Loss',
						text: [
						 	{ name: 'Amount', price: '200.22' },
						 	{ name: 'Purchase', price: '200.22' },
						 	{ name: 'Paid', price: '200.22' },
						],
					},
					{
						header: 'Profit/Loss',
						text: [
						 	{ name: 'Amount', price: '200.22' },
						 	{ name: 'Purchase', price: '200.22' },
						 	{ name: 'Sale Return', price: '200.22' },
						 	{ name: 'Purchase Return', price: '200.22' },
						],
					},
					{
						header: 'Net Profit/Net Loss',
						text: [
						 	{ name: 'Amount', price: '200.22' },
						 	{ name: 'Purchase', price: '200.22' },
						 	{ name: 'Sale Return', price: '200.22' },
						 	{ name: 'Purchase Return', price: '200.22' },
						],
					},
				],
				payments: [
					{
						header: 'Payment Recieved',
						text: [
						 	{ name: 'Amount', price: '200.22' },
						 	{ name: 'Purchase', price: '200.22' },
						 	{ name: 'Paid', price: '200.22' },
						],
					},
					{
						header: 'Payment Sent',
						text: [
						 	{ name: 'Amount', price: '200.22' },
						 	{ name: 'Purchase', price: '200.22' },
						 	{ name: 'Sale Return', price: '200.22' },
						 	{ name: 'Purchase Return', price: '200.22' },
						],
					},
					{
						header: 'Expense',
						text: [
						 	{ name: 'Amount', price: '200.22' },
						 	{ name: 'Purchase', price: '200.22' },
						 	{ name: 'Sale Return', price: '200.22' },
						 	{ name: 'Purchase Return', price: '200.22' },
						],
					},
					{
						header: 'PayRoll',
						text: [
						 	{ name: 'Amount', price: '200.22' },
						 	{ name: 'Purchase', price: '200.22' },
						 	{ name: 'Sale Return', price: '200.22' },
						 	{ name: 'Purchase Return', price: '200.22' },
						],
					},
				],

				dateRange: {
                    startDate: '2017-09-05',
                    endDate: '2019-09-15',
                },
                locale: {
                    direction: 'ltr', //direction of text
                    format: 'DD-MM-YYYY', //fomart of the dates displayed
                    separator: ' - ', //separator between the two ranges
                    applyLabel: 'Apply',
                    cancelLabel: 'Cancel',
                    weekLabel: 'W',
                    customRangeLabel: 'Custom Range',
                    daysOfWeek: moment.weekdaysMin(), //array of days - see moment documenations for details
                    monthNames: moment.monthsShort(), //array of month names - see moment documenations for details
                    firstDay: 1 //ISO first day of week - see moment documenations for details
                },
                startDate: '2017-09-05',
                endDate: '2019-09-15',
                opens: 'center',
			}
		}
	}
</script>


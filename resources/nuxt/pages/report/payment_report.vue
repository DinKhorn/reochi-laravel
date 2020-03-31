<template>
	<v-app>
		<v-card class="my-5 mx-5">
			<div class="text-center">
				<h2>Sale Report</h2>
				<v-divider></v-divider>
				<div class="mt-5 ">
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
			<div class="my-5 mx-5">
				<div class="d-flex justify-space-between">
					<div>
						<v-text-field 
							solo
							outlined
							dense
							label="Search"
						></v-text-field>
					</div>
					<div>
						<v-btn class="red lighten-1" dark>PDF</v-btn>
						<v-btn class="lime lighten-1" dark>CSV</v-btn>
						<v-btn class="blue lighten-1" dark>Print</v-btn>
					</div>
				</div>
				<v-data-table :headers="headers"></v-data-table>
			</div>
		</v-card>
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
                headers: [
                	{
                		text: 'Date',
                		sortable: false,
                	},
                	{
                		text: 'Payment Reference',
                		sortable: false,
                	},
                	{
                		text: 'Sale Reference',
                		sortable: false,
                	},
                	{
                		text: 'Purchase Reference',
                		sortable: false,
                	},
                	{
                		text: 'Paid By',
                		sortable: false,
                	},
                	{
                		text: 'Amount',
                		sortable: false,
                	},
                	{
                		text: 'Created By',
                		sortable: false,
                	},
                ],
			}
		}
	}
</script>
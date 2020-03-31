<template>
	<v-app>
		<v-card class="my-5 mx-5">
			<div class="text-center">
				<h2>Warehouse Report</h2>
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
			<div class="px-5">
					<v-tabs fixed-tab class="mb-5 mt-3 tabs">
						<template v-for="(item, index) in items">
							<v-tab :to="item.to">{{ item.name }}</v-tab>				
						</template>
					</v-tabs>
				<nuxt-child></nuxt-child>
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
                
                items: [
                	{
                		name: 'Sale',
                		to: '/report/warehouse_report/',
                	},
                	{
                		name: 'Purchase',
                		to: '/report/warehouse_report/purchase',
                	},
                	{
                		name: 'Quotation',
                		to: '/report/warehouse_report/quotation',
                	},
                	{
                		name: 'Return',
                		to: '/report/warehouse_report/return',
                	},
                	{
                		name: 'Expense',
                		to: '/report/warehouse_report/expense',
                	},
                ],

			}
		}
	}
</script>

<style>
    .tabs {
        border-bottom: 1px solid rgba(0,0,0,0.125);
    }
</style>
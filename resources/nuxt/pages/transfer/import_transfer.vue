<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="py-3 px-5">
				<h3>
					Add Transfer
				</h3>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<v-row>
					<v-col md="4" cols="12">
						<label class="font-weight-bold">From Warehouse *</label>
						<v-select
							solo
							outlined
							dense
							label="Select Warehouse"
						>
						</v-select>
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold">To Warehouse *</label>
						<v-select
							solo
							outlined
							dense
							label="Select Warehouse"
						>
						</v-select>
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold">Status</label>
						<v-select
							solo
							outlined
							dense
							label="Please Select"
						>
						</v-select>
					</v-col>
				</v-row>
				<v-row>
					<v-col md="6" cols="12"  class="d-flex flex-column">
						<label for="" class="font-weight-bold pt-1">Upload CSV</label>
						<input type="file" @change="uploadFile($event)" class="quotationCsv">
					</v-col>
					<v-col md="6" cols="12">
						<v-btn class="mt-7 teal darken-1" dark>
							<v-icon>mdi-download</v-icon>
							Download Sample File
						</v-btn>
					</v-col>
					</v-col>
					<v-col md="6" cols="12">
						<label for="" class="font-weight-bold">Shipping Cost</label>
						<v-text-field
							solo
							outlined
							dense
						></v-text-field>
					</v-col>
					<v-col md="6" cols="12" class="d-flex flex-column">
						<label for="" class="font-weight-bold">Attach Document</label>
						<input type="file" @change="imageUpload($event)" class="quotationCsv">
					</v-col>
				</v-row>
				<div class="d-flex flex-column mb-5">
					<label for="">Note</label>
					<textarea cols="30" rows="10" class="textarea"></textarea>
				</div>
			</div>
			<v-btn class="blue mx-5 darken-2 mb-5" dark v-permission="'add transfer'">
				<v-icon>mdi-check</v-icon>
				Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				headers: [
					{
						text: 'Name',
						sortable: false,
					},
					{
						text: 'Code',
						sortable: false,
					},
					{
						text: 'Quantity',
						sortable: false,
					},
					{
						text: 'Net Unit Cost',
						sortable: false,
					},,
					{
						text: 'Tax',
						sortable: false,
					},
					{
						text: 'SubTotal',
						sortable: false,
					},
					{
						text: 'Action',
						sortable: false,
					},
				],
				purchase_status: ['Received', 'Partial', 'Pending', 'Ordered'],
			}
		},
		methods: {
			uploadFile(event) {
				const url = 'http://127.0.0.1:3000/transfer/import_transfer';
				let data = new FormData();
				data.append('file', event.target.files[0]);
				let config = {
					header: {
						'content-Type' : 'text/csv'
					}
				}

				this.$axios.$post(url,data,config)
				.then(res => {
					console.log(res);
				})
			},

			imageUpload(event) {
				const url = 'http://127.0.0.1:3000/transfer/import_transfer';
				let data = new FormData();
				data.append('file', event.target.files[0]);
				let config = {
					header: {
						'content-Type' : 'image/*'
					}
				}

				this.$axios.$post(url,data,config)
				.then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss">

	.textarea {
		border: 1px solid rgba(0,0,0,0.125);
		outline: 1px solid #461577;
	}
	
	.quotationCsv {
		border: 1px solid rgba(0,0,0,0.300);
		padding: 3px 0px 3px 10px;
	}

</style>
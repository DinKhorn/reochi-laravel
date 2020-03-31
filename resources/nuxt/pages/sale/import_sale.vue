<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="py-3 px-5">
				<h3>
					Print Barcode
				</h3>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<v-row>
					<v-col md="4" cols="12">
						<label class="font-weight-bold">Client*</label>
						<v-select
							solo
							outlined
							dense
							label="Select Customer"
						>
						</v-select>
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold">Warehouse*</label>
						<v-select
							solo
							outlined
							dense
							label="Select Warehouse"
						>
						</v-select>
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold">Biller*</label>
						<v-select
							solo
							outlined
							dense
							label="Select Biller"
						>
						</v-select>
					</v-col>
				</v-row>
				<v-row>
					<v-col md="4" sm="6" cols="12">
						<label class="font-weight-bold" for="">Order Tax</label>
						<v-select
							solo
							outlined
							dense
						></v-select>
					</v-col>
					<v-col md="4" sm="6" cols="12">
						<label class="font-weight-bold" for="">Order Discount</label>
						<v-text-field
							solo
							outlined
							dense
						></v-text-field>
					</v-col>
					<v-col md="4" sm="6" cols="12">
						<label class="font-weight-bold" for="">Shipping Cost</label>
						<v-text-field
							solo
							outlined
							dense
						></v-text-field>
					</v-col>
					<v-col md="4" sm="6" cols="12">
						<label class="font-weight-bold" for="">Sale Status*</label>
						<v-select
							solo
							outlined
							dense
						></v-select>
					</v-col>
					<v-col md="4" sm="6" cols="12">
						<label class="font-weight-bold" for="">Payment Status*</label>
						<v-select
							solo
							outlined
							dense
						></v-select>
					</v-col>
					<v-col md="6" cols="12">
						<div class="d-flex flex-column">
							<label class="font-weight-bold" for="">Upload CSV</label>
							<input type="file" @change="uploadCsv($event)">
						</div>
					</v-col>
					<v-col md="6" cols="12">
						<v-btn class="purple lighten-3 btn">Download Sample File</v-btn>
					</v-col>
					<v-col md="6" cols="12">
						<div class="d-flex flex-column">
							<label class="font-weight-bold" for="">Sale Note</label>
							<textarea cols="30" rows="10" class="textarea"></textarea>
						</div>
					</v-col>
					<v-col md="6" cols="12">
						<div class="d-flex flex-column">
							<label class="font-weight-bold" for="">Team Note</label>
							<textarea cols="30" rows="10" class="textarea"></textarea>
						</div>
					</v-col>
				</v-row>
			</div>
			<v-btn class="blue mx-5 lighten-2 mb-5 grey--text text--lighten-4">
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
						text: 'Net Unit Price',
						sortable: false,
					},
					{
						text: 'Discount',
						sortable: false,
					},
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
			}
		},
		methods: {
			uploadCsv(event) {
				const url = 'http://127.0.0.1:3000/product/add_adjustment';
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
		}
	}
</script>

<style lang="scss">
	.textarea {
		border: 1px solid rgba(0,0,0,0.125);
	}
	.btn {
		width: 100%;
	}
</style>
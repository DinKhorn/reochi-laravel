<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="py-3 px-5">
				<h3>
					Add Purchase
				</h3>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<v-row>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Warehouse *</label>
						<v-select
							solo
							outlined
							dense
							label="Please type, product code and select..."
						>
						</v-select>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Supplier</label>
						<v-select
							solo
							outlined
							dense
							label="Please type, product code and select..."
						>
						</v-select>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Purchase Status</label>
						<v-select
							solo
							outlined
							dense
							label="Received"
							:items="purchase_status"
						>
						</v-select>
					</v-col>
					<v-col md="6" cols="12" class="d-flex flex-column">
						<label for="" class="font-weight-bold pt-1">Attach Document</label>
						<input type="file" @change="uploadImage($event)">
					</v-col>
					<v-col md="6" cols="12" class="d-flex flex-column">
						<label for="" class="font-weight-bold pt-1">Upload CSV</label>
						<input type="file" @change="uploadFile($event)">
					</v-col>
					<v-col md="6" cols="12">
						<v-btn class="purple darken-1 mt-2" dark>
							<v-icon left>mdi-download</v-icon>
							Download sample File
						</v-btn>
					</v-col>
				</v-row>
				<v-row>
					<v-col md="4" cols="12">
						<label for="" class="font-weight-bold">Order Tax</label>
						<v-select
							solo 
							outlined
							dense
						></v-select>
					</v-col>
					<v-col md="4" cols="12">
						<label for="" class="font-weight-bold">Discount</label>
						<v-text-field
							solo 
							outlined
							dense
						></v-text-field>
					</v-col>
					<v-col md="4" cols="12">
						<label for="" class="font-weight-bold">Shipping Cost</label>
						<v-text-field
							solo 
							outlined
							dense
						></v-text-field>
					</v-col>
				</v-row>
				<div class="d-flex flex-column mb-5">
					<label for="">Note</label>
					<textarea cols="30" rows="10" class="textarea"></textarea>
				</div>
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
						text: 'Net Unit Cost',
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
				purchase_status: ['Received', 'Partial', 'Pending', 'Ordered'],
			}
		},
		methods: {
			uploadImage(event) {
				const url = 'http://127.0.0.1:3000/product/add_adjustment';
				let data = new FormData();
				data.append('file', event.target.files[0]);
				let config = {
					header: {
						'content-Type' : 'image/*, application/pdf'
					}
				}

				this.$axios.$post(url,data,config)
				.then(res => {
					console.log(res);
				})
			},
			uploadFile(event) {
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
		outline: 1px solid #461577;
	}

</style>
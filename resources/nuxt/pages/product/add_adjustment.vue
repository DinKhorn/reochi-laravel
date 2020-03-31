<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<h3 class="py-3 px-5">Add Adjustment</h3>
			<v-divider></v-divider>
			<v-row class="px-5">
				<v-col md="6" cols="12">
					<label for="" class="font-weight-bold">Warehouse</label>
					<v-select
						solo
						dense
						outlined
						:items="items"
					></v-select>
				</v-col>
				<v-col md="6" cols="12" class="d-flex flex-column">
					<label for="" class="font-weight-bold pt-1">Attach Document</label>
					<input type="file" @change="uploadFile($event)">
				</v-col>
			</v-row>
			<div class="d-flex flex-column px-5">
					<label class="font-weight-bold">Add Product *</label>
					<v-text-field
						solo
						outlined
						dense
						append-icon="mdi-barcode"
						label="Please type, product code and select..."
						class="input"
					>
					</v-text-field>
			</div>
			<div class="px-5">
				<div>
					<label for="" class="font-weight-bold">Order Table</label>
					<v-data-table
						:headers="headers"
					></v-data-table>
				</div>
				<div class="d-flex flex-column pb">
					<label for="">Note</label>
					<textarea  cols="30" rows="10" class="textarea"></textarea>
				</div>
				<v-btn color="blue lighten-2" class="mb-5 grey--text text--lighten-4">update</v-btn>
			</div>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				items: ['Warehouse1', 'Warehouse2'],
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
						text: 'Action',
						sortable: false,
					},
				]
			}
		},

		methods: {
			uploadFile(event) {
				const url = 'http://127.0.0.1:3000/product/add_adjustment';
				let data = new FormData();
				data.append('file', event.target.files[0]);
				let config = {
					header: {
						'content-Type' : 'text/csv, application/pdf'
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


<style>
	.textarea {
		border: 1px solid rgba(0,0,0,0.125);
		outline: 1px solid #572d82;
		margin-bottom: 20px;
	}
</style>
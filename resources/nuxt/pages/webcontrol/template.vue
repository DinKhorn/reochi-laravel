<template>
	<v-app class="mx-5 my-5">
		<h3 class="mb-3 headline font-weight-light">Email Template Settings</h3>
		<v-card>
			<v-card-title style="background-color: #32c5d2" class="font-weight-bold">
				<v-icon color="grey lighten-3">mdi-bookmark</v-icon>
				<span style="color: #fff">Short Code</span>
			</v-card-title>
			<v-divider></v-divider>
			<div class="px-5 py-5">
				<table class="table">
					<thead>
						<tr class="table--header">
							<th class="table--cell">#</th>
							<th class="table--cell">CODE</th>
							<th class="table--cell">DESCRIPTION</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(code, index) in codes" :key="index">
							<td class="table--cell">{{ code.id }}</td>
							<td class="table--cell">
								<pre class="table--pre">{{ code.code }}</pre>
							</td>
							<td class="table--cell">{{ code.description }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</v-card>

		<v-card class="mt-5">
			<v-card-title class="email-template">
				EMAIL AND SMS TEMPLATE
			</v-card-title>
			<v-divider></v-divider>
			<div class="px-5 py-5">
				<label for="" class="font-weight-bold">Email Sent Form:</label>
				<input type="text" class="form-control">
			</div>
			
			<div class="px-5 pb-5">
				<client-only>
					<vue-editor v-model="content"></vue-editor>
				</client-only>
			</div>
			<v-btn class="mx-5 mb-5" color="primary" v-permission="'view website'">
				<v-icon>mdi-check</v-icon>
				UPDate
			</v-btn>
		</v-card>
	</v-app>
</template>
<script>
export default {
	data() {
		return {
			codes: [{
					id: 1,
					code: "{{message}}",
					description: 'Details Text From Script',
				},
				{
					id: 2,
					code: "{{name}}",
					description: 'Users Name. Will Pull From Database and Use in EMAIL text',
				},
			],
			content: '<h3>Hi {{name}}</h3><br><p>{{message}}</p><br><p>Thanks</p><p>YiKoi</p>',
		}
	}
}

</script>
<style lang="scss">
.table {
	text-align: left;
	width: 100%;

	&--cell {
		border-bottom: 1px solid #64b5f6;
		padding-right: 10px;
		padding-left: 10px;
	}

	&--pre {
		padding-top: 5px;
		padding-bottom: 5px;
		padding-left: 5px;
		padding-right: 5px;
		border: 2px solid rgba(0,0,0,0.205);
		margin-bottom: 10px;
		margin-top: 7px;
		// margin-right: 10px;
		// margin-left: 10px;
		border-radius: 5px;
	}
}

.form-control {
	width: 100%;
	padding-right: 10px;
	padding-left: 10px;
	padding-bottom: 5px;
	padding-top: 5px;
	border: 1px solid rgba(0,0,0,0.125);
	border-radius: 5px;
	outline: none;
}

.email-template{
	font-weight: bold;
	color: #32c5d2;
}

</style>

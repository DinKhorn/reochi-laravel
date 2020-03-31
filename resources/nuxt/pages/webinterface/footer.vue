<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="header">
				<v-icon class="pb-1">mdi-post-outline</v-icon>
				FOOTER CONTENT
			</div>
			<v-divider></v-divider>
			<div class="px-10 py-5">
				<label for="footer" class="font-weight-bold">Footer</label>
				<input type="text" class="form-control" value="2019 © DESARROYADO POR SUMANDOTE">
			</div>
			<div class="px-10 py-5">
				<span class="font-weight-bold">Footer Content Link</span>
				<vue-editor v-model="content"></vue-editor>
			</div>
			<v-btn color="primary" dark class="mx-10 mb-5" v-permission="'view website'">
				<v-icon left>mdi-check</v-icon>
				Update
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				content: '<p>dddd</p>'
			}
		}
	}
</script>

<style>
	
	.header {
		padding: 10px 20px 10px 20px;
		font-weight: bold;
		background: #2add81;
	}

	.form-control {
		padding-right: 10px;
		padding-left: 10px;
		padding-top: 5px;
		padding-bottom: 5px;
		width: 100%;
		border: 1px solid rgba(0,0,0,0.125);
		outline: none;
		border-radius: 5px;
	}
</style>
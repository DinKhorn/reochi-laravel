<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<v-card-text class="term--header">
				<v-icon style="color: #fff">mdi-settings-transfer-outline</v-icon>
				<span style="color: #fff">Edit Terms & Policy Settings</span>
			</v-card-text>
			<v-divider></v-divider>
			<div class="px-5 pt-5 pb-3">
				<h4>Privacy Policy:</h4>
				<client-only>
					<vue-editor v-model="content"></vue-editor>
				</client-only>
			</div>
			<div class="px-5 py-5">
				<h4>Terms of Service:</h4>
				<client-only>
					<vue-editor v-model="content2"></vue-editor>
				</client-only>
			</div>
			<v-btn class="mx-5 mb-5" color="primary" v-permission="'view website'">
				<v-icon>mdi-check</v-icon>
				Update
			</v-btn>
		</v-card>
	</v-app>
</template>
<script>
export default {
	data() {
		return {
			content: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, iusto, culpa explicabo laborum id asperiores impedit porro laboriosam laudantium. Atque consequatur accusantium, fugit provident distinctio aliquam repellendus consectetur deleniti fugiat.</p>",

			content2: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, adipisci minus ullam ipsam tempore. Illum sapiente fugiat earum. Voluptate veniam, quidem repellat magni consequuntur numquam. Quia ipsa magni odio atque.</p>"
		}
	}
}

</script>
<style lang="scss">
.term--header {
	font-weight: bold;
	background-color: #5e738b;
	color: #ffffff;
}

</style>

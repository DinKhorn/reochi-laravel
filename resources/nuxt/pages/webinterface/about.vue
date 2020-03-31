<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="card--header">
				<h3>
					<v-icon style="color: #ffffff;">mdi-information</v-icon>
					ABOUT CONTENT
				</h3>
			</div>
			<v-divider></v-divider>
			<v-row class="px-10">
				<v-col md="6" class="text-left">
					<label for="" class="font-weight-bold">About Image</label>
					<client-only>
						<picture-input 
					      ref="pictureInput"
					      width="200" 
					      height="50" 
					      accept="image/jpeg,image/png" 
					      size="1"
					      :removable="true"
					      removeButtonClass="removeBtn"
					      button-class="btn"
					      :custom-strings="{
					        upload: '<h1>Bummer!</h1>',
					        drag: 'Choose your image'
					      }"
					      >
					    </picture-input>
					</client-only>
				</v-col>
				<v-col md="6">
					<label for="" class="font-weight-bold">About Video Link</label>
					<input type="text" class="form-control">
				</v-col>
			</v-row>
			<div class="px-10 pt-10 pb-5">
				<span class="font-weight-bold">About Text</span>
				<client-only>
					<vue-editor v-model="content"></vue-editor>
				</client-only>
			</div>
			<div class="px-10 pb-5">
				<v-btn color="primary" v-permission="'view website'">
					<v-icon>mdi-check</v-icon>
					UPDATE
				</v-btn>
			</div>			
		</v-card>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				content: '<p>dddd</p>',
			}
		}
	}
</script>

<style>
		
	.card--header {
		padding-right: 30px;
		padding-left: 30px;
		padding-top: 10px;
		padding-bottom: 10px;
		font-size: 15px;
		background-color: #11777c;
		color: #ffffff;
	}

	.form-control {
		padding-right: 10px;
		padding-left: 10px;
		padding-top: 5px;
		padding-bottom: 5px;
		width: 100%;
		outline: none;
		border-radius: 5px;
		border: 1px solid #161616;
	}

	.btn {
		padding-right: 10px;
		padding-left: 10px;
		padding-top: 5px;
		padding-bottom: 5px;
		background: #3333;
	}

	.removeBtn {
		padding-right: 10px;
		padding-left: 10px;
		padding-top: 5px;
		padding-bottom: 5px;
		background: #ea4863;
	}
</style>


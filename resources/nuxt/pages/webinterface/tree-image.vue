<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="card--header">
				<v-icon>mdi-settings-transfer-outline</v-icon>
				LOGO SETTINGS
			</div>
			<v-divider></v-divider>
			<v-row>
				<v-col md="6" cols="12">
					<label for="" class="label--user">Paid User Image</label>
					<div class="pt-3">
						<picture-input 
					      ref="pictureInput"
					      :zIndex="1"
					      width="200"
					      height="150" 
					      margin="16" 
					      accept="image/jpeg,image/png,image/svg" 
					      size="1" 
					      button-class="btn"
					      prefill="https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59095205-stock-illustration-businessman-profile-icon.jpg"
					      :custom-strings="{
					        upload: '<h1>Bummer!</h1>',
					        drag: 'Drag a 😺 GIF or GTFO'
					      }"
					    >
					    </picture-input>
					</div>
				</v-col>
				<v-col md="6" cols="12">
					<label for="" class="label--user">Free User Image</label>
					<div class="pt-1">
						<picture-input 
					      ref="pictureInput"
					      :zIndex="1"
					      width="200" 
					      height="150" 
					      margin="16" 
					      accept="image/jpeg,image/png" 
					      size="1" 
					      prefill="https://st2.depositphotos.com/1098803/5599/v/450/depositphotos_55994673-stock-illustration-vector-icon-of-user-avatar.jpg"
					      button-class="btn"
					      :custom-strings="{
					        upload: '<h1>Bummer!</h1>',
					        drag: 'Drag a 😺 GIF or GTFO'
					      }"
					    >
					    </picture-input>
					</div>
				</v-col>
				<v-col md="6" cols="12">
					<label for="" class="label--user">No User Image</label>
					<div class="pt-1">
						<picture-input 
						  :zIndex="1"
					      ref="pictureInput"
					      width="200" 
					      height="200" 
					      margin="16" 
					      accept="image/jpeg,image/png" 
					      size="1" 
					      prefill="https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
					      button-class="btn"
					      :custom-strings="{
					        upload: '<h1>Bummer!</h1>',
					        drag: 'Drag a 😺 GIF or GTFO'
					      }"
					    >
					    </picture-input>
					</div>
				</v-col>
			</v-row>

			<div class="text-center update">
				<v-btn color="primary" class="updateBtn" v-permission="'view website'">
					<v-icon>mdi-check</v-icon>
					UPDATE
				</v-btn>
			</div>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		methods: {
			
		}
	}
</script>


<style lang="scss">

	.update {
		margin-left: 8em;
		margin-right: 8em;
		
		.updateBtn {
			width: 100%;
			margin-bottom: 20px;
		}

	}

	.card--header {
		background: #3f939e;
		padding: 10px 20px 10px 20px; 
		font-weight: bold;
	}

	.btn {
		padding: 5px 10px 5px 10px;
		background: #1be300;
	}

	.label--user {
		padding-left: 10em;
		font-weight: bold;
	}
</style>


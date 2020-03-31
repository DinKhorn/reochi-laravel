<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="d-flex align-center px-5 py-3 header">
				<v-icon style="color: #fff">mdi-settings</v-icon>
				<h4>Logo Settings</h4>
			</div>
			<v-divider></v-divider>
			<div class="py-5">
				<client-only>
					<picture-input 
				      	ref="pictureInput"
				      	width="200" 
				      	height="100" 
				      	margin="16" 
				      	accept="image/jpeg,image/png" 
				      	size="1" 
				      	button-class="button"
				      	:custom-strings="{
					        upload: '<h1>Bummer!</h1>',
					        drag: 'Drag a 😺 Image Here'
				      	}"
				      	:removable="true"
				      >
				    </picture-input>			
				</client-only>
			</div>
			<div class="text-center">
				<v-btn color="primary" class="mb-5" v-permission="'view website'">
					<v-icon>mdi-check</v-icon>
					Update
				</v-btn>
			</div>
		</v-card>
	</v-app>
</template>

<style>
	
	.header {
		background-color: #578ebe;
		color: #ffffff;
	}

	.button {
		padding-right: 10px;
		padding-left: 10px;
		padding-top: 5px;
		padding-bottom: 5px;
		border: 1px solid rgba(0,0,0,0.125);
		outline: none;
		border-radius: 5px;
		color: #fff;
		background-color: #42A5F5;
	}
</style>
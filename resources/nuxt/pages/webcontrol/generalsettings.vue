<template>
	<v-app class="my-5 mx-5">
		<v-card>
			<div>
				<v-card-title class="font-weight-bold color">
					<v-icon color="grey lighten-5">mdi-settings</v-icon>
					General Settings
				</v-card-title>
				<v-divider></v-divider>
			</div>
			<v-row class="px-5">
				<v-col md="4" sm="6" cols="12">
					<div class="form-group">
						<label for="title" class="form-label">Website Title:</label>
						<input type="text" class="form-settings" 
							value="MLM Pro - Multilevel Business Platform">
					</div>
				</v-col>
				<v-col md="4" sm="6" cols="12">
					<div class="form-group">
						<label class="form-label">Currency(Like: USD):</label>
						<input type="text" class="form-settings" value="USD">
					</div>
				</v-col>
				<v-col md="4" sm="6" cols="12">
					<div class="form-group">
						<label class="form-label">Currency Symbol (Like: $ ):</label>
						<input type="text" class="form-settings" value="$">
					</div>
				</v-col>
				<v-col md="4" sm="6" cols="12">
					<div class="form-group">
						<label class="form-label">Web Color Code (Without '#'):</label>
						<input type="text" class="form-settings" value="2c3e50">
					</div>
				</v-col>
				<v-col md="4" sm="6" cols="12">
					<div class="form-group">
						<label class="form-label">Web Secondary Color Code (Without '#'):</label>
						<input type="text" class="form-settings" value="2ecc71">
					</div>
				</v-col>
				<v-col md="4" sm="6" cols="12">
					<div class="form-group">
						<v-menu
				          v-model="menu1"
				          :close-on-content-click="false"
				          max-width="290"
				        >	
				        	<template v-slot:activator="{ on }">
								<label class="form-label">Working Start Date:</label>
								<v-text-field
					              :value="computedDateFormattedMomentjs"
					              clearable
					              label="Formatted with Moment.js"
					              v-on="on"
					              solo
					              dense
					            ></v-text-field>
						    </template>
							<v-date-picker
					            v-model="date"
					            @change="menu1 = false"
					        ></v-date-picker>
					    </v-menu>
					</div>
				</v-col>
				<v-col md="3">
					<span class="font-weight-bold">EMAIL VERIFICATION</span>
					<div class="onoffswitch">
					    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" 
					    	id="myonoffswitch" checked>
					    <label class="onoffswitch-label" for="myonoffswitch">
					        <span class="onoffswitch-inner"></span>
					        <span class="onoffswitch-switch"></span>
					    </label>
					</div>
				</v-col>
				<v-col md="3">
					<span class="font-weight-bold">SMS VERIFICATION</span>
					<div class="onoffswitch">
					    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" 
					    	id="myonoffswitch" checked>
					    <label class="onoffswitch-label" for="myonoffswitch">
					        <span class="onoffswitch-inner"></span>
					        <span class="onoffswitch-switch"></span>
					    </label>
					</div>
				</v-col>
				<v-col md="3">
					<span class="font-weight-bold">Email Notification</span>
					<div class="onoffswitch">
					    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" 
					    	id="myonoffswitch" checked>
					    <label class="onoffswitch-label" for="myonoffswitch">
					        <span class="onoffswitch-inner"></span>
					        <span class="onoffswitch-switch"></span>
					    </label>
					</div>
				</v-col>
				<v-col md="3">
					<span class="font-weight-bold">Sms Notification</span>
					<div class="onoffswitch">
					    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" 
					    	id="myonoffswitch" checked>
					    <label class="onoffswitch-label" for="myonoffswitch">
					        <span class="onoffswitch-inner"></span>
					        <span class="onoffswitch-switch"></span>
					    </label>
					</div>
				</v-col>
			</v-row>
			<v-btn color="primary" class="mt-3 mb-5 mx-5" v-permission="'view website'">
				<v-icon>mdi-check</v-icon>
				Update
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	import moment from 'moment';
	export default {
		data() {
			return {
				date: new Date().toISOString().substr(0, 10),
				menu1: false,
			}
		},
		computed: {
		    computedDateFormattedMomentjs () {
		        return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
		   	},
		}
	}
</script>

<style lang="scss">
	.color {
		background: #2f353b;
		color: #ffffff;
	}

	.form {
		&-label {
			font-size: 15px;
			font-weight: bold;
		}
	}

	.form-settings {
		padding-top: 5px;
		padding-bottom: 5px;
		padding-left: 10px;
		padding-right: 10px;
		border-radius: 5px;
		border: 1px solid rgba(0,0,0,0.125);
		outline: none;
		width: 100%;
	}

	.onoffswitch {
	    position: relative; width: 90px;
	    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
	}
	.onoffswitch-checkbox {
	    display: none;
	}
	.onoffswitch-label {
	    display: block; overflow: hidden; cursor: pointer;
	    border: 2px solid #999999; border-radius: 20px;
	}
	.onoffswitch-inner {
	    display: block; width: 200%; margin-left: -100%;
	    transition: margin 0.3s ease-in 0s;
	}
	.onoffswitch-inner:before, .onoffswitch-inner:after {
	    display: block; float: left; width: 50%; height: 30px; padding: 0; line-height: 30px;
	    font-size: 14px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
	    box-sizing: border-box;
	}
	.onoffswitch-inner:before {
	    content: "ON";
	    padding-left: 10px;
	    background-color: #34A7C1; color: #FFFFFF;
	}
	.onoffswitch-inner:after {
	    content: "OFF";
	    padding-right: 10px;
	    background-color: #EEEEEE; color: #999999;
	    text-align: right;
	}
	.onoffswitch-switch {
	    display: block; width: 18px; margin: 6px;
	    background: #FFFFFF;
	    position: absolute; top: 0; bottom: 0;
	    right: 56px;
	    border: 2px solid #999999; border-radius: 20px;
	    transition: all 0.3s ease-in 0s; 
	}
	.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
	    margin-left: 0;
	}
	.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
	    right: 0px; 
	}
</style>
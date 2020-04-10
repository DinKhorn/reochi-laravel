<template>
	<div>
		<ValidationObserver ref="form">
			<v-layout wrap row>
				<v-flex xs12 md8>
					<v-row class="px-5">
						<v-col sm="6" cols="12">
							<label class="font-weight-bold" for="name">
								Outlet Name
								<span class="red--text">*</span>
							</label>
							<validation-provider name="Name" rules="required" v-slot="{ errors }">
								<v-text-field outlined solo dense label="Outlet Name" v-model="form.name"></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>
						</v-col>
						<v-col sm="6" cols="12">
							<label class="font-weight-bold" for="phone">
								Location
								<span class="red--text">*</span>
							</label>
							<validation-provider name="location" rules="required" v-slot="{ errors }">
								<v-text-field outlined solo dense label="Location" v-model="form.location"></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>
						</v-col>
						<v-col sm="6" cols="12">
							<label class="font-weight-bold" for="phone">
								Phone
								<span class="red--text">*</span>
							</label>
							<validation-provider name="Phone" rules="required" v-slot="{ errors }">
								<v-text-field outlined solo dense label="Phone" v-model="form.phone"></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>
						</v-col>
						<v-col sm="6" cols="12">
							<label class="font-weight-bold" for="status">
								Status
								<span class="red--text">*</span>
							</label>
							<validation-provider name="Status" rules="required" v-slot="{ errors }">
								<v-select outlined solo dense label="Status" v-model="form.status" :items="status"></v-select>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>
						</v-col>
						<!-- <v-col sm="12" cols="12">
						<label class="font-weight-bold" for="branch">Location Image</label>
						<div v-if="url" class="preview--image">
							<img :src="form.branch" class="img-responsive" height="300" />
						</div>
						<input type="file" @change="uploadImage($event)" class="product--image" />
						</v-col>-->
					</v-row>
				</v-flex>
				<v-flex xs12 md4>
					<v-col sm="12" cols="12">
						<v-image-input v-model="form.image_url" :image-quality="0.85" clearable image-format="jpeg" />
					</v-col>
				</v-flex>
			</v-layout>
		</ValidationObserver>
	</div>
</template>

<script>
export default {
	props: {
		form: {
			required: true,
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	data() {
		return {
			status: ["Enable", "Disable"]
		};
	}
};
</script>
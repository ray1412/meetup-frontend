<template>
	<v-container>
		<v-layout row wrap>
			<v-flex xs12 sm6 offset-sm3>
				<h4 class="secondary--text">Create new Meetup</h4>
			</v-flex>
		</v-layout>
		<v-layout row wrap>
			<v-flex xs12>
				<form @submit.prevent="onCreateMeetup">
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
				              name="title"
				              label="Title"
				              id="title"
				              v-model="title"
				              required
				            ></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
				              name="location"
				              label="Location"
				              id="location"
				              v-model="location"
				              required
				            ></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
				              name="imageUrl"
				              label="Image URL"
				              id="imageUrl"
				              v-model="imageUrl"
				              required
				            ></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<img :src="imageUrl" alt="" class="prevImage">
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
				              name="description"
				              label="Description"
				              id="description"
				              v-model="description"
				              required
				              multi-line
				              rows="3"
				            ></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-btn class="primary" :disabled="!formIsValid" type="submit">Create Meetup</v-btn>
						</v-flex>
					</v-layout>
				</form>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		data () {
			return {
				title      : '',
				location   : '',
				imageUrl   : '',
				description: '',
			}
		},
		computed : {
			formIsValid () {
				return this.title !== '' && this.location !== '' && this.imageUrl !== '' && this.description !== ''
			}
		},
		methods : {
			onCreateMeetup (){
				const meetupData = {
					title      : this.title,
					location   : this.location,
					imageUrl   : this.imageUrl,
					description: this.description,
					date       : new Date
				}
				this.$store.dispatch('createMeetup',meetupData)
				this.$router.push('/meetups')
			}
		}
	}
</script>
<style scoped>
.prevImage{
	width: auto;
	max-height: 200px;
	max-width: 100%;
}
</style>
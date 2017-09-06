<template>
	<div>
		<!-- <h2>This is list meetups</h2> -->
		<v-container>
			<v-layout row wrap  v-for="item in meetups" :key="item.id" class="mb-3">
				<v-flex x12 sm10 md8 offset-sm1 offset-md2>
				<v-card class="info">
					<v-container fluid>
						<v-layout row>
							<v-flex xs12 sm4 md3>
								<v-card-media
			                      :src="item.imageUrl"
			                      height="125px"
			                   
			                    ></v-card-media>
							</v-flex>
							<v-flex hidden-xs-only sm8 md9>
							 	<v-card-title primary-title>
							 		<div>
					                	<div class="meetup-title white--text mb-0">{{item.title}}</div>
					                	<div class="meetup-date">{{item.date}}</div>
						                <div class="meetup-desc">{{item.description}}</div>
					                </div>
				              	</v-card-title>
				              	<v-card-actions>
				                	<v-btn flat dark class="" :to="'/meetups/'+item.id">
				                		<v-icon light left>arrow_forward</v-icon>
				                		View meetup
				                	</v-btn>
				              	</v-card-actions>
							</v-flex>
						</v-layout>
						<v-layout row hidden-sm-and-up>
							<v-flex xs12>
								<v-card-title primary-title class="pr-0 pl-0">
							 		<div>
					                	<div class="meetup-title white--text mb-0">{{item.title}}</div>
					                	<div class="meetup-date">{{item.date}}</div>
						                <div class="meetup-desc">{{item.description}}</div>
					                </div>
				              	</v-card-title>
				              	<v-card-actions>
				                	<v-btn flat dark class="ml-0 mr-0" :to="'/meetups/'+item.id">
				                		<v-icon light left>arrow_forward</v-icon>
				                		View meetup
			                		</v-btn>
				              	</v-card-actions>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>
<script>
	export default {
		computed: {
			meetups () {
				return this.$store.getters.loadedMeetups
			}
		}
	}
</script>
<style scoped>
.meetup-title{
	font-size: 1.5rem;
}
.meetup-desc{

}
.meetup-date{

}
.btn__content{
	padding: 0!important;
}
</style>
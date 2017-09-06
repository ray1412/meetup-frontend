<template>
	<v-container>
		<v-layout row wrap>
			<v-flex xs12>
				<v-card>
					<v-card-title>
						<div class="md-title info--text">{{meetup.title}}</div>
					</v-card-title>
					<v-card-media :src="meetup.imageUrl" height="400px">
					</v-card-media>
					<v-card-text>
						<div class="md-date">{{meetup.date}}</div>
						<div class="md-description">{{meetup.description}}</div>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn class="primary">Register</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {

  name: 'meetupDetail',
  props: ['id'],
  data () {
    return {

    };
  },
  computed: {
  	meetup () {
  		return this.$store.getters.loadedMeetup(this.id);
  	}
  }
};
</script>

<style lang="css" scoped>
.md-title{
	font-size: 1.5rem;
}
.md-description{
	/*background: rgba(0,0,0,0.05);*/
}
</style>
<template>
	<div>
	<v-container>
		<v-layout row wrap class="mt-2">
			<v-flex xs12 sm6 class="text-sm-right text-xs-center">
				<v-btn large to="/meetups" class="info">Explore Meetups</v-btn>
			</v-flex>
			<v-flex xs12 sm6 class="text-sm-left text-xs-center">
				<v-btn large to="/meetup/new" class="info">Organize Meetup</v-btn>
			</v-flex>
		</v-layout>
		<v-layout row wrap class="mt-2">
			<v-flex xs12>
				<v-carousel>
					<v-carousel-item
					v-for="item in meetups"
					v-bind:src="item.imageUrl"
					:key="item.id"
					@click="onLoadMeetup(item.id)"
					class="modifCarousel"
					>
					<div class="meetup-title">
						{{item.title}}
					</div>
					</v-carousel-item>
				</v-carousel>
			</v-flex>
		</v-layout>
		<v-layout row wrap class="mt-2">
			<v-flex xs12 class="text-xs-center">
				<p>Join our awesome meetups!</p>
			</v-flex>
		</v-layout>
	</v-container>
	</div>
</template>

<script>
	export default{
		data (){
			return {
				// meetups: [
				// 	{imageUrl: 'http://www.gbgindonesia.com/directory/img/education/binus_university-information_technology_international_education/1419884458product-6.jpg', id:'asd', title: 'Meetup in Binus'},
				// 	{imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/FamilyMart_Yoshinoya_Jl_Bulungan_Jakarta_Selatan.JPG', id:'def', title: 'Meetup in Bulungan'}
				// ]
			}
		},
		computed: {
			meetups () {
				// return this.store.getters.loadedMeetups
				return this.$store.getters.featuredMeetups
			}
		},
		methods: {
			onLoadMeetup(id){
				this.$router.push("/meetups/"+id)
			}
		}
	}
</script>

<style scoped>
.meetup-title{
	position: absolute;
	bottom: 60px;
	color:#ffffff;
	background: rgba(0,0,0,0.5);
	font-size: 1.75rem;
	padding: 5px 15px;
}
.modifCarousel{
	cursor:pointer;
}
</style>
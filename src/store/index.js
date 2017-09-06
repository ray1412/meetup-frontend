import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		loadedMeetups: [
			{
				imageUrl   : 'http://www.gbgindonesia.com/directory/img/education/binus_university-information_technology_international_education/1419884458product-6.jpg',
				id         : 'asd',
				title      : 'Meetup in Binus',
				date       : '2017-07-10',
				description: 'Meetup for Binusian'
			},
			{
				imageUrl   : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/FamilyMart_Yoshinoya_Jl_Bulungan_Jakarta_Selatan.JPG',
				id         : 'def',
				title      : 'Meetup in Bulungan',
				date       : '2017-09-30',
				description: 'Meetup for zzzzzzzz'
			}
		],
		user: {
			id: 'test123',
			registeredMeetups: ['test123','test345']
		}

	},
	mutations: {
		createMeetup (state, payload){
			state.loadedMeetups.push(payload)
		}
	},
	actions: {
		createMeetup ({commit}, payload){
			const meetup = {
				title      : payload.title,
				location   : payload.location,
				imageUrl   : payload.imageUrl,
				description: payload.description,
				date       : payload.date,
				id         : 'harcodeId'
			}
			// Reach firebase 
			commit('createMeetup', meetup)
		}
	},
	getters: {
		loadedMeetups (state){
			return state.loadedMeetups.sort( (meetupA, meetupB) => {
				return meetupA.date > meetupB.date
			})
		},
		loadedMeetup (state){
			return (meetupId) => {
				return state.loadedMeetups.find((meetup) => {
					return meetup.id === meetupId
				})
			}
		},
		featuredMeetups (state,getters){
			return getters.loadedMeetups.slice(0,5)
		}
	},
})
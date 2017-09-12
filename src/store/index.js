import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		loadedMeetups: [
			{
				imageUrl   : 'http://www.gbgindonesia.com/directory/img/education/binus_university-information_technology_international_education/1419884458product-6.jpg',
				id         : 'asd',
				title      : 'Meetup in Binus',
				date       : new Date(),
				description: 'Meetup for Binusian',
				location   : 'Binus'
			},
			{
				imageUrl   : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/FamilyMart_Yoshinoya_Jl_Bulungan_Jakarta_Selatan.JPG',
				id         : 'def',
				title      : 'Meetup in Bulungan',
				date       : new Date(),
				description: 'Meetup for zzzzzzzz',
				location   : 'Bulungan'
			}
		],
		user: null
	},
	mutations: {
		createMeetup (state, payload){
			state.loadedMeetups.push(payload)
		},
		setUser(state,payload) {
			state.user = payload
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
		},
		signUp ({commit}, payload){
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
				user => {
					const newUser = {
						id: user.uid,
						registeredMeetups : []
					}
					commit('setUser', newUser)
				}
			)
			.catch(
				error => {
					console.log(error);
				}
			)
		},
		signIn({commit}, payload){
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
					user => {
						const loggedUser = {
							id: user.uid,
							registeredMeetups : []
					}
					commit('setUser', loggedUser)
				}
			)
			.catch(
				error => {
					console.log(error);
				}
			)
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
		},
		user (state){
			return state.user
		}
	},
})
import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		loadedMeetups: [
			// {
			// 	imageUrl   : 'http://www.gbgindonesia.com/directory/img/education/binus_university-information_technology_international_education/1419884458product-6.jpg',
			// 	id         : 'asd',
			// 	title      : 'Meetup in Binus',
			// 	date       : new Date(),
			// 	description: 'Meetup for Binusian',
			// 	location   : 'Binus'
			// },
			// {
			// 	imageUrl   : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/FamilyMart_Yoshinoya_Jl_Bulungan_Jakarta_Selatan.JPG',
			// 	id         : 'def',
			// 	title      : 'Meetup in Bulungan',
			// 	date       : new Date(),
			// 	description: 'Meetup for zzzzzzzz',
			// 	location   : 'Bulungan'
			// }
		],
		user: null,
		loading: false,
		error: null
	},
	mutations: {
		setLoadedMeetups(state,payload){
			state.loadedMeetups = payload
			console.log(state.loadedMeetups);
		},
		createMeetup (state, payload){
			state.loadedMeetups.push(payload)
		},
		setUser(state,payload) {
			state.user = payload
		},
		setLoading(state,payload){
			state.loading = payload
		},
		setError(state,payload){
			state.error = payload
		},
		clearError (state){
			state.error = null
		}
	},
	actions: {
		loadMeetups ({commit}){
			commit('setLoading',true);
			//if using .on not .once it will be "live reload"
			firebase.database().ref('meetups').once('value')
			.then((data) => {
				const meetups = [];
				const obj     = data.val();
				for(let key in obj){
					meetups.push({
						id         : key,
						title      : obj[key].description,
						location   : obj[key].location,
						imageUrl   : obj[key].imageUrl,
						description: obj[key].description,
						date       : obj[key].date,
						creatorId  : obj[key].creatorId
					})
				}
				commit('setLoadedMeetups',meetups);
				commit('setLoading',false)
			})
			.catch(
				(error) => {
					console.log(error);
					commit('setLoading',false)
			})
		},
		createMeetup ({commit, getters}, payload){
			console.log(getters);
			const meetup = {
				title      : payload.title,
				location   : payload.location,
				imageUrl   : payload.imageUrl,
				description: payload.description,
				date       : payload.date.toISOString(),
				creatorId  : getters.user.id
			}
			// Reach firebase 
			firebase.database().ref('meetups').push(meetup)
			.then( (data) => {
				console.log(data);
				const key = data.key;
				commit('createMeetup', {
					...meetup,
					id: key
				})
				// commit('createMeetup', meetup)
			})
			.catch( (error) => {
				console.log(error);
			})
		},
		signUp ({commit}, payload){
			commit('setLoading',true)
			commit('clearError')
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
				user => {
					commit('setLoading',false)
					const newUser = {
						id: user.uid,
						registeredMeetups : []
					}
					commit('setUser', newUser)
				}
			)
			.catch(
				error => {
					commit('setLoading',false)
					commit('setError',error)
					console.log(error);
				}
			)
		},
		signIn({commit}, payload){
			commit('setLoading',true)
			commit('clearError')
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
					user => {
						commit('setLoading',false)
						const loggedUser = {
							id: user.uid,
							registeredMeetups : []
					}
					console.log(loggedUser);
					commit('setUser', loggedUser)
				}
			)
			.catch(
				error => {
					commit('setLoading',false)
					commit('setError',error)
					console.log(error);
				}
			)
		},
		autoSignIn({commit},payload){
			const user = {
				id : payload.uid,
				registeredMeetups: []
			}
			commit('setUser',user)
		},
		logout({commit}){
			firebase.auth().signOut()
			commit('setUser',null)
		},
		clearError({commit}){
			commit('clearError')
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
		},
		loading(state){
			return state.loading
		},
		error(state){
			return state.error
		}
	},
})
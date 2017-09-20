import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreateMeetup from '@/components/createMeetup'
import ListMeetups from '@/components/listMeetups'
import Profile from '@/components/profile'
import SignIn from '@/components/signIn'
import SignUp from '@/components/signUp'
import MeetupDetail from '@/components/meetupDetail'
import NotFound from '@/components/notFound'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'ListMeetups',
      component: ListMeetups
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: CreateMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetups/:id',
      name: 'MeetupDetail',
      props: true,
      component: MeetupDetail
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/*',
      name: 'NotFound',
      component: NotFound
    },
  ],
  mode:'history',

})

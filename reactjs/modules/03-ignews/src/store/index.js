import { createStore } from 'vuex';

import { getDataFromCMS } from '@/services/datocms';
import { saveUser } from '@/services/faunadb';

const query = '{ allPosts { title, content, id } }';

export default createStore({
  state: {
    posts: [],
    session: {
      user: {},
      isLoggedIn: false
    }
  },
  mutations: {
    retrieve_posts (state) {
      getDataFromCMS(query, (post_list) => {
        state.posts = post_list;
      })
    },
    log_in (state) {
      saveUser({ username: 'xSallus', email: 'souza95salomao@gmail.com' })
      .then(res => {
        if (!!res.id) {
          state.session = {
            isLoggedIn: true,
            user: res
          }
        }
      })
      .catch(err => {
        state.session = {
          isLoggedIn: false,
          user: {}
        };
        console.log(err);
      })
    },
    log_out (state) {
      state.session = {
        isLoggedIn: false,
        user: {}
      }
    }
  },
  actions: {
    get_posts (ctx) {
      ctx.commit('retrieve_posts')
    },
    auth_change (ctx) {
      if (ctx.state.session.isLoggedIn) {
        ctx.commit('log_out')
        return;
      }
      
      ctx.commit('log_in');
      return;
    }
  },
  getters: {
    getUser: (state) => {
      return state.session.user;
    },
    getAuthState: (state) => {
      return state.session.isLoggedIn;
    },
    getPosts: (state) => {
      return state.posts;
    },
  },
  modules: {}
})

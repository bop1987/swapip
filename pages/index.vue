<template>
  <el-container>
    <el-aside width="200px">
      <el-menu>
        <el-menu-item-group>
          <el-menu-item
            v-for='(film, index) in films'
            :key='film.episode_id'
            dex="1-1"
            @click='getFilmInfo(index + 1)'
          >
            {{ film.title }}
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <el-main>
      <el-row class='search'>
        <el-col :span="24">
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="Please input"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card v-if='film !== undefined'>
            <div class='title'>
              <h3>Название</h3>
              <h3>{{ film.title }}</h3>
            </div>
            <div class='description'>
              <h3>Описание</h3>
              <p>{{ film.opening_crawl }}</p>
            </div>
            <div class='director'>
              <h3>Режиссер</h3>
              <h3>{{ film.director }}</h3>
            </div>
            <div class='producer'>
              <h3>Продюсер</h3>
              <h3>{{ film.producer }}</h3>
            </div>
            <div class='release-date'>
              <h3>Дата выхода</h3>
              <h4>{{ film.release_date }}</h4>
            </div>
            <el-row>
              <h3>Персоны</h3>
              <el-col
                v-for='character in film.characters'
                :key='character'
                :span="4"
                :offset='1'
              >
                <el-card >
                  {{ character }}
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <h3>Планеты</h3>
              <el-col
                v-for='planet in film.planets'
                :key='planet'
                :span="4"
                :offset='1'
              >
                <el-card>
                  {{ planet }}
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <h3>Корабли</h3>
              <el-col
                v-for='starship in film.starships'
                :key='starship'
                :span="4"
                :offset='1'
              >
                <el-card>
                  {{ starship }}
                </el-card>
              </el-col>
            </el-row>
          </el-card>
          <el-row v-else-if='result !== undefined'>
            <el-col v-for='item in result' :key='item' :span="24">
              <h3>{{value}}</h3>
              {{ item }}
            </el-col>
          </el-row>
          <el-card v-else>
            Пока ничего не выбрано...
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  async asyncData({ store }) {
    await store.dispatch('films/fetchFilms')

    await store.dispatch('search/fetchAllInfo')

  },

  data() {
    return {
      links: [],
      state: '',
      timeout:  null,
      value: ''
    }
  },

  computed: {
    ...mapGetters({
      films: 'films/getFilms',
      film: 'films/getCurrentFilm',
      searchAll: 'search/getSearchAll',
      result: 'search/getResult',
    }),
  },

  mounted() {
    this.links = this.searchAll;
  },

  methods: {

    async getFilmInfo(id) {
      await this.$store.dispatch('films/getFilmsBySlug', id)
    },

    querySearchAsync(queryString, cb) {
      const links = this.links;
      const results = queryString ? links.filter(this.createFilter(queryString)) : links;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },

    createFilter(queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

    async handleSelect(item) {
      const slug = this.getUrl(item.link);
      this.value = item.value;
      this.$store.commit('films/DELETE_CURRENT_FILMS');
      await this.$store.dispatch('search/fetchInfoAfterSearch', slug)
    },

    getUrl(link) {
      link = link.split('/')
      link = link.splice(4,5)
      link = link.join('/')

      return link
    },



  },

}
</script>

<style>
.el-card__body {
  padding: 20px !important;
}
.search {
  margin-bottom: 30px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>

<script setup>
import axios from 'axios'
</script>

<template>
  <div>
    <div  class="card-expansion">
      <md-card>
        <md-card-media>
          <img v-if="pokemonId !== '' && !loading"
            :src="`${pokemonImageApi}/${pokemonId}.png`" :alt="`${pokemonName}`">
          <md-progress-spinner
            v-if="loading"
            class="md-accent"
            :md-diameter="300"
            md-mode="indeterminate"
          >
          </md-progress-spinner>
        </md-card-media>

        <md-card-header v-if="!loading">
          <md-card-header-text>
            <div class="md-title">{{ pokemonId }} - {{ pokemonName }}</div>
            <div class="md-subhead">{{ pokemonTypes }}</div>
          </md-card-header-text>
        </md-card-header>

        <md-card-expand>
          <md-card-actions md-alignment="space-between">
            <div>
              <md-button @click="onSearch()" class="md-raised md-accent">Search</md-button>
              <md-button @click="onCatch()" class="md-raised md-primary">Catch</md-button>
            </div>

            <md-card-expand-trigger>
              <md-button class="md-icon-button">
                <md-icon>keyboard_arrow_down</md-icon>
              </md-button>
            </md-card-expand-trigger>
          </md-card-actions>

          <md-card-expand-content v-if="!loading">
            <md-card-content>
              <p><b>weight: </b>{{ pokemonWeight }}</p>
              <p><b>height: </b>{{ pokemonHeight }}</p>
              <p><b>moves: </b>{{ pokemonMoves }}</p>
            </md-card-content>
          </md-card-expand-content>
        </md-card-expand>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pokedex',
  data() {
    return {
      loading: false,
      pokemonImageApi: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork`,
      pokemonDataApi: 'https://pokeapi.co/api/v2/pokemon',
      pokemonName: '',
      pokemonId: '',
      pokemonTypes: [],
      pokemonMoves: [],
      pokemonHeight: 0,
      pokemonWeight: 0,
      pokemonIcon: ''
    }
  },
  methods: {
    async onSearch() {
      try {
        this.loading = true;
        this.pokemonId = await new Promise((res, rej) => {
          setTimeout(() => {
            const randomId = Math.floor(Math.random() * 1008) + 1;
            res(randomId);
          }, 2000);
        });
        this.loading = false;

        const pokemonData = await axios.get(`${this.pokemonDataApi}/${this.pokemonId}`)
        const {
          name,
          types,
          height,
          weight,
          moves,
          sprites
        } = pokemonData.data;

        this.pokemonName = name;
        this.pokemonWeight = weight;
        this.pokemonHeight = height;
        this.pokemonIcon = sprites.front_default;
        this.pokemonTypes = types.map(m => m.type.name);
        this.pokemonMoves = moves.map(m => m.move.name);
      } catch (error) {
        console.log(error);
      }
    },
    async onCatch() {
      try {
        await axios.post('http://localhost:3000/pokemon-team', {
          id: this.pokemonId,
          name: this.pokemonName,
          moves: this.pokemonMoves,
          types: this.pokemonTypes,
          height: this.pokemonHeight,
          weight: this.pokemonWeight,
          icon: this.pokemonIcon
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .card-expansion {
    height: 680px;
  }

  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>

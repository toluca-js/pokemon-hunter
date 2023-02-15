<template>
  <div>
    <md-table md-card >
      <md-table-toolbar>
        <h1 class="md-title">My Team</h1>
      </md-table-toolbar>

      <md-table-row name="table">
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Icon</md-table-head>
        <md-table-head>Nickname</md-table-head>
        <md-table-head>Types</md-table-head>
        <md-table-head>Actions</md-table-head>
      </md-table-row>

      <md-table-row v-for="p in pokemons" v-bind:key="p.id">
        <md-table-cell md-label="ID" md-numeric>{{ p.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ p.name }}</md-table-cell>
        <md-table-cell md-label="Icon">
          <md-avatar class="md-large">
            <img :src="`${ p.icon }`" alt="Avatar">
          </md-avatar>
        </md-table-cell>
        <md-table-cell md-label="Nickname">
          <md-field style="width: 10em;">
            <!-- <label>Initial Value (Read Only)</label> -->
            <md-input v-model="p.nickname" :disabled="p.disabled"></md-input>
          </md-field>
        </md-table-cell>
        <md-table-cell md-label="Types">{{ p.types }}</md-table-cell>
        <md-table-cell md-label="Job Title">
          <md-button v-if="p.disabled" class="md-icon-button md-dense" @click="onEdit(p)">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button
            v-if="!p.disabled"
            class="md-icon-button md-dense md-primary"
            @click="onSave(p)"
          >
            <md-icon>save</md-icon>
          </md-button>
          <md-button class="md-icon-button md-dense md-accent" @click="onDelete(p.id)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<style>
</style>

<script>
  import axios from 'axios';

  export default {
    name: 'MyTeamView',
    data() {
      return {
        pokemons: [],
      }
    },
    async created() {
      await this.getPokemons();
    },
    methods: {
      async getPokemons() {
        try {
          const response = await axios.get('http://localhost:3000/pokemon-team');
          this.pokemons = response.data.map(p => {
            return {
              ...p,
              disabled: true
            }
          }).sort((a, b) => a.id - b.id);
        } catch (error) {
          console.error(error);
        }
      },
      async onDelete(pokemonId) {
        try {
          await axios.delete(`http://localhost:3000/pokemon-team/${pokemonId}`);
          await this.getPokemons();
        } catch (error) {
          console.error(error);
        }
      },
      onEdit(pokemon) {
        pokemon.disabled = false;
      },
      async onSave(pokemon) {
        try {
          await axios.put(`http://localhost:3000/pokemon-team/`, {
            id: pokemon.id,
            nickname: pokemon.nickname
          });
          await this.getPokemons();
        } catch (error) {
          console.error(error);
        }
      },
    }
  }
</script>

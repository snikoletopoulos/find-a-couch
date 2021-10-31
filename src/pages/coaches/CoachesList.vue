<template>
  <section>
    <coach-filter @change-filter="setFilters" />
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/register">Register as a Coach</base-button>
      </div>
      <ul v-if="hasCoaches">
        <coach-item v-for="coach in filteredCoaches" :key="coach.id" :rate="coach.hourlyRate" v-bind="coach" />
      </ul>
      <h3 v-else>No coaches found.</h3>
    </base-card>
  </section>
</template>

<script>
  import CoachItem from "../../components/coaches/CoachItem.vue";
  import CoachFilter from "../../components/coaches/CoachFilter.vue";

  export default {
    data() {
      return {
        activeFilters: {
          frontend: true,
          backend: true,
          career: true,
        },
      };
    },
    computed: {
      filteredCoaches() {
        return this.$store.getters["coaches/coaches"];
      },
      hasCoaches() {
        return this.$store.getters["coaches/hasCoaches"];
      },
    },
    methods: {
      setFilters(updatedFilters) {
        this.activeFilters = updatedFilters;
      },
    },
    components: {
      CoachItem,
      CoachFilter,
    },
  };
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .controls {
    display: flex;
    justify-content: space-between;
  }
</style>

<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred." @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters" />
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button link to="/auth?redirect=register" v-if="!isLoggedin">Login to Register as a couch</base-button>
          <base-button v-if="!isCoach && !isLoading && isLoggedin" link to="/register">Register as a Coach</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner />
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item v-for="coach in filteredCoaches" :key="coach.id" :rate="coach.hourlyRate" v-bind="coach" />
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
  import CoachItem from "../../components/coaches/CoachItem.vue";
  import CoachFilter from "../../components/coaches/CoachFilter.vue";

  export default {
    data() {
      return {
        isLoading: false,
        error: null,
        activeFilters: {
          frontend: true,
          backend: true,
          career: true,
        },
      };
    },
    computed: {
      filteredCoaches() {
        const coaches = this.$store.getters["coaches/coaches"];
        return coaches.filter(coach => {
          if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
            return true;
          }
          if (this.activeFilters.backend && coach.areas.includes("backend")) {
            return true;
          }
          if (this.activeFilters.career && coach.areas.includes("career")) {
            return true;
          }
          return false;
        });
      },
      hasCoaches() {
        return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
      },
      isCoach() {
        return this.$store.getters["coaches/isCoach"];
      },
      isLoggedin() {
        return this.$store.getters.isAuthenticated;
      },
    },
    methods: {
      setFilters(updatedFilters) {
        this.activeFilters = updatedFilters;
      },
      async loadCoaches(refresh = false) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("coaches/loadCoaches", { forceRefresh: refresh });
        } catch (error) {
          this.error = error.message || "Something went wrong";
        }
        this.isLoading = false;
      },
      handleError() {
        this.error = null;
      },
    },
    created() {
      this.loadCoaches();
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

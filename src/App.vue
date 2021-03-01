<template>
  <div class="container">
    <keep-alive :exclude="/detail/">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  watch: {},
  created() {},
  methods: {},
};
</script>

<style>
</style>


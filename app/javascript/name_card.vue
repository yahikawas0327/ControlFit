<template>
 <div class="name-card">
    <ul>
      <li>name: {{ item.name }}</li>

    </ul>
  </div>
</template>

<script>
export default {
  props: ["item"],
}
</script>

<style scoped>
.name-card {
  border: 1px solid rgba(0, 0, 0, 0.205);
  display: inline-block;
  padding: 10px;
  margin: 5px;
  background-color: #fff;
  border-radius: .25rem
}
</style>
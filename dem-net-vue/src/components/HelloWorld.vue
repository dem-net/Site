<template>
<section class="section">
    <div class="container">
      <img alt="Vue logo" src="../assets/DEMNet-open-graph-template 8bits.png" width="512">
      <h1 class="title">{{ msg }}</h1>
      <h2 class="subtitle">
        A simple open source API providing <strong>global elevation data</strong>.
      </h2>
    </div>
  </section>
  
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

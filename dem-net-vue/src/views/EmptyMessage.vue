<template>
  <div class="about">
    <h1>{{ this.message }}</h1>
  </div>
</template>

<script>
export default {
   props: {
    message: {type: String, default: "Coming soon!" }
  }  
}
</script>

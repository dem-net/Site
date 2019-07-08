<template>
<div>
  Result:
    <p>{{ this.elevation }}</p>
</div>
</template>


<script>
export default {
  name: 'ElevationResult',
  props: [ 'elevation'],
};
</script>

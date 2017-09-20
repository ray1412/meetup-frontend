<template>
	<v-alert error dismissible @input="onClose" :value="true">
      {{text}}
    </v-alert>
</template>

<script>
export default {

  name: 'alert',
  props: ['text'],
  data () {
    return {

    };
  },
  methods:{
  	onClose() {
  		this.$emit('dismissed')
  	}
  }
};
</script>

<style lang="css" scoped>
</style>
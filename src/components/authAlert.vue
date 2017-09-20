<template>
	 <v-snackbar
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
    >
      {{ text }}
      <v-btn flat class="pink--text" @click.native="snackbar = false" @input="onClose">Close</v-btn>
    </v-snackbar>
</template>

<script>
export default {

  name: 'authAlert',
  props: ['text','snackbar'],
  data () {
    return {
	 	snackbar: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 3000,
    };
  },
  methods : {
  	onClose(){
  		this.$emit('dismissed')
  	}
  }
};
</script>

<style lang="css" scoped>
</style>
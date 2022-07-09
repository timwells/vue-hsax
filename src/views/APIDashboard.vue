<template>
	<div>
		<a-dropdown-button>
			Select API
			<a-menu slot="overlay" @click="selectClickHandler">
				<a-menu-item v-for="wwuri in wwuris" :key="wwuri">{{wwuri}}</a-menu-item>
			</a-menu>
		</a-dropdown-button>

		<json-viewer v-if="results" :value="results" :expand-depth="5"></json-viewer>
	</div>
</template>

<script>
import { mapState } from "vuex";
const WWURIS = [
	"/v1/publications",
	"/v1/publications/GOV-12999",
	"/v1/publications/GOV-12999/dimensions",
	"/v1/publications/GOV-12999/list?dimension=ws",
	"/v1/publications/GOV-12999/list?dimension=run_id",
	"/v1/publications/GOV-12999/list?dimension=ww_site_code",
	"/v1/publications/GOV-12999/list?dimension=variant_name",
	"/v1/publications/GOV-12999/list?dimension=date_sample_collected",
	"/v1/publications/GOV-12999/list?dimension=rna_plate_mber",
	"/v1/publications/GOV-12999/list?dimension=variant_detection_ind",
	"/v1/publications/GOV-12999/list?dimension=data_model_version"
]

export default ({
	components:{
	},
	computed: {
		...mapState("ww", ["results"]),
	},
	mounted() {
	},
	data() {
		return {
			host: process.env.VUE_APP_WW_API_KEY,
			wwuris : WWURIS,
		}
	},
	methods: { 
		selectClickHandler(e) {
			this.$store.dispatch("ww/getResults",{ path: e.key});
		}
	}
})

</script>

<style lang="scss">
</style>
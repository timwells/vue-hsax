<template>
	<div>
		<a-radio-group 
			@change="onContentTypeSelect" 
			defaultValue="application/json">
			<a-radio-button value="application/json">application/json</a-radio-button>
			<a-radio-button value="text/csv">text/csv</a-radio-button>
		</a-radio-group>
		<br/>
		<br/>
		<a-dropdown-button>
			Select API
			<a-menu slot="overlay" @click="onApiSelect">
				<a-menu-item v-for="wwuri in wwuris" :key="wwuri">{{wwuri}}</a-menu-item>
			</a-menu>
		</a-dropdown-button>
		<br/>
		<br/>
		<div> {{selectedUri}}</div>
		<br/>
		<json-viewer v-if="results && contentType=='application/json'" :value="results" :expand-depth="5"></json-viewer>
		<pre v-if="results && contentType=='text/csv'">{{results}}</pre>
	</div>
</template>

<script>
import { mapState } from "vuex";

const CONTENTTYPES = [
	"application/json",
	"text/csv"
]

const WWURIS = [
	"/v1/publications",
	"/v1/publications/GOV-12999",
	"/v1/publications/GOV-12999/details",
	"/v1/publications/GOV-12999/dimensions",
	"/v1/publications/GOV-12999/sample-insights",
	"/v1/publications/GOV-12999/list?dimension=run_id",
	"/v1/publications/GOV-12999/list?dimension=ww_site_code",
	"/v1/publications/GOV-12999/list?dimension=variant_name",
	"/v1/publications/GOV-12999/list?dimension=date_sample_collected",
	"/v1/publications/GOV-12999/list?dimension=rna_plate_mber",
	"/v1/publications/GOV-12999/list?dimension=variant_detection_ind",
	"/v1/publications/GOV-12999/list?dimension=data_model_version",
	"/v1/publications/GOV-12999/list?dimension=ws",
	"/v1/publications/GOV-12999/filter?variant_detection_ind=CONFIRMED",
	"/v1/publications/GOV-12999/filter?variant_detection_ind=POSSIBLE",
	"/v1/publications/GOV-12999/filter?variant_detection_ind=CONFIRMED&variant_name=B.1.1.529-BA.1",
	"/v1/publications/GOV-12999/filter?variant_detection_ind=CONFIRMED&variant_name=B.1.1.529-BA.1&ww_site_code=TW-*",
]

export default ({
	components:{
	},
	computed: {
		...mapState("ww", ["results","contentType"]),
	},
	data() {
		return {
			host: process.env.VUE_APP_WW_API_KEY,
			wwuris : WWURIS,
			contentTypes : CONTENTTYPES,
			selectedContentType : "application/json",
			selectedUri: ""
		}
	},
	methods: { 
		onApiSelect(e) {
			this.selectedUri = e.key
			this.$store.dispatch("ww/getResults",{ path: e.key, contentType: this.selectedContentType});
		},
		onContentTypeSelect(e) {
			this.selectedContentType = e.target.value
		}
	}
})

</script>

<style lang="scss">
</style>
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

		<!--a-dropdown-button>
			Select API
			<a-menu slot="overlay" @click="onApiSelect">
				<a-menu-item v-for="link in links" :key="link">{{link}}</a-menu-item>
			</a-menu>
		</a-dropdown-button-->

		<a-tree-select
			v-model="linkTreeValue"
			show-search
			style="width: 100%"
			:tree-data="linkTreeData"
			:dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
			placeholder="Please select"
			allow-clear>
		</a-tree-select>

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

const LINKTREEDATA = [
  {
    title: '/v1/publications',
    value: '/v1/publications',
    key: '/v1/publications',
  },
  {
    title: '/v1/publications/GOV-12999',
    value: '/v1/publications/GOV-12999',
    key: '/v1/publications/GOV-12999',
    children: [{
		title: '/v1/publications/GOV-12999/details',
        value: '/v1/publications/GOV-12999/details',
        key: '/v1/publications/GOV-12999/details',
      },
      {
        title: '/v1/publications/GOV-12999/dimensions',
        value: '/v1/publications/GOV-12999/dimensions',
        key: '/v1/publications/GOV-12999/dimensions',
      },
      {
        title: '/v1/publications/GOV-12999/sample-insights',
        value: '/v1/publications/GOV-12999/sample-insights',
        key: '/v1/publications/GOV-12999/sample-insights',
      },
      {
        title: '/v1/publications/GOV-12999/list?dimension=run_id',
        value: '/v1/publications/GOV-12999/list?dimension=run_id',
        key: '/v1/publications/GOV-12999/list?dimension=run_id',
      },
      {
        title: '/v1/publications/GOV-12999/list?dimension=ww_site_code',
        value: '/v1/publications/GOV-12999/list?dimension=ww_site_code',
        key: '/v1/publications/GOV-12999/list?dimension=ww_site_code',
      },
      {
        title: '/v1/publications/GOV-12999/list?dimension=variant_name',
        value: '/v1/publications/GOV-12999/list?dimension=variant_name',
        key: '/v1/publications/GOV-12999/list?dimension=variant_name',
      },
      {
        title: '/v1/publications/GOV-12999/list?dimension=date_sample_collected',
        value: '/v1/publications/GOV-12999/list?dimension=date_sample_collected',
        key: '/v1/publications/GOV-12999/list?dimension=date_sample_collected',
      },
      {
        title: '/v1/publications/GOV-12999/list?dimension=rna_plate_mber',
        value: '/v1/publications/GOV-12999/list?dimension=rna_plate_mber',
        key: '/v1/publications/GOV-12999/list?dimension=rna_plate_mber',
      },
      {
        title: 'v1/publications/GOV-12999/list?dimension=data_model_version',
        value: 'v1/publications/GOV-12999/list?dimension=data_model_version',
        key: 'v1/publications/GOV-12999/list?dimension=data_model_version',
      },
      {
        title: '/v1/publications/GOV-12999/list?dimension=ws',
        value: '/v1/publications/GOV-12999/list?dimension=ws',
        key: '/v1/publications/GOV-12999/list?dimension=ws',
      },
      {
        title: '/v1/publications/GOV-12999/filter?variant_detection_ind=CONFIRMED',
        value: '/v1/publications/GOV-12999/filter?variant_detection_ind=CONFIRMED',
        key: '/v1/publications/GOV-12999/filter?variant_detection_ind=CONFIRMED',
      },
      {
        title: '/v1/publications/GOV-12999/filter?variant_detection_ind=POSSIBLE',
        value: '/v1/publications/GOV-12999/filter?variant_detection_ind=POSSIBLE',
        key: '/v1/publications/GOV-12999/filter?variant_detection_ind=POSSIBLE',
      },
      {
        title: '/v1/publications/GOV-12999/filter?variant_detection_ind=CONFIRMED&variant_name=B.1.1.529-BA.1',
        value: '/v1/publications/GOV-12999/filter?variant_detection_ind=CONFIRMED&variant_name=B.1.1.529-BA.1',
        key: '/v1/publications/GOV-12999/filter?variant_detection_ind=CONFIRMED&variant_name=B.1.1.529-BA.1',
      },
      {
        title: '/v1/publications/GOV-12999/filter?variant_detection_ind=CONFIRMED&variant_name=B.1.1.529-BA.1&ww_site_code=TW-*',
        value: '/v1/publications/GOV-12999/filter?variant_detection_ind=CONFIRMED&variant_name=B.1.1.529-BA.1&ww_site_code=TW-*',
        key: '/v1/publications/GOV-12999/filter?variant_detection_ind=CONFIRMED&variant_name=B.1.1.529-BA.1&ww_site_code=TW-*',
      },
    ],
  },
  {
    title: '/v1/publications/GOV-12698',
    value: '/v1/publications/GOV-12698',
    key: '/v1/publications/GOV-12698',
    children: [{
		title: '/v1/publications/GOV-12698/details',
        value: '/v1/publications/GOV-12698/details',
        key: '/v1/publications/GOV-12698/details',
      },
      {
        title: '/v1/publications/GOV-12698/dimensions',
        value: '/v1/publications/GOV-12698/dimensions',
        key: '/v1/publications/GOV-12698/dimensions',
      },
      {
        title: '/v1/publications/GOV-12698/dimensions/sample-insights',
        value: '/v1/publications/GOV-12698/dimensions/sample-insights',
        key: '/v1/publications/GOV-12698/dimensions/sample-insights',
      },
	  {
        title: '/v1/publications/GOV-12698/list?dimension=cases',
        value: '/v1/publications/GOV-12698/list?dimension=cases',
        key: '/v1/publications/GOV-12698/list?dimension=cases',
      },
	  {
        title: '/v1/publications/GOV-12698/list?dimension=date',
        value: '/v1/publications/GOV-12698/list?dimension=date',
        key: '/v1/publications/GOV-12698/list?dimension=date',
      },
    ],
  },
];
export default ({
	components:{
	},
	computed: {
		...mapState("ww", ["results","contentType"]),

	},
	watch: {
		linkTreeValue(n,o) {
			/*
				console.log("n",n,this.selectedContentType)
				console.log("o",o,this.selectedContentType)
			*/

			if(n == undefined) return

			//if(n !== undefined || n != null || n.length == 0) {
			this.$store.dispatch("ww/getResults",{ path: n, contentType: this.selectedContentType});
			//}
		}
	},
	data() {
		return {
			host: process.env.VUE_APP_API_KEY,
			contentTypes : CONTENTTYPES,
			selectedContentType : "application/json",
			linkTreeData: LINKTREEDATA,
			linkTreeValue: ""
		}
	},
	methods: { 
		onContentTypeSelect(e) {
			this.selectedContentType = e.target.value
		}
	}
})

</script>

<style lang="scss">
</style>
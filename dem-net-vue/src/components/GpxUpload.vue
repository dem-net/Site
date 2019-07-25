<template>
    <section>
        <b-notification v-show="demErrors"
            type="is-warning"
            has-icon
            icon-pack="fas"
            aria-close-label="Close notification"
            role="alert">
            Application cannot connect to back-end server. Please try again later.
       {{ demErrors }}
        </b-notification>
    <b-field class="file">
        <b-upload v-model="file">
            <a class="button is-primary">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
            </a>
        </b-upload>
        <span class="file-name" v-if="file">
            {{ file.name }}
        </span>
    </b-field>
    
    <b-button @click="upload" :disabled="!file">Generate report</b-button>
    </section>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'GpxUpload',
        components: {  },
        data() {
            return {
                file: null,
                gpxElevation: null,
                demErrors: null
            }
        },
        methods: {
            upload(){
                let formData = new FormData();
                formData.append('file', this.file);
                axios.post("/api/elevation/gpx/geojson?dataset=AW3D30&reduceResolution=0",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                ).then(result => {
                    this.gpxElevation = result.data;
                    this.$emit('gpxElevationReceived', result.data);
                })
                .catch(err=> this.demErrors = err)
            }
        }
    }
</script>

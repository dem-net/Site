<template>
    <section>
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
        components: { axios },
        data() {
            return {
                file: null
            }
        },
        methods: {
            upload(){
                let formData = new FormData();
                formData.append('file', this.file);
                axios.post("/api/elevation/gpx/geojson",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                ).then(function(){
                console.log('SUCCESS!!');
                })
                .catch(function(){
                console.log('FAILURE!!');
                });
            }
        }
    }
</script>

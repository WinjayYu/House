<template>
    <form method="POST" action="localhost:8080/zaja/api/user/head">
        <div v-if="!image">
            <h2>Select an image</h2><input type="file"name="image" @change="onFileChange" multiple>
        </div>
        <div v-else>
            <img :src="image" />
            <button @click="removeImage">Remove image</button>
            <button type="submit">上传</button>
        </div>
    </form>
</template>


<script>
    import {baseUrl} from '../api/api'
    import Api from '../api/api'
    export default {
        data() {
            return {
                image: '',
                url : '/api/user/head',
            };
        },
//        methods: {
//            handleRemove(file, fileList) {
//                console.log(file, fileList);
//            },
//            handlePreview(file) {
//                console.log(file);
//            },
//
//        }
        methods: {
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
                let params = {
                    image : this.image
                }
//                Api.headUpload(params).then(response => {
//                    if (response.data.status !== 0) {
//                        this.$notify({
//                            title: '错误',
//                            message: "上传失败！",
//                            type: 'error'
//                        });
//                    } else {
//
//                    }
//
//                }).catch((e) => {
//                });
            },
            removeImage: function (e) {
                this.image = '';
            },
            updateProfilePic: function() {
                var picture = this.image;

                this.$http.post("http://localhost/zaja/api/user/head" , picture, function() {
                    //Do Something
                    console.log("yaya");
                },err => {

                }).catch((e) => {
                    console.log("kkk");
                });
            }
        }
    }
</script>

<style>
    img {
        width: 30%;
        margin: auto;
        display: block;
        margin-bottom: 10px;
    }
</style>
<template>
    <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/zaja/api/user/head"
            :show-file-list="false"
            :on-success="handleAvatarScucess"
            :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <input type="hidden" name="userId" value="1005">
    </el-upload>

</template>


<script>
    export default {
        data() {
            return {
                imageUrl: ''
            };
        },
        methods: {
            handleAvatarScucess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>



<!--
<template>

    <form action="http://localhost:8080/zaja/api/user/head" method="post" enctype="multipart/form-data">
        <label>头 像</label><input type="file" name="image"/><br/>
        <input type="submit" value="submit">
    </form>
</template>

<script>

</script>

<style scoped>

</style>-->

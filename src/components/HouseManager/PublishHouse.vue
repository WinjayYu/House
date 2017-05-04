<template>
    <el-tabs>
        <el-form :model="publishHouse"  ref="house" class="publish" enctype="multipart/form-data">
            <el-form-item label="标题">
                <el-input v-model="publishHouse.title" required></el-input>
            </el-form-item>

                 <el-form-item>
                        <span style="color: #5e6d82">房屋图片</span><span class="tip">至少一张</span>
                        <div  v-bind:class="{active:publishHouse.imgs[0]}">
                            <label class="lab" for="img1">图片1</label><input id="img1" type="file" @change="upload(1,$event)" required="true"/>
                            <img v-show="publishHouse.imgs[0]" class="showimg" id="showimg1" src="">
                        </div>
                        <div  v-bind:class="{active:publishHouse.imgs[1]}">
                            <label class="lab" for="img2">图片2</label><input id="img2" type="file" @change="upload(2,$event)"/>
                            <img v-show="publishHouse.imgs[1]" class="showimg" id="showimg2" src="">
                        </div>
                        <div  v-bind:class="{active:publishHouse.imgs[2]}">
                            <label class="lab" for="img3">图片3</label><input id="img3" type="file" @change="upload(3,$event)"/>
                            <img v-show="publishHouse.imgs[2]" class="showimg" id="showimg3" src="">
                        </div>
                        <div v-bind:class="{active:publishHouse.imgs[3]}">
                            <label class="lab" for="img4">图片4</label><input id="img4" type="file" @change="upload(4,$event)"/>
                            <img v-show="publishHouse.imgs[3]" class="showimg" id="showimg4" src="">
                        </div>
                        <div  v-bind:class="{active:publishHouse.imgs[4]}">
                            <label class="lab" for="img5">图片5</label><input id="img5" type="file" @change="upload(5,$event)"/>
                            <img v-show="publishHouse.imgs[4]" class="showimg" id="showimg5" src="">
                        </div>
                 </el-form-item>


            <el-form-item label="标签">
                <el-input v-model="publishHouse.tags" placeholder="多个标签用'|'分隔,如:地铁房|学区房"></el-input>
            </el-form-item>

            <el-form-item label="价格">
                <el-input v-model.number="publishHouse.price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="面积">
                <el-input v-model.number="publishHouse.area" type="number"></el-input>
            </el-form-item>
            <el-form-item label="样式">
                <el-radio class="radio" v-model="publishHouse.layout" label="1室1厅1卫">1室1厅1卫</el-radio>
                <el-radio class="radio" v-model="publishHouse.layout" label="2室1厅1卫">2室1厅1卫</el-radio>
                <el-radio class="radio" v-model="publishHouse.layout" label="3室1厅1卫">3室1厅1卫</el-radio>
                <el-radio class="radio" v-model="publishHouse.layout" label="2室1厅2卫">2室1厅2卫</el-radio>
            </el-form-item>
            <el-row>
                <el-form-item label="年限">
                    <el-input v-model.number="publishHouse.year" type="number"></el-input>
                </el-form-item>
            </el-row>
            <el-form-item label="装修程度">
                <el-input v-model="publishHouse.renovation" style="width: 370px"></el-input>
            </el-form-item>
            <el-form-item label="朝向">
                <el-input v-model="publishHouse.orientation" ></el-input>
            </el-form-item>
            <!--<el-form-item label="楼层">-->
                <!--<el-input v-model="publishHouse.floor" ></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="楼层">
                <el-select :value="publishHouse.floor" @input="recordUserData('floor', $event)" placeholder="请选择">
                    <el-option
                            v-for="item in floors"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="特色">
                <el-input v-model="publishHouse.feature" ></el-input>
            </el-form-item>
            <el-form-item label="城市">
                <el-input v-model="publishHouse.city" placeholder="目前仅支持武汉地区"></el-input>
            </el-form-item>
            <!--<el-form-item label="小区">-->
            <!--<el-input v-model="publishHouse.community.title" style="margin-left:15px; width:70%"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="小区">
                <el-select :value="publishHouse.uid" @input="recordUserData('uid', $event)" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即发布</el-button>
                <el-button>取消</el-button>
            </el-form-item>

        </el-form>
    </el-tabs>
</template>


<script>
    import Vue from 'vue'
    import {baseUrl} from '../../api/api'
    import Api from '../../api/api'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        data() {
            return {
                newImg: '',
            }
        },
        computed: {
            ...mapGetters({
                options: 'options',
                publishHouse: 'publishHouse',
                floors: 'floors',
                rules2: 'rules2'
            }),
        },
        created() {
            var _this = this;
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);

                if((user.type !== '20') && (user.type !== '30')){
                    this.$notify({
                        title: '提示',
                        message: "您不是经纪人，没有权限发布房源！",
                        type: 'error'
                    });
                    setTimeout(function(){_this.$router.push('/House')}, 3000);
                }
                this.publishHouse.agentId = user.id;
            }else {
                this.$notify({
                    title: '提示',
                    message: "发布房源请先登录！",
                    type: 'error'
                });
                setTimeout(function(){_this.$router.push('/login')}, 3000);
            }
        },
        methods: {
            // 根据输入数据的类型存储用户输入信息
            recordUserData (name, value) {
                this.$store.commit('recordUserData', {
                    name: name,
                    value: value
                })
            },
            upload(num, e) {

                var previewer = document.getElementById("showimg" + num);
                var reader = new FileReader();
                reader.onload = function (evt) {
                    var result = this.result;

                    previewer.src = evt.target.result;
                };
                reader.readAsDataURL(e.target.files[0])

                this.$store.commit('setImgs', {
                    num: num,
                    value: e.target.files[0]
                });
            },
            onSubmit (formName) {
                this.$store.dispatch('submitHouse').then(data => {
                    console.log(data);
                    this.$router.push('/House');
                })
//            onSubmit: function () {
//                let arrImg = new Array(this.img.img1, this.img.img2, this.img.img3, this.img.img4, this.img.img5);
//                this.publishHouse.imgs = arrImg;
//                Api.publishHouse(this.publishHouse).then(response => {
//                    let _this = this;
//                    if (response.data.status !== 0) {
//                        this.$notify({
//                            title: '错误',
//                            message: "发布失败！",
//                            type: 'error'
//                        });
//                    } else {
//                        _this.$router.replace('/House');
//                    }
//
//                }).catch((e) => {
//                    this.$notify({
//                        title: '错误',
//                        message: "出错了！",
//                        type: 'error'
//                    });
//                });
//            }
//        },
//        created() {
//            var user = sessionStorage.getItem('user');
//            if (user) {
//                user = JSON.parse(user);
//                console.log(user.username +"-llll");
//                this.form.id = user.id;
//                this.form.username = user.username;
//                this.form.head = user.head;
//                this.form.sex = user.sex;
//            }
//        }
            }
        }
    }
</script>

<style scoped>

    .el-form {
        width: 60%;
        padding: 35px 35px 15px 35px;
        /*margin:  100px 0 0 300px;*/
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.3), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        border-radius: 5px;
        margin: 120px auto;
    }

    .publish {
        top: 0;
        margin-top: 0;
    }

    .btn-file {
        position: relative;
        overflow: hidden;
        color: #73ccff;
    }

    .btn-file input[type=file] {
        position: absolute;
        top: 0;
        right: 0;
        min-width: 100%;
        min-height: 100%;
        font-size: 100px;
        text-align: right;
        filter: alpha(opacity=0);
        opacity: 0;
        outline: none;
        background: #73ccff;
        cursor: inherit;
        display: block;

    }

    .active{
        color:red;
    }

    .lab{
        margin-left: 50px;
    }

    .showimg {
        width: 300px;
        margin-left: 90px;
        display: block;
    }

    .tip {
        transition: background-color 0.3s ease;
        border-color: rgba(0, 0, 0, 0.34902);
        background-color: rgb(214, 235, 217);
        font-size: 12px;
        font-family: Consolas, monospace, serif;
        color: #0889dd;
        white-space: nowrap;
        padding: 0 4px;
        border: 1px solid #dddddd;
        border-radius: 3px;
        background: #fafafa;
    }

    .el-input{
        width: 400px;
        vertical-align:middle;
    }

    .el-tabs {
        margin-left: 200px;
    }
</style>
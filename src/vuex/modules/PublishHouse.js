/**
 * Created by 98882 on 2017/4/24.
 */
import Api from '../../api/api'
import { Message } from 'element-ui';

const state = {
    options: [{
        value: 'B001B0JIFI',
        label: '玉龙岛花园'
    }, {
        value: 'B001B0JIGT',
        label: '加州·香山美树'
    }, {
        value: 'B001B16UVE',
        label: '联投龙湾2期'
    }, {
        value: 'B001B171HI',
        label: '名城8090'
    }, {
        value: 'B0FFFFNMMR',
        label: '保利时代'
    }, {
        value: 'B001B0K7DH',
        label: '保利花园'
    }],
    img:{
        img1:'',
        img2:'',
        img3:'',
        img4:'',
        img5:'',
    },
    publishHouse: {
        title: '',
        imgs: [],
        tags: [],
        price: '',
        area: '',
        layout: '',
        type: '',
        status: '',
        year: '',
        renovation: '',
        orientation: '',
        floor: '',
        purpose: '',
        commission: '',
        feature: '',
        city: '',
        uid: '',
        agent: ''
    }
};

const getters = {
    options: state => state.options,
    publishHouse: state => state.publishHouse,
    rules2: state => state.rules
}

const mutations = {
    recordUserData: (state, mess) => {
      switch (mess.name) {
          case 'uid':
              state.publishHouse.uid = mess.value;
      }
      console.log(state.publishHouse.uid);
    },
    setImgs: (state, mess) => {
        state.publishHouse.imgs.push(mess.value);
    }
};

const actions =　{
    submitHouse:(context) => {
        var formData = new FormData();
        var imgArr = context.getters.publishHouse.imgs;
        // for(let i = 0; i < imgArr; i++){
        //     formData.append("imgs[]", imgArr[i]);
        // }
        formData.append("title", context.getters.publishHouse.title);
        formData.append("img1", context.getters.publishHouse.imgs[0]);
        formData.append("img2", context.getters.publishHouse.imgs[1]);
        formData.append("img3", context.getters.publishHouse.imgs[2]);
        formData.append("img4", context.getters.publishHouse.imgs[3]);
        formData.append("img5", context.getters.publishHouse.imgs[4]);
        formData.append("tags", context.getters.publishHouse.tags);
        formData.append("price", context.getters.publishHouse.price);
        formData.append("area", context.getters.publishHouse.area);
        formData.append("layout", context.getters.publishHouse.layout);
        formData.append("type", context.getters.publishHouse.type);
        formData.append("status", context.getters.publishHouse.status);
        formData.append("year", context.getters.publishHouse.year);
        formData.append("renovation", context.getters.publishHouse.renovation);
        formData.append("orientation", context.getters.publishHouse.orientation);
        formData.append("floor", context.getters.publishHouse.floor);
        formData.append("purpose", context.getters.publishHouse.purpose);
        formData.append("commission", context.getters.publishHouse.commission);
        formData.append("feature", context.getters.publishHouse.feature);
        formData.append("city", context.getters.publishHouse.city);
        formData.append("uid", context.getters.publishHouse.uid);
        formData.append("agent", context.getters.publishHouse.agent);
        console.log(formData);
        Api.publishHouse(formData).then(response => {
            let _this = this;
            if (response.data.status !== 0) {
                Message.error({
                    title: '错误',
                    message: "发布失败！",
                    type: 'error'
                });
            } else {
                _this.$router.replace('/House');
            }

        }).catch((e) => {
            Message.error({
                title: '错误',
                message: "出错了！",
                type: 'error'
            });
        });
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

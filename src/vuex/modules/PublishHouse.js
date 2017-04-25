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
    value: '',
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
        price: 0,
        area: 0,
        layout: '',
        type: '',
        status: '',
        year: '',
        renovation: '',
        orientation: '',
        floor: '',
        purpose: '',
        commission: 0,
        feature: '',
        city: '',
        community: {},
        agent: {}
    },
    rules2: {
        img1: [
            { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        img2: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        img3: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        img4: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        img5: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
    },
};

const getters = {
    options: state => state.options,
    publishHouse: state => state.publishHouse,
    rules2: state => state.rules
}

const mutations = {
    recordUserData: (state, mess) => {
        switch (mess.inputname) {
            case 'title':
                state.publishHouse.title = mess.data;
                break;
            case 'imgs':
                state.publishHouse.imgs.push(mess.data);
                break;
            case 'tags':
                state.publishHouse.tags = mess.data;
                break;
            case 'price':
                state.publishHouse.price = mess.data;
                break;
            case 'area':
                state.publishHouse.area = mess.data;
                break;
            case 'layout':
                state.publishHouse.layout = mess.data;
                break;
            case 'type':
                state.publishHouse.type = mess.data;
                break;
            case 'status':
                state.publishHouse.status = mess.data;
                break;
            case 'year':
                state.publishHouse.year = mess.data;
                break;
            case 'renovation':
                state.publishHouse.renovation = mess.data;
                break;
            case 'orientation':
                state.publishHouse.orientation = mess.data;
                break;
            case 'floor':
                state.publishHouse.floor = mess.data;
                break;
            case 'purpose':
                state.publishHouse.purpose = mess.data;
                break;
            case 'commission':
                state.publishHouse.commission = mess.data;
                break;
            case 'feature':
                state.publishHouse.feature = mess.data;
                break;
            case 'city':
                state.publishHouse.city = mess.data;
                break;
            case 'community':
                state.publishHouse.community = mess.data;
                break;
            case 'agent':
                state.publishHouse.agent = mess.data;
                break;
        }
    },
    setImgs: (state, mess) => {
        state.publishHouse.imgs.push(mess.value);
        // console.log(mess);
         console.log(state.publishHouse.imgs);
    }
};

const actions =　{
    submitHouse:(context) => {
        console.log(context.getters.publishHouse);
        Api.publishHouse(context.getters.publishHouse).then(response => {
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

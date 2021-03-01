import '../styles/common.styl';

import database from '../views/data-manage/database/index.vue';



var routersInfo = {
	routes: [
        {
            path: '/database/:dsId/:name',
            name: "database",
            component: database,
            meta: { title: "全局设置-数据库管理" }
        }
	]
};

export default routersInfo


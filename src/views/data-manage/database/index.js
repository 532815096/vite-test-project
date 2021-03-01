export default {
    name: 'source-db-detail',
    data() {
        return {
            dsId: this.$route.params.dsId,
            name: this.$route.params.name,
            createDBShow: false,
            deleteShow: false,
            sendLoading: false,
            publishShow: false,
            select: {
                time: '',
                search: '',
                status: ''
            },
            dbList: [],
            page: {
                num: 1,
                size: 10,
                total: 10
            },
            deleteObj: {
                id: []
            },
            publishObj: {
                ids: [],
                operateType: '',
            },
            createDB: {
                type: 'create',
                title: '创建数据库',
                id: '',
                name: '',
                dbChsName: '',
                dbComment: ''
            },
        }
    },
    components: {
        // SelectMore
    },
    mounted() {
        //this.createFormShow = true;

    },
    created() {
        this.getList();
    },
    watch: {
        'select.time': function (val) {
            this.getList();
        }
    },
    methods: {
        //关闭dialog
        cancel() {
            this.deleteShow = false;
            this.createDBShow = false;
            this.publishShow = false;
            this.initData();
        },
        //初始化form数据
        initData() {
            this.deleteObj = {
                id: []
            };

            this.createDB = {
                type: 'create',
                title: '创建数据库',
                id: '',
                name: '',
                dbChsName: '',
                dbComment: ''
            };

            this.publishObj = {
                ids: [],
                operateType: '',
            }
        },
        showMessage(type, msg) {
            this.$message[type](msg, 10000);
        },
        //数据库列表
        getList(type = '') {
            if (type == 'search') {
                this.page = {
                    num: 1,
                    size: 10,
                    total: 0
                };
            }
            this._request({
                url: '/i/damDs/db/list',
                method: 'post',
                data: {
                    dsId: this.dsId,
                    name: this.select.search,
                    createTime: this.select.time,
                    status: this.select.status,
                    pageParam: {
                        page: this.page.num,
                        pageSize: this.page.size
                    }
                }
            }).then(res => {
                if (res.body.status == 200) {
                    this.dbList = res.body.result;
                    let pagination = res.body.pagination;
                    this.page = {
                        num: pagination.page,
                        size: pagination.pageSize,
                        total: pagination.totalRecord
                    }
                }
            })
        },
        changeFilter(obj) {
            if (obj.key == 'status') {
                this.select.status = obj.value == 'all' ? null : obj.value;
            }
            this.getList('search');
        },
        //删除数据库
        deleteDb() {
            this._request({
                url: '/i/damDs/db',
                method: 'delete',
                params: {
                    ids: this.deleteObj.id.join()
                }
            }).then(res => {
                if (res.body.status == 200) {
                    this.getList();
                    this.cancel();
                    this.showMessage('success', '删除成功!')
                } else {
                    this.showMessage('error', res.body.message);
                }
            })
        },
        //获取库详情
        getDetail(id) {
            this._request({
                url: `/i/damDs/db/${id}`,
                method: 'post',
            }).then(res => {
                if (res.body.status == 200) {
                    let data = res.body.result;

                    this.createDB = {
                        title: '编辑数据库',
                        type: 'edite',
                        id: id,
                        name: data.dbName,
                        dbChsName: data.dbChsName,
                        dbComment: data.dbComment
                    };
                    this.createDBShow = true;
                } else {
                    this.showMessage('error', res.body.message);
                }
            })
        },
        //创建/编辑数据库
        createDBFn() {
            this.$refs.DB.validate().then(res => {
                if (res) {
                    let data = {
                        dsId: this.dsId,
                        name: this.createDB.name,
                        chnName: this.createDB.dbChsName,
                        description: this.createDB.dbComment
                    };
                    if (this.createDB.type == 'edite') {
                        data.id = this.createDB.id
                    }
                    this.sendLoading = true;
                    this._request({
                        url: '/i/damDs/db',
                        method: 'post',
                        data: data
                    }).then(res => {
                        this.sendLoading = false;
                        if (res.body.status == 200) {
                            let msg = '创建成功!';
                            if (this.createDB.type == 'edite') {
                                msg = '编辑成功!';
                            }
                            this.getList();
                            this.showMessage('success', msg);
                            this.cancel();
                            this.initData();
                        } else {
                            this.showMessage('error', res.body.message);
                        }
                    })
                } else {
                    // this.showMessage('error', '请完善表单!');
                }
            });
        },
        //发布/下线
        publishOrOffline() {
            this._request({
                url: '/i/damDs/db/apply',
                method: 'POST',
                data: {
                    ids: this.publishObj.ids.join(),
                    operateType: this.publishObj.operateType
                }
            }).then(res => {
                if (res.body.status == 200) {
                    this.getList();
                    this.cancel();
                    this.showMessage('success', '操作成功!')
                } else {
                    this.showMessage('error', res.body.message);
                }
            })
        },
        //显示发布/下线弹窗
        showPublish(id, type){
            this.publishObj.ids.push(id);
            this.publishObj.operateType = type;
            this.publishShow = true;
        },
        //显示删除弹窗
        showDeleteDailog(id) {
            this.deleteShow = true;
            this.deleteObj.id.push(id);
        },
        //切换页码
        changePage({current, limit}) {
            this.page.num = current;
            this.page.size = limit;
            this.getList();
        }
    }
}

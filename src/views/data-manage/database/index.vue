<!-- 数据源管理 -->
<template>
    <div class="ds-manage-container">
        <div class="ds-manage-content">
            <div class="functional-bar">
                <div class="functional-bar-btns">
                    <Button type="none" size="small">
                        <a href="#/datasource"
                           title="返回"
                           class="ksicon-xingzhuangjiehe functional-bar-back"></a>
                        {{ name }}
                    </Button>
                    <Button type='primary'
                            @click="createDBShow = true"
                            size="small">添加数据库
                    </Button>
                </div>
                <div class="functional-bar-other">
                    <div class="functional-bar-select small-picker">
                        <div class="functional-bar-label">创建时间:</div>
                        <Datepicker range v-model="select.time" type="date"/>
                    </div>

                    <Input placeholder="输入库名称"
                           v-model.trim="select.search"
                           @enterEvent="getList('research')">
                        <template slot="suffix">
                            <i class="ksfont ksicon-sousuo"
                               @click="getList('research')"></i>
                        </template>
                    </Input>

                    <button class="functional-bar-reload">
                        <i class="ksfont ksicon-shuaxin"
                           @click="getList"></i>
                    </button>

                </div>
            </div>

            <div class="as-main-content">
                <Table :data="dbList" ref="table" :overFlowAuto="false" checkbox-type="none" @groupChange="changeFilter"
                       columnDisplayAutoClose>
                    <TableColumn title="数据库名称">
                        <template slot-scope="scope">
                            <p style="color: #4c4c4c">{{ scope.name }}</p>
                            <p style="color: rgba(76,76,76,0.60)">{{ scope.cnsName }}</p>
                        </template>
                    </TableColumn>
                    <TableColumn title="状态"
                                 props="status"
                                 orderAutoClose
                                 :group="[
                                    {label: '新建', value: 10},
                                    {label: '已发布', value: 20},
                                    {label: '已下线', value: 30}
                                    ]"
                    />
                    <TableColumn title="表信息" orderAutoClose>
                        <template slot-scope="scope">
                            <p v-if="scope.metaInfor"
                               v-for="item, key in scope.metaInfor">
                                {{ key }} : {{ item }}
                            </p>
                        </template>
                    </TableColumn>
                    <TableColumn title="创建信息" orderAutoClose>
                        <template slot-scope="scope">
                            <p style="color: #4c4c4c">{{ scope.createUser }}</p>
                            <p style="color: rgba(76,76,76,0.60)">{{ scope.createTime }}</p>
                        </template>
                    </TableColumn>
                    <TableColumn title="描述" props="description" orderAutoClose/>
                    <TableColumn title="操作" orderAutoClose>
                        <template slot-scope="scope">
                            <A @click="getDetail(scope.id)">编辑</A>
                            <A @click="showPublish(scope.id, 'publish')">发布</A>
                            <A @click="showPublish(scope.id, 'offline')">下线</A>
                            <A @click="showDeleteDailog(scope.id)">删除</A>
                        </template>
                    </TableColumn>
                </Table>

                <div class="bd-common-pagination" v-if="dbList.length > 0">
                    <Pagination :total="page.total"
                                :current="page.num"
                                :limit="page.size"
                                @change="changePage"
                                size="mini"/>
                </div>
            </div>
        </div>

        <div class="send-ajax-loading" v-if="sendLoading">
            <Spin text="请求中..." center></Spin>
        </div>

    </div>

</template>
<script>
import Js from './index.js';

export default Js;
</script>
<style scoped>
@import "index.css";
</style>

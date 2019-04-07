<!--
 * @Description: 参数组件
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-04-06 21:00:28
 * @LastEditTime: 2019-04-07 22:36:13
 -->
 <template>
    <div class="main">
        <div class="parameter">
            <row :gutter="5">
                <i-col span="5">
                    <i-input placeholder="参数名" v-model="data.name" />
                </i-col>
                <i-col span="5">
                    <i-select placeholder="类型" v-model="data.cate">
                        <i-option value="String">String</i-option>
                        <i-option value="Object">Object</i-option>
                        <i-option value="Array">Array</i-option>
                        <i-option value="Number">Number</i-option>
                    </i-select>
                </i-col>
                <i-col span="5">
                    <i-input placeholder="描述" v-model="data.describe" />
                </i-col>
                <i-col span="3">
                    <i-input placeholder="默认值" v-model="data.default" />
                </i-col>
                <i-col span="3">
                    <i-select placeholder="是否必填" v-model="data.require">
                        <i-option value="on">是</i-option>
                        <i-option value="off">否</i-option>
                    </i-select>
                </i-col>
                <i-col span="3">
                    <div style="text-align:right;">
                        <button-group>
                            <i-button
                                icon="md-add"
                                @click="handleClickAdd"
                            ></i-button>
                            <i-button
                                icon="md-close"
                                @click="handleClickDelete(data.id)"
                            ></i-button>
                        </button-group>
                    </div>
                </i-col>
            </row>
            <div class="child">
                <tree-node
                    :data="item"
                    v-for="(item, index) in data.property"
                    :key="index"
                    @on-delete="handleClickDelete"
                />
            </div>
        </div>
    </div>
</template>
 <script>
export default {
    name: 'TreeNode',
    props: {
        data: [Object]
    },
    data() {
        return {

        }
    },
    methods: {
        //点击添加子属性
        handleClickAdd() {
            if (this.data.cate !== "Object"&&this.data.cate !== "Array") {
                this.$Message.info("非集合（对象）类型不能添加子元素（属性）")
                return
            }
            let id = this.data.id + (this.data.property.length + 1)
            this.data.property.push({
                id: id,
                name: '',
                cate: '',
                default: '',
                describe: '',
                require: '',
                property: []
            })
        },
        //删除方法
        handleClickDelete(id) {
            this.$emit("on-delete", id)
        }
    }
}
 </script>
 <style lang="less" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    .parameter {
        width: 100%;
        padding-top: 5px;
        .child {
            padding-left: 20px;
        }
    }
}
</style>
 
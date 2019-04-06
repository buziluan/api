<!--
 * @Description: 参数组件
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-04-06 21:00:28
 * @LastEditTime: 2019-04-06 21:52:37
 -->
 <template>
    <div class="main">
        <p>{{data.name}}</p>
        <tree-node :data="item" v-for="item in data.child" :key="item.name" />
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
    }
}
 </script>
 <style lang="less" scoped>
.main {
    padding: 20px;
    width: 100%;
    .child {
        padding: 20px;
    }
}
</style>
 
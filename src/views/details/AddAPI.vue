<!--
 * @Description: 新增接口
 * @Author: 房旭
 * @LastEditors: 房旭
 * @Date: 2019-04-02 18:14:03
 * @LastEditTime: 2019-04-02 19:52:59
 -->
<template>
    <div class="add-content">
        <i-form label-position="top">
            <row :gutter="20">
                <i-col span="12">
                    <form-item label="接口描述" class="formitem">
                        <i-input />
                    </form-item>
                </i-col>
                <i-col span="12">
                    <form-item label="接口路径" class="formitem">
                        <i-input>
                            <!-- <span slot="prepend">/</span> -->
                        </i-input>
                    </form-item>
                </i-col>
                <i-col span="12">
                    <form-item label="请求方法" class="formitem">
                        <i-select>
                            <i-option value="GET">GET</i-option>
                            <i-option value="POST">POST</i-option>
                            <i-option value="PUT">PUT</i-option>
                            <i-option value="DELETE">DELETE</i-option>
                        </i-select>
                    </form-item>
                </i-col>
                <i-col span="12">
                    <form-item label="所属模块" class="formitem">
                        <i-select>
                            <i-option value="2">sss</i-option>
                        </i-select>
                    </form-item>
                </i-col>
                <i-col span="12">
                    <form-item label="Content-Type" class="formitem">
                        <i-select>
                            <i-option value="2">sss</i-option>
                        </i-select>
                    </form-item>
                </i-col>
                <i-col span="24">
                    <collapse style="margin-bottom:20px;">
                        <panel name="1">
                            请求参数
                            <div slot="content" class="request-param">
                                
                            </div>
                        </panel>
                    </collapse>
                </i-col>
                <i-col span="24">
                    <collapse>
                        <panel name="1">
                            响应参数
                            <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
                        </panel>
                    </collapse>
                </i-col>
            </row>
        </i-form>
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="less" scoped>
    .add-content {
        width: 100%;
        padding: 10px;

        .formitem {
            width: 90%;
        }
        .request-param{
            width: 100%;
            height: 100px;
            background-color: wheat;
        }
        /deep/ .ivu-collapse-content{
            padding: 0;
        }
        /deep/ .ivu-collapse-content-box{
            padding: 0;
        }
    }
</style>
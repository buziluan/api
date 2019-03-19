<template>
    <div class="about">
        <h1>This is an about page</h1>
        {{name}}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                url: "https://www.easy-mock.com/mock/5c07450556b02a1aed875082/example"
            }
        },
        computed: {
            name() {
                return this.$store.state.name
            }
        },
        created() {
            this.test()
            this.test1()
        },
        methods: {
            async test() {
                let res = await this.$http.get(this.url + '/gettest1');
                console.log(res)
            },
            async test1() {
                let res = await this.$http.get(this.url + '/gettest');
                console.log(res)
            }
        }
    }
</script>
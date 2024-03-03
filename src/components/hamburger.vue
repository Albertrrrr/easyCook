<template>
    <ul class="hamburger flex w">
        <li @click="avtive = i" v-for="(item, i) in tabs" :key="i" :class="{ 'avtive': avtive == i }">
            {{ item.text }}
            <i class="el-icon-arrow-down "></i>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            avtive: 0,
            tabs: [
                {
                    text: 'Home'
                },
                {
                    text: 'Shop'
                },
                {
                    text: 'About Us'
                }
            ]
        }
    },
    created() { },
    mounted() { },
    methods: {}
}
</script>

<style scoped lang="scss">
.hamburger {
    padding: 27px 0;

    li {
        margin-right: 36px;
        color: rgb(102, 102, 102);
        font-family: Poppins;
        font-size: 20px;
        font-weight: 400;
        cursor: pointer;
    }

    li:hover {
        color: #2c742f;
    }

    .avtive {
        color: #2c742f;
    }

}
</style>

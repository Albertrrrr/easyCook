<template>
    <div class="footer">
        <footer class="flex row-between">
            <div class="item flex" v-for="(item, i) in footerList" :key="i">
                <img :src="item.icon" alt="">
                <div class="right">
                    <div class="title">{{ item.title }}</div>
                    <div class="msg">{{ item.text }}</div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            footerList: [
                {
                    icon: require('@/assets/image/car.png'),
                    title: 'Free Shipping',
                    text: 'Free shipping on all your order'
                },
                {
                    icon: require('@/assets/image/shopping-bag.png'),
                    title: '100% Secure Payment',
                    text: 'We ensure your money is save'
                }, {
                    icon: require('@/assets/image/vector.png'),
                    title: 'Money-Back Guarantee',
                    text: '30 Days Money-Back Guarantee'
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
.footer {
    padding: 60px 0;

    footer {
        border-radius: 8px;
        box-shadow: 0px 8px 40px 0px rgba(0, 38, 3, 0.08);
        background: rgb(255, 255, 255);
        padding: 40px;
        box-sizing: border-box;

        .item {
            font-family: Poppins;

            img {
                width: 40px;
                height: 40px;
                object-fit: contain;
                margin-right: 16px;
            }

            .title {
                color: rgb(26, 26, 26);
                font-size: 16px;
                font-weight: 600;
            }

            .msg {
                color: rgb(153, 153, 153);
                font-size: 14px;
                font-weight: 400;
            }
        }
    }
}
</style>

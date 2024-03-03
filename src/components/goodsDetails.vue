<template>
    <div class="goods">
        <img src="@/assets/image/goods.png" class="cover">
        <div class="right">
            <div class="nameBox flex">
                <div class="name">Chinese Cabbage</div>
                <div class="nameTag">In Stock</div>
            </div>
            <div class="priceBox flex">
                <!--<div class="original">$48.00 </div>-->
                <div class="price"> $8.00</div>
                <!--<div class="priceTag">64% Off</div>-->
            </div>
            <div class="msg">
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam,
                blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.
            </div>
            <div class="numberBox flex">
                <div class="inputNumber flex">
                    <div class="btn" @click="reduce"> <i class="el-icon-minus"></i> </div>
                    <div class="input">{{ value }}</div>
                    <div class="btn" @click="add"> <i class="el-icon-plus"></i> </div>
                </div>
                <el-button type="success" class="flex-1" round>
                    <span>Add to Cart</span>
                    <i class="el-icon-goods"></i>
                </el-button>
            </div>

            <div class="cell">
                <div class="label">Category:</div>
                <div class="value">Vegetables</div>
            </div>

            <div class="cell">
                <div class="label">Tag:</div>
                <div class="value flex flex-wrap">
                    <div v-for="(item, i) in tags" :key="i" :class="{ link: item.type == 'link' }">
                        {{ item.text }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: 10,
            tags: [
                {
                    text: 'Vegetables',
                    type: 'text'
                },
                {
                    text: 'Healthy',
                    type: 'text'
                },
                {
                    text: 'Chinese',
                    type: 'link'
                },
                {
                    text: 'Healthy',
                    type: 'text'
                }
            ]
        }
    },
    methods: {
        /**
         * @description: 减少商品
         */
        reduce() {
            if (this.value == 1) return
            this.value--;
        },
        /**
         * @description: 添加商品
         */
        add() {
            this.value += 1;
        }
    }
}
</script>

<style scoped lang="scss">
.goods {
    width: 100%;
    height: 100%;
    padding: 40px 40px 40px 130px;
    display: flex;
    font-family: Poppins;

    .cover {
        width: 556px;
        height: 556px;
    }

    .right {
        width: calc(100% - 556px);
        padding-left: 24px;

        .nameBox {
            color: rgb(26, 26, 26);
            font-size: 36px;
            font-weight: 600;
            margin-bottom: 20px;

            .nameTag {
                border-radius: 4px;
                background: rgba(32, 181, 38, 0.2);
                padding: 8px 4px;
                /* Body Small/Body Small, 400 */
                color: rgb(44, 116, 47);
                font-size: 14px;
                font-weight: 400;
                margin-left: 8px;

            }
        }

        .priceBox {
            .original {
                color: rgb(179, 179, 179);
                font-size: 20px;
                font-weight: 400;
                text-decoration-line: line-through;
            }

            .price {
                color: rgb(44, 116, 47);
                font-size: 24px;
                font-weight: 500;
                margin-left: 3px;
            }

            .priceTag {
                padding: 3px 10px;
                color: rgb(234, 75, 72);
                font-size: 14px;
                font-weight: 500;
                border-radius: 100px;
                background: rgba(234, 75, 72, 0.1);
                margin-left: 12px;
            }
        }

        .msg {
            color: rgb(128, 128, 128);
            font-size: 14px;
            font-weight: 400;
            padding: 24px 0;
            border-top: 1px solid rgb(230, 230, 230);
            border-bottom: 1px solid rgb(230, 230, 230);
            margin-top: 20px;

        }

        .numberBox {
            padding: 18px 0;
            border-bottom: 1px solid rgb(230, 230, 230);
            margin-bottom: 24px;

            .el-icon-goods {
                margin-left: 16px;
                font-weight: 700;
            }

            .inputNumber {
                box-sizing: border-box;
                border: 1px solid rgb(230, 230, 230);
                border-radius: 170px;
                background: rgb(255, 255, 255);
                padding: 8px;
                margin-right: 12px;

                .input {
                    color: rgb(26, 26, 26);
                    font-size: 16px;
                    font-weight: 400;
                    text-align: center;
                    min-width: 40px;
                }

                .btn {
                    border-radius: 34px;
                    background: rgb(242, 242, 242);
                    width: 34px;
                    height: 34px;
                    font-size: 18px;
                    font-weight: 600;
                }
            }
        }

        .cell {
            color: rgb(26, 26, 26);
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            .label {
                margin-right: 4px;
            }

            .value {
                color: rgb(128, 128, 128);
                font-family: Poppins;
                font-size: 14px;
                font-weight: 400;

                div {
                    margin-right: 5px;
                }

                .link {
                    color: rgb(26, 26, 26);
                    font-size: 14px;
                    font-weight: 400;
                    text-decoration-line: underline;
                    cursor: pointer;
                }
            }

        }

    }
}
</style>

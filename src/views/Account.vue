<script>
import SecondaryMenu from '@/components/SecondaryMenu.vue'

export default {
  data() {
    return {
      formData: {
        firstName: ''

      },
      radio: '1',
      value: [],
      value1: [],
      options: [
        {
          value: 'zhinan',
          label: 'United Kindom',

        }],
      options1: [
        {
          value: 'zhinan',
          label: 'Scotland',

        },
        {
          value: 'zujian',
          label: 'England',
        }],
      checked: false
    }
  },
  methods: {
    onGoPlayOrder() {
      this.$router.push('/shoppingCart')
    }
  },
  components: {
    SecondaryMenu
  }
}
</script>

<template>
  <div>
    <SecondaryMenu/>
    <div class="account-container">
      <div class="account-area">
        <div class="account-left">
          <p class="acc-left-title">Billing Information</p>
          <el-form>
            <el-row :gutter="16" style="margin-bottom: 19px">
              <el-col :span="8">
                <div class="input-container">
                  <p class="input-label">First name</p>
                  <el-form-item>
                    <el-input v-model="formData.firstName" placeholder="Your first name"></el-input>
                  </el-form-item>
                </div>

              </el-col>
              <el-col :span="8">
                <div class="input-container">
                  <p class="input-label">Last name</p>
                  <el-form-item>
                    <el-input placeholder="Your last name"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>

            <el-row style="margin-bottom: 19px">
              <div class="input-container">
                <p class="input-label">Street Address</p>
                <el-form-item>
                  <el-input placeholder="Email"></el-input>
                </el-form-item>
              </div>
            </el-row>

            <el-row :gutter="16" style="margin-bottom: 19px">
              <el-col :span="8">
                <div class="input-container">
                  <p class="input-label">Country / Region</p>
                  <el-form-item>
                    <el-select v-model="value" placeholder="Select">
                      <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="input-container">
                  <p class="input-label">States</p>
                  <el-form-item>
                    <el-select v-model="value1" placeholder="Selects">
                      <el-option
                          v-for="item in options1"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="input-container">
                  <p class="input-label">Zip Code</p>
                  <el-form-item>
                    <el-input placeholder="Zip Code"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="16" style="margin-bottom: 24px">
              <el-col :span="12">
                <div class="input-container">
                  <p class="input-label">Email</p>
                  <el-form-item>
                    <el-input placeholder="Email Address"></el-input>

                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="input-container">
                  <p class="input-label">Phone</p>
                  <el-form-item>
                    <el-input placeholder="Phone number"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-checkbox v-model="checked">Ship to a different address</el-checkbox>
              </el-col>
            </el-row>
          </el-form>

          <div class="line-container"></div>

          <p class="acc-left-title">Additional Info</p>
          <p class="se-title">Order Notes (Optional)</p>
          <el-input type="textarea" placeholder="Notes about your order, e.g. special notes for delivery"></el-input>
        </div>
        <div class="account-right">
          <div class="account-right-main">
            <p class="right-title">Order Summery</p>

            <ul class="product-list">
              <li class="list-item">
                <div class="product-msg">
                  <img class="pro-img" src="../assets/images/qj.png">
                  <p class="pro-el" style="margin-right: 8px;">Green Capsicum</p>
                  <p>X5</p>
                </div>
                <div class="product-price">$70.00</div>
              </li>
              <li class="list-item">
                <div class="product-msg">
                  <img class="pro-img" src="../assets/images/hj.png">
                  <p class="pro-el" style="margin-right: 8px;">Red Capsicum</p>
                  <p>X5</p>
                </div>
                <div class="product-price">$14.00</div>
              </li>

            </ul>

            <div class="opts-item">
              <div class="opts-label">Subtotal:</div>
              <div class="opts-container">$84.00</div>
            </div>
            <div class="opts-item">
              <div class="opts-label">Shipping:</div>
              <div class="opts-container">Free</div>
            </div>
            <div class="opts-item" style="border-bottom: none;margin-bottom: 13.8px">
              <div class="opts-label">Total:</div>
              <div class="opts-container" style="font-weight: 600;font-size: 20px;">$84.00</div>
            </div>

            <p class="right-title">Payment Method</p>
            <ul class="radio-list">
              <li class="radio-item">
                <el-radio v-model="radio" label="1">Cash on Delivery
                </el-radio>
              </li>
              <li class="radio-item">
                <el-radio v-model="radio" label="2">Paypal</el-radio>
              </li>
              <li class="radio-item">
                <el-radio v-model="radio" label="3">Amazon Pay</el-radio>
              </li>
            </ul>

            <div class="place-btn">
              <!--@click="onGoPlayOrder"-->
              Place Order
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">


.account-container {
  padding: 60px 0 40px calc((100% - 1520px) / 8 * 5);

  .account-area {
    width: 1520px;
    display: flex;
    justify-content: space-between;


    .account-left {
      width: 65.8%;

      ::v-deep .el-checkbox__inner {
        width: 24px;
        height: 24px;
      }

      ::v-deep .el-textarea__inner {
        height: 115px;
        font-size: 18px;
        padding: 16px 18px;
      }

      ::v-deep .el-textarea__inner::placeholder {
        color: rgb(153, 153, 153);
        font-size: 18.4px;
      }

      ::v-deep .el-checkbox__inner::after {
        height: 14px;
        left: 8px;
        width: 6px;
      }

      ::v-deep .el-checkbox__label {
        color: rgb(77, 77, 77);
        font-size: 16px;
      }

      .line-container {
        margin: 38px 0;
        height: 1px;
        background-color: rgb(230, 230, 230);
      }

      .acc-left-title {
        color: rgb(26, 26, 26);
        font-size: 27.61px;
        font-weight: 500;
        margin-bottom: 23.4px;
      }

      .se-title {
        color: rgb(26, 26, 26);
        font-size: 16.1px;
        margin-bottom: 10px;

      }

      .input-container {
        .input-label {
          font-size: 16px;
          color: rgb(26, 26, 26);
          margin-bottom: 6px;
        }

        ::v-deep .el-form-item {
          margin-bottom: 0px;
        }

        ::v-deep .el-select {
          width: 100%;
        }

        ::v-deep .el-input__inner {
          border: 1px solid rgb(230, 230, 230);
          border-radius: 7px;
          height: 54px;
          font-size: 18.4px;
        }

        ::v-deep .el-input__inner::placeholder {
          color: rgb(153, 153, 153);
          font-size: 18.4px;
        }
      }
    }

    .account-right {
      width: 32.3%;

      .account-right-main {
        width: 100%;
        border: 1.15px solid rgb(230, 230, 230);
        padding: 27.6px;
        box-sizing: border-box;
        border-radius: 10px;
      }

      .right-title {
        color: rgb(26, 26, 26);
        font-size: 23px;
        font-weight: 500;
        margin-bottom: 16px;
      }

      .product-list {
        margin-bottom: 13.8px;

        .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgb(26, 26, 26);

          .product-msg {
            //background-color: #2c742f;
            flex: 1;
            display: flex;
            align-items: center;
            font-size: 16px;
            font-weight: 400;

            .pro-img {
              width: 69px;
              height: 69px;
              margin-right: 7px;
            }

            //.pro-el {
            //  background-color: red;
            //}
          }

          .product-price {
            margin-left: 6px;
            font-size: 16px;
            font-weight: 500;
          }

        }
      }

      .opts-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 13.8px 0;
        border-bottom: 1.15px solid rgb(230, 230, 230);
        box-sizing: border-box;

        .opts-label {
          color: rgb(77, 77, 77);
          font-size: 16.11px;
        }

        .opts-container {
          color: rgb(26, 26, 26);
          font-size: 16.11px;
          font-weight: 500;
        }

      }
    }

    .radio-list {
      .radio-item {
        margin-bottom: 13px;

        .is-checked {
          ::v-deep .el-radio__inner {
            border-color: rgb(0, 179, 7);
          }
        }

        &:last-child {
          margin-bottom: unset;
        }
      }

      ::v-deep .el-radio__label {
        color: rgb(77, 77, 77);
        font-size: 16px;
        font-weight: 400;
      }

      ::v-deep .el-radio__inner {
        width: 24px;
        height: 24px;
        background-color: #ffffff;

        &:hover {
          border-color: rgb(0, 179, 7) !important;
        }
      }

      .borderColor {
        border-color: rgb(0, 179, 7);
      }

      ::v-deep .el-radio__inner::after {
        width: 14px;
        height: 14px;
        background-color: rgb(0, 179, 7);
      }
    }

    .place-btn {
      height: 58.8px;
      color: rgb(255, 255, 255);
      font-size: 18.42px;
      font-weight: 600;
      border-radius: 80px;
      background: rgb(0, 179, 7);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-top: 27.6px;
    }
  }
}
</style>
<template>
  <main class="main-content">
  <section class="customer-welcome">
    <h3>Customer</h3>
    <p>Welcome!</p>
    <p>Hope you have a good experience with our shop!</p>

  </section>

</main>
</template>

<style scoped lang="scss">
  .main-content {
    width: 70%;

    background-color: #fff;
  border: 1px solid rgb(230, 230, 230);
    float:left;
  }
 .main-content .customer-welcome{
    width: 895px;
    height: 224px;
    left: 673px;
    top: 268px;
}
  .main-content section {

  padding: 20px;
  margin-bottom: 20px;
    background: rgb(255, 255, 255);
  }
  p{
    color: rgb(26, 26, 26);
    font-family: Poppins;
    font-size: 22px;
    font-weight: 500;
    line-height: 150%;
    text-align: left;
  }

  .customer-welcome h3,
  .billing-address h3 {
  color: #626262;
  margin-bottom: 5px;
  font-size: 25px;
  }


  button:hover {
  background-color: #45a049;
  }
</style>
<script setup>
</script>
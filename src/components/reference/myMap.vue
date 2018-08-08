<template>
  <div class="amap-page-container">
    <el-amap vid="amapDemo" :center="center" :amap-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo">
    </el-amap>
  </div>
</template>

<style>
.amap-page-container {
  width: 100%;
  height: 600px;
}
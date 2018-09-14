<template>
  <div :class="['container', {'on': on}]">
    <span></span><span></span><span></span><span></span><span></span>
    <span></span><span></span><span></span><span></span><span></span>
    <span></span><span></span><span></span><span></span><span></span>
    <span></span><span></span ><span></span><span></span><span></span>
    <span></span><span></span><span></span><span></span><span></span>
    <span></span><span></span><span></span><span></span>
    <div class="text"></div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    on: {
      type: Boolean,
    }
  },
  data() {
    return {
      // on: true,
    }
  }
}

</script>
<style scoped lang="scss">
.container {
  position: relative;
}

.text {
  width: 20px;
  height: 100%;
}

.container {
  width: 570px;
  height: 100%;
  position: relative;
  &.on {
    span {
      -webkit-animation: bodong 2.5s infinite ease;
      animation: bodong 2.5s infinite ease;
      -moz-animation: bodong 2.5s infinite ease;
      -o-animation: bodong 2.5s infinite ease;
    }
  }
  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    top: 50%;
    margin-top: -5px;
    position: absolute;
    background-image: linear-gradient(-90deg, #FF9B28 0%, #F23D1A 100%); // -webkit-animation: bodong 0.5s infinite ease;
    // animation: bodong 0.5s infinite ease;
    // -moz-animation: bodong 0.5s infinite ease;
    // -o-animation: bodong 0.5s infinite ease;
    &:first-child {
      left: 0px;
    }
    &:nth-child(2) {
      left: 20px;
      -webkit-animation-delay: .2s;
    }
    &:nth-child(3) {
      left: 40px;
      -webkit-animation-delay: .4s;
    }
    &:nth-child(4) {
      left: 60px;
      -webkit-animation-delay: .6s;
    }
    &:nth-child(5) {
      left: 80px;
      -webkit-animation-delay: .8s;
    }
    &:nth-child(6) {
      left: 100px;
      -webkit-animation-delay: 1s;
    }
    &:nth-child(7) {
      left: 120px;
      -webkit-animation-delay: 1.2s;
    }
    &:nth-child(8) {
      left: 140px;
      -webkit-animation-delay: 1.4s;
    }
    &:nth-child(9) {
      left: 160px;
      -webkit-animation-delay: 1.6s;
    }
    &:nth-child(10) {
      left: 180px;
      -webkit-animation-delay: 1.8s;
    }
    &:nth-child(11) {
      left: 200px;
      -webkit-animation-delay: 2s;
    }
    &:nth-child(12) {
      left: 220px;
      -webkit-animation-delay: 2.2s;
    }
    &:nth-child(13) {
      left: 240px;
      -webkit-animation-delay: 2.4s;
    }
    &:nth-child(14) {
      left: 260px;
      -webkit-animation-delay: 2.6s;
    }
    &:nth-child(15) {
      left: 280px;
      -webkit-animation-delay: 2.8s;
    }
    &:nth-child(16) {
      left: 300px;
      -webkit-animation-delay: 3s;
    }
    &:nth-child(17) {
      left: 320px;
      -webkit-animation-delay: 3.2s;
    }
    &:nth-child(18) {
      left: 340px;
      -webkit-animation-delay: 3.4s;
    }
    &:nth-child(19) {
      left: 360px;
      -webkit-animation-delay: 3.6s;
    }
    &:nth-child(20) {
      left: 380px;
      -webkit-animation-delay: 3.8s;
    }
    &:nth-child(21) {
      left: 400px;
      -webkit-animation-delay: 4s;
    }
    &:nth-child(22) {
      left: 420px;
      -webkit-animation-delay: 4.2s;
    }
    &:nth-child(23) {
      left: 440px;
      -webkit-animation-delay: 4.4s;
    }
    &:nth-child(24) {
      left: 460px;
      -webkit-animation-delay: 4.6s;
    }
    &:nth-child(25) {
      left: 480px;
      -webkit-animation-delay: 4.8s;
    }
    &:nth-child(26) {
      left: 500px;
      -webkit-animation-delay: 5s;
    }
    &:nth-child(27) {
      left: 520px;
      -webkit-animation-delay: 5.2s;
    }
    &:nth-child(28) {
      left: 540px;
      -webkit-animation-delay: 5.4s;
    }
    &:nth-child(29) {
      left: 560px;
      -webkit-animation-delay: 5.6s;
    }
  }
}

@keyframes bodong {
  0% {
    height: 10px;
    margin-top: -5px;
  }
  10% {
    height: 20px;
    margin-top: -10px;
  }
  15% {
    height: 30px;
    margin-top: -15px;
  }
  20% {
    height: 40px;
    margin-top: -20px;
  }
  25% {
    height: 50px;
    margin-top: -25px;
  }
  30% {
    height: 60px;
    margin-top: -30px;
  }
  35% {
    height: 70px;
    margin-top: -35px;
  }
  40% {
    height: 80px;
    margin-top: -40px;
  }
  45% {
    height: 90px;
    margin-top: -45px;
  }
  50% {
    height: 100px;
    margin-top: -50px;
  }
  55% {
    height: 90px;
    margin-top: -45px;
  }
  60% {
    height: 80px;
    margin-top: -40px;
  }
  65% {
    height: 70px;
    margin-top: -35px;
  }
  70% {
    height: 60px;
    margin-top: -30px;
  }
  75% {
    height: 50px;
    margin-top: -25px;
  }
  80% {
    height: 40px;
    margin-top: -20px;
  }
  85% {
    height: 30px;
    margin-top: -15px;
  }
  90% {
    height: 20px;
    margin-top: -10px;
  }
  100% {
    height: 10px;
    margin-top: -5px;
  }
}

@-moz-keyframes bodong {
  0% {
    height: 10px;
    margin-top: -5px;
  }
  10% {
    height: 20px;
    margin-top: -10px;
  }
  15% {
    height: 30px;
    margin-top: -15px;
  }
  20% {
    height: 40px;
    margin-top: -20px;
  }
  25% {
    height: 50px;
    margin-top: -25px;
  }
  30% {
    height: 60px;
    margin-top: -30px;
  }
  35% {
    height: 70px;
    margin-top: -35px;
  }
  40% {
    height: 80px;
    margin-top: -40px;
  }
  45% {
    height: 90px;
    margin-top: -45px;
  }
  50% {
    height: 100px;
    margin-top: -50px;
  }
  55% {
    height: 90px;
    margin-top: -45px;
  }
  60% {
    height: 80px;
    margin-top: -40px;
  }
  65% {
    height: 70px;
    margin-top: -35px;
  }
  70% {
    height: 60px;
    margin-top: -30px;
  }
  75% {
    height: 50px;
    margin-top: -25px;
  }
  80% {
    height: 40px;
    margin-top: -20px;
  }
  85% {
    height: 30px;
    margin-top: -15px;
  }
  90% {
    height: 20px;
    margin-top: -10px;
  }
  100% {
    height: 10px;
    margin-top: -5px;
  }
}

@-webkit-keyframes bodong {
  0% {
    height: 10px;
    margin-top: -5px;
  }
  10% {
    height: 20px;
    margin-top: -10px;
  }
  15% {
    height: 30px;
    margin-top: -15px;
  }
  20% {
    height: 40px;
    margin-top: -20px;
  }
  25% {
    height: 50px;
    margin-top: -25px;
  }
  30% {
    height: 60px;
    margin-top: -30px;
  }
  35% {
    height: 70px;
    margin-top: -35px;
  }
  40% {
    height: 80px;
    margin-top: -40px;
  }
  45% {
    height: 90px;
    margin-top: -45px;
  }
  50% {
    height: 100px;
    margin-top: -50px;
  }
  55% {
    height: 90px;
    margin-top: -45px;
  }
  60% {
    height: 80px;
    margin-top: -40px;
  }
  65% {
    height: 70px;
    margin-top: -35px;
  }
  70% {
    height: 60px;
    margin-top: -30px;
  }
  75% {
    height: 50px;
    margin-top: -25px;
  }
  80% {
    height: 40px;
    margin-top: -20px;
  }
  85% {
    height: 30px;
    margin-top: -15px;
  }
  90% {
    height: 20px;
    margin-top: -10px;
  }
  100% {
    height: 10px;
    margin-top: -5px;
  }
}

@-o-keyframes bodong {
  0% {
    height: 10px;
    margin-top: -5px;
  }
  10% {
    height: 20px;
    margin-top: -10px;
  }
  15% {
    height: 30px;
    margin-top: -15px;
  }
  20% {
    height: 40px;
    margin-top: -20px;
  }
  25% {
    height: 50px;
    margin-top: -25px;
  }
  30% {
    height: 60px;
    margin-top: -30px;
  }
  35% {
    height: 70px;
    margin-top: -35px;
  }
  40% {
    height: 80px;
    margin-top: -40px;
  }
  45% {
    height: 90px;
    margin-top: -45px;
  }
  50% {
    height: 100px;
    margin-top: -50px;
  }
  55% {
    height: 90px;
    margin-top: -45px;
  }
  60% {
    height: 80px;
    margin-top: -40px;
  }
  65% {
    height: 70px;
    margin-top: -35px;
  }
  70% {
    height: 60px;
    margin-top: -30px;
  }
  75% {
    height: 50px;
    margin-top: -25px;
  }
  80% {
    height: 40px;
    margin-top: -20px;
  }
  85% {
    height: 30px;
    margin-top: -15px;
  }
  90% {
    height: 20px;
    margin-top: -10px;
  }
  100% {
    height: 10px;
    margin-top: -5px;
  }
}

</style>

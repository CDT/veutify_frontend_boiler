<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>无内鬼</div>
      <p class="text-h6 text--primary">
        整点苏联笑话
      </p>
      <p>🤭</p>
      <div class="text--primary">
        集体农庄庄员伊万在河里捉到一条大鱼，高兴的回到家里和老婆说：”看，我们有炸鱼吃了！”

“没有油啊。”

“那就煮！”

“没锅。”

“烤鱼！”

“没柴。”

伊万气死了，走到河边把鱼扔了回去。
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="teal accent-4"
        @click="reveal = true"
      >
        点我
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary">
            😄
          </p>
          <p>那鱼在水里划了一个半圆，上身出水，举起右鳍激动地高呼：斯大林万岁！</p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn
            text
            color="teal accent-4"
            @click="reveal = false"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      reveal: false
    }
  }
}
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
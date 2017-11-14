<!--
---- 输入原因
!-->
<template>
  <div class="reason"
       :style="{zIndex, zIndex}"
       v-if="isShow">
    <div class="reason-content" :style="style">
      <div class="cancel-reason">
        <textarea
          v-model="content"
          placeholder="请输入原因..."
          class="supplement"></textarea>
      </div>
      <div class="buttons">
        <div class="button"
             @click="close"
             v-waves>
          <span>关闭</span>
        </div>
        <div
          class="button"
          style="background-color: #249af9;color: #ffffff"
          @click="submit"
             v-waves>
          <span>确定</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'reason',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      zIndex: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        // 原因内容
        content: '',
        style: {
          bottom: '-80%'
        },
        isShow: false
      }
    },
    watch: {
      show (val) {
        if (val) {
          this.$store.dispatch('hideToolBar')
        } else {
          this.$store.dispatch('showToolBar')
        }
        this.isShow = val
      },
      isShow (val) {
        setTimeout(() => {
          if (val) {
            this.style.bottom = '0'
          } else {
            this.style.bottom = '-80%'
          }
        }, 50)
      }
    },
    methods: {
      /**
       *  组件内关闭并通知父组件
       */
      close () {
        this.style.bottom = '-80%'
        setTimeout(() => {
          this.isShow = false
          this.$emit('close', false)
        }, 50)
        return false
      },
      submit () {
        this.$emit('submit', this.content)
      }
    },
    mounted () {
      this.isShow = this.show
    }
  }
</script>
<style scoped lang="stylus">
  .reason
    position fixed
    width 100%
    height 100%
    background-color rgba(0,0,0,0.5)
    top 0
    left 0
    .reason-content
      width 100%
      max-height 80%
      position absolute
      bottom 0
      left 0
      background-color #ffffff
      overflow-y auto
      overflow-scrolling touch
      -webkit-overflow-scrolling touch
      flex-direction column
      align-items center
      transition bottom .3s
      .title
        width @width
        height 3rem
        background-color #ffffff
        display flex
        justify-content center
        align-items center
        border-bottom 1px solid #e9e9e9
        >span
          font-size 1rem
          color #333
      .cancel-reason
        width calc(100% - 2rem)
        padding 0 1rem
        .cancel-reason-items
          width 100%
          .cancel-reason-item
            width 33.33%
            height 2rem
            float left
            display flex
            align-items center
        .supplement
          width calc(100% - 1rem)
          height 5rem
          padding .5rem
          margin-top .5rem
          background-color #eeeeee
          border-radius 3px
        .hint
          font-size .8rem
          line-height 2rem
          color #666666
      .buttons
        width: 100%;
        height: 3.5rem;
        border-top 1px solid #efefef
        display flex
        flex-direction row
        .button
          flex 1
          height 100%
          display flex
          justify-content center
          align-items center

</style>

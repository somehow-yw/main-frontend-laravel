<!--
---- 司机选择列表
--->
<template>
  <div
    class="drivers"
    :style="{zIndex: zIndex}"
    v-if="isShow"
    @click.self="close(bgEvent)">
    <div class="drivers-content" :style="style">
      <div
        v-if="title"
        class="drivers-content-title">
        <span>{{ title }}</span>
      </div>
      <div class="drivers-list">
        <div
          class="drivers-item"
          v-waves
          v-for="(item, idx) in driversItem">
          <div
            class="iconfont icon-left"
            @click="selected = idx"
            v-if="selected === idx">&#xe606;</div>
          <div
            class="iconfont icon-left"
            @click="selected = idx"
            v-else></div>

          <div
            class="content"
            @click="selected = idx">
            <div class="concat">
              {{item.car_tel}}
            </div>
            <div class="drivers-detail">
              <template v-if="item.is_default === 1">
                [默认]
              </template>
              {{item.car_num}}
            </div>
          </div>
          <div class="icon-right">
            <div
              class="iconfont edit"
              @click="editDrivers(item)">&#xe67b;</div>
            <div
              class="iconfont delete"
              @click="deleteDrivers(item.id)">&#xe68c;</div>
          </div>
        </div>
      </div>
      <div class="drivers-buttons">
        <div class="button"
             v-for="button in selfButtons"
             :style="button.style?button.style:{}"
             @click="buttonEvents(button.id,button.is_close)">
          <span>{{button.text}}</span>
        </div>
      </div>
    </div>
    <input-items
      :show="showInputItems"
      :inputs-item="inputsItem"
      :bg-event="true"
      :title="inputItemsTitle"
      @submit="submitItem"
      @close="result => showInputItems = result"
    ></input-items>
  </div>
</template>
<script>
  import inputItems from '@components/inputItems.vue'
  export default {
    components: {
      inputItems
    },
    name: 'drivers',
    props: [
      'show',
      'title',
      'driversItem',
      'buttons',
      'zIndex',
      'bgEvent'],
    data () {
      return {
        // inputItems标题
        inputItemsTitle: '',
        style: {
          bottom: '-23.5rem'
        },
        selfButtons: [
          {text: '关闭'}
        ],
        selected: null, // 是否选中
        inputsItem: [

          {
            id: 'car_tel',
            name: '司机电话',
            type: 'text',
            value: '',
            placeholder: '请填写司机电话',
            showIconRight: false,
            disabled: false
          },
          {
            id: 'car_num',
            name: '车牌号码',
            type: 'text',
            value: '',
            placeholder: '请填写车牌号码',
            showIconRight: false,
            disabled: false
          }
        ],
        action: 'edit',
        isShow: false,
        showInputItems: false, // 是否显示添加车辆信息弹出层,
        driversId: 0 // 当前操作的ID
      }
    },
    watch: {
      show (val) {
        if (!val) {
          this.$store.dispatch('showToolBar')
          this.style.bottom = '-23.5rem'
          setTimeout(() => {
            this.isShow = val
          }, 50)
        } else {
          this.$store.dispatch('hideToolBar')
          this.isShow = val
        }
      },
      selected (val) {
        this.$emit('select', val, this.driversItem[val])
      },
      isShow (val) {
        setTimeout(() => {
          if (val) {
            this.style.bottom = '0rem'
          } else {
            this.style.bottom = '-23.5rem'
          }
        }, 50)
      },
      buttons (val) {
        if (val.length > 0) {
          this.selfButtons = val
        }
      },
      driversItem () {
        this.showAddButtons()
      }
    },
    methods: {
      // 是否显示添加按钮
      showAddButtons () {
        console.log(this.driversItem.length)
        if (this.driversItem.length >= 5) {
          this.selfButtons =
          this.selfButtons.filter(item => {
            if (item.id === 'create') {
              return false
            }
            return true
          })
        } else if (this.selfButtons.length === 1) {
          this.selfButtons.push({
            id: 'create',
            text: '添加',
            style: {
              backgroundColor: '#249af9',
              color: '#ffffff'
            }
          })
        }
      },
      // 删除收货地址
      deleteDrivers (id) {
//        console.log(id)
        this.$emit('delete', id)
      },
      // 编辑收货地址
      editDrivers (data) {
        this.driversId = data.id
        this.inputsItem =
          this.inputsItem.map(item => {
            if (item.id === 'car_tel') {
              item.value = data.car_tel
            }
            if (item.id === 'car_num') {
              item.value = data.car_num
            }
            return item
          })
        this.action = 'edit'
        this.inputItemsTitle = '编辑车辆'
        this.showInputItems = true
      },
      submitItem (data) {
        if (!data.car_tel) {
          this.$auxiliary.toast('请填写司机电话')
          return false
        }
        if (!data.car_num) {
          this.$auxiliary.toast('请填写车牌号码')
          return false
        }
        if (this.action === 'edit') {
          data.car_news_id = this.driversId
          this.$emit('edit', data)
        }
        if (this.action === 'create') {
          this.$emit('create', data)
        }
        this.showInputItems = false
      },
      /**
       *  组件内关闭并通知父组件
       */
      close (bgEvent = false) {
        if (bgEvent) {
          return false
        }
        this.style.bottom = '-23.5rem'
        setTimeout(() => {
          this.$emit('close', false)
        }, 50)
        return false
      },
      /**
       *  按钮事件通知父组件
       */
      buttonEvents (buttonId, isClose = false) {
        if (buttonId === 'create') {
          this.action = 'create'
          this.inputItemsTitle = '添加车辆'
          this.inputsItem =
            this.inputsItem.map(item => {
              item.value = ''
              return item
            })
          this.showInputItems = true
          return false
        }
        /**
         * 如果没有传ID,则默认为关闭
         */
        if (!buttonId) {
          this.close()
          return false
        }
        // 通知父组件
        this.$emit(buttonId, buttonId)
        // 是否关闭
        if (isClose) {
          this.close()
        }
      }
    },
    mounted () {
      this.isShow = this.show
      if (typeof this.buttons !== 'undefined' && this.buttons.length > 0) {
        this.selfButtons = this.buttons
      }
      this.showAddButtons()
    }
  }
</script>
<style scoped lang="stylus">
  @import '../../styles/stylus/function.styl'
  .drivers
    position fixed
    width 100%
    height 100%
    background-color rgba(0,0,0,0.5)
    top 0
    left 0
    .drivers-content
      width 100%
      max-height 23.5rem
      position absolute
      bottom -23.5rem
      left 0
      background-color #ffffff
      transition bottom .3s
      .drivers-content-title
        width 100%
        height 3rem
        display flex
        justify-content center
        align-items center
        border-bottom 1px solid #e9e9e9
        > span
          font-size 1.2rem
      .drivers-list
        width 100%
        max-height 17.5rem
        overflow-y auto
        text-overflow ellipsis
        -webkit-overflow-scrolling touch
        overflow-scrolling touch
        .drivers-item
          width calc(100% - 2rem)
          padding 0 1rem
          height 3.5rem
          border-bottom 1px solid #e9e9e9
          display flex
          &:last-child
            border-bottom none
          .icon-left
            width 2rem
            height @height
            display flex
            align-items center
            color #249af9
          .content
            flex 1
            height @height
            display flex
            flex-direction column
            justify-content center
            .concat
              font-size 1rem
              color #333333
            .drivers-detail
              text-overflow(1)
              font-size 0.9rem
              line-height 1rem
              color #999999
          .icon-right
            width 5rem
            height @height
            display flex
            align-items center
            .edit,.delete
              width 2.5rem
              height 1.5rem
              font-size 1.5rem
              text-align center
              opacity 1
              &:active
                opacity 0.7
            .edit
              border-right 1px solid #e9e9e9
              color #249af9
            .delete
              color #999999
      .drivers-buttons
        width: 100%;
        height: 3rem;
        border-top 1px solid #efefef
        display flex
        flex-direction row
        .button
          flex 1
          height 100%
          display flex
          justify-content center
          align-items center
          opacity 1
          &:active
            opacity 0.5
</style>

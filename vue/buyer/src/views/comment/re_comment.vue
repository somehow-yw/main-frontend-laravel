<template>
  <div class="body" v-show="loaded">
    <div class="comment-box" v-for="(product, idx) in goods">
      <div class="goods-info">
        <div class="thumb">
          <img :src="completePath(product.pic) + '@150w_90Q'">
        </div>
        <div class="info">
          <div class="title">{{product.name}}</div>
          <div class="price">
            {{product.price}}元*{{product.buy_num}}{{product.meter_unit}}={{product.total_price}}元
          </div>
        </div>
      </div>
      <div class="comment-text-area">
        <textarea v-model.trim="product.info.content" placeholder="请在此评价商品(100字以内)"></textarea>
      </div>
      <div class="upload-img">
        <div class="img" v-for="(img,idx) in product.info.images">
          <img :src="img.localId" alt="">
          <div class="remove" @click="product.info.images.splice(idx,1)">
            <span>×</span>
          </div>
        </div>
      </div>
    </div>
    <div class="submit" @click="submit">提交</div>
    <div class="notice">评价会影响卖家的信誉度,也是其他买家的重要参考</div>
    <ui-confirm-at-bottom
      :title="confirmAtBottomData.title"
      :message="confirmAtBottomData.message"
      :buttons="confirmAtBottomData.buttons"
      :show="showConfirmAtBottom"
      @goBack="goBack"
      @continue="_continue"
      @close="res => showConfirmAtBottom = res"></ui-confirm-at-bottom>
  </div>
</template>
<script>
  import confirmAtBottom from '@views/components/confirmAtBottom.vue'
  export default {
    name: 'submitComment',
    components: {
      'ui-confirm-at-bottom': confirmAtBottom
    },
    data () {
      return {
        confirmAtBottomData: {
          title: '追加评价成功',
          message: '',
          buttons: [
            {id: 'goBack', text: '返回', is_show: true}
          ]
        },
        showConfirmAtBottom: false,
        loaded: false,
        goods: [],
        order_no: '',
        next_order_no: ''
      }
    },
    methods: {
      // 返回上一页
      goBack () {
        window.history.go(-1)
      },
      // 在评价一单
      _continue () {
        this.$auxiliary.loding.show()
        let url = window.location.href
        url = url.split('#')
        window.location.href = url[0] + '#' + this.next_order_no
      },
      /**
       *  提交数据
       */
      submit () {
        // 组装数据
        let data = {}
        data.comments = []
        let atLeastOne = false
        for (let i in this.goods) {
          if (this.goods[i].info.content.length > 0) {
            atLeastOne = true
          }
          let goodsAppraises = {}
          goodsAppraises.goods_id = this.goods[i].goods_id
          goodsAppraises.content = this.goods[i].info.content
          data.comments.push(goodsAppraises)
        }
        if (!atLeastOne) {
          this.$auxiliary.toast('请至少评价一个商品')
          return false
        }
        data.order_no = this.order_no
        this.$auxiliary.loading.show()
        this
          .$api
          .comment
          .reComment(data)
          .then(r => {
            if (parseInt(r.code) === 0) {
              this.next_order_no = r.data.next_order_no
              // 必须写在confirmAtBottomData参数赋值之后
              this.showConfirmAtBottom = true
            }
          })
      },
      /**
       * 获取订单数据
       */
      getData () {
        this
          .$api
          .comment
          .allGoodsOnOrder(this.order_no)
          .then(r => {
            for (let i in r.data) {
              r.data[i].info = {
                content: ''
              }
            }
            this.goods = r.data
            this.loaded = true
          })
      }
    },
    // 初始化数据
    created () {
      this.order_no = this.$route.params.order_no
      if (!this.order_no) {
        this.$auxiliary.toast('缺少订单编号')
        this.$router.go(-1)
        return false
      }
      // End
      // 获取订单数据
      this.getData()
    }
  }
</script>
<style
  scoped
  lang="stylus"
  src="@styl/comment/index.styl"></style>

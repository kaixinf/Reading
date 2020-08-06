<template>
  <div class="lists_r">
    <h5 class="chanel">
      <i class="red"></i>
      <span>
        <i class="ttt">{{this.$store.state.title}}</i>频道 TOP10
      </span>
    </h5>
    <div class="chanel_title" v-for="(article,index) in articles" :key=index>
        <div @click="change_conts(article.id)" style="cursor:default" class="change_c">
            {{article.title}}
        </div>
        <div class="person">
            <div class="person_cc">
                <span>文:{{article.author}}</span>
            </div>
            <div style="padding-bottom:20px">
                <span>主播:{{article.podcast}}</span>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Aside",
  data() {
    return {
      articles: []
    };
  },
  methods:{
    // 点击右侧Top10标题跳转详情页
    change_conts(id){
      this.$router.push({ path:"/detail/" + id})
    }
  },
  created(){
      this.axios(
          "http://localhost:3000/api/articles/1/top10"
        )
          .then(res => {
            this.articles = this.articles.concat(res.data.res.articles);
          })
          .catch(err => {
            console.log(err);
          });
  },
  watch: {
    $route: {
      handler(to) {
        this.articles = [];
        this.axios(
          "http://localhost:3000/api/articles/" + to.params.type_id + "/top10"
        )
          .then(res => {
            this.articles = this.articles.concat(res.data.res.articles);
          })
          .catch(err => {
            console.log(err);
          });
      },
      //页面刚加载进去就立即执行
      immediate: true
    }
  }
};
</script>
<style>
.ttt{
  font-style: normal;
}
.lists_r {
    margin-top: 30px;
    padding: 20px 20px;
  position: absolute;
  width: 440px;
  background: #fff;
  top: 0;
  right: 0;
}
.red {
  display: inline-block;
  width: 3px;
  height: 20px;
  background: #cb3232;
  position: absolute;
  margin-right:10px;
  top: -1px;
  left: 0;
}
.chanel{
    position: relative;
    font-size: 16px;
    font-weight: 700;
}
.chanel span{
    margin-left: 10px;
}
.chanel_title{
    margin-left: 30px;
    margin-top: 30px;
    line-height: 10px;
    font-size: 15px;
    border-bottom: 1px solid #e5e5e5;
}
.person{
    display: flex;
     color:#B6B6B6
}
.change_c:hover{
  color: #c33;
}
</style>
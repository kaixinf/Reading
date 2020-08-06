<template>
  <div>
    <div class="top_header">
      <div class="container_box">
        <p class="bar_list">
          <span class="red_bar1"></span>
          <span class="red_bar2"></span>
          <span class="red_bar3"></span>
          <span @click="index_html">悦读 FM</span>
        </p>
        <ul class="tab_nav">
          <li
            v-for="(list,index) in lists"
            :key="index"
            :class="{active:index==inx}"
            @click="color(index,list.type)"
          >
            <router-link :to="'/'+list.id">{{list.type}}</router-link>
          </li>
        </ul>
        <div style="width:30%;display:flex;text-align: right">
          <div style="width:60%;position:relative;margin-left:5%">
            <input type="text" style="line-height:0;width:100%" />
            <img
              src="../img/ico-f.png"
              alt
              style="width:25px;height:25px;position:absolute;top:38px;right:10px"
            />
          </div>
          <div style="width:35%;" id="show_succ" v-if="this.$store.state.user==null">
            <span class="login" @click="click_login" style="cursor: pointer;">登陆</span>
            <i class="vertical_bar">|</i>
            <span class="registered" @click="loginShow" style="cursor: pointer;">注册</span>
          </div>
          <div style="width:35%;color:#c33" id="show_succ" v-if="this.$store.state.user!=null">
            <span class="login" style="cursor: pointer;">欢迎{{this.$store.state.user}}</span>
            <i class="vertical_bar">|</i>
            <span class="registered" @click="exit_login" style="cursor: pointer;" >退出</span>
          </div>
        </div>
      </div>
    </div>
    <div class="login_mask" v-show="val==true">
      <div class="center_con loo">
        <p class="denglu">登陆</p>
        <form class="ff">
          <input id="email_login" type="text" placeholder="邮箱" />
          <input id="psw_login" type="text" class="none_bor" placeholder="密码" />
        </form>
        <div class="psw">
          <p>
            <input type="checkbox" />下次自动登录
          </p>
          <p>
            <span style="color:#c33">忘记密码</span>
          </p>
        </div>
        <div class="btn_login" @click="logining">
          <button>登录</button>
        </div>
        <div class="eit" @click="click_hide">
          <img src="../img/eit.png" alt />
        </div>
      </div>
    </div>
    <div class="login_mask" v-show="val1==true">
      <div class="center_con ree" style="width:365px;padding-bottom:45px">
        <p class="register">注册</p>
        <form class="ff">
          <input id="nicheng" type="text" placeholder="昵称" />
          <input id="email" type="text" placeholder="邮箱" />
          <input id="psw" type="text" placeholder="密码" />
          <input id="sure_psw" type="text" class="none_bor" placeholder="确认密码" />
        </form>
        <div class="psw">
          <p>
            <input type="checkbox" />我已认真阅读并同意阅读FM的
            <span style="color:#c33">《使用协议》</span>
          </p>
        </div>
        <div class="btn_login" @click="registing">
          <button>注册</button>
        </div>
        <div class="eit" @click="loginHide" style="top: -6%;right: -6%;">
          <img src="../img/eit.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  data() {
    return {
      val: false,
      val1: false,
      inx: 0,
      lists: []
    };
  },
  created() {
    //渲染标题
    if (this.$route.params.id == undefined) {
      console.log(888489, this.$route.params.id);
    }
    (this.lists = []),
      this.axios("http://localhost:3000/api/types")
        .then(res => {
          // console.log(111, res.data.res);
          this.lists = this.lists.concat(res.data.res);
        })
        .catch(err => {
          console.log(err);
        });
  },
  methods: {
    color(i, val) {
      this.inx = i; //标题颜色
      this.$store.state.index = i+1
      this.$store.state.title = val; //把val用store存起来 在侧边栏的频道有字体替换
    },
    click_login() {
      this.val = true;
      // var loo=document.getElementsByClassName("loo")[0]
      // loo.style.transform="translateX(200px)"
      // loo.style.transition="all 1s 1s"
    },
    click_hide() {
      this.val = false;
      // var loo=document.getElementsByClassName("loo")[0]
      // loo.style.transform="translateX(500px)"
      // loo.style.transition="all 1s 1s"
    },
    loginShow() {
      this.val1 = true;
    },
    loginHide() {
      this.val1 = false;
    },
    // 点击悦读回到首页
    index_html() {
      this.$router.push({ path: "/"});
    },
    // 注册
    registing() {
      var nicheng = document.getElementById("nicheng");
      var email = document.getElementById("email");
      var psw = document.getElementById("psw");
      var sure_psw = document.getElementById("sure_psw");
      if (nicheng.value == "" || email.value == "" || psw.value == "") {
        alert("请输入完整的注册信息");
      }
      if (psw.value != sure_psw.value) {
        alert("两次输入的密码不一致");
      } else {
        alert("注册成功！");
        this.axios.post("http://localhost:3000/api/user", {
          nikiname: nicheng.value,
          email: email.value,
          password: psw.value,
          username: nicheng.value //注册时候必须写的四个字段 进行ajax请求 将页面填写的注册信息存进数据库
        });
        // 点击注册成功注册后 清空所有input输入框的信息
        this.val1 = false; //注册成功之后让注册页面隐藏
        nicheng.value = "";
        email.value = "";
        psw.value = "";
        sure_psw.value = "";
      }
    },
    // 登陆
    logining() {
      var email_login = document.getElementById("email_login");
      var psw_login = document.getElementById("psw_login");
      if (email_login.value == "" && psw_login.value == "") {
        alert("字段不能为空");
      } else if (email_login.value == "" && psw_login.value != "") {
        alert("请输入邮箱");
      } else if (email_login.value != "" && psw_login.value == "") {
        alert("请输入密码");
      }

      this.axios
        .post("http://localhost:3000/api/user/login", {
          email: email_login.value,
          password: psw_login.value
        })
        .then(res => {
          console.log(res);
          if (res.data.res_msg == "请求成功") {
            this.val = false; //登陆成功之后让登陆页面隐藏
            alert("登陆成功！");
            this.$store.state.mark=res.data.res.token  //登陆成功后返回的token存起来
            this.$store.state.user=email_login.value //登陆成功之后就讲store里的user赋值为输入的用户名
            email_login.value="" //登陆成功之后清空input输入框的信息
            psw_login.value=""
          } else {
            alert("登录信息错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击退出
    exit_login() {
      this.$store.state.user=null//定义一个user在store里边 点击退出就让这个值为null
    }
  }
};
</script>
<style>
.tab_nav .active a {
  color: #c33;
  text-decoration: none;
}
.tab_nav li a {
  color: #222;
  text-decoration: none;
}
.tab_nav li a:hover {
  color: #c33;
  text-decoration: none;
}

.bar_list:hover {
  color: #c33;
  cursor: default;
}
.top_header {
  height: 100px;
  line-height: 100px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  width: 100%;
}
.container_box {
  width: 1220px;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.bar_list {
  width: 10%;
}
.bar_list span {
  margin-right: 3px;
}
.red_bar1 {
  padding: 1px 2px;
  background: #c33;
  border-radius: 30%;
}
.red_bar2 {
  padding: 5px 2px;
  background: #c33;
  border-radius: 30%;
}
.red_bar3 {
  padding: 1px 2px;
  background: #c33;
  border-radius: 30%;
}
.tab_nav {
  padding-left: 0;
  list-style: none;
  overflow: hidden;
  width: 60%;
  display: flex;
  justify-content: space-around;
}
.tab_nav li:first-child {
  /* margin-left: -10px; */
}
.tab_nav li {
  text-align: center;
}
.tab_nav li:hover {
  color: #c33;
  cursor: default;
}

/* 登陆注册 */
.vertical_bar {
  display: inline-block;
  width: 25px;
  text-align: center;
}
.login {
  /* margin-left: 25px; */
}
/* 登陆注册遮罩层 */
.login_mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.2);
}
.center_con {
  padding: 20px 30px;
  padding-bottom: 20px;
  box-sizing: border-box;
  width: 300px;
  height: auto;
  border: 1px solid #c33;
  background: #fff;
  margin: 0 auto;
  margin-top: 110px;
  position: relative;
}
.denglu {
  font-size: 20px;
}

.ff {
  padding: 0 15px;
  border: 1px solid #e5e5e5;
}
.ff input {
  width: 100%;
  border: none;
  outline: none;
  padding-top: 10px;
  padding-bottom: 10px;
}
.ff input:not(.none_bor) {
  border-bottom: 1px solid #e5e5e5;
}
.psw {
  line-height: 37px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.btn_login {
  padding: 8px 0;
  width: 100%;
  margin: 0 auto;
  background: #c33;
  text-align: center;
}
.btn_login button {
  border: none;
  outline: none;
  background: #c33;
  color: #fff;
}
/* 注册遮罩 */
.register {
  font-size: 20px;
}
/* 叉号 */
.eit {
  position: absolute;
  top: -7%;
  right: -8%;
}
.eit img {
  width: 30px;
  height: 30px;
}
</style>

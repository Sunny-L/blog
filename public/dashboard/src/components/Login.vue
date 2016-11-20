<style scoped>

</style>
<template>
  <div class="page-view page-login">
    <section>
      <label for="username">邮箱</label>
      <input type="text" name="username" v-model="user.username">
      <label for="password">密码</label>
      <input type="text" name="password" v-model="user.password">
      <button type="" class="btn btn-default" @click="submit()">登录</button>
    </section>
  </div>
</template>
<script>
    export default{
        data(){
            return {
                user: {
                  username: '',
                  password: ''
                }
            }
        },
        created:function(){
            
        },
        methods: {
          submit: function() {
            fetch('/admin/login',{
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                username: this.user.username,
                password: this.user.password
              })
            }).then(res => res.json())
              .then(data => {
                if(data.code === 0) {

                }
              })
          }
        }
    }
</script>
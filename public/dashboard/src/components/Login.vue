<style scoped>

</style>
<template>
  <div class="page-view page-login">
    <section>
      <label for="username">邮箱</label>
      <input type="text" name="username" v-model="user.username">
      <label for="password">密码</label>
      <input type="text" name="password" v-model="user.password">
      <button type="" class="btn btn-default">登录</button>
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
        submit: function() {
          fetch('/admin/login',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          }).then(res => res.json())
            .then(data => {
              if(data.code === 0) {

              }
            })
        }
    }
</script>
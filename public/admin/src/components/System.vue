<style scoped>
    input {
        margin: 10px 0;
    }
    
    .save {
        margin-bottom: 20px;
    }
    
    #avator_img {
        width: 200px;
        height: 200px;
    }
</style>
<template>
    <div class="page-view page-system">
      <section id="myscroll">
          <h2 class="section-header">系统设置</h2>
          <div class="save">
              <button type="button" class="btn btn-default" @click="save">更新</button>
          </div>
          <div class="section-body">
            <div class="form-control">
                <label for="">title</label>
                <input type="text" name="title" v-model="settings.title">
            </div>
            <div class="form-control">
                <label for="">keywords</label>
                <input type="text" name="keywords" v-model="settings.keywords">
            </div>
            <div class="form-control">
                <label for="">description</label>
                <input type="text" name="description" v-model="settings.description">
            </div>
            <div class="form-control">
                <label for="">slogan</label>
                <input type="text" name="slogan" v-model="settings.slogan">
            </div>
            <div class="form-control">
                <label for="">github</label>
                <input type="text" name="github" v-model="settings.github">
            </div>
            <div class="form-control">
                <label for="">百度统计</label>
                <textarea v-model="settings.baiduTongji"></textarea>
            </div>
            <div class="form-control">
                <img :src="settings.avator" id="avator_img"/>
                <input type="file" id="input_avator" @change="uploadAvator" :key="settings.title">
            </div>
          </div>
      </section>
    </div>
</template>
<script>
    import Vue from 'vue'
    import querystring from 'querystring'
    export default {
        data() {
            return {
                settings: {}
            }
        },
        created: function() {
            fetch('/admin/settings')
                .then(res => res.json())
                .then(data => {
                    if (data.info.settings[0]) {
                        this.settings = data.info.settings[0]
                    }
                })
        },
        methods: {
            save: function() {
                fetch('/admin/settings', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: querystring.stringify(this.settings)
                    }).then(res => res.json())
                    .then(data => {
                        if (data.code !== 0) {
                            alert(data.info.result)
                        } else {
                            alert('success')
                        }
                    })
            },
            uploadAvator: function() {
                let formData = new FormData()
                let file = document.getElementById('input_avator').files[0]
                formData.append('avator', file)
                fetch('/admin/upload/avator', {
                        method: 'POST',
                        body: formData
                    }).then(res => res.json())
                    .then(data => {
                        if (data.code == 0) {
                            Vue.set(this.settings, 'avator', 'http://localhost:3000' + data.info.imgUrl)
                        }
                    })
            }
        }
    }
</script>
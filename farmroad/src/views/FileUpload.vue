<template>
  <div>
    <v-content>
      <v-container fluid>
        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
          <img :src="imageUrl" height="150" v-if="imageUrl">
          <v-text-field
            label="Select Image"
            @click="pickFile"
            v-model="imageName"
            prepend-icon="attach_file"
          ></v-text-field>
          <input
            type="file"
            style="display: none"
            ref="image"
            accept="image/*"
            @change="onFilePicked"
          >
        </v-flex>
        <v-btn color="success" @click="uploadImg">사진 올리기</v-btn>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  data: () => ({
    imageName: "",
    imageUrl: "",
    imageFile: ""
  }),

  methods: {
    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    uploadImg() {
      var formData = new FormData();
      formData.append("img", this.imageFile);
      console.log(formData);
      this.axios
        .post(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/imageUpload",
          formData,
          {
            method: "post",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            transformRequest: [
              function(data) {
                return data;
              }
            ],
            onUploadProgress: function(e) {
              var percentage = Math.round((e.loaded * 100) / e.total) || 0;
              if (percentage < 100) {
                console.log(percentage + "%"); // 上传进度
              }
            }
          }
        )
        .then(response => {
          console.log(response.data);
        });
    }
  }
};
</script>


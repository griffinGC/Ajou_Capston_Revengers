<template>
  <!-- <v-layout row> -->
  <!-- <v-dialog v-model="dialog" persistent fullscreen> -->
  <v-card>
    <v-card-title class="headline">유저정보수정</v-card-title>
    <!-- <v-card-text> -->
    <v-card-title>
      <v-flex lg12>
        <v-avatar size="80px">
          <img v-if="profileImg" :src="profileImg">
          <v-icon v-else>person</v-icon>
        </v-avatar>
      </v-flex>
      <!--img upload-->
      <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
        <img :src="imageUrl" height="150" v-if="imageUrl">
        <v-text-field
          label="사진 올리기"
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
    </v-card-title>
    <v-card-title>
      <v-flex xs md3 hidden-xs-only>
        <strong>유저 아이디 :</strong>
        <span>&nbsp;{{ userName }}</span>
      </v-flex>
    </v-card-title>
    <v-card-title>
      <strong>비밀번호 :</strong>
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'visibility' : 'visibility_off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        hint="최소 8자 이상되어야 합니다."
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
    </v-card-title>

    <v-card-title>
      <strong>이름 :</strong>
      <v-text-field v-model="name"></v-text-field>
    </v-card-title>
    <v-card-title>
      <strong>성별 :</strong>
      {{gender}}
    </v-card-title>
    <v-card-title>
      <strong>나이 :</strong>
      {{age}}
    </v-card-title>
    <!-- <v-card-title><strong >나이 : </strong ><v-text-field v-model="age"></v-text-field></v-card-title> -->
    <v-card-title v-if="role === '0'">
      <strong>능력 :</strong>
      <!-- <v-text-field v-model="ability"></v-text-field> -->
      <v-layout row wrap>
          <v-item-group><span>
            <v-checkbox v-model="ability" label="요리를 잘해요" value="cook"></v-checkbox>
            <v-checkbox v-model="ability" label="미용을 잘해요" value="beauty"></v-checkbox></span>
          </v-item-group>
           <v-item-group>
            <v-checkbox v-model="ability" label="애를 잘돌봐요" value="baby"></v-checkbox>
            <v-checkbox v-model="ability" label="청소를 잘해요" value="clean"></v-checkbox>
          </v-item-group>
            <v-item-group>
            <v-checkbox v-model="ability" label="운전을 잘해요" value="drive"></v-checkbox>
            <v-checkbox v-model="ability" label="도배를 잘해요" value="paper"></v-checkbox>
          </v-item-group>
            <v-item-group>
            <v-checkbox v-model="ability" label="짐나르는거 잘해요" value="carry"></v-checkbox>
            <v-checkbox v-model="ability" label="노래를 잘해요" value="sing"></v-checkbox>
          </v-item-group>
          <v-item-group>
            <v-checkbox v-model="ability" label="말동무를 잘해요" value="talk"></v-checkbox>
            <v-checkbox v-model="ability" label="컴퓨터를 잘다뤄요" value="comp"></v-checkbox>
          </v-item-group>
          <v-item-group>
            <v-checkbox v-model="ability" label="농기계를 잘다뤄요" value="machine"></v-checkbox>
            <v-checkbox v-model="ability" label="농사경험이 있어요" value="farm"></v-checkbox>
          </v-item-group>
        </v-layout>
    </v-card-title>
    <v-card-title>
      <strong>전화번호 :</strong>
      <v-text-field v-model="phone"></v-text-field>
    </v-card-title>
    <v-card-title>
      <strong>이메일 :</strong>
      <v-text-field v-model="email"></v-text-field>
    </v-card-title>
    <v-card-title v-if="role === '1'">
      <strong>직업 :</strong>
      {{work}}
    </v-card-title>
    <v-card-title v-if="role === '1'">
      <strong>지역 :</strong>
      <v-text-field v-model="location"></v-text-field>
    </v-card-title>
    <v-card-title>
      <strong>주소 :</strong>
      <v-text-field v-model="address"></v-text-field>
    </v-card-title>
    <v-card-title>
      <strong>평점 :</strong>
      {{reference}}
    </v-card-title>
    <!-- </v-card-text> -->
    <v-btn v-on:click.native="saveEdit">확인</v-btn>
    <v-btn v-on:click.native="saveCancel">취소</v-btn>
  </v-card>

  <!-- </v-dialog> -->
  <!-- </v-layout> -->
</template>

<script>
import { constants } from "crypto";
export default {
  data() {
    return {
      dialog: true,
      // userName: localStorage.username,
      userName: "test",
      name: "default",
      profileImg: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
      password: "",
      gender: "man",
      age: "22",
      ability: "can do anything",
      phone: "01011112222",
      email: "chchch@gggg",
      reference: "",
      role: "dfdf",
      work: "dfdf",
      address: "dfdf",
      location: "zzzz",
      imageName: "",
      imageUrl: "",
      imageFile: "",

      show1: false,
      rules: {
        required: value => !!value || "필수",
        min: v => v.length >= 8 || "최소 8자 이상",
        emailMatch: () => "이메일 형식에 맞지 않습니다."
      },
      role: ""
    };
  },
  created() {
    console.log("userEdit is created");
    this.role = localStorage.role;
    this.getInfo();
  },
  mounted() {
    this.role = localStorage.role;
    this.getInfo();
  },
  methods: {
    getInfo() {
      // localStorage.role == 0 이면 guest && 1이면 host
      let userId = localStorage.username;
      if (localStorage.role === "0") {
        this.axios
          .get(
            `http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/getInfo/guest/${userId}`
          )
          .then(response => {
            console.log(response.data[0]);
            let userData = response.data[0];
            this.userName = userData.userName;
            this.name = userData.name;
            this.profileImg = userData.profileImg;
            this.age = userData.age;
            this.ability = userData.ability;
            this.phone = userData.phone;
            this.email = userData.email;
            this.reference = userData.reference;
          });
      } else {
        this.axios
          .get(
            `http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/getInfo/host/${userId}`
          )
          .then(response => {
            console.log(response.data[0]);
            let userData = response.data[0];
            this.userName = userData.userName;
            this.name = userData.name;
            this.profileImg = userData.profileImg;
            this.age = userData.age;
            this.work = userData.work;
            this.address = userData.address;
            this.location = userData.location;
            this.phone = userData.phone;
            this.email = userData.email;
            this.reference = userData.reference;
          });
      }
    },
    saveEdit() {
      console.log("save Action start! "); // localStorage.role == 0 이면 guest && 1이면 host
      let userId = localStorage.username;
      if (!this.password) {
        alert("비밀번호를 입력해주세요!");
        return;
      }
      if (localStorage.role === "0") {
        console.log(this.userName);
        console.log("바뀐 이름 : " + this.name);
        var formData = new FormData();
        // formData.append("img", this.imageFile);
        if(!this.imageFile){
          
        }
        formData.append("img", this.imageFile);
        formData.append("userName", localStorage.username);
        formData.append("password", this.password);
        formData.append("name", this.name);
        formData.append("ability", JSON.stringify(this.ability));
        formData.append("phone", this.phone);
        formData.append("email", this.email);

        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/userUpdateGuest",
            formData
          )
          .then(console.log("save is success"));
      } else {
        console.log("여기서 host 발동 : " + userId);
        // console.log("여기 userId : " + userName);
        var formData = new FormData();
        formData.append("img", this.imageFile);
        formData.append("userName", localStorage.username);
        formData.append("password", this.password);
        formData.append("name", this.name);
        formData.append("ability", this.ability);
        formData.append("phone", this.phone);
        formData.append("email", this.email);
        formData.append("address", this.address);
        formData.append("loaction", this.location);

        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/userUpdateHost",
            formData
          )
          .then(console.log("save is success"));
      }
      this.$router.push("/userInfo");
    },
    saveCancel() {
      console.log("save cancel");
      this.$router.push("/");
    },
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
    }
  }
};
</script>


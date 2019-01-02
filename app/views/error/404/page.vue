<template>
    <div class="page">
        <div class="cloud cloud__x1"></div>
        <div class="cloud cloud__x1_5"></div>
        <div class="cloud cloud__x2"></div>
        <div class="cloud cloud__x3"></div>
        <div class="cloud cloud__x4"></div>
        <div class="cloud cloud__x5"></div>
        <div class="content">
            <div class="content__404">404</div>
            <hr>
            <div class="content__title">抱歉，你访问的页面不存在</div>
            <a class="content__btn" href="#" @click.prevent="$router.replace({ path: '/' })">返回首页</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .page {
        background-image: linear-gradient(to right bottom, #a8d4ff, #91c8ff, #79bbff, #60aeff, #43a1ff);
        width: 100%;
        height: 100%;
        max-height: 100%;
        color:#fff;
        overflow: hidden;
        position: relative;
    }

    hr{
        padding: 0;
        border: none;
        border-top: 5px solid #fff;
        color: #fff;
        text-align: center;
        margin: 0px auto;
        width: 420px;
        height:10px;
        z-index: -10;
    }

    .cloudContainer {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .cloud {
        width: 350px;
        height: 120px;
        background: #FFF;
        background: linear-gradient(to top, #FFF 100%);
        border-radius: 100px;
        position: absolute;
        margin: 120px auto 20px;
        z-index:2;
        transition: ease 1s;

        &:before, &:after {
            content: '';
            position: absolute;
            background: #FFF;
            z-index: -1
        }

        &:after {
            width: 100px;
            height: 100px;
            top: -50px;
            left: 50px;
            border-radius: 100px;
        }

        &:before {
            width: 180px;
            height: 180px;
            top: -90px;
            right: 50px;
            border-radius: 200px;
        }

        @include e(x1) {
            top:-50px;
            left:250px;
            opacity: 0.9;
            transform: scale(0.3);
            animation: moveclouds 15s linear infinite;
        }

        @include e(x1_5) {
            top:-80px;
            left:250px;
            transform: scale(0.3);
            animation: moveclouds 17s linear infinite;
        }

        @include e(x2) {
            left: 250px;
            top: 30px;
            transform: scale(0.6);
            opacity: 0.6;
            animation: moveclouds 25s linear infinite;
        }

        @include e(x3) {
            left: 250px;
            bottom: 5%;
            transform: scale(0.6);
            opacity: 0.8;
            animation: moveclouds 25s linear infinite;
        }

        @include e(x4) {
            left: 470px;
            bottom: 40%;
            transform: scale(0.75);
            opacity: 0.75;
            animation: moveclouds 18s linear infinite;
        }

        @include e(x5) {
            left: 200px;
            top: 380px;
            transform: scale(0.5);
            opacity: 0.8;
            animation: moveclouds 20s linear infinite;
        }
    }

    .content {
        text-align: center;
        display: block;
        position: relative;
        width:80%;
        margin:100px auto;
        @include e(404) {
            font-size: 220px;
            position: relative;
            display: inline-block;
            z-index: 2;
            height: 250px;
            letter-spacing: 15px;
        }

        @include e(title) {
            text-align:center;
            display:block;
            position:relative;
            letter-spacing: 12px;
            font-size: 1.45em;
            line-height: 80%;
            padding-left: 12px;
        }

        @include e(btn) {
            background-color: rgb( 255, 255, 255 );
            position: relative;
            display: inline-block;
            width: 420px;
            z-index: 5;
            font-size: 25px;
            margin: 10px auto;
            color: lighten($primary-color, 10%) ;
            text-decoration: none;
        }
    }

    @keyframes moveclouds {
        0% {margin-left: 1000px;}
        100% {margin-left: -1000px;}
    }
</style>

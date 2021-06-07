# HTML ``canvas`` 스터디

## 01. ``canvas`` 란?

``canvas``는 ``javascript``를 사용하여 그림을 그릴 수 있는 태그 입니다.

일반적으로 ``2D`` 이미지를 그리는데 사용하며, ``canvas``로 만들어진 ``WebGL`` 라이브러리를 사용하면 ``3D`` 이미지를 그릴 수 있습니다.



<br/><hr/><br/>



## 02. ``Modernizr.js``

우리가 만든 웹 페이지는 사용자의 브라우저에 따라 지원상태가 다릅니다.

사용자의 브라우저가 특정 기능을 지원하는지 여부를 파악할 수 있는 라이브러리가 바로 ``Modernizr.js`` 입니다.

> <a href="https://modernizr.com/" target="_blank">공식 홈페이지: https://modernizr.com/</a>

<br/>

``Modernizr.js``의 특징으로는 원하는 기능만 추가한 상태의 ``Modernizr.js``를 만들 수 있습니다.

<img src="./readmeAssets/01-modernizr-01.png" width="700px" alt="이미지: Modernizr 1"><br/>

<br/>

<img src="./readmeAssets/01-modernizr-02.png" width="700px" alt="이미지: Modernizr 2"><br/>

<br/>

<img src="./readmeAssets/01-modernizr-03.png" width="700px" alt="이미지: Modernizr 3"><br/>

<br/>

사용방법은 다음과 같습니다.

```html
<head>
  <script src="Modernizr 파일"></script>
</head>

<body>
  <canvas></canvas>

  <script>
  if(Modernizr.canvas) {
    // 지원하는 브라우저
  } else {
    // 미지원 브라우저
  }
  </script>
</body>
```



<br/><hr/><br/>



## 03. ``canvas`` 크기 설정

``canvas`` 태그에는 ``width`` 와 ``height`` 속성이 있습니다.

``width`` 속성과 ``height`` 속성은 ``canvas``로 만드는 이미지의 ``Pixel`` 규격을 설정하게 됩니다.

<br/>

만들어진 ``canvas``는 이미지처럼 다룰 수 있는데, 이러한 특징을 사용하여 ``canvas``의 해상도를 ``고해상도``로 만들 수 있습니다.

``canvas``의 ``width 속성``과 ``height 속성``을 실제로 출력할 크기의 ``2배``로 만들고, ``CSS`` 에서는 원래 출력하고자 했던 크기인 ``1배`` 크기로 ``width 스타일``과 ``height 스타일``을 지정하면 됩니다.

예를 들면, ``500 x 250`` 으로 출력할 ``canvas``를 다음과 같이 만드는 것입니다.

```html
<canvas class="myCanvas" width="1000" height="500"></canvas>
```

그리고, 실제로 출력할 크기였던 ``500 x 250``은 ``CSS``로 설정하는 것입니다.

```css
.myCanvas {
  width: 500px;
  height: 250px;
}
```

<br/>

이렇게 만들어진 ``canvas`` 이미지는 원래보다 ``2배 고해상도`` 이미지가 됩니다.

애플에서 인터렉티브 웹을 만들 때 사용하는 ``canvas 기법`` 입니다.

```html
<head>
  <style>
    .myCanvas {
      width: 500px;
      height: 250px;
    }
  </style>
</head>

<body>
  <canvas class="myCanvas" width="1000" height="500"></canvas>
</body>
```
# (MDN) 캔버스 기본 사용법 정리

# 00 - 캔버스 헨드북

* 사각형 그리기
  * ``ctx.fillRect(x, y, width, height)``
  * ``ctx.strokeRect(x, y, width, height)``
  * ``ctx.clearRect(x, y, width, height)``

<br />

* 펜 이동하기
  * ``ctx.moveTo(x, y)``

<br />

* 선 그리기
  * ``ctx.beginPath()``
  * ``ctx.lineTo(x, y)``
  * ``ctx.closePath()``
  * ``ctx.rect()``
  * ``ctx.stroke()``
  * ``ctx.fill()``

<br />

* 호 그리기
  * ``ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)``
  * ``ctx.arcTo(x1, y1, x2, y2, radius)``

<br />

* 베지어 곡선과 이차 곡선 그리기
  * ``quadraticCurveTo(cp1x, cp1y, x, y)``
  * ``bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)``

<br />

* ``Path2D`` 객체
  * ``new Path2D()``
  * ``path2d.선_그리기_메서드()``



<br /><hr /><br />



# 01 - 캔버스 기본 사용법

```javascript
/** @type { HTMLCanvasElement } */
const canvas = document.querySelector("캔버스 요소 선택자");

/** @type { CanvasRenderingContext2D } */
const ctx = canvas.getContext("2d");
```



<br /><hr /><br />



# 02 - 캔버스에 도형 그리기

## 02-01 - 직사각형 도형 예제

```javascript
// 색칠된 직사각형을 그립니다.
ctx.fillRect(x, y, width, height);

// 직사각형 윤곽선을 그립니다.
ctx.strokeRect(x, y, width, height);

// 특정 부분을 지우는 직사각형이며, 이 지워진 부분은 완전히 투명해집니다.
ctx.clearRect(x, y, width, height);
```



<br /><br />



## 02-02. ``path (경로)`` 그리기

``path (경로)`` 는 유일한 원시적인 (primitive) 도형 입니다.

``path (경로)`` 는 ``점`` 들의 집합이며, 복잡한 도형을 만들 수 있습니다.

<br />

``path (경로)`` 를 사용하여 도형을 만들 때, 다음과 같은 과정이 필요합니다.

1. ``path (경로)`` 를 생성합니다.
2. ``그리기 명령어`` 를 사용하여 경로상에 그립니다.
3. 그려진 ``path (경로)`` 를 실제로 그리기 위해, ``렌더링 명렁어`` 를 사용합니다. (채우기, 윤곽선)

```javascript
// 1. ``path (경로)`` 를 생성합니다.
ctx.beginPath();

// 2. ``그리기 명령어`` 를 사용하여 경로상에 그립니다.
// 2-1. 현재 하위 경로의 시작 부분과 연결된 직선을 추가 합니다. (경로 닫기)
ctx.closePath();

// 2-2. 윤곽선을 사용하여 도형을 그립니다. (렌더링 명령어)
ctx.stroke();

// 2-3. path (경로) 의 내부를 채워서, 내부가 채워진 도형을 그립니다. (렌더링 명령어)
ctx.fill();
```



<br /><br />



## 02-03. ``펜(pen)`` 이동하기

``펜(pen)`` 을 이동한다는 것은, 실제 그리지는 않지만 ``펜(pen)`` 의 위치를 옮기는 행위 입니다.

``Canvas`` 에서는 ``moveTo(x, y)`` 메서드가 ``펜(pen)`` 이동하기 기능을 제공 합니다.

<br />

``moveTo(x, y)`` 메서드는 그림을 그릴 시작점으로 이동하기 위해 자주 사용하게 될 메서드 입니다.

```javascript
ctx.moveTo(x, y);
```



<br /><br />



## 02-04. 선

직선을 그리기 위해서는 ``lineTo(x, y)`` 메서드를 사용할 수 있습니다.

``펜(pen)`` 의 ``현재 위치`` 에서 시작하여 ``lineTo(x, y)`` 의 좌표까지 직선을 그립니다.

<br />

``lineTo(x, y)`` 로 그린 직선들은 ``fill()`` 또는 ``stroke()`` 로 도형을 그릴 수 있습니다.

``fill()`` 메서드는 ``path(경로)`` 가 닫혀있지 않아도 ``시작점 - 끝점`` 을 연결하여 채워진 도형을 그려줍니다.

하지만, ``stroke()`` 메서드는 ``path(경로)`` 에 윤곽선을 그리는 기능이기 때문에, 도형을 완성시켜주지 않습니다.

따라서 윤곽선 도형을 그리기 위해서는, 마지막에 ``closePath()`` 메서드로 ``시작점 - 끝점`` 을 연결해주어야 합니다.

```javascript
ctx.beginPath();
ctx.moveTo(50, 25);
ctx.lineTo(75, 75);
ctx.lineTo(25, 75);
ctx.closePath();
ctx.stroke();
```



<br /><br />



## 02-05. 호 (arc)

``호`` 나 ``원`` 을 그리기 위해서는 ``arc()`` 또는 ``arcTo()`` 메서드를 사용합니다.

<br />

``arc(x, y, radius, startAngle, endAngle, anticlockwise)`` 는 호를 그리는 메서드 입니다.

* ``x``: 중심점 ``x 좌표``
* ``y``: 중심점 ``y 좌표``
* ``radius``: 반지름
* ``startAngle``: ``시작 각도`` (``0`` 이면 평면도의 ``+x 축`` 방향)
* ``endAngle``: ``끝 각도``
* ``anticlockwise``: ``true (기본값)`` 이면, ``시계방향`` 으로 회전

``arc()`` 메서드는 ``시작점``, ``반지름``, ``시작 각도``, ``끝 각도`` 를 사용하여 ``호`` 또는 ``원`` 을 그립니다.

<br />

``arcTo(beginX, beginY, endX, endY, radius)`` 는 호의 ``두 점`` 과 ``반지름`` 을 사용하여 ``호`` 또는 ``원`` 을 그립니다.

``arc()`` 만큼 상세하게 설정할 수 없어서, 보통은 ``arc()`` 를 사용합니다.

<br />

주의할 점은, ``arc()`` 와 ``arcTo()`` 는 ``path (선)`` 을 그리는 메서드이기 때문에, ``beginPath()`` 를 먼저 호출해야 합니다.



<br /><br />



## 02-06. ``베이저 (Bezier)`` 곡선과 ``이차 (Quadratic)`` 곡선

``펜(epn)`` 을 사용하면 직선만 그릴 수 있었습니다.

이번에 다룰 기능은 ``베지어 곡선 (Bezier curves)`` 입니다.

``베지어 곡선 (Bezier Curves)`` 는 ``이차 (Cubic)`` 과 ``삼차 (Quadric)`` 변수를 사용하여 그리게 됩니다.

이를 사용하면, 복잡한 ``유기체적 형태 (Organic Shape)`` 을 만들 수 있습니다.

<br />

``베지어 (Bezier) 곡선`` 을 그리는 메서드는 다음 2가지가 있습니다.

* ``quadraticCurveTo(cp1x, cp2y, x, y)`` 
  * ``현재 펜(pen)``의 위치와 ``(x, y)`` 위치를 ``(cp1x, cp1y) 제어점`` 을 사용하여, ``이차 베지어 곡선`` 을 그립니다.
* ``bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)``
  * ``현재 펜(pen)``의 위치와 ``(x, y)`` 위치를 ``(cp1x, cp1y) 제어점`` 과 ``(cp2x, cp2y) 제어점`` 을 사용하여, ``삼차 베지어 곡선`` 을 그립니다.

<br />

아래의 이미지는 ``quadraticCurveTo()`` 와 ``bezierCurveTo()`` 를 표현한 이미지 입니다.

(출처: [MDN - 베지어(Bezier) 곡선과 이차(Quadratic )곡선](https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes))

<img src="./readmeAssets/Canvas_curves.png"><br />

<br />

주의할 점은 ``선을 그리는 기능`` 이기 때문에, ``beginPath()`` 를 시작으로 작성해야 합니다.

```javascript
// 이차 베지에 곡선 (Quadratic Bezier Curves)

/** @type { HTMLCanvasElement } */
const canvas = document.querySelector("#tutorial");
const ctx = canvas.getContext("2d");

function draw() {
  ctx.beginPath();
  ctx.moveTo(75, 25);

  ctx.quadraticCurveTo(25, 25, 25, 62.5);
  ctx.quadraticCurveTo(25, 100, 50, 100);
  ctx.quadraticCurveTo(50, 120, 30, 125);
  ctx.quadraticCurveTo(60, 120, 65, 100);
  ctx.quadraticCurveTo(125, 100, 125, 62.5);
  ctx.quadraticCurveTo(125, 25, 75, 25);

  ctx.stroke();
}
```

<br />

```javascript
// 삼차 베지에 곡선 (Cubic Bezier Curves)

/** @type { HTMLCanvasElement } */
const canvas = document.querySelector("#tutorial");
const ctx = canvas.getContext("2d");

function draw() {
  ctx.beginPath();

  ctx.moveTo(75, 40);
  ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
  ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
  ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
  
  ctx.bezierCurveTo(100, 102, 130, 80, 130, 62.5);
  ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
  ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);

  ctx.fill();
}
```



<br /><br />



## 02-07. 직사각형 (``rect()``)

이전에 정리했던 ``fillRect()`` 와 ``strokeRect()`` 는 개별적인 직사각형을 그렸습니다.

``rect(x, y, width, height)`` 는 현재 ``열려있는 선(path)`` 에 직사각형을 ``추가`` 하는 메서드 입니다.



<br /><br />



## 02-08. ``Path2D`` 오브젝트

``Path2D`` 객체를 사용하면, ``Canvas`` 코드를 단순화 할 수 있고, 성능을 향상시킬 수 있습니다.

그리고 ``Path2D`` 객체는 드로잉 명령을 ``캐싱`` 하거나 ``기록`` 할 수 있습니다.

<br />

``Path2D`` 객체를 생성하는 방법은 다음과 같습니다.

```javascript
// 비어있는 Path2D 객체 생성
const path2d_01 = new Path2D();

// Path2D 객체 복사
new Path2D(path2d_01);

// SVG 데이터를 사용한 Path2D 생성
new Path2D(SVG데이터);
```

<br />

``Path2D`` 객체도 ``선 (path)`` 이므로, ``moveTo()``, ``lineTo()``, ``rect()``, ``quadraticCurveTo()`` 등과 같은 ``선 (path)`` 메서드를 제공 합니다.

그래서 캔버스에 그리고자 하는 오브젝트를 각각 ``Path2D`` 객체로 생성한다면, 도형별로 관리할 수 있습니다.

<br />

``Path2D`` 객체를 ``Canvas`` 에 렌더링 하려면, ``context.fill(Path2D객체)`` 또는 ``context.stroke(Path2D객체)`` 형식으로 그릴 수 있습니다.



<br /><hr /><br />



# 03. 스타일과 색 적용하기

## 03-01. 색상

도형의 면과 선에 색을 적용할 수 있습니다.

색상을 변경하려면, 다음 Property 에 ``CSS Color`` 값을 지정하여 적용할 수 있습니다.

* ``fillStyle = 색상값``: 면 색상값 적용
* ``strokeStyle = 색상값``: 선 색상값 적용

<br />

아래 코드는 색상을 적용하는 예시 입니다.

```javascript
context.fillStyle = "pink";
context.fillStyle = "#ff1493";
context.fillStyle = "rgb(255, 14, 93)";
context.fillStyle = "rgba(255, 14, 93, 33);
```



<br /><br />



## 03-02. 투명도

도형의 색상값에 투명도를 지정할 수 있습니다.

투명도를 지정하는 방법은 다음 두가지가 있습니다.

* ``globalAlpha`` Property 에 ``0.0 ~ 1.0`` 값으로 설정
* 색상값에 ``rgba(x, y, z, a)`` 로 설정

<br />

``globalAlpha`` Property 를 설정하면, 그 시점 이후로 그리는 모든 도형에 해당 투명도가 적용 됩니다.

그래서 개별로 투명도를 설정하고 싶다면, ``fillStyle`` 또는 ``strokeStyle`` 에 ``rgba()`` 로 설정하여 사용합니다.

<br />
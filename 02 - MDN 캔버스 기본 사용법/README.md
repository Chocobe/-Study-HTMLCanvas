# (MDN) 캔버스 기본 사용법 정리

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

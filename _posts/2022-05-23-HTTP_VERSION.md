---
title: "HTTP 버전별 특징"
category :
    - [til, cs]
tag :
    - Network
toc : true
toc_sticky: true
author_profile: true
use_math: true
date: 2022-05-23
last_modified_at: 2022-05-23
---

# HTTP의 버전별 변화

---

## HTTP

`HTTP`는 www에 내재된 프로토콜이다. HTTP는 처음 발명된 이후로 본래의 단순함을 지키면서 확장성 위에서 만들어지도록 많은 수정을 겪어왔다.

초기 `HTTP`의 발명에는 인터넷 상의 하이퍼텍스트 시스템을 만들기 위해 제안되었는데, 초기단계에 사용되던 HTTP 프로토콜은 매우 간단했으며 이후 HTTP/0.9버전으로 불리고, 원-라인 프로토콜로 불리기도 했습니다.

---

## HTTP/0.9 - 원-라인 프로토콜

HTTP 초기버전에는 버전 번호가 없었다. HTTP/0.9는 이후에 차후 버전과 구별하기 위해 0.9로 불리게 되었고, 이 버전은 극히 단순하다. 요청은 단일 라인으로 구성되며 리소스에 대한 경로로 가능한 메서드는 `GET`이 유일했다.

```HTTP
GET /mypage.html
```

응답 또한 극도로 단순한 파일 내용 자체로만 구성되었다.

```html
<HTML>
A very simple page
</HTML>
```

이후 버전들과 다르게 HTTP 헤더가 없었는데, 이는 HTML파일만 전송될 수 있으며 다른 유형의 문서는 전송될 수 없음을 의미했고, 상태 혹은 오류코드도 없었다. 문제가 발생한 경우 특정 html파일이 사람이 처리할 수 있도록 해당 파일 내부에 문제에 대한 설명과 함께 전송되었다.

---

## HTTP/1.0 - 확장성 만들기

HTTP/0.9는 매우 제한적이였어서, 브라우저와 서버 모두 융통성을 가지도록 빠르게 확장되었다.

- 버전 정보가 같이 전송되가 시작했다.
- 상태 코드 라인 또한 응답의 시작에 붙어 전송되고 브라우저가 요청에 대한 성공과 실패를 알 수 있고 결과에 대한 동작을 할 수 있게 되었다.
- HTTP 헤더 개념은 요청과 응답 모두를 위해 도입되어 메타데이터 전송을 허용하고 프로토콜을 극도로 유연하고 확장 가능하도록 만들었다.
- 새로운 HTTP 헤더의 도움으로 HTML파일 외의 다른 문서들을 전송하는 기능이 추가되었다. (`Content-Type`)

HTTP/1.0의 요청과 응답은 다음과 같이 생겼다.

```HTTP
GET /mypage.html HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)

200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/html
<HTML>
A page with an image
  <IMG SRC="/myimage.gif">
</HTML>
```

```HTTP
GET /myimage.gif HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)

200 OK
Date: Tue, 15 Nov 1994 08:12:32 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/gif
(image content)
```






---

## HTTP/1.1 - 표준 프로토콜

HTTP의 첫번째 표준 버전인 HTTP/1.1은 HTTP/1.0이 나온지 몇 달 안되서 1997년 초에 공개되었다. 그리고 15년 넘게 확장되었다.

HTTP/1.1은 모호함을 명확하게 하고 많은 개선사항을 도입했다.

- 커넥션이 재사용될 수 있게 되었다. (`keep-alive default`)
- 파이프라이닝을 추가하여 첫번째 요청에 대한 응답이 완전히 전송되기 이전에 두번째 요청을 가능케 하여 커뮤니케이션의 레이턴시를 낮췄다.
- 현재 웹 보안 모델은 HTTP가 만들어진 이후에 개발되었으므로, `Same origin policy`정책을 사용했었다. 후에 `CORS`문제를 해결하기 위해 확장을 추가하였다.

다음은 하나의 단일 커넥션을 통한 요청의 전형적인 흐름 예시이다.

```HTTP
GET /en-US/docs/Glossary/Simple_header HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/en-US/docs/Glossary/Simple_header

200 OK
Connection: Keep-Alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Wed, 20 Jul 2016 10:55:30 GMT
Etag: "547fa7e369ef56031dd3bff2ace9fc0832eb251a"
Keep-Alive: timeout=5, max=1000
Last-Modified: Tue, 19 Jul 2016 00:59:33 GMT
Server: Apache
Transfer-Encoding: chunked
Vary: Cookie, Accept-Encoding

(content)


GET /static/img/header-background.png HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/en-US/docs/Glossary/Simple_header

200 OK
Age: 9578461
Cache-Control: public, max-age=315360000
Connection: keep-alive
Content-Length: 3077
Content-Type: image/png
Date: Thu, 31 Mar 2016 13:34:46 GMT
Last-Modified: Wed, 21 Oct 2015 18:27:50 GMT
Server: Apache

(image content of 3077 bytes)
```


---

## HTTP/2 - 더 나은 성능을 위한 프로토콜

시간이 지나면서 웹 페이지는 매우 복잡해졌다. 디스플레이 되는 시각적 미디어의 양에 덧붙여 상호작용을 추가하기 위한 스크립트의 양과 크기가 점점 많아지고, 더 많은 데이터들이 더 많은 요청에 의해 전송되고 있다.
그런데, HTTP/1.1은 올바른 순서로 전송되는 요청을 필요로 하게 되는데 이는 많은 양의 오버헤드를 발생시킨다.

그 결과로 HTTP/2 프로토콜이 만들어지는데, HTTP/1.1과 다른 몇가지 근본적인 차이점이 있다.

- HTTP/2는 텍스트 프로토콜이라기 보다는 이진 프로토콜이다. 더이상 읽을 수도 없고 수작업을 만들어낼 수 없다. 이러한 결점에 대한 보상으로 새로운 최적화 기술이 구현될 수 있다고 한다.

- 병렬 요청이 동일한 커넥션 상에서 다루어질 수 있는 다중화 프로토콜로, 순서를 제거해주고 HTTP/1.x 프로토콜의 제약사항을 막아준다.

- 전송된 데이터의 분명한 중복과 그런 데이터로부터 유발된 불필요한 오버헤드를 제거하면서, 연속된 요청 사이의 매우 유사한 내용으로 존재하는 헤더들을 압축시킨다.

---

## HTTP/3 - HTTP over QUIC

HTTP의 다음 메이저 버전인 HTTP/3에서는 전송 계층 부분에 TCP/TLS 대신 QUIC가 사용된다. 모든 웹브라우저에서 구현되지 않았고 브라우저 호환성을 확인해야한다.

Quick UDP Internet Connection 또는 QUIC은 UDP 상에 구현된 실험적인 다중 전송 프로토콜로 TCP 및 웹 애플리케이션 전송을 개선하기 위한 방법을 위해 Google에서 실험적으로 개발한 프로토콜이다.

TCP는 많은 운영 체제 커널에 내장되어 있기 때문에 변경사항을 실험하고 수정을 구현하는 것에 시간이 많이드는 과정이기에, QUIC을 만들어 개발자는 더 빠르게 실험을 할 수 있고, 새로운 것을 시도할 수 있게 되었습니다.

QUIC은 HTTP/2의 의미론적 지원을 위해 설계되었습니다. 멀티플랙싱, 흐름 제어, 보안 및 혼잡 제어를 제공해줍니다.

QUIC의 중요한 기능은 다음과 같다.

- 연결 설정 시간 단축
- 혼잡 제어 개선
- Head of Line Blocking 없는 멀티플렉싱
- 전달 오류 수정
- 연결 마이그레이션

현재 QUIC를 지원하는 브라우저와 서버는 그리 많지 않다.

---

## Reference
https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP

https://developer.mozilla.org/ko/docs/Glossary/QUIC
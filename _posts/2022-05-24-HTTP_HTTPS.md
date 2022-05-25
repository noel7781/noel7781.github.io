---
title: "HTTP와 HTTPS"
category :
    - [til, cs]
tag :
    - Network
toc : true
toc_sticky: true
author_profile: true
use_math: true
date: 2022-05-24
last_modified_at: 2022-05-24
---

# HTTP and HTTPS

---

## HTTP

`HTTP(hyper text transfer protocol)`은 서버와 클라이언트 상에서 어떻게 메시지를 교환할지를 정해놓은 규칙이다. 요청과 응답으로 구성되어 있으며 일반적으로 `80`포트를 사용한다.

웹브라우저 상의 맨앞에 `http://`, `https://`가 바로 이 프로토콜을 사용해서 정보를 교환하겠다는 표시이다.

HTTP의 응답은 다음과 같다.

```HTTP
GET /index.html HTTP/1.1
HOST: www.naver.com
```

물론 조금더 많은 내용들이 헤더에 포함된다.
```HTTP
:authority: www.naver.com
:method: GET
:path: /
:scheme: https
accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
accept-encoding: gzip, deflate, br
accept-language: ko-KR,ko;q=0.9
cookie: NNB=IYCMYUICU6FWE
sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "macOS"
sec-fetch-dest: document
sec-fetch-mode: navigate
sec-fetch-site: none
sec-fetch-user: ?1
upgrade-insecure-requests: 1
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36
```

이런 HTTP 프로토콜은 애플리케이션 프로토콜로 OSI 7계층의 마지막 프로토콜로, IP/TCP계층 위에 존재한다. 하지만 HTTP는 암호화되지 않은 평문 데이터를 전송하는 프로토콜이였기 때문에, HTTP를 통해 내가 보낸 데이터의 도/감청이 가능하고 제3자가 임의로 수정해서 나에게 보내줘도 이것이 위조되었는지 알수있는 방법이 없다.


---

## HTTPS

`HTTPS(hyper text transfer protocol secure)`는 http에 데이터 암호화가 추가된 프로토콜이다. `HTTPS`는 포트번호 `443`을 사용하게 된다.

HTTPS는 데이터를 암호화하여 보안을 챙기는데, 대칭키 암호화와 비대칭키 암호화 두가지를 다 사용한다.

* 대칭키 암호화
    * 클라이언트와 서버가 동일한 키를 통해 암호화/복호화
    * 계산속도가 엄청 빠름
    * 동일한 키 나눠갖을 방법이 필요

* 비대칭키 암호화
    * 클라이언트와 서버가 각각 공개키와 비밀키를 가지고 암호화/ 복호화 진행
    * 비밀키를 뺏기면 보안에 문제가 생기지만 그외의 경우에 보안이 좋음(계산 엄청 오래걸림)
    * 대칭키 암호화에 비해 속도가 느림

![비대칭](https://imgur.com/zXHA53R.jpg)

HTTPS는 대칭키 암호화방식과 비대칭키 암호화 방식을 모두 사용하여 서로의 장점을 이용하는 프로토콜이다. 대칭키 알고리즘은 빠르지만 키를 나눠가지는 과정에서 도청당하여 키를 뺏길 우려가 있다. 비대칭키 알고리즘은 그부분에서는 안전하지만 속도가 느리다. 따라서 대칭키를 공유하는 과정을 비대칭키 암호화를 통해 나눠가지는 방법을 택한다.

실제 HTTPS 연결 과정이 성립되는 흐름을 살펴보자.

1. 클라이언트(브라우저)가 서버로 최초 연결을 시도함
1. 서버는 공개키(인증서)를 브라우저에게 보낸다.
1. 브라우저는 인증서의 유효성을 검사하고 세션키를 발급한다.
1. 브라우저는 세션키를 보관하며 추가로 서버의 공개키를 세션키로 암호화하여 서버로 전송한다.
1. 서버는 개인키로 암호화된 세션키를 복호화하여 세션키를 얻는다.
1. 클라이언트와 서버는 동일한 세션키를 공유하므로 데이터를 전달할 때 세션키(대칭키)로 암호화/복호화 할 수 있다.



이 과정을 보면 중간에 인증서를 사용하게 되는데, 서버가 비대칭키를 발급받는 과정에서, 서버는 클라이언트와 세션키를 공유하기 위한 공개키를 생성해야 하는데 일반적으로 인증된 기관(CA)에 공개키를 전송하여 인증서를 발급받는다. 

인증서는 CA의 개인키로 암호화 되었기 때문에 신뢰성을 확보할 수 있고 클라이언트는 기업의 공개키로 데이터를 암호화 하였기 때문에 해당 공개키의 쌍을 가진 기업만 비밀키로 복호화 하여 원본 데이터를 얻을 수 있다. 여기서 인증서에는 기업의 공개키가 포함되어 있다.

만약 브라우저에 인증된 CA기관 정보들이 사전에 등록되어 있는 인증된 CA기관이 아닐경우 `NOT SECURE`라는 형태로 브라우저에 표시된다.

과거에는 HTTPS를 사용하면 속도가 느려졌다고 하지만 오늘날에는 크게 차이가 없다고 한다.
하지만 HTTPS는 인증서를 발급하고 유지하기 위한 추가 비용이 발생한다.

보안을 중요하다면 당연히 HTTPS를 사용하는게 좋을것이다.

---

## Reference
https://mangkyu.tistory.com/98
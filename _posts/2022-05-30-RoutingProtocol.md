---
title: "라우팅 프로토콜"
category :
    - [til, cs]
tag :
    - Network
toc : true
toc_sticky: true
author_profile: true
use_math: true
date: 2022-05-30
last_modified_at: 2022-05-30
---



# Routing Protocol

라우팅 프로토콜은 네트워크상에서 데이터 전송하는 길을 정하는 방법이다.

![route](https://imgur.com/wBixKyg.jpg)

라우팅 방법으로는 미리 존재하는 라우팅 테이블에 있는 정보를 바탕으로 라우팅 하는 정적 라우팅 방식과 라우팅 프로토콜을 통해 라우팅 될 위치를 결정하는 동적 라우팅 방식이 있다. 

동적 라우팅 프로토콜 방식 안에도 내부 라우팅과 외부 라우팅 방식이 나눠져있다. 


대포적인 라우팅 알고리즘인 RIP, OSPF, BGP에 대하여 정리한다.

## Internal Gateway Protocol

내부 라우팅 방식은 같은 `AS(Autonomous System), 하나의 그룹/기관이 동일한 라우팅 정책으로 하나의 관리자에 의해 운영되는 네트워크` 내부에서 라우팅이 일어날때, 라우팅 경로를 결정해주는 프로토콜이다.
거리와 비용을 측정하는 방식은 기준마다 다를 수 있다.


### RIP

RIP는 `Distance vector`, 거리값에 근거한 알고리즘으로 목적지까지의 거리가 최적 경로의 판단 기준이 된다.

RIP에서는 `홉(Hop)`이라는 단어를 사용하는데, 네트워크와 네트워크 사이의 거리를 의미하며 목적지까지 7hop 이 소요된다고 하면 목적지까지 가는데 7개의 네트워크를 지나간다는 의미이다. 

RIP는 벨만포드 알고리즘을 사용해 라우팅 경로를 결정한다.

최대 16홉을 지원해 소규모의 네트워크에서 적합하고, 30초마다 라우팅 테이블을 이웃 라우터들과 공유한다. 


### OSPF

OSPF는 RIP와 다르게 다익스트라 방식을 통해 최적경로를 찾아내며 hop만을 사용하는것이 아니라 대역폭, 지연시간등을 모두 고려한 방식이다.

OSPF는 Link state routing을 사용하는데, 라우팅 하는데 있어 모든 노드가 전체 네트워크에 대한 구성도를 만들어서 경로를 구한다.

각 라우터는 이웃에 관한 정보를 전체 라우터와 공유하고 네트워크상에서 변화가 발생하면 다시 정보를 공유한다. 

---

## External Gateway Protocol

외부 라우팅 방식은 다른 `AS`간의 라우팅 정보를 교환하는 방식이다. 

## BGP

![bgp](https://imgur.com/b3vjPn2.jpg)
https://docs.vmware.com/en/VMware-Smart-Assurance/10.1.0/npm-bgp-user-guide-101/GUID-14476D74-E989-4E21-AF2D-F8A98E4A330C.html

BGP는 RIP나 OSPF등의 라우팅 방식에 비해 규모가 큰 망을 지원할 수 있는 프로토콜로 외부 라우팅 방식이다.

BGP는 RIP와 같은 Distance vector을 사용하는 라우팅 알고리즘이나, 목적지 까지의 경로값을 전송하는 것이 아니고, 목적지까지 도달하는데 경유하는 AS의 순서를 전송하므로 거리값 알고리즘이 가지고 있는 무한 경로값의 단점을 가지고 있지 않다.

---

## Reference

https://docs.vmware.com/en/VMware-Smart-Assurance/10.1.0/npm-bgp-user-guide-101/GUID-14476D74-E989-4E21-AF2D-F8A98E4A330C.html
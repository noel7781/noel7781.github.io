---
title: "TCP Handshake"
category :
    - [til, cs]
tag :
    - Network
toc : true
toc_sticky: true
author_profile: true
use_math: true
date: 2022-05-21
last_modified_at: 2022-05-21
---

# TCP Hanshake

TCP는 연결지향 프로토콜이다.
연결을 수립할 때 `3 way handshake`를 통해 연결설정을 하고 `4 way handshake`를 통해 연결을 끊는다.

이 두가지 연결설정과 연결해제에 대해 알아본다.

---

## 3 way handshake

![3way](https://imgur.com/VtbzBPF.jpg)

1. 클라이언트는 서버에 접속을 요청하는 SYN(seq=x) 패킷을 보낸다.
1. 서버는 클라이언트의 요청인 SYN(seq=x)를 받고 클라이언트에게 요청을 확인했고 클라이언트 측에 확인요청을 보내는 ACK(x+1), SYN(y)이 설정된 패킷을 보낸다.
1. 클라이언트는 서버의 SYN패킷에 대한 응답으로 ACK(y+1)를 서버로 보내게 된다.

이렇게 3번의 패킷 교환을 통해 연결을 하겠다는 클라이언트와 서버 간의 통신이 이뤄지고, 이후 통신이 진행된다.

---

## 4 way handshake

![4way](https://imgur.com/kxhktnP.jpg)


1. 클라이언트가 연결이 더이상 필요 없을때 연결을 종료하겠다는 FIN 패킷을 서버에 전송한다.

1. 서버는 클라이언트의 FIN 패킷을 받고 확인 메시지로 ACK패킷을 전송한다. 그리고 통신이 끝날때까지 기다리는데 이 상태를 CLOSE_WAIT이라고 한다.

1. 서버에서 연결을 종료할 준비가 되면 연결해지를 위해 클라이언트에게 FIN 패킷을 전송한다.

1. 클라이언트는 FIN 패킷을 확인했다는 ACK 패킷을 서버에 보낸다.

이후 클라이언트의 ACK를 받은 서버는 소켓을 닫고, 클라이언트는 서버로부터 아직 받지 못한 데이터가 있을것을 대비하여 일정시간 세션을 남겨놓고 잉여 패킷을 기다리는 과정을 거친다. (TIME_WAIT) 서버에서 전송한 패킷이 지연으로 FIN패킷보다 늦게 도착하는 상황이 있을수 있기 때문이다.

---

### Sequence Number

클라이언트와 서버가 통신할 때 SYN패킷에는 Sequence number을 사용하는데, 가장 처음 sequence number을 ISN이라고 한다. 이때 ISN은 0부터 시작하는것이 아니라 랜덤한 수로 시작하게 되는데, 그 이유는 연결을 맺을 때 사용되는 포트는 유한 범위 내에서 사용되고 시간이 지나면 재사용된다. 그래서 통신 과정에서 과거에 사용된 포트번호 쌍을 사용하게 되는 경우가 발생할 수 있는데 서버에서 SYN패킷의 sequence number을 확인했을때 순차적인 수가 전송되면 이전의 연결에서 오는 패킷으로 인식할 수도 있기 때문에, ISN을 랜덤하게 시작한다.

![seq](https://blog.kakaocdn.net/dn/cuyGD3/btqwOmkFcPl/C1kwYqOkqQeSdbDaplBDdK/img.png)
출처: https://nogan.tistory.com/22

---

## REFERENCE
https://gyoogle.dev/blog/computer-science/network/TCP%203%20way%20handshake%20&%204%20way%20handshake.html

https://www.geeksforgeeks.org/tcp-connection-termination/

https://nogan.tistory.com/22
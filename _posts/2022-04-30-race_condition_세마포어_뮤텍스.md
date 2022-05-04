---
title: "Race Condition & Mutex, Semaphore"
category :
    - [til, cs]
tag :
    - OS
toc : true
toc_sticky: true
author_profile: true
use_math: true
date: 2022-04-30
last_modified_at: 2022-04-30
---




# Race condition, Semaphore, Mutex

---

## Race condition

`Race condition`이란 경쟁하는 상태를 나타내는 말로, 멀티쓰레드 환경에서의 `race condition`은 두개 이상의 프로세스가 공용 데이터에 접근하는데, 접근 순서에 따라 결과가 달라지는 현상을 뜻하고 데이터베이스 환경에서 `race condition`은 2개 이상의 execution이 같은 데이터에 접근하며 접근순서에 따라 결과가 달라지는 현상을 말한다.

`race condition`은 `read-only` 연산에 대해 발생하지 않는다. 2개 이상의 프로세스, 쓰레드 혹은 execution에 대하여 그중 하나가 적어도 `write`연산을 하는 경우 발생하게 된다.

가장 흔히 볼수 있는 예제로 지난번에 정리했던 `프로세스&쓰레드` 글의 cnt를 증가시키는 예제가 있다.

이러한 상황을 해결하기 위하여 **공유자원**의 사용을 독점적으로 보장해준다면, 문제가 발생하지 않는다. 그런 영역을 `Critical section`이라고 하고, 이 영역을 보장해주기 위한 방법이 필요하다.   

---

## Semaphore

세마포어란 공유 자원에 여러 프로세스의 접근을 막는 방법중 하나다. 공유 자원에 접근할 수 있는 프로세스의 최대 허용치 만큼 동시에 여러 프로세스가 접근할 수 있다.

세마포어 S는 정수값을 가지는 변수이며, 다음과 같이 P와 V라는 명령에 의해서만 접근할 수 있다. (P와 V는 각각 try와 increment를 뜻하는 네덜란드어 Proberen과 Verhogen의 머릿글자를 딴 것이다.)

P는 임계 구역에 들어가기 전에 수행되고, V는 임계 구역에서 나올 때 수행된다. 이때 변수 값을 수정하는 연산은 모두 원자성을 만족해야 한다. 다시 말해, 한 프로세스(또는 스레드)에서 세마포어 값을 변경하는 동안 다른 프로세스가 동시에 이 값을 변경해서는 안 된다.


```C
최초로 제시된 방법은 busy waiting을 통한 방법이다(https://ko.wikipedia.org/wiki/%EC%84%B8%EB%A7%88%ED%8F%AC%EC%96%B4)
 P(S) {
     while S <=0; // 아무것도 하지 않음 (반복문)
     S--;
 }

 V(S) {
     S++;
 }
 ```

```C
최초 방법의 단점을 보완한 방법으로서 재움 큐를 활용하여 프로세스를 재우는 방식이다.(https://ko.wikipedia.org/wiki/%EC%84%B8%EB%A7%88%ED%8F%AC%EC%96%B4)
 P(S) {
     S--;
     if S < 0
         // 이 프로세스를 재움 큐에 추가 (잠 듦)
 }

 V(S) {
     S++;
     if S <= 0
         // 재움 큐로부터 프로세스를 제거 (깨어남)
 }
 ```

최초의 방법은 busy waiting을 통해 while반복문을 계속 확인하는 방식이였으나, 방법을 개선하여 sleep and wakeup 방식으로 세마포어를 사용할 수 있다.

---

## Mutex

뮤텍스란 binary semaphore와 같은 개념으로 1개의 쓰레드만이 공유자원에 접근할 수 있도록 만드는 방법을 말한다. lock과 unlock을 통해 `Critical section`의 실행하는 쓰레드를 1개로 보장한다.

```java
public interface Lock {
    public void lock();
    public void unlock();
}
```

```java
public class Counter {

    private int count;
    // Critical section 보호하기 위한 lock
    private Lock lock;

    public int getAndAddOne() {
        // Critical secion 진입
        lock.lock();
        try {
            int ret = count;
            count += 1;
            return ret;
        } finally {
            // Critical secion 탈출
            lock.unlock();
        }
    }
}
```

추상적으로 lock을 표현한 코드인데, 좋은 lock 알고리즘을 생각해보면 다음과 같다.

1. Mutual Exclusion을 보장해야 한다. 한 쓰레드가 작업하고 있을때 다른 쓰레드가 같은 section에서 작업하면 안된다.
2. 공정성(fairness)를 보장해야한다. 락을 전혀 얻지 못해 기아상태에 빠지는 경우가 발생하는지 봐야한다.
3. 성능, 락 사용 시간적 오버헤드를 평가해야 한다. 락을 획득하고 경쟁할떄의 성능을 따져봐야 한다.
---
title: "프로세스와 쓰레드"
category :
    - [til, cs]
tag :
    - OS
toc : true
toc_sticky: true
author_profile: true
use_math: true
date: 2022-04-25
last_modified_at: 2022-04-25
---

# 프로세스와 쓰레드

---

## 프로세스

`프로세스`란 실행중인 프로그램을 의미한다.
프로세스는 프로세스마다 코드영역, 데이터영역, 스택영역, 힙영역등 자신의 메모리 공간을 가지게 된다.

프로세스가 다른 프로세스의 자원에 접근하려면 `IPC(Inter Process Communication)`방법을 통해 접근할 수 있다.

---

## 쓰레드

`쓰레드`란 프로세스 내에서 실제로 작업을 수행하는 주체를 의미한다.
모든 프로세스에는 한 개 이상의 스레드가 존재하여 작업을 수행한다.

프로그램에서 단일 PC 값으로 한 순간에 하나의 명령어만을 실행하는 고전적인 관점에서 벗어나 멀티 쓰레드 프로그램은 하나 이상의 실행 지점(여러개의 PC값)을 가지고있다.

싱글 쓰레드 프로그램은 스택이 하나만 존재한다. 반면에 멀티 쓰레드 프로세스의 경우 각 쓰레드가 독립적으로 실행되며 쓰레드가 실행하기 위해 여러 루틴들이 호출할 수 있다. 주소공간에는 하나의 스택이 아니라 쓰레드마다 스택이 할당되어 있다.

쓰레드 들은 주소 공간을 공유하기 때문에 동일한 값에 접근할 수 있다.(스택만 개별로 가짐)

쓰레드 간의 `context switch`는 프로세스간의 `context switch`와 유사하다.   
프로세스가 `context switch`시 프로세스의 상태를 `Process Control Block`에 저장하듯 쓰레드는 쓰레드들의 상태를 `Thread Control Block`에 저장한다.
쓰레드들간의 문맥교환시 주소공간을 그대로 사용하기 때문에 사용하고 있던 페이지 테이블을 그대로 사용하면 된다.

---

## 멀티 프로세스와 멀티 쓰레드

* 멀티프로세스
1.프로세스마다 별도의 메모리공간을 할당해줘야 한다.(시간 및 공간 소요↑)
2.멀티쓰레드의 경우보다 다른 실행흐름의 자원을 이용하기 불편하다. (IPC 사용 필요)
3.어느 프로세스에 문제가 생겨도 다른 프로세스에게 영향을 주지 않는다.
* 멀티쓰레드
1.스택메모리 이외의 메모리공간을 공유하므로 효율적이다.
2.공유객체의 동기화문제에 대해 조심해야한다.
3.한 쓰레드에 문제가 생기면 다른 쓰레드 및 프로세스에도 문제가 생길수 있다.
---

## 멀티 쓰레드의 단점

```c
#include <pthread.h>
#include <stdio.h>

#define LOOPS 10000000

int counter = 0;


void* increment(void* arg) {
    for(int i = 0; i < LOOPS; i++) {
        counter++;
    }
    return NULL;
}

int main() {
    pthread_t threads[10];
    for(int i = 0; i < 10; i++) {
        if(pthread_create(&threads[i], NULL, increment, NULL)) {
            printf("Error creating thread\n");
            return 1;
        }
    }
    for(int i = 0; i < 10; i++) {
        if(pthread_join(threads[i], NULL)) {
            printf("Error joining thread\n");
            return 1;
        }
    }
    printf("Expected = %d Counter = %d difference = %d\n", LOOPS*10, counter, LOOPS*10-counter);
    return 0;
}
```

해당 코드에서 LOOPS값을 10이나 100등의 작은 값으로 입력하면 expected나 counter값이 다르지 않다.
```sh
Expected = 1000 Counter = 1000 difference = 0
```
하지만 LOOPS값이 커지면 문제가 발생한다.
```sh
Expected = 100000000 Counter = 16361199 difference = 83638801
```

위 예제에서 `counter++`연산이 `atomic`하지 않기 때문에 쓰레드들의 연산 순서에 따른 `race condition`이 발생하게 되고 실행할때마다 다른 결과를 얻게 된다.
멀티 쓰레드가 전역변수등의 공유변수의 값을 변경하려고 할 때 경쟁조건이 발생하기 때문에 이런 상황에서 하나 이상의 쓰레드에서 동시에 실행되면 안되는 코드가 되고 이러한 영역을 `Critical section(임계 영역)`이라고 한다.

이렇게 무분별하게 공유변수(객체)의 값을 변경하게 되면, 프로그래머가 예상하지 못하는 결과를 얻을 수 있다. 이러한 부분에서 멀티쓰레드를 사용할 때 주의가 필요하다.

---
## 커널 쓰레드와 유저 쓰레드

커널 레벨 쓰레드는 커널레벨에서 생성되는 쓰레드이다. 운영체제 시스템 내에서 생성되어 동작하는 쓰레드로 커널이 직접 관리한다. 

유저 레벨 쓰레드는 유저가 라이브러리등을 통해 만들어서 사용하는 쓰레드이다.

커널 레벨 쓰레드는 쓰레드를 커널이 직접 관리해서, 스케쥴러가 쓰레드를 직접 관리한다. 쓰레드의 존재를 커널이 알고있고, 스케쥴러가 쓰레드의 각각의 실행을 관리한다.

유저레벨 쓰레드는 쓰레드가 라이브러리 모델로 제공되어, 커널입장에서는 그냥 코드가 실행되고 있는것으로 그게 쓰레드인지 알지 못한다. 커널은 쓰레드 단위로 `context switch`하지 않고 프로세스 단위로 하게된다. 커널이 여러 개의 유저 쓰레드를 하나의 프로세스로 간주한다.

쓰레드가 I/O Blocking에 빠졌을 경우 커널레벨 쓰레드는 스케쥴러가 다른 쓰레드로 스케쥴링을 할 수있는데, 유저레벨 쓰레드의 경우 쓰레드의 존재를 모르므로, 블로킹 상태인지 알지 못한다. 그래서 실행권을 바로 다른 쓰레드에게 넘겨주지 못한다.

이렇게 쓰레드가 Blocking상태일 때 곧바로 다른 쓰레드로 스케쥴링 해주지는 않지만, 커널레벨 쓰레드는 쓰레드간에 실행을 넘길때마다 커널모드로 바꾸는 등의 오버헤드가 있으므로, 유저레벨 쓰레드보다 생성 및 관리가 느리다. 유저레벨 쓰레드는 동일한 메모리 영역에서 쓰레드가 생성되고 관리되므로(라이브러리에서 관리), 속도가 빠르다는 장점이 있다.

---

2022 04 25. 조성진 
END
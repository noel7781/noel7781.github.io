---
title: "CPU 스케쥴링"
category :
    - [til, cs]
tag :
    - OS
toc : true
toc_sticky: true
author_profile: true
use_math: true
date: 2022-04-24
last_modified_at: 2022-04-24
---

# CPU Scheduling


`cpu scheduling`이란 스케줄링 정책에 선택된 프로세스에게 CPU time을 할당하는 것이다.

---

## Scheduling Metrics

* `Turnaround time` : 작업이 도착한 시간부터 완료될때까지의 시간
> T~turnaround~ = T~completion~ - T~arrival~
* `Fairness` : 공정성
* `Response time` : 작업이 도착한 시간부터 처음 실행될때까지 걸리는 시간
> T~response~ = T~firstrun~ - T~arrival~

등..

---

## FIFO

먼저 도착한 프로세스를 먼저실행, `FCFS(first come first serve)`라고도 한다.

간단하고 직관적임.

단점: 모든 프로세스가 동일한 시간동안 동작하지 않는다면, `Convoy effect(CPU 사용시간이 긴 프로세스에 의해 사용시간이 짧은 프로세스들이 오래 기다리는 현상)` 발생

---

## SJF (Non Preemption)

가장 짧은 Job(Process) 먼저 실행하는 정책.

단점: 짧은 프로세스가 나중에 들어오면 `Turnaround time 증가`

---

## STCF (Preemption)

SJF에서 짧은 Process가 들어올 시 뺏어서 실행.

장점: Turnaround time good

단점: 긴 프로세스는 starvation에 빠질 수 있다. 응답시간이 좋지 않다.

---

## Round Robin

Process를 시분할 하여 일정 time quantum동안 실행하고 다음프로세스 실행하는 방식.

장점: 응답시간 매우 좋음. 

단점: Tuaround time bad

>**trade-off**
>시분할을 짧게하면 -> 응답시간 더 좋아지나, `Context Switch` overhead
>시분할을 길게하면 -> `Context Switch`비용 감소하나, 응답시간 나빠짐

---

## MLFQ

과거를 통해 미래를 예측하는 방법 사용
`Turnaround time`과 `Response time`의 적절한 조화로 최선의 해결책을 찾고자 하는 방법.

`Multi level Feedback Queue`로 여러 level의 queue가 존재하는데, 우선순위가 높은 큐부터 실행하고, 같은 큐 내부에서는 `Round Robin`으로 스케쥴링함.

문제점: `interactive process`들은 high priority로 두게 되는데, 만약 너무 많은 high priority 프로세스 존재시에 starvation 발생 -> `priority boost` 와 `Lower priority => Longer Time quantum`을 통해 조절

---

## Stride(Lottery) Scheduling

Fairness를 중요시하는 시스템에서 사용할 수 있는 design (To Gurantee that job obtain a certain percentage of CPU Time)

`Stride and Pass`

`Tickets and Currency`

`Ticket`은 프로세스에게 할당된 자원을 의미한다. `Ticket`이 크면 `Stride`가 작고, `Ticket`이 작으면 `Stride`가 크다.
`Pass`는 현재까지 지나온 거리를 의미

새로운 프로세스 추가시 현재 Pass값의 최솟값을 주면 공정성 보장

---

2022.04.25 조성진 -END-
var store = [{
        "title": "블로그 업로드 테스트",
        "excerpt":"hello!!   hello   hello   hello  ","categories": ["til"],
        "tags": ["new"],
        "url": "/til/hello/",
        "teaser": null
      },{
        "title": "도커 사용하기",
        "excerpt":"Docker 알아보기 프로그래밍 하면서 환경설정에 어려움을 겪는 경우가 많다. 나 역시도 잦은 환경설정에 지치는 경우가 많다.(특히 버전문제) 환경설정을 할 때 한번 설정해두고 그것을 이미지화 시켜서 사용한다면 환경설정에 들어가는 아까운 시간을 아낄 수 있으며 버전에 따른 문제가 발생하는 것을 방지할 수 있지 않을까? 라는 생각이 든다면 Docker를 사용해보자. 도커를 처음 쓰게...","categories": ["til","cs"],
        "tags": ["docker"],
        "url": "/til/cs/docker1/",
        "teaser": null
      },{
        "title": "도커 알아보기 - 2",
        "excerpt":"Docker 알아보기 - 2 Docker 사용기 - 2 Docker run을 실행하면 Docker는 독립적인 컨테이너에서 프로세스를 실행한다. 이 컨테이너는 독립적인 파일시스템, 네트워크, 프로세스 상태를 가지고 있다. 명령어의 형태는 다음과 같다. $ docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...] docker run에서는 추가적인 명령어로 실제 vm을 사용하는것 같이 attach상태 또는 백그라운드에서 작동하게 만드는 detach를...","categories": ["til","cs"],
        "tags": ["docker"],
        "url": "/til/cs/d2ockers/",
        "teaser": null
      },{
        "title": "시스템콜(wait, fork, exec)",
        "excerpt":"System call Wait – wait for process termination SYNOPSIS #include &lt;sys/wait.h&gt; pid_t wait(int *stat_loc); pid_t wait3(int *stat_loc, int options, struct rusage *rusage); pid_t wait4(pid_t pid, int *stat_loc, int options, struct rusage *rusage); pid_t waitpid(pid_t pid, int *stat_loc, int options); DESCRIPTION The wait() function suspends execution of its calling process until...","categories": ["til","cs"],
        "tags": ["OS"],
        "url": "/til/cs/systemcall/",
        "teaser": null
      },{
        "title": "CPU 스케쥴링",
        "excerpt":"CPU Scheduling cpu scheduling이란 스케줄링 정책에 선택된 프로세스에게 CPU time을 할당하는 것이다. Scheduling Metrics Turnaround time : 작업이 도착한 시간부터 완료될때까지의 시간 T~turnaround~ = T~completion~ - T~arrival~ Fairness : 공정성 Response time : 작업이 도착한 시간부터 처음 실행될때까지 걸리는 시간 T~response~ = T~firstrun~ - T~arrival~ 등.. FIFO 먼저 도착한 프로세스를...","categories": ["til","cs"],
        "tags": ["OS"],
        "url": "/til/cs/cpu_scheduling/",
        "teaser": null
      },{
        "title": "프로세스와 쓰레드",
        "excerpt":"프로세스와 쓰레드 프로세스 프로세스란 실행중인 프로그램을 의미한다. 프로세스는 프로세스마다 코드영역, 데이터영역, 스택영역, 힙영역등 자신의 메모리 공간을 가지게 된다. 프로세스가 다른 프로세스의 자원에 접근하려면 IPC(Inter Process Communication)방법을 통해 접근할 수 있다. 쓰레드 쓰레드란 프로세스 내에서 실제로 작업을 수행하는 주체를 의미한다. 모든 프로세스에는 한 개 이상의 스레드가 존재하여 작업을 수행한다. 프로그램에서 단일...","categories": ["til","cs"],
        "tags": ["OS"],
        "url": "/til/cs/process_thread/",
        "teaser": null
      },{
        "title": "IPC(Inter process communication)",
        "excerpt":"IPC (Inter Process Communication) IPC란 Inter Process Communication의 약자로 서로 다른 프로세스끼리의 통신하는 방법을 다루게 된다. IPC의 종류는 다음과 같다. PIPE Named PIPE Shared Memory Memory Map Message Queue Socket 기본 개념 및 코드를 사용하여 정리해보고자 한다. PIPE PIPE는 부모-자식 프로세스간의 데이터 공유를 위해 사용하며, 단방향이다. 리눅스에서는 파이프를 파일로 생각하기...","categories": ["til","cs"],
        "tags": ["OS"],
        "url": "/til/cs/ipc/",
        "teaser": null
      }]

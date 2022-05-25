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
      },{
        "title": "Operating System",
        "excerpt":"운영체제 운영체제란 컴퓨터 시스템의 자원들을 효율적으로 관리하며, 사용자가 컴퓨터를 편리하고, 효과적으로 사용할 수 있도록 환경을 제공하는 여러 프로그램의 모임이다. 다른 프로그램이 실행되기 쉽게 도와주고, 프로그램끼리 메모리 공유를 도와주고, 장치간의 연결을 가능하게 해주는 책임이 있다. 그리고 이러한 목적을 위해 CPU 가상화 메모리 가상화 Concurrency Persistence 를 지원한다. 각각의 운영체제가 하는 일들은...","categories": ["til","cs"],
        "tags": ["OS"],
        "url": "/til/cs/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C/",
        "teaser": null
      },{
        "title": "Race Condition & Mutex, Semaphore",
        "excerpt":"Race condition, Semaphore, Mutex Race condition Race condition이란 경쟁하는 상태를 나타내는 말로, 멀티쓰레드 환경에서의 race condition은 두개 이상의 프로세스가 공용 데이터에 접근하는데, 접근 순서에 따라 결과가 달라지는 현상을 뜻하고 데이터베이스 환경에서 race condition은 2개 이상의 execution이 같은 데이터에 접근하며 접근순서에 따라 결과가 달라지는 현상을 말한다. race condition은 read-only 연산에 대해...","categories": ["til","cs"],
        "tags": ["OS"],
        "url": "/til/cs/race_condition_%EC%84%B8%EB%A7%88%ED%8F%AC%EC%96%B4_%EB%AE%A4%ED%85%8D%EC%8A%A4/",
        "teaser": null
      },{
        "title": "Dealock",
        "excerpt":"데드락 데드락(교착상태)란 둘 이상의 프로세스가 다른 프로세스가 점유하고 있는 자원을 서로 기다릴 때 무한 대기에 빠지는 상황을 말한다. Thread 1 Lock(L1); Lock(L2); Thread 2 Lock(L2); Lock(L1); 데드락에 관한 상황 예를 보면 Thread1은 L1락을 획득한 후에 L2락을 획득하고, Thread2는 L2락을 획득하고 L1락을 획득하는 상황이라고 가정해보자. 쓰레드의 실행순서가 T1 Lock(L1) -&gt; T1...","categories": ["til","cs"],
        "tags": ["OS"],
        "url": "/til/cs/%EB%8D%B0%EB%93%9C%EB%9D%BD/",
        "teaser": null
      },{
        "title": "Memory",
        "excerpt":"메모리 메모리는 다른 장치와 용어상으로 혼동될수 있으나, 대체로 주기억장치를 말하며 특히 RAM을 말한다. 다음과 같은 memory hierarchy에서 위로갈수록 빠르고 용량이 적고, 아래로 갈수록 용량이 크고 느리다. 우리가 프로그램을 실행할때 기록된 모든 내용이나 정보를 매번 디스크연산을 통해 가지고 오게 되면 매우 느리다. CPU가 조금더 빨리 데이터에 접근하기 위해 메모리를 사용한다. OS의...","categories": ["til","cs"],
        "tags": ["OS"],
        "url": "/til/cs/%EB%A9%94%EB%AA%A8%EB%A6%AC/",
        "teaser": null
      },{
        "title": "Page replacement policy",
        "excerpt":"Page Replacement Policy 가상 메모리 관리 측면에서 보면 비어 있는 메모리가 많을수록 작업이 간단하다. 하지만 빈 메모리 공간이 거의 없게되면, 운영체제는 memory pressure을 해소하기 위해 다른 페이지들을 강제적으로 paging out하여 활발히 사용중인 페이지들을 위한 공간을 확보한다. 내보낼 페이지의 선택은 운영체제의 교체정책(replacement policy)을 따르게 된다. 과거의 시스템들은 물리 메모리의 크기가 작았기...","categories": ["til","cs"],
        "tags": ["OS"],
        "url": "/til/cs/%ED%8E%98%EC%9D%B4%EC%A7%80%EA%B5%90%EC%B2%B4%EC%A0%95%EC%B1%85/",
        "teaser": null
      },{
        "title": "OSI 7계층",
        "excerpt":"OSI 7계층 네트워크 역사 간단 요약 현대의 인터넷은 다른사람과의 의사소통이 발전된 형태이다. 지금의 랩탑과 핸드폰과 달리 이전에는 컴퓨팅 머신의 크기가 매우 컸고, 특별한 환경을 요구했는데, 오퍼레이터가 관리할 수 있는 특별한 장소에 둬야 했다. 근거리의 컴퓨터와 통신을 가능하게 해준 기술이 가장 유명한 것중 하나인 Ethernet 이다. 1969년 ARPANET설립 (세계 최초의 패킷...","categories": ["til","cs"],
        "tags": ["Network"],
        "url": "/til/cs/OSI-7%EA%B3%84%EC%B8%B5/",
        "teaser": null
      },{
        "title": "서브넷",
        "excerpt":"서브넷 서브넷은 네트워크를 논리적으로 분할한 것으로, 21세기에 가까워질수록 IPv4 주소의 고갈이 현실화되었고 각국의 NIC(Network Information Center)에서는 이를 최대한 늦추기 위하여 각 라우터가 브로드캐스팅하는 로컬 네트워크 영역에 공인 IP 대역을 호스트가 필요한 만큼만 할당하려는 노력을 하였다. 이러한 NIC 기관의 요구에 맞춰서 IETF에서는 로컬 네트워크 내부에서 접속한 호스트의 IP 대역을 외부 네트워크와...","categories": ["til","cs"],
        "tags": ["Network"],
        "url": "/til/cs/%EC%84%9C%EB%B8%8C%EB%84%B7/",
        "teaser": null
      },{
        "title": "TCP와 UDP",
        "excerpt":"TCP 와 UDP TCP와 UDP는 OSI 7계층 내 전송계층 프로토콜이다. 두 프로토콜의 특징들을 알아보자. TCP TCP는 transmission control protocol로 전송을 제어하는 프로토콜이라는 의미를 가지고 있다. TCP는 IP와 함께 사용되어 연결형 서비스를 지원한다. 1대1 통신 방식이고 서로 연결된 이후 통신을 할 수 있다. 그리고 연결을 하기위해 연결수립과정에서 3 way handshake를 통해...","categories": ["til","cs"],
        "tags": ["Network"],
        "url": "/til/cs/TCP_UDP/",
        "teaser": null
      },{
        "title": "TCP Handshake",
        "excerpt":"TCP Hanshake TCP는 연결지향 프로토콜이다. 연결을 수립할 때 3 way handshake를 통해 연결설정을 하고 4 way handshake를 통해 연결을 끊는다. 이 두가지 연결설정과 연결해제에 대해 알아본다. 3 way handshake 클라이언트는 서버에 접속을 요청하는 SYN(seq=x) 패킷을 보낸다. 서버는 클라이언트의 요청인 SYN(seq=x)를 받고 클라이언트에게 요청을 확인했고 클라이언트 측에 확인요청을 보내는 ACK(x+1), SYN(y)이...","categories": ["til","cs"],
        "tags": ["Network"],
        "url": "/til/cs/TCP_handshake/",
        "teaser": null
      },{
        "title": "HTTP 버전별 특징",
        "excerpt":"HTTP의 버전별 변화 HTTP HTTP는 www에 내재된 프로토콜이다. HTTP는 처음 발명된 이후로 본래의 단순함을 지키면서 확장성 위에서 만들어지도록 많은 수정을 겪어왔다. 초기 HTTP의 발명에는 인터넷 상의 하이퍼텍스트 시스템을 만들기 위해 제안되었는데, 초기단계에 사용되던 HTTP 프로토콜은 매우 간단했으며 이후 HTTP/0.9버전으로 불리고, 원-라인 프로토콜로 불리기도 했습니다. HTTP/0.9 - 원-라인 프로토콜 HTTP 초기버전에는...","categories": ["til","cs"],
        "tags": ["Network"],
        "url": "/til/cs/HTTP_VERSION/",
        "teaser": null
      },{
        "title": "HTTP와 HTTPS",
        "excerpt":"HTTP and HTTPS HTTP HTTP(hyper text transfer protocol)은 서버와 클라이언트 상에서 어떻게 메시지를 교환할지를 정해놓은 규칙이다. 요청과 응답으로 구성되어 있으며 일반적으로 80포트를 사용한다. 웹브라우저 상의 맨앞에 http://, https://가 바로 이 프로토콜을 사용해서 정보를 교환하겠다는 표시이다. HTTP의 응답은 다음과 같다. GET /index.html HTTP/1.1 HOST: www.naver.com 물론 조금더 많은 내용들이 헤더에 포함된다....","categories": ["til","cs"],
        "tags": ["Network"],
        "url": "/til/cs/HTTP_HTTPS/",
        "teaser": null
      }]

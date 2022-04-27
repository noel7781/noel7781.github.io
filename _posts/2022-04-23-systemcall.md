---
title: "시스템콜(wait, fork, exec)"
category :
    - [til, cs]
tag :
    - OS
toc : true
toc_sticky: true
author_profile: true
use_math: true
date: 2022-04-23
last_modified_at: 2022-04-23
---

# System call

---

## Wait – wait for process termination

```C
SYNOPSIS
     #include <sys/wait.h>
     pid_t
     wait(int *stat_loc);

     pid_t
     wait3(int *stat_loc, int options, struct rusage *rusage);

     pid_t
     wait4(pid_t pid, int *stat_loc, int options, struct rusage *rusage);

     pid_t
     waitpid(pid_t pid, int *stat_loc, int options);

DESCRIPTION
     The wait() function suspends execution of its calling process until stat_loc information is available for a terminated child process, or a
     signal is received.  On return from a successful wait() call, the stat_loc area contains termination information about the process that
     exited as defined below.
...
```
`wait` 시스템 콜은 종료된 자식프로세스의 자원을 회수하거나 signal이 발생하기 전까지 프로세스를 suspend시킨다.

---

## Fork – create a new process

```C
SYNOPSIS
     #include <unistd.h>

     pid_t
     fork(void);

DESCRIPTION
     fork() causes creation of a new process.  The new process (child process) is an exact copy of the calling process (parent process) except
     for the following:

           •   The child process has a unique process ID.

           •   The child process has a different parent process ID (i.e., the process ID of the parent process).

           •   The child process has its own copy of the parent's descriptors.  These descriptors reference the same underlying objects, so
               that, for instance, file pointers in file objects are shared between the child and the parent, so that an lseek(2) on a
               descriptor in the child process can affect a subsequent read or write by the parent.  This descriptor copying is also used by the
               shell to establish standard input and output for newly created processes as well as to set up pipes.

           •   The child processes resource utilizations are set to 0; see setrlimit(2).

RETURN VALUES
     Upon successful completion, fork() returns a value of 0 to the child process and returns the process ID of the child process to the parent
     process.  Otherwise, a value of -1 is returned to the parent process, no child process is created, and the global variable errno is set to
     indicate the error.
```

`fork` 시스템 콜은 호출시 부모 프로세스의 copy를 만들어내는데, 프로세스의 PID, PPID는 부모와 다른 값을 가지게 되고, descriptor는 부모와 자식이 같은 값을 가지게 된다(부모 프로세스의 복사본) 
쓰레드를 만드는것과 다르게 프로세스를 새로 하나 생성한다.

```c
#include <stdio.h>
#include <unistd.h>
#include <errno.h>

int main(int argc, const char * argv[]) {
    int pid;
    pid = fork();
    if (pid == -1) {
        perror("Failed to fork");
        return -1;
    }

    if (pid == 0) {
    	// child
    	printf("Child pid: %d\n", getpid());
    } else {
    	// parent
    	printf("Parent pid: %d\n", getpid());
    }   
    return 0;
}
```

---

## Exec – execute a file

```c
SYNOPSIS
     #include <unistd.h>

     extern char **environ;

     int
     execl(const char *path, const char *arg0, ..., /*, (char *)0, */);

     int
     execle(const char *path, const char *arg0, ..., /* (char *)0 char *const envp[] */);

     int
     execlp(const char *file, const char *arg0, ..., /*, (char *)0, */);

     int
     execv(const char *path, char *const argv[]);

     int
     execvp(const char *file, char *const argv[]);

     int
     execvP(const char *file, const char *search_path, char *const argv[]);
DESCRIPTION
     The exec family of functions replaces the current process image with a new process image.  The functions described in this manual page are
     front-ends for the function execve(2).  (See the manual page for execve(2) for detailed information about the replacement of the current
     process.)
```

현재 프로세스에서 다른 프로세스를 실행할때 사용하는 라이브러리 함수
l계열은 인자를 나열하는 방식으로 전달하고 v방식은 배열형식으로 전달한다.
p가 붙은함수는 경료를 지정해주면 현재/절대경로를 통해 탐색하고, p가 안붙은 함수는 실행파일의 이름만 적는다.
프로그램에서 exec실행시 프로그램의 이후 적혀있는 코드들은 무의미해지고, 새로운 프로세스가 실행된다.
```c
#include <unistd.h>
#include <stdio.h>
int main() {
    char *argv[] = {"/bin/date",  0};
    execvp("/bin/date", argv);
    printf("실행되지 않는 구역\n");
    return 0;

}
```
```sh
$ ./a.out                                                                                                                                                                          
2022년 4월 26일 화요일 15시 58분 47초 KST
```
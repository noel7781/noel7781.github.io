---
title: "Singleton"
category :
    - [designPattern, cs]
tag :
    - designPattern
toc : true
toc_sticky: true
author_profile: true
use_math: true
date: 2022-07-18
last_modified_at: 2022-07-18
---

# 싱글턴패턴
싱글턴 패턴은 하나의 인스턴스만을 만들고자 할 때 사용할 수 있는 디자인 패턴이다.

가장 간단하게 구현하자면 다음과 같이 나타낼 수 있다.
```java
public class Printer {
    private static Printer printer = null;
    private Printer() {}

    public static Printer getPrinter() {
        if(printer == null) {
            printer = new Printer();
        }
        return printer;
    }

    public void print(String str) {
        System.out.println(str);
    }
}
```

사용하는 사람에게 생성자를 사용하지 못하게  private로 선언하고, 객체 내에서 단 한번만 인스턴스를 생성하고, 생성된 인스턴스를 반환시켜주는 형태로 만들 수 있다.

단일 스레드에서 작업할 때는 이렇게 작성해도 문제가 없다. 하지만 이렇게 하는 경우  다중 스레드에서 인스턴스가 1개이상 생성되는 경우가 있다.

이런 race condition은 기존에 운영체제 부분에서 많이 다뤘으니 생략하는데, 이러한 경쟁조건이 생기는 경우 의도한 바와 다르게 여러 인스턴스가 생길 수 있다.

명확하게 확인하기 위해 고의적으로 `print == null` 인 경우 1ms동안 정지하였다.

```java
public class Printer {
    private static Printer printer = null;
    private Printer() {}

    public static Printer getPrinter() {
        if(printer == null) {
            try {
                Thread.sleep(1);
            } catch (InterruptedException e) {
            }
            printer = new Printer();
        }
        return printer;
    }

    public void print(String str) {
        System.out.println(str);
    }
}
```

```java
public class User {
    private String name;

    public User(String name) {
        this.name = name;
    }

    public void print() {
        Printer printer = Printer.getPrinter();
        printer.print(this.name + " print using " + printer.toString() + ".");
    }
}
```

그러면 결과가 다음과 같이 나오게 된다.
```bash
4-thread print using SingletonPattern.Printer@23ff3c92.
3-thread print using SingletonPattern.Printer@5463113d.
5-thread print using SingletonPattern.Printer@353fdb89.
2-thread print using SingletonPattern.Printer@35dd8ea8.
1-thread print using SingletonPattern.Printer@43cc9a51.
```
보다시피 모두 다른 객체를 생성하였다.

지금은 아무 행동을 하지 않는 클래스라 상관 없지만, counter변수를 가지는 인스턴스일 경우 원하는대로 동작하지 않을것이다.

```java
public class Printer {
    private static Printer printer = null;
    private int counter = 0;
    private Printer() {}

    public static Printer getPrinter() {
        if(printer == null) {
            try {
                Thread.sleep(1);
            } catch (InterruptedException e) {
            }
            printer = new Printer();
        }
        return printer;
    }

    public void print(String str) {
        counter++;
        System.out.println(str+counter);
    }
}
```

```bash
1-thread print using SingletonPattern.Printer@602bc562.1
4-thread print using SingletonPattern.Printer@7927a829.1
5-thread print using SingletonPattern.Printer@50b2315d.1
3-thread print using SingletonPattern.Printer@65cb7916.1
2-thread print using SingletonPattern.Printer@19ed0e49.1
```
실행할때마다 counter을 뒤에 출력했는데, 5를 예상하겠지만 1이 나와 버린다.

## 해결책
* 정적 변수에 인스턴스를 만들어 바로 초기화하는 방법
이 방법은 `printer`라는 정적변수에 Printer 인스턴스를 만들어 초기화 시키는 방법이다.
```java
public class Printer {
    private static Printer printer = new Printer();
    private int counter = 0;
    private Printer() {}

    public static Printer getPrinter() {
        return printer;
    }

    public void print(String str) {
        counter++;
        System.out.println(str+counter);
    }
}
```

```bash
5-thread print using SingletonPattern.Printer@435c2b34.5
3-thread print using SingletonPattern.Printer@435c2b34.3
1-thread print using SingletonPattern.Printer@435c2b34.3
2-thread print using SingletonPattern.Printer@435c2b34.4
4-thread print using SingletonPattern.Printer@435c2b34.3
```
실행시키면 counter의 경합이 여전히 일어나지만 하나의 객체만 생성됨을 확인할 수 있다.

* 인스턴스를 만드는 메서드를 동기화시키는 방법
```java
public class Printer {
    private static Printer printer = null;
    private int counter = 0;
    private Printer() {}

    public synchronized static Printer getPrinter() {
        if(printer == null) {
            printer = new Printer();
        }
        return printer;
    }

    public void print(String str) {
        counter++;
        System.out.println(str+counter);
    }
}
```

```bash
5-thread print using SingletonPattern.Printer@172ae304.3
4-thread print using SingletonPattern.Printer@172ae304.3
1-thread print using SingletonPattern.Printer@172ae304.4
3-thread print using SingletonPattern.Printer@172ae304.5
2-thread print using SingletonPattern.Printer@172ae304.3
```

두번째 방법도 마찬가지로 하나의 객체만 생성됨을 알 수있다. 하지만 두 방법 모두 counter변수가 이상한데 그 이유는 counter변수에 동시접근하는 코드에서 race condition이 있기 때문이다.

```java
public synchronized void print(String str) {
    counter++;
    System.out.println(str+counter);
}
```

다음과 같이 수정하면 두 방법 모두 문제를 해결할 수 있다.
```bash
2-thread print using SingletonPattern.Printer@504340d1.1
3-thread print using SingletonPattern.Printer@504340d1.2
4-thread print using SingletonPattern.Printer@504340d1.3
1-thread print using SingletonPattern.Printer@504340d1.4
5-thread print using SingletonPattern.Printer@504340d1.5
```
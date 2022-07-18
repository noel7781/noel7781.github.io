---
title: "statePattern"
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

# 스테이트 패턴
스테이트, 상태란 객체가 시스템에 존재하는 동안 객체가 가질수 있는 어떤 조건이나 상황을 표현한다.
형광등의 예제를 통해 스테이트 패턴을 한번 알아보자.

가장 기초적으로 형광등을 키고 끄는 행위를 상태 변화에 사용한다고 생각해보자.

이 상태를 표시하는데 상수를 사용하는것이 크게 문제가 있다고 생각되지 않을것이다.

```java
private static int ON = 0;
private static int OFF = 1;
```

그리고 현재 형광등의 상태를 저장하는 변수가 하나 필요한데 이 변수를
```java
private int state;
```
라고 정의하겠다.

여기까지 형광등과 형광등의 행동을 자바 코드로 구현하면 다음과 같다.

```java
public class Light {
    private static int ON = 0;
    private static int OFF = 1;
    private int state;

    public Light() {
        state = OFF;
    }
    
    public void on_button_pushed() {
        if(state == ON) {
            System.out.println("반응 없음");
        } else {
            System.out.println("불 켜짐");
            state = ON;
        }
    }
    
    public void off_button_pushed() {
        if(state == OFF) {
            System.out.println("반응 없음");
        } else {
            System.out.println("불 꺼짐");
            state = OFF;
        }
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        Light light = new Light();
        light.off();
        light.on();
        light.off();
    }
}
```

여기서 끝나면 좋겠지만 형광등에게 요구되는 항목들이 바뀌거나 추가된다고 생각해보자.

가령 `ON`버튼 상태일 때 키는 버튼을 한번 더 누르면 `SLEEPING`상태로 변경된다고 해보자.

그러면 새로운 `SLEEPING`상태에 따른 상태값을 하나 더 정의해줘야 하고, 기존의 `on_button_pushed()`나 `off_button_pushed()`를 수정해야한다.

하나의 예만 보자면,
```java
public class Light {
    private static int ON = 0;
    private static int OFF = 1;
  	  private static int SLEEPING = 2;
	  private int state;

    public Light() {
        state = OFF;
    }
    
    public void on_button_pushed() {
        if(state == ON) {
            System.out.println("취침등 상태");
			  state = SLEEPING;
        } else {
            System.out.println("불 켜짐");
            state = ON;
        }
    }
    
    public void off_button_pushed() {
        ...
    }
}
```
책의 예제가 그리 좋진않은것 같다.^^ 상태 두개가 같은 결과를 가져서..

어쨌거나  일반적인 상황에서라면 `state`가 `ON`, `OFF`, `SLEEPING`인 3가지 if문이 만들어지고 조건이 바뀔때마다, if문이 하나씩 늘어나면서 모든 코드를 수정해야 한다. 이는 객체지향의 디자인 패턴에서 보면 바람직한 현상이 아니다.

## 해결법
지난번과 마찬가지로, 무엇이 변화하는지를 찾아서 그 부분을 캡슐화 하는것이 중요하다. 목표는 현재 시스템이 어떤 상태에 있는지 상관없게 구성하고 상태변화에도 독립적이도록 코드를 수정하는것이다.

![statePattern](https://imgur.com/jLhWS21.jpg)

이전에 한 스트래티지 패턴과 동일한 구조를 가진다. 변화하는 state를 추상 클래스 혹은 인터페이스로 변경하고, 사용하는 측에서는 이 클래스에 의존하도록 만든다.

```java
public interface State {
    public void on_button_pushed(Light light);
    public void off_button_pushed(Light light);
}

```

```java
public class ON implements State {
    @Override
    public void on_button_pushed(Light light) {
        System.out.println("반응 없음");
    }

    @Override
    public void off_button_pushed(Light light) {
        System.out.println("불 꺼짐");
        light.setState(new OFF(light));
    }
}


```

```java
public class OFF implements State {

    @Override
    public void on_button_pushed(Light light) {
        System.out.println("불 켜짐");
        light.setState(new ON(light));
    }

    @Override
    public void off_button_pushed(Light light) {
        System.out.println("반응 없음");
    }
}


```

```java
public class Light {
    private State state;

    public Light() {
        state = new OFF();
    }
    
    public void setState(State state) {
        this.state = state;
    }

    public void on_button_pushed() {
        state.on_button_pushed(this);
    }

    public void off_button_pushed() {
        state.off_button_pushed(this);
    }
}
```

다음과 같이 코드를 작성하는 경우 새로운 상태가 추가되도 `Light`클래스는 변화를 겪지 않는다.
아직 코드는 `ON`, `OFF`객체를 계속 만들기 때문에 `Singleton`을 사용해서 개선의 여지가 남아있다. 어렵지 않으니 생략한다.

이렇게 스테이트 패턴은 어떤 행위를 수행할 때 상태에 행위를 수행하도록 위임한다. 이를 위해 스테이트 패턴에서는 시스템의 각 상태를 클래스로 분리해 표현하고, 각 클래스에서 수행하는 행위들을 메서드로 구현한다. 그리고 이러한 상태들을 외부로부터 캡슐화 하기 위해 인터페이스를 만들어 시스템의 각 상태를 나타내는 클래스로 하여금 실체화한다.

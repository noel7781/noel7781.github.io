---
title: "commandPattern"
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

# 커맨드 패턴
커맨드 패턴은 이벤트가 발생했을 때 실행될 기능이 다양하면서도 변경이 필요한 경우에 이벤트를 발생시키는 클래스를 변경하지 않고 재사용하고자 할 때 유용하다.

---

커맨드 패턴을 버튼 만들기를 통해 알아보자.

눌리면 특정 기능을 수행하는 버튼이 있다. 버튼을 눌렀을 때 램프의 불이 켜지는 프로그램을 생각해보면 누를 `Button` 클래스, 불을 켜는 기능을 제공하는 `Lamp`클래스가 필요하다. 그리고 버튼이 눌렸을때 램프를 켜려면 `Button`클래스는 `Lamp`객체를 참조해야한다.


```java
public class Lamp {
    public void turnOn() {
        System.out.println("Lamp on");
    }
}
```

```java
public class Button {
    private Lamp lamp;

    public Button(Lamp lamp) {
        this.lamp = lamp;
    }

    public void pressed() {
        lamp.turnOn();
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        Lamp lamp = new Lamp();
        Button lampButton = new Button(lamp);
        lampButton.pressed();
    }
}
```

여기서 버튼을 눌렀을 때 램프가 켜지는 대신 다른 기능을 실행하려면 어떻게 해야할까? 불이 들어오는 대신 알람이 시작되게 한다거나 처음 버튼을 눌렀을 때는 램프를 켜고, 두번째 눌렀을때는 알람을 동작하게 하려면 말이다.

램프를 켜는 대신 알람을 시작하게 하려면 우선 `pressed()` 메서드를 수정해야 한다. 
그럼 이제 `Button`클래스는 더이상 `Lamp`객체를 가지지 않고 `Alarm`이라는 새로운 객체를 가질것이다.
그러나, 버튼을 눌렀을 때 새로운 기능으로 변경하는 경우 메서드 전체를 변경해야 하므로 OCP를 위반하는 것이다.

버튼을 누르는 동작에 따라 다른 기능을 실행하는 경우도 마찬가지이다.

```java
enum Mode { LAMP, ALARM };

public class Button {
    private Lamp lamp;
    private Alarm alarm;
    private Mode mode;

    public Button(Lamp lamp, Alarm alarm) {
        this.lamp = lamp;
        this.alarm = alarm;
    }
    public void setMode(Mode mode){
        this.mode = mode;
    }
    public void pressed(){
        switch(mode){
            case LAMP:
                lamp.turnOn();
                break;
            case ALARM:
                alarm.start();
                break;
        }
    }
}
```

이 경우 역시 버튼을 눌렀을 때 기능을 변경하기 위해 Button 클래스의 코드를 수정했다. `Button`클래스에 새로운 기능을 추가할 때마다 매번 코드를 수정해야 한다면 이 클래스는 재사용하기 어렵다.

## 해결책
새로운 기능을 추가하거나 변경하더라고 `Button`클래스를 그대로 사용하려면 `pressed()` 메서드에서 구체적인 기능을 직접 구현하는 대신에, 버튼을 눌렀을 때 실행될 기능을 클래스 외부에서 제공받아 캡슐화 해 `pressed()`메서드에서 호출하는 방법을 사용할 수 있다.
![diagram](https://imgur.com/VEgo1ki.jpg)

Button 클래스는 램프 켜기 또는 알람 동작의 기능을 수행할 때 `turnOn()` 메서드나 `start()`를 직접 호출하지 않는다. 대신 미리 약속된 `Command` 인터페이스의 `execute()`메서드를 호출한다. 그리고 Command를 implement한 클래스의 execute메서드에 램프를 키거나, 알람을 시작하는 메서드를 만든다.

```java
public interface Command {
    public abstract void execute();
}
```

```java
public class AlarmOnCommand implements Command {

    private Alarm alarm;

    public AlarmOnCommand(Alarm alarm) {
        this.alarm = alarm;
    }

    @Override
    public void execute() {
        alarm.start();
    }
}
```

```java
public class LampOnCommand implements Command {

    private Lamp lamp;

    public LampOnCommand(Lamp lamp) {
        this.lamp = lamp;
    }

    @Override
    public void execute() {
        lamp.turnOn();
    }
}
```

```java
public class Alarm {
    public void start() {
        System.out.println("Alarming..");
    }
}
```

```java
public class Lamp {
    public void turnOn() {
        System.out.println("Lamp on");
    }
}
```

```java
public class Button {


    private Command command;

    public Button(Command command) {
        this.command = command;
    }

    public void setCommand(Command newCommand) {
        this.command = newCommand;
    }
    public void pressed(){
        command.execute();
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        Lamp lamp = new Lamp();
        Command lampOnCommand = new LampOnCommand(lamp);

        Button button1 = new Button(lampOnCommand);
        button1.pressed();

        Alarm alarm = new Alarm();
        Command alarmOnCommand = new AlarmOnCommand(alarm);

        Button button2 = new Button(alarmOnCommand);
        button2.pressed();

        button2.setCommand(lampOnCommand);
        button2.pressed();
    }
}

```

```bash
Lamp on
Alarming..
Lamp on
```

이렇게 버튼을 눌렀을 때 필요한 기능은 `Command`인터페이스를 구현한 클래스의 객체를 Button객체에 설정해서 실행할 수 있다. 따라서 `Button`클래스는 기능의 변화가 생겨도 소스코드를 변경하지 않으면서 다양한 동작을 구현할 수 있게 된다.

여기서 램프의 전원을 끄는 기능을 버튼에 추가하고 싶다고 해보자.

```java
public class LampOffCommand implements Command {
    
    private Lamp lamp;

    public LampOffCommand(Lamp lamp) {
        this.lamp = lamp;
    }

    @Override
    public void execute() {
        lamp.turnOff();       
    }
}
```

```java
public class Lamp {
    public void turnOn() {
        System.out.println("Lamp on");
    }

    public void turnOff() {
        System.out.println("Lamp on");
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        Lamp lamp = new Lamp();
        Command lampOnCommand = new LampOnCommand(lamp);
        Command lampOffCommand = new LampOffCommand(lamp);

        Button button1 = new Button(lampOnCommand);
        button1.pressed();

        button1.setCommand(lampOffCommand);
        button1.pressed();
    }
}
```

```bash
Lamp on
Lamp off
```

다음과 같이 기능을 추가해도 Button클래스의 변화는 하나도 없다.
재사용을 목적을 두고 클래스를 설계한다면, 커맨드 패턴을 사용하면 좋을것 같다.
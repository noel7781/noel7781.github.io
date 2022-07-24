---
title: "decoratorPattern"
category :
    - [designPattern, cs]
tag :
    - designPattern
toc : true
toc_sticky: true
author_profile: true
use_math: true
date: 2022-07-21
last_modified_at: 2022-07-21
---

# 데코레이터 패턴
데코레이터 패턴은 주어진 상황 및 용도에 따라 어떤 객체에 책임(기능)을 동적으로 추가하는 패턴을 말한다. 기본 기능을 가지고 있는 클래스를 하나 만들어주고 추가할 수 있는 기능들을 추가하기 편하도록 설계하는 방식이다.

데코레이터 패턴을 사용하는 경우는 기본 기능에 추가할 수 있는 기능의 종류가 많은 경우 추가 기능을 Decorator 클래스로 정의한 후 필요한 Decorator 객체를 조합함으로써 추가 기능의 조합을 설계하는 방식이다. 예를들어 기본 도로 표시 기능에 차선 표시, 교통량 표시, 교차로 표시, 단속카메라 표시 4가지 추가기능이 있을때 이 추가기능들을 추가할 수 있는 모든 조합은 15가지나 된다. 15개의 클래스를 구현하지 않고, 4가지의 클래스만 구현하고 객체의 형태로 조립함으로써 추가 기능을 구현할 수 있다.

좀더 자세한 상황과 코드를 통해 데코레이터 패턴을 이해해보자.

도로를 표시할 수 있는 기본 기능을 가진 RoadDisplay 클래스와 도로 표시에 차선을 표시하는 RoadDisplayWithLane 클래스를 설계할 수 있다. 이때 RoadDisplayWithLane 클래스는 RoadDisplay와 마찬가지로 도로 표시 기능을 제공하므로 RoadDisplay의 하위클래스로 설계한다.

```java
public class RoadDisplay {
    public void draw() {
        System.out.println("기본 도로 표시");
    }
}
```

```java
public class RoadDisplayWithLane extends RoadDisplay {
    @Override
    public void draw() {
        super.draw();
        drawLane();
    }

    private void drawLane() {
        System.out.println("차선 표시");
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        RoadDisplay road = new RoadDisplay();
        road.draw();
        
        RoadDisplay roadWithLane = new RoadDisplayWithLane();
        roadWithLane.draw();
    }
}
```

이렇게 작성한다면 요구사항을 만족시킬수 있다.

## 문제점
여기서 차선 표시 기능만을 추가하는게 아니라 교통량 표시를 추가하는 기능도 추가하고 싶다고 생각해보자.

```java
public class RoadDisplayWithTraffic extends RoadDisplay {
    @Override
    public void draw() {
        super.draw();
        drawTraffic();
    }
    
    private void drawTraffic() {
        System.out.println("교통량 표시");
    }
}
```

다음과 같은  클래스가 추가될것이다.
교통량표시 + 차선표시 기능을 원한다고하면, 예를들어 RoadDisplayWithLaneAndTraffic같은 클래스를 또 만들어야한다.
기능을 조합하기 위해
2가지 기능이면 3가지 클래스를, 3가지 기능이면 7가지 클래스를, 4가지 기능이면 15가지의 클래스를 추가적으로 선언해야 한다.
기능이 점차 늘어날수록 만들어야 하는 클래스의 갯수는 엄청 많아지고, 관리하기 쉽지 않을것이라고 예상할 수 있다.

## 해결책

기본기능만 이용하는 경우 RoadDisplay 클래스의 객체를 생성하면 충분하다. 그외의 기능이 추가될때는 `...Decorator` 클래스를 사용하여 기능을 추가한다.

```java
public abstract class Display {
    public abstract void draw();
}
```

```java
public abstract class DisplayDecorator extends Display {
    private Display decoratedDisplay;

    public DisplayDecorator(Display decoratedDisplay) {
        this.decoratedDisplay = decoratedDisplay;
    }

    public void draw() {
        decoratedDisplay.draw();
    }
}
```

```java
public class RoadDisplay extends Display {
    public void draw() {
        System.out.println("기본 도로 표시");
    }
}
```

```java
public class LaneDecorator extends DisplayDecorator {

    public LaneDecorator(Display decoratedDisplay) {
        super(decoratedDisplay);
    }

    @Override
    public void draw() {
        super.draw();
        drawLane();
    }

    private void drawLane() {
        System.out.println("\t차선 표시");
    }
}
```

```java
public class TrafficDecorator extends DisplayDecorator{
    public TrafficDecorator(Display decoratedDisplay) {
        super(decoratedDisplay);
    }
    @Override
    public void draw() {
        super.draw();
        drawTraffic();
    }

    private void drawTraffic() {
        System.out.println("\t교통량 표시");
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        Display road = new RoadDisplay();
        road.draw();

        Display roadWithLane = new LaneDecorator(new RoadDisplay());
        roadWithLane.draw();

        Display roadWithTraffic = new TrafficDecorator(new RoadDisplay());
        roadWithTraffic.draw();

        Display roadWithLaneAndTraffic = new TrafficDecorator(new LaneDecorator(new RoadDisplay()));
        roadWithLaneAndTraffic.draw();
    }
}
```

```bash
기본 도로 표시
기본 도로 표시
	차선 표시
기본 도로 표시
	교통량 표시
기본 도로 표시
	차선 표시
	교통량 표시
```

이렇게 추가적인 클래스를 만들 필요 없이 기능을 추가할 수 있다.
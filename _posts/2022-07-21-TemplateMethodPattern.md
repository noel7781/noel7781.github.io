---
title: "templateMethodPattern"
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

# 템플릿 메서드 패턴
템플릿 메서드 패턴은 전체적으로는 동일하면서 부분적으로는 다른 구문으로 구성된 메서드의 코드 중복을 최소화할 때 유용하다. 다른 관점에서 보면 동일한 기능을 상위 클래스에서 정의하면서 확장/변화가 필요한 부분만 서브 클래스에서 구현할 수 있도록 한다.
전체적인 알고리즘 코드를 재사용하는 데 유용하다.

엘리베이터 제어 시스템의 예시를 통해 템플릿 메서드 패턴을 공부할것이다.

![img](https://imgur.com/M1YD1hH.jpg)
다음과 같은 논리대로 코드를 작성하면 아래와 같다.

```java
public class Door {
    private DoorStatus doorStatus;
    
    public Door() {
        doorStatus = DoorStatus.CLOSED;
    }
    
    public DoorStatus getDoorStatus() {
        return doorStatus;
    }
    
    public void close() {
        doorStatus = DoorStatus.CLOSED;
    }
    
    public void open() {
        doorStatus = DoorStatus.OPENED;
    }
}
```

```java
public class HyundaiMotor {
    private Door door;
    private MotorStatus motorStatus;

    public HyundaiMotor(Door door) {
        this.door = door;
        motorStatus = MotorStatus.STOPPED;
    }

    private void moveHyundaiMotor(Direction direction) {
        // Hyundai motor을 구동시킴
    }

    public MotorStatus getMotorStatus() {
        return motorStatus;
    }

    private void setMotorStatus(MotorStatus motorStatus) {
        this.motorStatus = motorStatus;
    }

    public void move(Direction direction) {
        MotorStatus motorStatus = getMotorStatus();
        if(motorStatus == MotorStatus.MOVING) {
            return;
        }

        DoorStatus doorStatus = door.getDoorStatus();
        if(doorStatus == DoorStatus.OPENED) {
            door.close();
        }

        moveHyundaiMotor(direction);
        setMotorStatus(MotorStatus.MOVING);
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        Door door = new Door();
        HyundaiMotor hyundaiMotor = new HyundaiMotor(door);
        hyundaiMotor.move(Direction.UP);
    }
}
```

## 문제점
현재는 현대 모터를 사용하여 엘리베이터 제어 시스템을 사용하고 있는데, 이것을 LG 모터를 이용하여 구동시키려면 HyundaiMotor 클래스를 복사한 후 LG 모터에 맞게 수정할 필요가 있다.

```java
public class LGMotor {
    private Door door;
    private MotorStatus motorStatus;

    public LGMotor(Door door) {
        this.door = door;
        motorStatus = MotorStatus.STOPPED;
    }

    private void moveLGMotor(Direction direction) {
        // LG motor을 구동시킴
    }

    public MotorStatus getMotorStatus() {
        return motorStatus;
    }

    private void setMotorStatus(MotorStatus motorStatus) {
        this.motorStatus = motorStatus;
    }

    public void move(Direction direction) {
        MotorStatus motorStatus = getMotorStatus();
        if(motorStatus == MotorStatus.MOVING) {
            return;
        }

        DoorStatus doorStatus = door.getDoorStatus();
        if(doorStatus == DoorStatus.OPENED) {
            door.close();
        }

        moveLGMotor(direction);
        setMotorStatus(MotorStatus.MOVING);
    }
}
```

HyundaiMotor 클래스와 LGMotor클래스를 비교하면 거의 대부분 같음을 알 수 있다. 생성자나, 함수 호출하는 이름등이 각 회사의 이름에 따라 바뀌는 정도이다. 즉, 두개의 클래스는 많은 중복 코드를 가진다. 중복 코드를 많이 가질수록 유지보수성을 악화시키므로 바람직하지 않다.
다른 회사, 가령 SamsungMotor클래스를 만든다고 해도 클래스 코드의 대부분이 동일할 것이다. 

따라서 HyundaiMotor클래스와 LGMotor클래스의 중복 코드를 뽑아내 새로운 클래스로 만들고 구체적인 클래스들이 이 클래스를 상속받도록 바꿔 중복코드 문제를 피할 수 있다.

이러한 설계를 바탕으로 다시 작성한 코드는 다음과 같다.

```java
public abstract class Motor {

    private Door door;
    private MotorStatus motorStatus;

    public Motor(Door door) {
        this.door = door;
        motorStatus = MotorStatus.STOPPED;
    }


    public MotorStatus getMotorStatus() {
        return motorStatus;
    }

    protected void setMotorStatus(MotorStatus motorStatus) {
        this.motorStatus = motorStatus;
    }
}
```

```java
public class HyundaiMotor extends Motor {
    private Door door;
    private MotorStatus motorStatus;

    public HyundaiMotor(Door door) {
        super(door);
    }

    private void moveHyundaiMotor(Direction direction) {
        // Hyundai motor을 구동시킴
    }

    public void move(Direction direction) {
        MotorStatus motorStatus = getMotorStatus();
        if(motorStatus == MotorStatus.MOVING) {
            return;
        }

        DoorStatus doorStatus = door.getDoorStatus();
        if(doorStatus == DoorStatus.OPENED) {
            door.close();
        }

        moveHyundaiMotor(direction);
        setMotorStatus(MotorStatus.MOVING);
    }
}
```

```java
public class LGMotor extends Motor {
    private Door door;
    private MotorStatus motorStatus;

    public LGMotor(Door door) {
        super(door);
    }

    private void moveLGMotor(Direction direction) {
        // LG motor을 구동시킴
    }

    public void move(Direction direction) {
        MotorStatus motorStatus = getMotorStatus();
        if(motorStatus == MotorStatus.MOVING) {
            return;
        }

        DoorStatus doorStatus = door.getDoorStatus();
        if(doorStatus == DoorStatus.OPENED) {
            door.close();
        }

        moveLGMotor(direction);
        setMotorStatus(MotorStatus.MOVING);
    }
}
```

조금의 중복코드는 해소했으나, move메서드 또한 중복되는점이 아직 많이 존재한다.

## 해결책
move 메서드 처럼 완전히 중복되지는 않지만 부분적으로 중복되는 경우에도 상속을 활용해 코드 중복을 피할 수 있다. 즉, move 메서드 안의 moveHyundaiMotor() 과 moveLGMotor을 제외하면 코드가 동일하므로, move 메서드를 상위 Motor 클래스로 이동시키고 다른 구문, 즉 moveHyundaiMotor과 MoveLGMotor 메서드의 호출 부분을 하위클래스에서 오버라이드 하는 방식으로 중복을 최소화 할 수 있다.

```java
public abstract class Motor {

    private Door door;
    private MotorStatus motorStatus;

    public Motor(Door door) {
        this.door = door;
        motorStatus = MotorStatus.STOPPED;
    }


    public MotorStatus getMotorStatus() {
        return motorStatus;
    }

    protected void setMotorStatus(MotorStatus motorStatus) {
        this.motorStatus = motorStatus;
    }

    public void move(Direction direction) {
        MotorStatus motorStatus = getMotorStatus();
        if(motorStatus == MotorStatus.MOVING) {
            return;
        }

        DoorStatus doorStatus = door.getDoorStatus();
        if(doorStatus == DoorStatus.OPENED) {
            door.close();
        }

        moveMotor(direction);
        setMotorStatus(MotorStatus.MOVING);
    }
    
    protected abstract void moveMotor(Direction direction);
}
```

```java
public class HyundaiMotor extends Motor {
    private Door door;
    private MotorStatus motorStatus;

    public HyundaiMotor(Door door) {
        super(door);
    }

    protected void moveMotor(Direction direction) {
        // Hyundai motor을 구동시킴
    }

}
```

```java
public class LGMotor extends Motor {
    private Door door;
    private MotorStatus motorStatus;

    public LGMotor(Door door) {
        super(door);
    }

    protected void moveMotor(Direction direction) {
        // LG motor을 구동시킴
    }

}
```

중복 코드를 제거하면 유지보수 측면에서도 좋고 코드도 간결하게 바꿀수 있다.

---

템플릿 메서드 패턴은 전체적으로는 동일하면서 부분적으로는 다른 구문으로 구성된 메서드의 코드 중복을 최소화할 때 유용하다. 다른 관점에서 보면 동일한 기능을 상위 클래스에서 정의하면서 확장/변화가 필요한 부분만 서브 클래스에서 구현할 수 있도록 한다.

앞선 예제처럼 Motor 클래스의 move 메서드는 HyundaiMotor와 LGMotor에서 동일한 기능을 구현하면서 각 하위 클래스에서 구체적으로 정의할 필요가 있는 부분만 각 하위 클래스에서 오버라이드 되도록 한다. 이러한 경우 Motor 클래스의 move 메서드를 템플릿 메서드라고 하고, move 메서드에서 호출되면서 하위 클래스에서 오버라이드 될 필요가 있는 moveMotor 메서드를 primitive 또는 hook 메서드라고 부른다.

즉 공통인 부분은 상위 클래스에서 템플릿 메서드로 작성을 하고, 개별적인 부분들은 primive(hook)으로 작성하여 코드의 중복을 줄일 수 있다.

이런식으로 코드를 작성하는 방식을 템플릿 메서드 패턴이라고 한다.
---
title: "observerPattern"
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

# 옵저버 패턴

*옵서버 패턴*(observer pattern)은  객체의 상태 변화를 관찰하는 관찰자들, 즉 옵저버들의 목록을 객체에 등록하여 상태 변화가 있을 때마다  메서드  등을 통해 객체가 직접 목록의 각 옵저버에게 통지하도록 하는 디자인패턴 이다. 주로 분산 이벤트 핸들링 시스템을 구현하는 데 사용된다.  발행/구독 모델로 알려져 있기도 하다.
![observer_pattern](https://commons.wikimedia.org/wiki/File:Observer.svg)

> 옵저버 패턴은 데이터 패턴을 통보하는 클래스(Subject) 와 통보 받는 클래스(Observer)로 구성하는데, Subject 클래스와 Observer 인터페이스로 일반화하여 데이터 변경을 통보하는 클래스는 통보 대상 클래스나 객체에 대한 의존성을 없앨 수 있다. 결과적으로 옵저버 패턴은 통보 대상 클래스나 대상 객체의 변경에도 Concrete Subject클래스를 수정없이 그대로 사용할 수 있다.

옵저버 패턴을 이해하기 위해 코드로 정리를 해보자.
ScoreRecord클래스는 입력된 점수를 저장하는 클래스이고, DataSheetView는 점수를 목록의 형태로 출력하는 클래스이다. 점수가 입력되면 ScoreRecord클래스의 addScore 메서드가 실행되고 이때 성적을 출력하는데, ScoreRecord 클래스가 DataSheetView 객체를 참조해야한다.

```java
public class DataSheetView {
    private ScoreRecord scoreRecord;
    private int viewCount;

    public DataSheetView(ScoreRecord scoreRecord, int viewCount) {
        this.scoreRecord = scoreRecord;
        this.viewCount = viewCount;
    }

    public void update() {
        List<Integer> record = scoreRecord.getScoreRecord();
        displayScores(record, viewCount);
    }

    private void displayScores(List<Integer> record, int viewCount) {
        System.out.println("List of " + viewCount + " entries: ");
        for(int i = 0; i < viewCount && i < record.size(); i++) {
            System.out.println(record.get(i) + " ");
        }
        System.out.println();
    }

}
```

```java
public class ScoreRecord {
    private List<Integer> scores = new ArrayList<Integer>();
    private DataSheetView dataSheetView;

    public void setDataSheetView(DataSheetView dataSheetView) {
        this.dataSheetView = dataSheetView;
    }

    public void addScore(int score) {
        scores.add(score);
        dataSheetView.update();
    }

    public List<Integer> getScoreRecord() {
        return scores;
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        ScoreRecord scoreRecord = new ScoreRecord();

        DataSheetView dataSheetView = new DataSheetView(scoreRecord, 3);

        scoreRecord.setDataSheetView(dataSheetView);

        for(int index = 1; index <= 5; index++) {
            int score = index * 10;
            System.out.println("Adding " + score);

            scoreRecord.addScore(score);
        }
    }
}
```


## 문제점
통보받는 대상이 바뀌었다고 생각해보자. 더이상 점수의 리스트가 필요한것이 아니라, 입력받은 점수들 중 최댓값, 최솟값들만 필요하게 요구사항이 바뀌었다. 또는 점수의 리스트도 필요하고 최댓값, 최솟값들도 필요하도록 바뀔수도 있다.

최댓값, 최솟값을 출력하기 위한 MinMaxView클래스가 필요할것이고, ScoreRecord에서는 더이상 DataSheetView클래스가 아닌 MinMaxView클래스에 의존하게 될것이다.

이는 다시한번 `OCP`에 위배된다. 점수가 입력되었을때 특정 클래스에 고정적으로 통보하도록 코드가 작성되었는데, 필요한 데이터가 바뀌면서 ScoreRecord클래스의 변경이 불가피하기 때문이다.

아래의 코드는 최댓값, 최솟값을 얻는 코드이고 ScoreRecord의 코드가 어떻게 바뀌었는지 주석을 통해 보여준다.

```java
public class MinMaxView {
    private ScoreRecord scoreRecord;

    public MinMaxView(ScoreRecord scoreRecord) {
        this.scoreRecord = scoreRecord;
    }

    public void update() {
        List<Integer> record = scoreRecord.getScoreRecord();
        displayMinMax(record);
    }

    private void displayMinMax(List<Integer> record) {
        int min = Collections.min(record, null);
        int max = Collections.max(record, null);
        System.out.println("Min: " + min + " Max: " + max);
    }
}
```

```java
public class ScoreRecord {
    private List<Integer> scores = new ArrayList<Integer>();
//    private DataSheetView dataSheetView;
    private MinMaxView minMaxView;

//    public void setDataSheetView(DataSheetView dataSheetView) {
//        this.dataSheetView = dataSheetView;
//    }

    public void setStatisticsView(MinMaxView minMaxView) {
        this.minMaxView = minMaxView;
    }

    public void addScore(int score) {
        scores.add(score);
//        dataSheetView.update();
        minMaxView.update();
    }

    public List<Integer> getScoreRecord() {
        return scores;
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        ScoreRecord scoreRecord = new ScoreRecord();

        MinMaxView minMaxView = new MinMaxView(scoreRecord);
        scoreRecord.setStatisticsView(minMaxView);

        for(int index = 1; index <= 5; index++) {
            int score = index * 10;
            System.out.println("Adding " + score);

            scoreRecord.addScore(score);
        }
    }
}
```


그리고 이 아래의 코드들은 최댓값, 최솟값 뿐만 아니라 데이터의 리스트도 정보의 변화를 통보받고 싶은 경우에 작성되는 코드이다. 여전히 `OCP` 를 위반하고 있다.


```java
public class ScoreRecord {
    private List<Integer> scores = new ArrayList<Integer>();

    private List<DataSheetView> dataSheetViews = new ArrayList<>();
    private MinMaxView minMaxView;

    public void addDataSheetView(DataSheetView dataSheetView) {
        dataSheetViews.add(dataSheetView);
    }

    public void setStatisticsView(MinMaxView minMaxView) {
        this.minMaxView = minMaxView;
    }

    public void addScore(int score) {
        scores.add(score);
        for(DataSheetView dataSheetView: dataSheetViews) {
            dataSheetView.update();
        }
        minMaxView.update();
    }

    public List<Integer> getScoreRecord() {
        return scores;
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        ScoreRecord scoreRecord = new ScoreRecord();

        DataSheetView dataSheetView3 = new DataSheetView(scoreRecord, 3);
        DataSheetView dataSheetView5 = new DataSheetView(scoreRecord, 5);
        MinMaxView minMaxView = new MinMaxView(scoreRecord);

        scoreRecord.addDataSheetView(dataSheetView3);
        scoreRecord.addDataSheetView(dataSheetView5);
        scoreRecord.setStatisticsView(minMaxView);

        for(int index = 1; index <= 5; index++) {
            int score = index * 10;
            System.out.println("Adding " + score);

            scoreRecord.addScore(score);
        }
    }
}
```




## 해결책

`OCP` 문제를 해결하려면 점수 변경시 통보 대상이 변경되더라도, ScoreRecord클래스를 그대로 재사용할 수 있어야 한다.
따라서 ScoreRecord클래스에서 변화하는 부분을 찾아내어, 이를 일반화 시켜야 한다.

ScoreRecord 클래스에서는 통보 대상인 객체를 참조하는 것을 관리해야 하며 addScore 메서드는 각 통보 대상인 객체의 update 메서드를 호출할 필요가 있다. 이런 통보 대상 객체의 관리와 각 객체의 update 메서드를 호출하는 기능은 성적 변경뿐만 아니라 임의의 데이터가 변경되었을 때 이에 관심을 가지는 모든 대상 객체에 통보하는 경우에도 동일하게 발생하는 기능이다. 따라서 이러한 공통 기능을 상위 클래스 및 인터페이스로 일반화하고 이를 활용해 ScoreRecord를 구현하는 방식으로 설계를 변경하는게 좋다.

구현하는 방법으로는,
1. 상태의 변경에 관심이 있는 대상 객체를 관리하는 기능을 구현하는 `Subject`라는 클래스를 정의한다. 이 클래스에서는 attach나 detach 메서드로 상태의 변경에 관심이 있는 객체를 추가하거나 제거할 수 있다. 위의 예시에서는 DataSheetView 클래스와 MinMaxView클래스는 성적 변경을 수신받는 클래스이므로 Observer 인터페이스를 구현해 상태 변경을 받을 수 있도록 할 수 있다.
2. ScoreRecord 클래스의 addScore메서드가 호출되면 자신의 점수를 저장한 후 Subject 클래스의 notifyObservers 메서드를 호출해 옵저버들에게 점수의 변경을 토옵한다. 그러면 Subject 클래스는 Observer 인터페이스를 통해 DataSheetView와 MinMaxView 객체의 update 메서드를 호출한다. 

즉, 변화에 관심이 있는 클래스들은 Observer 인터페이스를 구현하고, Concrete Subject의 변화가 생겼을때, Subject 클래스를 상속받은 Concrete Subject에서 변화를 통보할 수 있도록 코드를 작성할 수 있다. 

다음 코드들은 Observer와 Subject들을 설정하는 과정이다.

```java
public interface Observer {
    public abstract void update();
}
```

```java
public abstract class Subject {

    private List<Observer> observers = new ArrayList<>();

    public void attach(Observer observer) {
        observers.add(observer);
    }

    public void detach(Observer observer) {
        observers.remove(observer);
    }

    public void notifyObservers() {
        for(Observer o: observers) {
            o.update();
        }
    }
}
```

```java
public class ScoreRecord extends Subject {
    private List<Integer> scores = new ArrayList<Integer>();

    public void addScore(int score) {
        scores.add(score);
        notifyObservers();
    }

    public List<Integer> getScoreRecord() {
        return scores;
    }
}
```


```java
public class DataSheetView implements Observer {
    private ScoreRecord scoreRecord;
    private int viewCount;

    public DataSheetView(ScoreRecord scoreRecord, int viewCount) {
        this.scoreRecord = scoreRecord;
        this.viewCount = viewCount;
    }

    public void update() {
        List<Integer> record = scoreRecord.getScoreRecord();
        displayScores(record, viewCount);
    }

    private void displayScores(List<Integer> record, int viewCount) {
        System.out.println("List of " + viewCount + " entries: ");
        for(int i = 0; i < viewCount && i < record.size(); i++) {
            System.out.println(record.get(i) + " ");
        }
        System.out.println();
    }

}
```

```java
public class MinMaxView implements Observer {
    private ScoreRecord scoreRecord;

    public MinMaxView(ScoreRecord scoreRecord) {
        this.scoreRecord = scoreRecord;
    }

    public void update() {
        List<Integer> record = scoreRecord.getScoreRecord();
        displayMinMax(record);
    }

    private void displayMinMax(List<Integer> record) {
        int min = Collections.min(record, null);
        int max = Collections.max(record, null);
        System.out.println("Min: " + min + " Max: " + max);
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        ScoreRecord scoreRecord = new ScoreRecord();

        DataSheetView dataSheetView3 = new DataSheetView(scoreRecord, 3);
        DataSheetView dataSheetView5 = new DataSheetView(scoreRecord, 5);
        MinMaxView minMaxView = new MinMaxView(scoreRecord);

        scoreRecord.attach(dataSheetView3);
        scoreRecord.attach(dataSheetView5);
        scoreRecord.attach(minMaxView);

        for(int index = 1; index <= 5; index++) {
            int score = index * 10;
            System.out.println("Adding " + score);

            scoreRecord.addScore(score);
        }
    }
}
```




여기서 점수의 총합과 평균을 알고싶어 하는 점수를 구독하려는 새로운 객체가 존재한다면, Observer클래스와 update 메서드만 구현해준다면 Subject에서 attach로 변화가 발생할 경우 통보받을 수 있다.


```java
public class StatisticsView implements Observer {

    private ScoreRecord scoreRecord;

    public StatisticsView(ScoreRecord scoreRecord) {
        this.scoreRecord = scoreRecord;
    }
    @Override
    public void update() {
        List<Integer> record = scoreRecord.getScoreRecord();
        displayStatistics(record);
    }

    private void displayStatistics(List<Integer> record) {
        int sum = 0;
        for(int score: record) {
            sum += score;
        }
        System.out.println("sum: " + sum + " Average: " + sum/record.size());
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        ScoreRecord scoreRecord = new ScoreRecord();

        DataSheetView dataSheetView3 = new DataSheetView(scoreRecord, 3);
        DataSheetView dataSheetView5 = new DataSheetView(scoreRecord, 5);
        MinMaxView minMaxView = new MinMaxView(scoreRecord);
        StatisticsView statisticsView = new StatisticsView(scoreRecord);

        scoreRecord.attach(dataSheetView3);
        scoreRecord.attach(dataSheetView5);
        scoreRecord.attach(minMaxView);
        scoreRecord.attach(statisticsView);

        for(int index = 1; index <= 5; index++) {
            int score = index * 10;
            System.out.println("Adding " + score);

            scoreRecord.addScore(score);
        }
    }
}
```

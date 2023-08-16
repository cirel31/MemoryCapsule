
# 포팅 매뉴얼 상세
Detail Porting Manual for Team. Santa production.

## 빌드/배포 시나리오

- 전체 프로젝트 구조

``` [도커 올라간 사진 넣기] ```
![docker-ver](https://lab.ssafy.com/yimo22/test/uploads/bfebd65f423ab98e6cf2e401ec751d14/docker-ver.jpg)

``` [시스템 아키텍쳐 넣기] ```
![archi_internal](https://lab.ssafy.com/yimo22/test/uploads/f50a31b7d624b93cc5c945e51bace7ac/archi_internal.png)


- 파일 구조
```
repository
|
|---/BE
|   |-- ProjectService
|   |   |-- Dockerfile
|   |   |-- feature.sh
|   |   |-- pom.xml
|   |   |-- src
|   |   `-- target
|   |
|   |-- alarm-service
|   |   |-- Dockerfile
|   |   |-- alarm
|   |   |-- pom.xml
|   |   |-- setup.sh
|   |   |-- src
|   |   `-- target
|   |
|   |-- apigateway-service
|   |   |-- Dockerfile
|   |   |-- pom.xml
|   |   |-- setup.sh
|   |   |-- src
|   |   `-- target
|   |
|   |-- board-service
|   |   |-- Dockerfile
|   |   |-- pom.xml
|   |   |-- setup.sh
|   |   |-- src
|   |   `-- target
|   |
|   |-- config-service
|   |   |-- Dockerfile
|   |   |-- pom.xml
|   |   |-- setup.sh
|   |   |-- src
|   |   `-- target
|   |
|   |-- discovery-service
|   |   |-- Dockerfile
|   |   |-- pom.xml
|   |   |-- setup.sh
|   |   |-- src
|   |   `-- target
|   |
|   |-- user-service
|   |   |-- Dockerfile
|   |   |-- pom.xml
|   |   |-- setup.sh
|   |   |-- src
|   |   `-- target
|   |
|   |-- pom.xml
|   `-- target
|      `-- sonar
|
`---/FE
   |-- Dockerfile
   |-- nginx.conf
   |-- node_modules
   |-- package.json
   |-- public
   |-- src
   `-- task.sh

```
### 사용한 버전관리

---

#### <i>OS</i>
OS : 5.4.0-1018-aws

---

#### <i>Servers</i>
Nginx : nginx/1.25.1 built by gcc 12.2.1 20220924 (Alpine 12.2.1_git20220924-r4)

JVM : openjdk 11 2018-09-25 / Open JDK Runtime Envrionment (build 11+11-Debian-2) / OpenJDK 64-Bit Server VM (build 11+11-Debian-2, mixed mode, sharing)

Spring boot : 2.7.14

React : 18.2.0

NodeJS : 18.17.0

---

#### <i>Build</i>
Maven : Apache Maven 3.6.3

NPM : 9.6.7

---

#### <i>DB</i>


MariaDB : 11.0.2-MariaDB-1:11.0.2+maria~ubu2204

MongoDB : MongoDB 6.0.8 Community

Redis : 7.0.12


---

#### <i>extra</i>

Docker : version 20.10.21, build 20.10.21-0ubuntu1~20.04.2

Jenkins : 2.415

prometheus : 2.46.0

Grafana : 10.0.3

RabbitMQ : 3.8.11

---

#### <i>IDEA</i>

Intellij IDEA 2023.1.3 (Ultimate Edition)

---


### 빌드 시 사용되는 환경 변수

JENKINS_PORT=8088

CONFIG_PORT=8888

DISCOVERY_PORT=8761

API_GATEWAY_PORT=8000

PROMETHEUS_PORT=8760

GRAFANA_PORT=8001

CONFIG_URL=config-service:8888

DISCOVERY_URL=discovery-service:8761/eureka

RABBITMQ_URL=rabbitmq

### 배포시 특이사항

모든 서비스(Application Server, Web Server, DB 등) 이 Docker로 관리되어 있습니다. 또한 내부 docker network 로 묶여 있어 특정 서버만 외부로부터 접근이 가능합니다.

Memory-Capsule(Team. santa) 의 서버내 컨테이너의 목록은 다음과 같이 요약할 수 있습니다. 
 - service Container 목록
    - config-service
    - discovery-service
    - apigateaway-service
    - user-service
    - project-service
    - notification-service
    - board-service
 - DB Container 목록
    - MariaDB
    - Redis
    - MongoDB
 - ETC
    - RabbitMQ
 - Monitoring Container 목록
    - Prometheus
    - Grafana
 - deploy Container 목록
    - Jenkins
    - santa-service (Nginx)
    
각 서비스들은 Jenkins 가 저장소(gitLab)으로부터 소스를 받아 빌드를 합니다. 빌드를 통해서 나온 archive 파일들은 각 프로젝트(마이크로서비스)의 shell script(setup.sh) 를 통해서 docker container 로 빌드를 진행합니다.

젠킨스는 이전커밋과의 변경을 비교하여 변동사항이 있는 서비스만 pull 및 빌드를 진행하며, 빌드 결과를 <b>sonarqube</b> 에 빌드결과 및 분석결과를 전송합니다.

각 빌드 파일들을 docker 이미지로 빌드 및 container 로 만드는 과정은 shell 파일을 실행하면서 build profile 변수를 입력받습니다.

 (예시- ./setup.sh dev -> dev 프로파일로 shell 파일 실행)

shell을 실행하면서 받은 인자값(프로파일)을 통해서 각 service 들을 프로파일에 맞는 build를 진행합니다. 실행 최초의 서버는 Config-service 로부터 해당되는 프로파일을 repository로부터 실시간으로 불러와 빌드를 진행합니다.

빌드 이후의 서버에 대해서는, rabbitMQ 와 연동되어 있는 모든 서버들은 이벤트를 받게 되는 경우에 repository의 변경된 프로파일의 yml 파일을 체크하여 리빌드 없이 서버에 반영됩니다.

---

- <i><b>SonarQube</b></i>

https://sonarqube.ssafy.com
에서  <i>memory-capsule</i> 의 검색을 통해서 빌드결과를 확인할 수 있습니다.

- <i><b>Grafana</b></i>
 
http://i9a608.p.ssafy.io:8001 
에서 <> / <> 로 로그인 후에 서버의 상태(JVM, Gateway 상태)를 확인할 수 있습니다.



## 프로젝트에서 사용한 외부 서비스 정보

1. Kakao 공유하기 
2. Kakao 로그인 

## DB 덤프파일 최신본

![schema](https://lab.ssafy.com/yimo22/test/uploads/bd12d0699e6286ac9358a6b5324dd48f/schema.png)

[santa.sql](https://lab.ssafy.com/yimo22/test/uploads/46b72ef31364131797a50a6e15d404c3/santa.sql)


## 시연 시나리오

### 배경화면

안녕하세요~ 메모리캡슐에 오신것을 환영합니다.!

메모리캡슐을 ~~~블라블라

제가 직접 메모리캡슐을 시연 및 이미지를 통해서 보여드리겠습니다.

클릭을 해서 로그인을 해볼게요

![초기화면](https://lab.ssafy.com/yimo22/test/uploads/eac36179f1bf81a4cbcacae1faada0fb/초기화면.png)


![로그인](https://lab.ssafy.com/yimo22/test/uploads/1a3f9154170dcdacd2c5ff1be7a0396c/로그인.png)

로그인은 두가지 방법을 사용해서 할 수 있습니다.

![회원가입-2](https://lab.ssafy.com/yimo22/test/uploads/202ac2c4a2d6c6b005a6fe3d60f12771/회원가입-2.png)

자체 회원가입을 해볼겠습니다.!


![이메일인증-1](https://lab.ssafy.com/yimo22/test/uploads/543a7f10734b5c961e7afb5b6f71bdde/이메일인증-1.png)

![이메일인증-2](https://lab.ssafy.com/yimo22/test/uploads/9f01e53e2a8dd7a58ce7d488690cc2c4/이메일인증-2.png)

이메일은 중복체크는 반드시 확인해주세요!

중복체크를 하면 인증메일이 날라오는데요, 이 인증코드를 적어줘야 사용할 수 있습니다.



### Main Page
```
[Main Page]
. 현재 내가 진행한 프로젝트 목록을 볼수 있음
. nav 바를 통해서 다른 프로젝트들도 확인 할 수 있음
. 프로젝트 검색창을 통해서 내가 진행했던 프로젝트를 검색할 수 있음
```

![로그인성공](https://lab.ssafy.com/yimo22/test/uploads/6a9224b118ff7a8eb9a0bdedbc061f0e/로그인성공.png)

로그인을 하면 예쁜 메인페이지를 확인할 수 있습니다.
시작하기 버튼을 통해서 메인페이지를 접속해 보겠습니다.


![메인페이지](https://lab.ssafy.com/yimo22/test/uploads/025d0f0baa95d23ea253a2f4559bb6d4/메인페이지.png)

메인페이지를 통해서 현재 유저가 진행중인 프로젝트 목록을 확인할 수 있습니다.


### Navi Bar

![네비바](https://lab.ssafy.com/yimo22/test/uploads/9f9d10288463aa32d07717409fb9665b/네비바.png)

네비바를 통해서 다음의 페이지로 이동할 수 있습니다.
   - 마이페이지
      
      사용자의 정보 및 친구, 프로젝트 초대 등을 확인 할 수 있습니다.
   - My Memory 페이지

      내가 진행중인 캡슐 프로젝트를 확인할 수 있는 페이지 입니다.
   - Capsule Box 페이지

      내가 과거에 진행을 완료했던 캡슐들을 확인할 수 있는 페이지 입니다.
   - 리뷰 페이지

      MemoryCapsule 서비스에 대하여 사용자들의 후기, 사용기 등을 볼 수 있는 페이지입니다.
   - 공지사항 페이지

      관리자가 게시한 공지사항을 확인할 수 있는 페이지 입니다.

네비바를 통해서 사용자는 보유포인트를 확인할 수 있습니다. 포인트는 최초회원가입시 500 포인트, 이후 일일출석마다 100 포인트가 지급됩니다.

지급된 포인트를 사용하여 사용자는 프로젝트에서 글을 작성할 때 추가사진을 등록할 수 있습니다. (무료 1장, 최대 4장 등록가능)


프로젝트 상세 페이지를 통해서 프로젝트를 자세히 살펴보겠습니다.


### 프로젝트 생성

다시 메인페이지로 돌아와서, "새로운 캡슐 생성하기" 버튼을 통해서 새로운 프로젝트를 생성해보겠습니다.

![프로젝트생성0](https://lab.ssafy.com/yimo22/test/uploads/b02a1383fec7dfcdf4e19a6a80875ae1/프로젝트생성0.png)

프로젝트 생성은 대표이미지/제목/기간/설명/프로젝트타입 의 5가지를 설정을 통해서 생성할 수 있습니다. 

대표이미지는 해당 프로젝트를 대표하여 나타내는 이미지를 뜻하며, png/jpeg 뿐만 아니라 gif 도 지원하여 사용자가 다양하고 개성있는 프로젝트를 생성할 수 있습니다.





또한 "혼자할게요" 와 "여러명이서 할게요!" 를 통해서 개인/그룹 프로젝트를 설정할 수 있습니다. 

![그룹_친구추가0](https://lab.ssafy.com/yimo22/test/uploads/12aeecb5beaa65bb5821ded4646a3cdc/그룹_친구추가0.png)

![그룹친구추가1](https://lab.ssafy.com/yimo22/test/uploads/e2f776e24f2f3d34a4a169ac68465db9/그룹친구추가1.png)

"그룹프로젝트" 로 진행하는 경우, 친구추가(친구 이메일)을 통해서 친구를 추가할 수 있습니다.
추가한 친구에 대해서 클릭을 통해서 이미 추가한 친구를 삭제하여 그룹생성 이전에 그룹원들을 관리할 수 있습니다.

![달력팝업](https://lab.ssafy.com/yimo22/test/uploads/1279d430306f6b093164a4d4744d8124/달력팝업.png)

제작기간을 선택하면 달력이 팝업되는데, 프로젝트의 시작일은 반드시 사용자 기준 오늘날짜 이후부터 설정이 가능하고 종료일은 반드시 시작일 + 1 일 이후로 설정이 가능합니다. 종료일이 시작일보다 앞서는 상황으로 프로젝트를 생성할 수 없습니다!




### Project Detail

![상세_페이지1](https://lab.ssafy.com/yimo22/test/uploads/d1ca759093b2ac4b89def901c73d8394/상세_페이지1.png)

![상세페이지2](https://lab.ssafy.com/yimo22/test/uploads/2f85078026dab103613f478c9cca9b86/상세페이지2.png)

프로젝트 목록을 클릭해서 사용자는 프로젝트의 세부 내용을 확인할 수 있습니다. 또한 프로젝트 세부내용 내에서 캡슐의 진행도를 확인할 수 있습니다.

사용자는 세부 페이지에서 내가 작성한 게시글들을 확인할 수 있으며, 해당 프로젝트에서 쌓인 전체 게시글 수와 내가 작성한 게시글 수를 확인할 수 있습니다. 

프로젝트당 게시글은 하루에 <b><i>단 한번</i></b> 만 작성이 가능하므로, 작성에 유의해주세요!


### Project 내에 글작성

![글작성1](https://lab.ssafy.com/yimo22/test/uploads/91bbac281f3d1c3f01b94b6a1e9a257d/글작성1.png)

프로젝트 내에서 글작성을 누르면, 위와같은 화면을 확인할 수 있습니다.
사진추가 를 통해서 기본 사진 1장 업로드 가능하고 그 이상은 일정 포인트를 지불하여 추가 사진의 업로드가 가능합니다.(최대 4장)

현재 SSAFY에서 많은것을 학습하고 있기에, 이미지는 싸피로 사진을 올려보겠습니다.

![글작성2](https://lab.ssafy.com/yimo22/test/uploads/c221d9674b7afd7fad90bc731aec147e/글작성2.png)

이후 오늘의 스탬프 (도장) 을 통해서 그날의 기분을 표현할 수 있습니다. 스탬프는 글 작성을 위해 반드시 필요하니 잊지말고 선택해주세요!

![글작성3](https://lab.ssafy.com/yimo22/test/uploads/5b5de3015fe4315bd1ef287ea1450a9c/글작성3.png)

![글작성4](https://lab.ssafy.com/yimo22/test/uploads/67dd6219d84770053dc070611a3e02fe/글작성4.png)

최종적으로 필자는 위와같은 글을 작성해보았습니다. 글은 최대 100글자까지 작성이 가능하기때문에 반드시 유의해주세요! 이제 이 글을 우측 상단의 "게시글 등록"을 통해서 등록을 진행해보겠습니다.

![글작성5](https://lab.ssafy.com/yimo22/test/uploads/9e003a243254ba3eb7a5b7e5c2263b9c/글작성5.png)

게시글이 정상적으로 등록이 되면, 해당 프로젝트 자세히 보기 페이지로 이동이 됩니다.
해당 페이지내에서 History 영역을 통해서 내가 작성한 글들만 확인을 할 수 있습니다.


### 마이페이지

![마이페이지1](https://lab.ssafy.com/yimo22/test/uploads/0a34bbc82e4fb6d6581d2e973da21ceb/마이페이지1.png)

![마이페이지2](https://lab.ssafy.com/yimo22/test/uploads/5edf4688753a5187be31bada691e8f97/마이페이지2.png)

![마이페이지3](https://lab.ssafy.com/yimo22/test/uploads/d43321da202bc5e1de21b1247bbd1a66/마이페이지3.png)

마이페이지를 통해서 유저는 이메일/닉네임, 친구등의 정보를 확인 할 수 있습니다.
달력에서 내가 접속한 날짜들을 확인할 수 있고, 내가 진행/완료한 캡슐프로젝트들을 브리핑 받을 수 있습니다.

또한 초대받은 프로젝트들을 확인하고 이를 수락/거절할수 있으며, 제작중인 프로젝트들도 확인이 가능합니다.

보관함을 통해서는 완료한 프로젝트들의 종합서비스를 열어볼수 있습니다.


### 친구기능

![친구1](https://lab.ssafy.com/yimo22/test/uploads/dfe241557de9b7383cbbcfae9f8b8d05/친구1.png)

마이페이지의 친구목록 버튼을 통해서 친구들을 관리할 수 있습니다. 이떄 친구목록에는 "등록된 친구" 로, 총 몇명의 친구가 등록되어있는지 확인할 수 있습니다. 또한 검색을 통해서 이미 맺어진 친구들을 검색할 수 있습니다.

이제 새로운 친구를 찾아, 친구 추가를 하겠습니다. 우층 상단의 "친구찾기" 버튼을 눌러 친구추가를 합니다.

![친구2](https://lab.ssafy.com/yimo22/test/uploads/cab48eb0fd1673bea498575feb96878b/친구2.png)

친구 검색창에 친구의 가입이메일을 검색하여 친구를 검색할 수 있고, 해당 친구에게 친구신청을 보낼 수 있습니다. 지금 상황은 "KJH@ssafy.com" 으로 검색한 유저를 검색하여, 친구신청까지 진행하겠습니다.


![친구3](https://lab.ssafy.com/yimo22/test/uploads/fb392a94eaa50a270dfaa0adfa55564b/친구3.png)

친구신청을 성공적으로 수행하면, Success 와 함께 친구신청이 완료된 피드백을 받아볼 수 있습니다. 다시 친구목록으로 돌아가 친구목록을 확인해봅니다.


![친구4](https://lab.ssafy.com/yimo22/test/uploads/cfa482afb6ed60e98b7c5e83f8547bc1/친구4.png)

친구목록에서 기존의 친구 1명과, 새로 친구신청을 한 유저를 확인할 수 있습니다. 친구프로필 우측의 아이콘 상태를 통해서 요청수락/ 요청 등의 상태를 확인할 수 있습니다.


![친구5](https://lab.ssafy.com/yimo22/test/uploads/8fd479a96af956c0004cb7fe0239454d/친구5.png)

이미 친구로 맺어져 있던, 요청을 수락한 친구의 오른쪽 아이콘을 누르면 위와같은 친구가 작성한 총 게시물 수 와 참여했던/참여중인 프로젝트의 총 수를 확인할 수 있습니다.



### 프로필 수정

다음은 프로필 변경을 진행하겠습니다. 프로필 변경은 Navi 바 -> MyPage 로 이동하겠습니다.
이동후, 우측 상단에 "프로필변경"을 통해 프로필을 변경할 수 있습니다.

![프로필변경1](https://lab.ssafy.com/yimo22/test/uploads/01677f22be36ddf96c45895c85ec7457/프로필변경1.png)

프로필변경을 클릭하여 들어오면, 기존 사용자가 사용하고 있던 프로필 사진과 닉네임이 업로드 됩니다. 이번 변경은 프로필을 "수원킹_after변경" 으로 프로필을 수정해보겠습니다.


![프로필변경2](https://lab.ssafy.com/yimo22/test/uploads/76968cca77cfc7f5e7e87036ed657596/프로필변경2.png)

프로필을 수정한 후, 하단의 "프로필 변경" 을 통해서 프로필을 변경할 수 있습니다. 또한 비밀번호 변경도 진행할 수 있습니다.


![프로필변경3](https://lab.ssafy.com/yimo22/test/uploads/edb8f6ab297653978b27bcb1adc0caa8/프로필변경3.png)

프로필 수정을 누르면 자동으로 MyPage로 돌아오게 됩니다. 마이페이지에서 내가 수정한 프로필들이 정상적으로 변경되었음을 확인할 수 있습니다.


### 캡슐박스 페이지

캡슐박스를 통해서 사용자는 지난 프로젝트(이미 완료된 프로젝트) 들을 확인하고 링크를 통해서 공유할 수 있습니다. 이를 확인하기 위해 "Navi Bar" > "Memory Capsule" 로 이동하겠습니다.

![캡슐박스0](https://lab.ssafy.com/yimo22/test/uploads/becf25f1179a2c737998fd07edd4e6f1/캡슐박스0.png)

해당 페이지를 통해서 과거의 프로젝트 목록들을 확인할 수 있고, 클릭을 통해서 해당 프로젝트들을 상세히 다시보기를 진행할 수 있습니다.

[여기에는 이제 최종적으로 나온 산출물 보여주기]


[여기에는 카카오톡을 통해서 공유하는 장면1 - 버튼 누르기 직전]

[여기에는 카카오톡을 통해서 공유하는 장면2 - 버튼 누른후 카카오 로그인]

[여기에는 카카오톡을 통해서 공유하는 장면3 - 채팅방에서 공유]

[여기에는 카카오톡을 통해서 공유하는 장면4 - 채팅방에서 보여지는 공유글]

해당 url 을 가지고 있는 모든 유저들이 선물페이지를 열람할 수 있습니다. 이미지, 텍스트, gif 등을 시간 순으로 아름답게 나열하여 사용자들이 쌓은 추억을 프로젝트에 참여했거나 공유 url을 받은 모든 유저들이 공감하고 추억할 수 있습니다.



### 공지사항 및 리뷰

![공지사항](https://lab.ssafy.com/yimo22/test/uploads/e55549c56e2e0756914cf67a869b981d/공지사항.png)

![review](https://lab.ssafy.com/yimo22/test/uploads/20cce3985608e1c76822d0fe00e0a157/review.png)

공지사항은 관리자에 의하여 긴급한 패치 소식이나 정보를 확인할 수 있는 게시글 페이지입니다. 또한 리뷰페이지를 통해서 사용자들을 이 서비스를 사용한 후기나 꿀팁등을 사용자들과 공유하며 글을 남길 수 있습니다.

# NestJS
## Setup

```
# 글로벌에 NestJS CLI 설치 
$ npm i -g @nestjs/cli

# NestJS CLI로 새로운 프로젝트 생성
$ nest new project-name

# 설치 확인
$  nest --version
```

## Running the app
```
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## CLI's CRUD generator :  nest g resource [name]
```
# module 생성
$ nest g module board

# controller 생성
# --no-spec : 테스트를 위한 소스 코드 없이 생성 
$ nest g controller board --no-spec

# service 생성
$ nest g service board --no-spec

```

## npm Install 

```
# install class-validator class-transformer
$ npm install class-validator and class-transformer
```

    Options
    -P, --save-prod: Package will appear in your dependencies. (default) 

    -D, --save-dev: Package will appear in your devDependencies.

    -O, --save-optional: Package will appear in your optionalDependencies.

    --no-save: Prevents saving to dependencies.

    When using any of the above options to save dependencies to your package.json, there are two additional, optional flags:

    -E, --save-exact: Saved dependencies will be configured with an exact version rather than using npm's default semver range operator.

    -B, --save-bundle: Saved dependencies will also be added to your bundleDependencies list.

## Providers
- Nest의 기본 개념
- 대부분의 Nest 클래스는 프로바이더로 취급될 수 있음(services, repositories, factories, helpers 등)
- 프로바이더의 main idea는 종속성 주입이 가능하다는 것


## Decorators
- @Body(): 요청 객체의 속성 중 Body를 가지고 오기위해 사용
- @Param(): path variable 을 가져오기 위해 사용. 지정하지 않으면 전체를 다 받고 특정 변수를 가져올 때는 지정
- @Entity(): 해당 클래스가 엔티티임을 나타내는데 사용
- @PrimaryGeneratedColumn(): 기본키 임을 나타내는데 사용하고 id 자동생성
- @Column(): 엔티티의 열임을 나타냄
- @EntityRepository(): 클래스르 사용자 정의 저장소로 선언하는데 사용
- @InjectRepository(): 서비스에서 사용할 Repository 를 변수에 의존성을 주입해줌
- @Unique(): 특정 컬럼에 unique 제약조건을 생성
  
## DTO(Data Transfer Object)
- 계층간 데이터 교환을 위한 객체
- 데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체
- interface나 class를 이용해 정의 될 수 있음 => NestJS에서는 class 추천 

## Pipe  

<img src="img/pipe.PNG" alt="Pipe" width="400" height="200"/>

- @Injectable() 데코레이터가 있는 클래스
- PipeTransform interface 를 구현해야 함
- Typical use cases

  - transformation: 입력된 데이터를 원하는 형식으로 변환
  - validation: 입력 데이터를 평가하여 유효한 경우 변경없이 전달, 유효하지않은 경우 예외 발생 시킴
    
    두 경우 모두 파이프틑 controller route handler 가 처리하는 인수에 대해서 작동. 
    파이프는 메소드를 호출 바로 직전에 파이프 삽입 -> 파이프틑 메서드를 대상으로 하는 인수를 수신하고 이에 대해 작동

- Binding Pipes
  - Handler scoped Pipes: @UsePipes() 응 이용해 사용. 모든 파라미터에 적용
    ```javascript
    @Post()
    @UsePipes(new JoiValidationPipe(createCatSchema))
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }
    ```

  - Parameter scoped Pipes: 특정한 파라미터에게만 적용되는 파이프
    ```javascript
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.catsService.findOne(id);
    }
    ```

  - Global scoped pipes: 애플리케이션 레벨의 파이프. 클라이언트에서 들어오는 모든 요청에 적용. main.ts 에 넣어서 사용
    ```javascript
    async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        app.useGlobalPipes(new ValidationPipe());
        await app.listen(3000); 
    }

    bootstrap();
    ```

- Built-in pipes
  - ValidationPipe
  - ParseIntPipe
  - ParseFloatPipe
  - ParseBoolPipe
  - ParseArrayPipe
  - ParseUUIDPipe
  - ParseEnumPipe
  - DefaultValuePipe

- transform()
  
  모든 파이프는 transform() 메서드를 구현해야 함
   
  두개의 파라미터를 가짐
    - value: 처리가 된 인자의 값
    - metadata: 인자에 대한 메타 데이터를 포함한 객체
  
  transform() 에서 리턴된 값은 Route 핸들러로 전해짐  
  예외발생시 클라이언트로 바로 전해짐

## readonly 

외부에서 접근은 가능하지만 변경은 불가 
```typescript
readonly options = {
  ...
}
```

## TypeORM

node.js 에서 실행되고 TypeScript 로 작성된 객체 관계형 매퍼 라이브러리  
TypeScript 는 MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, SAP Hana 및 WebSQL 과 같은 여러 데이터베이스를 지원

** ORM (Object Relational Mapping)

객체와 관계형 데이터베이스의 데이터를 자동으로 변형 및 연결하는 작업
ORM 을 이용한 개발은 객체와 데이터베이스의 변형에 유연하게 사용할 수 있다.

**TypeORM vs Pure JavaScript**

```javascript
const boards = Board.find({ title: 'Hello', status: 'PUBLIC'});

db.query('SELECT * FROM boards WHERE title = "Hello" AND status = "PUBLIC", (err, result)' => 
{
  if(err) {
    throw new Error('Error');
  }
  boards = result.rows;
});
```
**장점**
- 모델을 기반으로 데이터베이스 테이블 체계를 자동으로 생성
- 데이터베이스에서 개체를 쉽게 삽입, 업데이트 및 삭제할 수 있음
- 테이블 간의 매핑을 만듦
- 간단한 CLI 명령 제공
- TypeORM 은 간단한 코딩으로 ORM 프레임 워크를 사용하기 쉬움
- TypeORM 은 다른 모듈과 쉽게 통합

Postgres TypeORM 사용하기위해 필요한 모듈

```
# @nestjs/typeorm: NestJS 에서 TypeORM 을 사용하기 위해 연동 시켜주는 모듈
# typeorm: TypeORM 모듈 
# pg: Postgres 모듈
$ npm install pg typeorm @nestjs/typeorm --save
```

## Entity
TypeORM 사용 시 database table를 생성하기 위한 CREATE 문 작성 직접 안함
Entity 클래스를 생성하여 그 안에 컬럼들을 정의하면 database table 로 변환 됨 

## Repository

엔티티 개체와 함꼐 작동하며 database 와 관련된 작업들을 처리  
repository.ts 생성 후 Repository 클래스 Extends ( find, insert, delete 등 엔티티를 컨트롤 해줄 수 있음) 

## async await 

database 작업처리가 다 끝날 때까지 기다렸다가 결과값을 받음 

## TypeORM Repository Method

- findOne(id): id 로 객체 찾음
- create(): 해당 class 의 객체를 만들때 사용
- remove(): 주어진 조건에 해당하는 아이템이 존재하지 않으면 에러(404) 발생 -> remove() 사용 시 먼저 조건에 해당하는 아이템이 존재하는지 확인하고 사용해야 함
- delete(): 만약 해당하는 아이템이 존재하면 지우고 존재하지 않으면 영향 없음

## 비밀번호 저장

1. 원본 비밀번호 저장
2. 비밀번호 암호화키와 함께 암호화(양방향): 암호화 키가 노출되면 알고리즘은 대부분 오픈되어있어 위험도 높음
3. SHA256 등 Hash로 암호화(단방향): 원래는 복호화가 안되지만 레인보우 테이블을 만들어서 암호화된 비밀번호를 비교해서 비밀번호 알아낼 수 있음
   **레인보우 테이블: 굉장히 큰 빅데이터로 대부분의 유저가 비슷한 암호를 사용한다는 점을 이용해 암호화된 비밀번호를 알아 내는 방법
4. salt + 비밀번호: Hash로 암호화해서 저장하는데 원래 비밀번호에 유니크한 값을 붙여 암호화 하는 것 

bcryptjs 는 [ salt + 비밀번호 ] 방식

```
npm install bcryptjs --save 
```

## JWT (JSON Web Token)

당사자간 정보를 JSON 개체로 안전하게 전송하기 위한 컴팩트하고 독립적인 방식을 정의하는 개방형 표준  
정보를 안전하게 전할 때 혹은 유저의 권한 같은 것을 체크하기 위해 사용하는데 유용한 모듈

JWT 의 구조

- Header
  토큰에 대한 메타 데이터 포함 ( 타입, 해싱 알고리즘 SHA256 등 )
- Payload
  유저정보(issuer), 만료기간(expiration time), 주제(subject) 등
- Verify Signature
  JWT 의 마지막 세그먼트는 토큰이 보낸 사람에 의해 서명되었으며 어떤 식으로든 변경되지 않았는지 확인하는데 사용되는 서명  
  서명은 헤더 및 페이로드 세그먼트, 서명 알고리즘, 비밀 또는 공개 키를 사용하여 생성   

```
# passport 사용 시 jwt 를 이용해서 인증 처리하는 등의 과정은 쉽게 만들어 줌
npm install @nestjs/jwt @nestjs/passport passport passport-jwt --save

```
## Pipes, Filters, Guards, Interceptors

Pipes: Request 의 유효성 검사 및 Payload 변환을 위해 만들어짐 데이터를 예상한 대로 직렬화
Filters: 오류처리 미들웨어 특정 오류 처리기를 사용할 경로와 각 경로 주변의 복잡성을 관리하는 방법을 알 수 있음
Guards: 인증 미들웨어 지정된 경로로 통과할 수 있는 사람과 그렇지 않은 사람을 서버에 알려줌
Interceptors: Response 매핑 및 캐시 관리와 함께 Request 로깅과 같은 전후 미들웨어 각 Request 전후에 이를 실행하는 기능은 매우 강력하고 유용

** middleware -> guards -> interceptor -> pipe -> controller -> service -> controller -> interceptor -> filter -> client 순으로 실행 됨
 
## Reference
https://docs.nestjs.com/  
https://docs.npmjs.com/cli/v7/commands/npm-install  
https://github.com/typestack/class-validator#manual-validation  
https://typeorm.delightful.studio/    
따라하면서 배우는 NestJS - John Ahn


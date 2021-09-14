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
- @Body() : 요청 객체의 속성 중 Body를 가지고 오기위해 사용
- @Param() : path variable 을 가져오기 위해 사용. 지정하지 않으면 전체를 다 받고 특정 변수를 가져올 때는 지정

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
- TypeORM 은 다른 모듈과 쉽게 통합 됨


## Reference
https://docs.nestjs.com/  
https://docs.npmjs.com/cli/v7/commands/npm-install
https://github.com/typestack/class-validator#manual-validation    
따라하면서 배우는 NestJS - John Ahn


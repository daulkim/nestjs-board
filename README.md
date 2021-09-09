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

## Reference
https://docs.nestjs.com/

따라하면서 배우는 NestJS - John Ahn

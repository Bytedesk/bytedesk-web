
# Proto 使用说明

## 生成javascript文件

- cd /Users/ningjinpeng/Desktop/GitOSChina/bytedeskcn/webchat/kefu/js/protobuf
- protoc --js_out=import_style=commonjs,binary:. config.proto request.proto group.proto message.proto thread.proto user.proto queue.proto workGroup.proto

## 安装依赖

- yarn add google-protobuf
- yarn global add browserify

## 打包生成build.js

- browserify config_pb.js request_pb.js group_pb.js message_pb.js thread_pb.js user_pb.js queue_pb.js workGroup_pb.js -o build.js

## 引用

- 将 build.js 添加到.html文件

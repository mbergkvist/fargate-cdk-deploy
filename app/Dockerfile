FROM rust:alpine as build

RUN apk add --no-cache musl-dev

RUN USER=root cargo new --bin hello-world
WORKDIR /hello-world
COPY ./Cargo.toml ./Cargo.toml
RUN cargo build --release --target x86_64-unknown-linux-musl
RUN rm ./src/*.rs ./target/x86_64-unknown-linux-musl/release/deps/hello_world*

ADD ./src ./src

RUN cargo build --release --target x86_64-unknown-linux-musl

FROM gcr.io/distroless/static

COPY --from=build /hello-world/target/x86_64-unknown-linux-musl/release/hello-world /
CMD [ "/hello-world" ]

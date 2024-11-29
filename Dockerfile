FROM gcc:latest
WORKDIR /app
COPY . /app
RUN apt-get update && apt-get install -y gcc
CMD ["bash", "-c", "gcc code.c -o code && ./code"]

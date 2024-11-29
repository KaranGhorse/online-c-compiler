FROM gcc:latest
WORKDIR /app
COPY . /app
CMD ["bash", "-c", "gcc code.c -o code && ./code"]
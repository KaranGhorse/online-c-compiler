FROM gcc:latest
WORKDIR /app
COPY . /app
RUN apt-get update && apt-get install -y curl
RUN apt-get install -y nodejs npm
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]

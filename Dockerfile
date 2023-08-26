# docker run -dp 3000:3000 loan-calculator
FROM node
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm","run","dev"]


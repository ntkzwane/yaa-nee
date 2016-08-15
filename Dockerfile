FROM node:6.2.1

ADD . /yaa-nee
WORKDIR /yaa-nee

RUN ["npm","install","-g","ionic@beta"]
RUN ["npm","install"]

EXPOSE 8100:8100

CMD ["ionic","serve","--c","--t","ios","--address","localhost","--nobrowser"]

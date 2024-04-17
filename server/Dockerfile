
FROM python:3.11.8-alpine

WORKDIR /server

ENV FLASK_APP=api.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_DEBUG=False

COPY . /server

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["flask", "run"]
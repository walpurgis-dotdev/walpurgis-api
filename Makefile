# Docker: Dockerfile
docker-build:
	docker build -t $(DOCKER_IMAGE) .

docker-run:
	docker run -it --rm -p 5000:5000 $(DOCKER_IMAGE)

docker-start:
	docker start $(shell docker ps -q --filter ancestor=$(DOCKER_IMAGE))

docker-stop:
	docker stop $(shell docker ps -q --filter ancestor=$(DOCKER_IMAGE))

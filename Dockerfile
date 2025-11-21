FROM python:3-slim
# This command copies all files and folders (except those in .dockerignore)
# from the current directory (the build context) into the container's working directory.
COPY . .
CMD ["python3", "-m", "http.server", "8080"]

FROM node:24-bookworm-slim

WORKDIR /app

ENV ANDROID_HOME=/opt/android-sdk
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV GRADLE_USER_HOME=/root/.gradle
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=localhost
ENV CHOKIDAR_USEPOLLING=true
ENV BROWSER=none
ENV EAS_LOCAL_BUILD_ARTIFACTS_DIR=/app/build-artifacts
ENV PATH=${JAVA_HOME}/bin:${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/emulator:${ANDROID_HOME}/build-tools/36.0.0:${ANDROID_HOME}/build-tools/35.0.0

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    bash \
    ca-certificates \
    curl \
    file \
    git \
    libc6-i386 \
    libstdc++6 \
    make \
    g++ \
    ninja-build \
    openjdk-17-jdk-headless \
    python3 \
    unzip \
    zip \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir -p ${ANDROID_HOME}/cmdline-tools \
  && curl -fsSL https://dl.google.com/android/repository/commandlinetools-linux-13114758_latest.zip -o /tmp/android-commandline-tools.zip \
  && unzip -q /tmp/android-commandline-tools.zip -d /tmp/android-commandline-tools \
  && mv /tmp/android-commandline-tools/cmdline-tools ${ANDROID_HOME}/cmdline-tools/latest \
  && rm -rf /tmp/android-commandline-tools /tmp/android-commandline-tools.zip \
  && yes | sdkmanager --licenses >/dev/null \
  && sdkmanager \
    "platform-tools" \
    "emulator" \
    "platforms;android-36" \
    "platforms;android-35" \
    "build-tools;36.0.0" \
    "build-tools;35.0.0" \
    "cmake;3.22.1" \
    "ndk;28.2.13676358"

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

RUN mkdir -p /app/build-artifacts

EXPOSE 8081 19000 19001 19002

CMD ["npm", "run", "docker"]

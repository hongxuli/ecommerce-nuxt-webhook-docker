FROM node:11.13.0-alpine

ARG ssh_prv_key
ENV ssh_prv_key=$ssh_prv_key

# 定义 SSH 公钥变量
ARG ssh_pub_key
ENV ssh_pub_key=$ssh_pub_key


# update and install dependency
RUN apk update && apk upgrade
RUN apk add git
RUN apk add openssh



# Authorize SSH Host
RUN mkdir -p /root/.ssh
# chmod 0700 /root/.ssh && \
# ssh-keyscan github.com > /root/.ssh/known_hosts

# 生成 id_rsa、id_rsa.pub 和 config 文件
RUN echo "$ssh_prv_key" > /root/.ssh/id_rsa && \
  echo "$ssh_pub_key" > /root/.ssh/id_rsa.pub


# 修改私钥的用户权限
RUN chmod 600 /root/.ssh/id_rsa
RUN chmod 644 /root/.ssh/id_rsa.pub

# RUN ssh-agent -s
# RUN ssh-add ~/.ssh/id_rsa

RUN touch /root/.ssh/known_hosts

# Add git providers to known_hosts
RUN ssh-keyscan bitbucket.org >> /root/.ssh/known_hosts
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts
RUN ssh-keyscan gitlab.com >> /root/.ssh/known_hosts

# create destination directory
RUN mkdir -p /mt-app
WORKDIR /mt-app


# 克隆远端 git 仓库代码到工作区，注意最后的 . 不能省略
RUN git clone git@github.com:hongxuli/ecommerce-nuxt-webhook-docker.git .



# copy the app, note .dockerignore
# COPY . /mt-app/
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 5000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

# start the app
CMD [ "npm", "start" ]

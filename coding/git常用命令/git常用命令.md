### git常用命令



```
git init                      // 初始化本地git环境
git clone XXX	              // 克隆一份代码到本地仓库
git pull origin 分支名          //  从远程仓库分支拉取代码到当前工作台
git pull --rebase origin master // 强制把远程库的代码更新到当前分支上面
git fetch                      // 把远程库的代码更新到本地库
git add .                      // 把本地的修改加到stage中
git commi -m '注释'            // 把stage中的修改提交到本地库
git push origin XXXX           // 把本地库的修改提交到远程库分支中
git branch -r/-a               // 查看远程分支/全部分支
git checkout 分支名		    // 切换到某个分支
git checkout -b 分支名          // 新建分支
git checkout -d 分支名			// 删除分支
git merge 分支名                // 将分支合并到当前分支上
git stash                       // 把未完成的修改缓存到栈容器中
git stash list                  // 查看所有缓存
git stash pop                   // 恢复本地分支到缓存状态
git status                      // 查看当前分支有哪些修改
git log                         // 查看当前分支上面的日志信息
git diff                        // 查看当前没有被add的内容
git reset 日志id                 // 回滚到日志id的版本
```


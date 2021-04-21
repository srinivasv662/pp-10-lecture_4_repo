# upload code to github

## First Time setup
* git config --global user.email "johndoe@example.com"
* git config --global user.name "John Doe"
* git config --list
## (You need to do this always) Hamesha Karna Hoga
* git init -> timeline create for that particular folder
* git add . -> add all files/folder for tracking
* git commit -m "message"
* git log-> to list all the commits
###  create a repo on github
* git remote add origin Your **Repo Name**
* git branch -M main
* git push -u origin main
To ignore any of folder/file  -> create .gitignore file and put file/folder name in it
### Always 
*  git add .
*  git commit -m "message"
*  git push
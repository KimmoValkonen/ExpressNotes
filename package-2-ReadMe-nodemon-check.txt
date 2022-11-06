If you accidentally used the wrong command and the nodemon
dependency was added under
"dependencies" instead of "devDependencies",
then manually change the contents of package.json
to match what is shown above.

“We can start our application with nodemon like this:
 node_modules/.bin/nodemon index.js”
If result is: 
'node_modules' is not recognized as an internal
 or external command, operable program or batch file.
Nodemon has three different
 “Bash shell script/cmd-file/PowerShell scripts”
 in .bin directory. It matters with which console
  you are operating on. In this case the error message
  is from Windows cmd.exe. So the above command
  is working only when using Bash shell.

